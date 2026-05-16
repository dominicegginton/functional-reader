import { Reader } from './reader';

/**
 * Sequences two Readers and returns the result of the first one.
 */
export const chainLeft =
  <EnvB, B>(rb: Reader<EnvB, B>) =>
  <EnvA, A>(ra: Reader<EnvA, A>): Reader<EnvA & EnvB, A> =>
  (env: EnvA & EnvB) => {
    const a = ra(env);
    rb(env);
    return a;
  };
