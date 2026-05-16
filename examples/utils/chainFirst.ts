import { chainFirst, of, pipe } from '../../src';

/**
 * `chainFirst` runs a second Reader but returns the result of the first one.
 * This is useful for side-effects that require the environment.
 */

const reader = pipe(
  of(1),
  chainFirst((n) => (env: { readonly log: (s: string) => void }) => {
    env.log(`Value is ${n}`);
    return of(undefined);
  }),
);

const log = (s: string) => console.log(s);
const result = reader({ log });
console.log(result); // 1
// Output: Value is 1
