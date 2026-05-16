import { Reader } from './reader';

/**
 * Provides an environment to a Reader, resulting in a Reader that requires no environment.
 */
export const provide =
  <Env>(env: Env) =>
  <A>(reader: Reader<Env, A>): Reader<unknown, A> =>
  () =>
    reader(env);
