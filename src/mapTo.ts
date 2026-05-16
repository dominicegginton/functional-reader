import { Reader } from './reader';
import { map } from './map';

/**
 * Maps the result of a Reader to a constant value.
 */
export const mapTo =
  <B>(value: B) =>
  <Env, A>(reader: Reader<Env, A>): Reader<Env, B> =>
    map(() => value)(reader);
