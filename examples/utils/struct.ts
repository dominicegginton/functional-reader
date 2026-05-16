import { of, struct } from '../../src';

/**
 * `struct` combines an object of Readers into a single Reader
 * that returns an object of results.
 */

const readers = {
  a: of(1),
  b: of('hello'),
};
const combined = struct(readers);

console.log(combined({})); // { a: 1, b: 'hello' }
