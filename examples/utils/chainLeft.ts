import { of, chainLeft } from '../../src';

/**
 * `chainLeft` sequences two Readers and returns the result of the first one.
 * The second Reader's result is ignored.
 */

const reader = chainLeft(of('world'))(of('hello'));

console.log(reader({})); // hello
