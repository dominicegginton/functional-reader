import { Reader } from './reader';

/**
 * Creates a Reader that always returns the provided value, regardless of the environment.
 */
export const of =
  <Env, A>(a: A): Reader<Env, A> =>
  () =>
    a;
