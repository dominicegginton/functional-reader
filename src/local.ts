import { Reader } from './reader';

/**
 * Adapts a Reader to a different environment type.
 */
export const local =
  <EnvOuter, EnvInner>(f: (outer: EnvOuter) => EnvInner) =>
  <A>(reader: Reader<EnvInner, A>): Reader<EnvOuter, A> =>
  (env: EnvOuter) =>
    reader(f(env));
