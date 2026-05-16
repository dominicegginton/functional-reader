import { Reader } from './reader';

/**
 * Creates a Reader that is lazily initialized when it is called.
 */
export const defer =
  <Env, A>(f: () => Reader<Env, A>): Reader<Env, A> =>
  (env) =>
    f()(env);
