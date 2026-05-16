import { of, flatten } from '../../src';

/**
 * `flatten` collapses a nested Reader into a single Reader.
 */

const nestedReader = of(of(42));
const flatReader = flatten(nestedReader);

console.log(flatReader({})); // 42
