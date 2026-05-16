import { Do, bind, of, pipe } from '../src';

const reader = pipe(
  Do(),
  bind('a', () => of(1)),
  bind('b', ({ a }) => of(a + 1)),
  bind('c', ({ a, b }) => of(a + b)),
);

console.log(reader({})); // { a: 1, b: 2, c: 3 }
