import { Reader } from './reader';

/**
 * Creates a Reader that selects a part of the environment and returns a new Reader.
 */
export const asksReader =
  <Env, A>(f: (env: Env) => Reader<Env, A>): Reader<Env, A> =>
  (env: Env) =>
    f(env)(env);
