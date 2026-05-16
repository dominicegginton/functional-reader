import { Reader } from './reader';

/**
 * Creates a Reader that selects multiple properties from the environment.
 */
export const pick =
  <Env, K extends keyof Env>(keys: readonly K[]): Reader<Env, Pick<Env, K>> =>
  (env) =>
    keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: env[key],
      }),
      {} as Pick<Env, K>,
    );
