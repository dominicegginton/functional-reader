import { Reader } from './reader';

/**
 * Sequences two Readers, where the second Reader depends on the result of the first.
 */
export const chain =
  <A, EnvB, B>(f: (a: A) => Reader<EnvB, B>) =>
  <EnvA>(reader: Reader<EnvA, A>): Reader<EnvA & EnvB, B> =>
  (env: EnvA & EnvB) =>
    f(reader(env))(env);

/**
 * An alias for `chain`. Sequences two computations.
 */
export const compose = chain;
