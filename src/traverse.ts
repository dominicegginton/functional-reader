import { Reader } from './reader';

/**
 * Maps over an array of values using a function that returns a Reader,
 * then combines the results into a single Reader.
 */
export const traverse =
  <A, Env, B>(f: (a: A) => Reader<Env, B>) =>
  (as: readonly A[]): Reader<Env, readonly B[]> =>
  (env) =>
    as.map((a) => f(a)(env));
