import { of, tap } from '../../src';

/**
 * `tap` performs a side effect with the result of a Reader
 * without changing the result.
 */

const reader = tap((n: number) => console.log(`Side effect: ${n}`))(of(42));

console.log(reader({})); // Side effect: 42 \n 42
