import { Reader } from './reader';

/**
 * Runs a Reader and then a second Reader produced by a function,
 * but returns the result of the first Reader.
 */
export const chainFirst =
  <A, EnvB, B>(f: (a: A) => Reader<EnvB, B>) =>
  <EnvA>(reader: Reader<EnvA, A>): Reader<EnvA & EnvB, A> =>
  (env) => {
    const a = reader(env);
    f(a)(env);
    return a;
  };
