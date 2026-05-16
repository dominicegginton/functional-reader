import { Reader } from './reader';

/**
 * Creates a Reader that selects a part of the environment using the provided selector function.
 */
export const asks =
  <Env, A>(selector: (env: Env) => A): Reader<Env, A> =>
  (env: Env) =>
    selector(env);
