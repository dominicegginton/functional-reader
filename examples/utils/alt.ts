import { alt, of, pipe } from '../../src';

/**
 * `alt` returns the result of the first Reader if it is not null or undefined,
 * otherwise returns the result of the second Reader.
 */

const reader = pipe(of(null), alt(of('fallback')));

const result = reader({});
console.log(result); // 'fallback'
