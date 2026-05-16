import { Do, pipe } from '../../src';

/**
 * `Do` starts a new computation block that allows for accumulating results
 * into an object using `bind` and `bindTo`.
 */

const reader = pipe(Do());

const result = reader({});
console.log(result); // {}
