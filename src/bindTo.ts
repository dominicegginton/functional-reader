import { Reader } from './reader';
import { map } from './map';

/**
 * Wraps a Reader's result into a record with a specified key.
 */
export const bindTo =
  <K extends string>(key: K) =>
  <Env, A>(reader: Reader<Env, A>): Reader<Env, Record<K, A>> =>
    map((a: A) => ({ [key]: a }) as Record<K, A>)(reader);
