/**
 * A Reader represents a computation that requires an environment to produce a result.
 */
export type Reader<Env, Result> = (env: Env) => Result;

/**
 * Creates a Reader that always returns the provided value, regardless of the environment.
 */
export const of =
  <Env, A>(a: A): Reader<Env, A> =>
  () =>
    a;

/**
 * Creates a Reader that returns the entire environment.
 */
export const ask =
  <Env>(): Reader<Env, Env> =>
  (env: Env) =>
    env;

/**
 * Creates a Reader that selects a part of the environment using the provided selector function.
 */
export const asks =
  <Env, A>(selector: (env: Env) => A): Reader<Env, A> =>
  (env: Env) =>
    selector(env);

/**
 * Transforms the result of a Reader using a provided function.
 */
export const map =
  <Env, A, B>(reader: Reader<Env, A>, f: (a: A) => B): Reader<Env, B> =>
  (env: Env) =>
    f(reader(env));

/**
 * Sequences two Readers, where the second Reader depends on the result of the first.
 */
export const chain =
  <Env, A, B>(reader: Reader<Env, A>, f: (a: A) => Reader<Env, B>): Reader<Env, B> =>
  (env: Env) =>
    f(reader(env))(env);

/**
 * Adapts a Reader to a different environment type.
 */
export const local =
  <EnvOuter, EnvInner, A>(
    f: (outer: EnvOuter) => EnvInner,
    reader: Reader<EnvInner, A>,
  ): Reader<EnvOuter, A> =>
  (env: EnvOuter) =>
    reader(f(env));

/**
 * An alias for `chain`. Sequences two computations.
 */
export const compose = chain;

/**
 * Applies a function contained within a Reader to a value contained within another Reader.
 */
export const ap =
  <Env, A, B>(fab: Reader<Env, (a: A) => B>, fa: Reader<Env, A>): Reader<Env, B> =>
  (env: Env) =>
    fab(env)(fa(env));

/**
 * Sequences two Readers and returns the result of the second one.
 */
export const chainRight =
  <Env, A, B>(ra: Reader<Env, A>, rb: Reader<Env, B>): Reader<Env, B> =>
  (env: Env) => {
    ra(env);
    return rb(env);
  };

/**
 * Sequences two Readers and returns the result of the first one.
 */
export const chainLeft =
  <Env, A, B>(ra: Reader<Env, A>, rb: Reader<Env, B>): Reader<Env, A> =>
  (env: Env) => {
    const a = ra(env);
    rb(env);
    return a;
  };

/**
 * Creates a Reader that extracts a property from the environment.
 */
export const prop =
  <Env, K extends keyof Env>(key: K): Reader<Env, Env[K]> =>
  (env: Env) =>
    env[key];

/**
 * Initializes a "Do" block for chainable compositions using an object to store intermediate results.
 */
export const Do = <Env>(): Reader<Env, Record<string, never>> => of({});

/**
 * Performs a side effect with the result of a Reader without changing the result.
 */
export const tap =
  <Env, A>(sideEffect: (a: A, env: Env) => void) =>
  (reader: Reader<Env, A>): Reader<Env, A> =>
  (env: Env) => {
    const a = reader(env);
    sideEffect(a, env);
    return a;
  };
