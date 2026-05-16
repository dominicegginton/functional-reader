import { asks, local } from '../../src';

/**
 * `local` adapts a Reader to a different (usually larger) environment type
 * by providing a transformation function for the environment.
 */

interface InnerEnv {
  readonly val: number;
}

interface OuterEnv {
  readonly inner: InnerEnv;
}

const reader = asks((env: InnerEnv) => env.val);

const adaptedReader = local((env: OuterEnv) => env.inner)(reader);

console.log(adaptedReader({ inner: { val: 42 } })); // 42
