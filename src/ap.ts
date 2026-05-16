import { Reader } from './reader';

/**
 * Applies a function contained within a Reader to a value contained within another Reader.
 */
export const ap =
  <EnvA, A>(fa: Reader<EnvA, A>) =>
  <EnvF, B>(fab: Reader<EnvF, (a: A) => B>): Reader<EnvA & EnvF, B> =>
  (env: EnvA & EnvF) =>
    fab(env)(fa(env));
