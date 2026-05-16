import { Reader } from './reader';

/**
 * Creates a Reader that extracts a property from the environment.
 */
export const prop =
  <Env, K extends keyof Env>(key: K): Reader<Env, Env[K]> =>
  (env: Env) =>
    env[key];
