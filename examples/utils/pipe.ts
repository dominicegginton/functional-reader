import { of, map, pipe } from '../../src';

/**
 * `pipe` allows you to pipe a value through a series of functions.
 * It's often used to compose Readers in a readable way.
 */

const result = pipe(
  of(21),
  map((n) => n * 2),
  map((n) => `The answer is ${n}`),
);

console.log(result({})); // The answer is 42
