import { of, ap } from '../../src';

/**
 * `ap` applies a function contained within a Reader to a value
 * contained within another Reader.
 */

const fa = of(21);
const fab = of((n: number) => n * 2);

const reader = ap(fa)(fab);

console.log(reader({})); // 42
