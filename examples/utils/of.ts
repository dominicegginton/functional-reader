import { of } from '../../src';

/**
 * `of` creates a Reader that always returns the same value,
 * regardless of the environment.
 */

const reader = of(42);

console.log(reader({})); // 42
console.log(reader({ any: 'env' })); // 42
