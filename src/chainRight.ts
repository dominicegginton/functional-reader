import { Reader } from './reader';

/**
 * Sequences two Readers and returns the result of the second one.
 */
export const chainRight =
  <EnvB, B>(rb: Reader<EnvB, B>) =>
  <EnvA, A>(ra: Reader<EnvA, A>): Reader<EnvA & EnvB, B> =>
  (env: EnvA & EnvB) => {
    ra(env);
    return rb(env);
  };
