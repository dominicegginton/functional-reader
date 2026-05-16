import { of, traverse } from '../../src';

/**
 * `traverse` maps over an array with a function that returns a Reader,
 * then combines the results into a single Reader of an array.
 */

const f = (n: number) => of(n * 2);

const reader = traverse(f)([1, 2, 3]);

const result = reader({});
console.log(result); // [2, 4, 6]
