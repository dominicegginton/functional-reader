import { of, map } from '../../src';

/**
 * `map` transforms the result of a Reader using a provided function.
 */

const reader = of(21);
const doubleReader = map((n: number) => n * 2)(reader);

console.log(doubleReader({})); // 42
