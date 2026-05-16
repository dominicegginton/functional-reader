import { Reader } from './reader';

/**
 * Binds the result of a Reader to a key in the record of a "Do" block.
 */
export const bind =
  <K extends string, A, EnvB, B>(key: K, f: (a: A) => Reader<EnvB, B>) =>
  <EnvA>(reader: Reader<EnvA, A>): Reader<EnvA & EnvB, A & Record<K, B>> =>
  (env) => {
    const a = reader(env);
    const b = f(a)(env);
    return { ...a, [key]: b } as A & Record<K, B>;
  };
