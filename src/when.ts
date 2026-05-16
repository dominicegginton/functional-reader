import { Reader } from './reader';

/**
 * Conditionally executes a Reader if a predicate applied to the environment is true.
 */
export const when =
  <Env, A>(predicate: (env: Env) => boolean, reader: Reader<Env, A>): Reader<Env, A | undefined> =>
  (env) =>
    predicate(env) ? reader(env) : undefined;
