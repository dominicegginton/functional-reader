import { of, chain } from '../../src';

/**
 * `chain` sequences two Readers where the second Reader depends
 * on the result of the first.
 */

const reader = of(21);
const doubleReader = chain((n: number) => of(n * 2))(reader);

console.log(doubleReader({})); // 42
