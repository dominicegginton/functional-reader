import { Do, bind, bindTo, of, pipe } from '../../src';

/**
 * `Do`, `bind`, and `bindTo` provide a way to chain Readers
 * that collect their results into an object.
 */

const reader = pipe(
  Do(),
  bind('a', () => of(1)),
  bind('b', ({ a }) => of(a + 1)),
  bindTo('c')(of(3)),
);

console.log(reader({})); // { a: 1, b: 2, c: 3 }
