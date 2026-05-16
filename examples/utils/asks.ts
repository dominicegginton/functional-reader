import { asks } from '../../src';

/**
 * `asks` creates a Reader that selects a part of the environment
 * using a selector function.
 */

interface Env {
  readonly user: {
    readonly name: string;
  };
}

const getName = asks((env: Env) => env.user.name);

const env: Env = { user: { name: 'Alice' } };

console.log(getName(env)); // Alice
