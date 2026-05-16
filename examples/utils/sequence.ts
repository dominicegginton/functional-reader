import { of, sequence } from '../../src';

/**
 * `sequence` combines an array of Readers into a single Reader
 * that returns an array of results.
 */

const readers = [of(1), of(2), of(3)];
const combined = sequence(readers);

console.log(combined({})); // [1, 2, 3]
