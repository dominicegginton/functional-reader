import { Reader } from './reader';

/**
 * Returns the result of the first Reader if it is not null or undefined,
 * otherwise returns the result of the second Reader.
 */
export const alt =
  <EnvB, B>(secondary: Reader<EnvB, B>) =>
  <EnvA, A>(primary: Reader<EnvA, A>): Reader<EnvA & EnvB, A | B> =>
  (env) => {
    const a = primary(env);
    return a != null ? a : secondary(env);
  };
