import { Reader } from './reader';

/**
 * Conditionally chooses between two Readers based on a predicate applied to the environment.
 */
export const iif =
  <Env, A>(
    predicate: (env: Env) => boolean,
    onTrue: Reader<Env, A>,
    onFalse: Reader<Env, A>,
  ): Reader<Env, A> =>
  (env) =>
    predicate(env) ? onTrue(env) : onFalse(env);
