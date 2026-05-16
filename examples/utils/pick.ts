import { pick } from '../../src';

/**
 * `pick` selects multiple properties from the environment.
 */

interface Env {
  readonly a: number;
  readonly b: string;
  readonly c: boolean;
}

const reader = pick<Env, 'a' | 'c'>(['a', 'c']);

const result = reader({ a: 1, b: 'foo', c: true });
console.log(result); // { a: 1, c: true }
