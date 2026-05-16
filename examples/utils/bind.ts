import { Do, bind, of, pipe } from '../../src';

/**
 * `bind` is used within a "Do" block to chain a new Reader and store its result
 * under a specific key in the accumulated object.
 */

const reader = pipe(
  Do(),
  bind('a', () => of(10)),
  bind('b', ({ a }) => of(a * 2)),
);

const result = reader({});
console.log(result); // { a: 10, b: 20 }
