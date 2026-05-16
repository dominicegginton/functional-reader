import { of, map, chain, pipe } from '../src';

const reader = pipe(
  of(21),
  map((n) => n * 2),
  chain((n) => of(`The answer is ${n}`)),
);

console.log(reader({})); // The answer is 42
