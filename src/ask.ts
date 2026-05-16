import { Reader } from './reader';

/**
 * Creates a Reader that returns the entire environment.
 */
export const ask =
  <Env>(): Reader<Env, Env> =>
  (env: Env) =>
    env;
