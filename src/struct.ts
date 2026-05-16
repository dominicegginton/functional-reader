import { Reader } from './reader';

/**
 * Combines an object of Readers into a single Reader that returns an object of results.
 */
export const struct =
  <Env, S extends Record<string, Reader<Env, unknown>>>(
    readers: S,
  ): Reader<Env, { [K in keyof S]: S[K] extends Reader<unknown, infer A> ? A : never }> =>
  (env) =>
    Object.keys(readers).reduce(
      (acc, key) => ({
        ...acc,
        [key]: readers[key](env),
      }),
      {} as { [K in keyof S]: S[K] extends Reader<unknown, infer A> ? A : never },
    );
