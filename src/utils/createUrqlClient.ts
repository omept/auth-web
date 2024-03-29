import { dedupExchange, Exchange, fetchExchange, ssrExchange } from "urql";
import { LoginMutation, MeQuery, MeDocument, RegisterMutation, LogoutMutation, PasswordResetMutation } from "../generated/graphql";
import { customUpdateQuery } from './customUpdateQuery';
import { cacheExchange } from '@urql/exchange-graphcache';
import { pipe, tap } from "wonka";
import Router from "next/router";


const errorExchange: Exchange = ({ forward }) => (ops$) => {
    return pipe(
        forward(ops$),
        tap(({ error }) => {
            if (error?.message.includes("not authenticated")) {
                Router.replace("/login"); // redirect to login
            }
        })
    );
};

export const createUrqlClient = (ssrExchange: any) => ({
    url: process.env.NEXT_PUBLIC_GRAPHQL_CLIENT,
    fetchOptions: {
        credentials: "include" as const
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            updates: {
                Mutation: {
                    // update cache  when logout is called
                    passwordReset: (_result, args, cache, info) => {
                        customUpdateQuery<PasswordResetMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            () => ({ me: null }) // for now we're only interested in the "me" index of the normalised cache }

                        );
                    },
                    // update cache  when logout is called
                    logout: (_result, args, cache, info) => {
                        customUpdateQuery<LogoutMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            () => ({ me: null }) // for now we're only interested in the "me" index of the normalised cache }

                        );
                    },
                    // update cache when login mutation is called
                    login: (_result, args, cache, info) => {
                        customUpdateQuery<LoginMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                // retrun the query if error occurs on the mutation else return the new result for the normalised cache index "me"
                                if (result.login.errors) {
                                    return query
                                } else {
                                    return {
                                        me: result.login.user,  // for now we're only interested in the "me" index of the normalised cache
                                    }
                                }
                            }
                        );
                    },
                    // update cache if register is called
                    register: (_result, args, cache, info) => {
                        customUpdateQuery<RegisterMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                // retrun the query if error occurs on the mutation else return the new result for the normalised cache index "me"
                                if (result.register.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: result.register.user,  // for now we're only interested in the "me" index of the normalised cache
                                    }
                                }
                            }
                        );
                    },
                }, Subscription: {
                    newTodo: (result, args, cache, info) => {

                    },
                },
            }
        }),
        errorExchange,
        ssrExchange,
        fetchExchange
    ]
});