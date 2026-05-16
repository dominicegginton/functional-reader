import { Reader } from './reader';

/**
 * Collapses a nested Reader into a single Reader.
 */
export const flatten =
  <Env, A>(mma: Reader<Env, Reader<Env, A>>): Reader<Env, A> =>
  (env) =>
    mma(env)(env);
