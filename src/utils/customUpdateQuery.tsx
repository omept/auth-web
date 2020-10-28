import { Cache, QueryInput } from '@urql/exchange-graphcache';

//use a typed function for handing the cache 
export function customUpdateQuery<Result, Query>(
    cache: Cache,
    qi: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query
) {
    return cache.updateQuery(qi, data => fn(result, data as any) as any);
}
