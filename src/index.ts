/**
 * A Reader represents a computation that requires an environment to produce a result.
 */
export type Reader<Env, Result> = (env: Env) => Result;

/**
 * Pipes the result of a function into the next one.
 */
export function pipe<A>(a: A): A;
export function pipe<A, B>(a: A, ab: (a: A) => B): B;
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
export function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
export function pipe<A, B, C, D, E>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
): E;
export function pipe<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
): F;
export function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
): G;
export function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
): H;
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
): I;
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
): J;
export function pipe(a: unknown, ...fns: readonly ((x: unknown) => unknown)[]): unknown {
  return fns.reduce((prev, fn) => fn(prev), a);
}

/**
 * Composes multiple functions into a single function.
 */
export function flow<A, B>(ab: (a: A) => B): (a: A) => B;
export function flow<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C;
export function flow<A, B, C, D>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (a: A) => D;
export function flow<A, B, C, D, E>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
): (a: A) => E;
export function flow<A, B, C, D, E, F>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
): (a: A) => F;
export function flow<A, B, C, D, E, F, G>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
): (a: A) => G;
export function flow<A, B, C, D, E, F, G, H>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
): (a: A) => H;
export function flow<A, B, C, D, E, F, G, H, I>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
): (a: A) => I;
export function flow<A, B, C, D, E, F, G, H, I, J>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
): (a: A) => J;
export function flow(
  ab: (a: unknown) => unknown,
  ...fns: readonly ((a: unknown) => unknown)[]
): (a: unknown) => unknown {
  return (a: unknown) => fns.reduce((prev, fn) => fn(prev), ab(a));
}

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
 * Creates a Reader that selects a part of the environment and returns a new Reader.
 */
export const asksReader =
  <Env, A>(f: (env: Env) => Reader<Env, A>): Reader<Env, A> =>
  (env: Env) =>
    f(env)(env);

/**
 * Collapses a nested Reader into a single Reader.
 */
export const flatten =
  <Env, A>(mma: Reader<Env, Reader<Env, A>>): Reader<Env, A> =>
  (env) =>
    mma(env)(env);

/**
 * Transforms the result of a Reader using a provided function.
 */
export const map =
  <A, B>(f: (a: A) => B) =>
  <Env>(reader: Reader<Env, A>): Reader<Env, B> =>
  (env: Env) =>
    f(reader(env));

/**
 * Sequences two Readers, where the second Reader depends on the result of the first.
 */
export const chain =
  <A, EnvB, B>(f: (a: A) => Reader<EnvB, B>) =>
  <EnvA>(reader: Reader<EnvA, A>): Reader<EnvA & EnvB, B> =>
  (env: EnvA & EnvB) =>
    f(reader(env))(env);

/**
 * Adapts a Reader to a different environment type.
 */
export const local =
  <EnvOuter, EnvInner>(f: (outer: EnvOuter) => EnvInner) =>
  <A>(reader: Reader<EnvInner, A>): Reader<EnvOuter, A> =>
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
  <EnvA, A>(fa: Reader<EnvA, A>) =>
  <EnvF, B>(fab: Reader<EnvF, (a: A) => B>): Reader<EnvA & EnvF, B> =>
  (env: EnvA & EnvF) =>
    fab(env)(fa(env));

/**
 * Sequences two Readers and returns the result of the second one.
 */
export const chainRight =
  <EnvB, B>(rb: Reader<EnvB, B>) =>
  <EnvA, A>(ra: Reader<EnvA, A>): Reader<EnvA & EnvB, B> =>
  (env: EnvA & EnvB) => {
    ra(env);
    return rb(env);
  };

/**
 * Sequences two Readers and returns the result of the first one.
 */
export const chainLeft =
  <EnvB, B>(rb: Reader<EnvB, B>) =>
  <EnvA, A>(ra: Reader<EnvA, A>): Reader<EnvA & EnvB, A> =>
  (env: EnvA & EnvB) => {
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
 * Wraps a Reader's result into a record with a specified key.
 */
export const bindTo =
  <K extends string>(key: K) =>
  <Env, A>(reader: Reader<Env, A>): Reader<Env, Record<K, A>> =>
    map((a: A) => ({ [key]: a }) as Record<K, A>)(reader);

/**
 * Binds the result of a Reader to a key in the record of a "Do" block.
 */
export const bind =
  <K extends string, A, EnvB, B>(key: K, f: (a: A) => Reader<EnvB, B>) =>
  <EnvA>(reader: Reader<EnvA, A>): Reader<EnvA & EnvB, A & Record<K, B>> =>
  (env) => {
    const a = reader(env);
    const b = f(a)(env);
    return { ...a, [key]: b } as A & Record<K, B>;
  };

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

/**
 * Combines an array of Readers into a single Reader that returns an array of results.
 */
export const sequence =
  <Env, A>(readers: readonly Reader<Env, A>[]): Reader<Env, readonly A[]> =>
  (env) =>
    readers.map((r) => r(env));

/**
 * Combines an object of Readers into a single Reader that returns an object of results.
 */
export const struct =
  <Env, S extends Record<string, Reader<Env, unknown>>>(
    readers: S,
  ): Reader<Env, { [K in keyof S]: S[K] extends Reader<unknown, infer A> ? A : never }> =>
  (env) =>
    Object.keys(readers).reduce(
      (acc, key) => ({
        ...acc,
        [key]: readers[key](env),
      }),
      {} as { [K in keyof S]: S[K] extends Reader<unknown, infer A> ? A : never },
    );

/**
 * Conditionally chooses between two Readers based on a predicate applied to the environment.
 */
export const iif =
  <Env, A>(
    predicate: (env: Env) => boolean,
    onTrue: Reader<Env, A>,
    onFalse: Reader<Env, A>,
  ): Reader<Env, A> =>
  (env) =>
    predicate(env) ? onTrue(env) : onFalse(env);
