import { flow } from '../../src';

/**
 * `flow` comopses multiple functions into a single function.
 */

const doubleAndInc = flow(
  (n: number) => n * 2,
  (n: number) => n + 1,
);

console.log(doubleAndInc(20)); // 41
