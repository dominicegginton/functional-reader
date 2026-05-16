import { Reader } from './reader';

/**
 * Combines an array of Readers into a single Reader that returns an array of results.
 */
export const sequence =
  <Env, A>(readers: readonly Reader<Env, A>[]): Reader<Env, readonly A[]> =>
  (env) =>
    readers.map((r) => r(env));
