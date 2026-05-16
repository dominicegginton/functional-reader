import { Reader } from './reader';

/**
 * Transforms the result of a Reader using a provided function.
 */
export const map =
  <A, B>(f: (a: A) => B) =>
  <Env>(reader: Reader<Env, A>): Reader<Env, B> =>
  (env: Env) =>
    f(reader(env));
