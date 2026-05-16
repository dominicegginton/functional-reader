import { of, chainRight } from '../../src';

/**
 * `chainRight` sequences two Readers and returns the result of the second one.
 * The first Reader's result is ignored (though its side effects would run).
 */

const reader = chainRight(of('world'))(of('hello'));

console.log(reader({})); // world
