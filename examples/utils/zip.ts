import { of, pipe, zip } from '../../src';

/**
 * `zip` combines two Readers into a single Reader that returns a tuple of their results.
 */

const reader = pipe(of(1), zip(of('a')));

const result = reader({});
console.log(result); // [1, 'a']
