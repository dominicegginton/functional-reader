import { Reader } from './reader';

/**
 * Performs a side effect with the result of a Reader without changing the result.
 */
export const tap =
  <Env, A>(sideEffect: (a: A, env: Env) => void) =>
  (reader: Reader<Env, A>): Reader<Env, A> =>
  (env: Env) => {
    const a = reader(env);
    sideEffect(a, env);
    return a;
  };
