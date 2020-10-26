import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import React from 'react'
import { Provider, createClient, dedupExchange, fetchExchange, Query } from 'urql';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import theme from '../theme'
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';


//use a typed function for handing the cache 
function customUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any)
}


// graphql client
const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_CLIENT, fetchOptions: {
    credentials: "include"
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        // update login cache 
        logout: (_result, args, cache, info) => {
          customUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              return {
                me: null,
              }
            }
          );
        }, // update login cache 
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
                  me: result.login.user,
                }
              }
            }
          );
        },
        // update register cache 
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
                  me: result.register.user,
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
  }), fetchExchange]
})


// init app
function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
