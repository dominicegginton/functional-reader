import { Reader } from './reader';

/**
 * Combines two Readers into a single Reader that returns a tuple of their results.
 */
export const zip =
  <EnvB, B>(rb: Reader<EnvB, B>) =>
  <EnvA, A>(ra: Reader<EnvA, A>): Reader<EnvA & EnvB, readonly [A, B]> =>
  (env) =>
    [ra(env), rb(env)] as const;
