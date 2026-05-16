/**
 * A Reader represents a computation that requires an environment to produce a result.
 */
export type Reader<Env, Result> = (env: Env) => Result;
