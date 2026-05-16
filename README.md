# functional-reader

A purely functional, dependency-free dependency injection library for TypeScript based on the Reader Monad.

## Features

- **Purely Functional**: Built on the Reader Monad pattern.
- **Type-Safe**: Full TypeScript support with excellent type inference.
- **Zero Dependencies**: Lightweight and fast.
- **Composable**: Utilities for mapping, chaining, and adapting environments.
- **Curried**: All functions are fully curried for maximum flexibility.

## Install

```bash
# Install the latest version from GitHub
npm install github:dominicegginton/functional-reader

# Or install a specific version/tag
npm install github:dominicegginton/functional-reader#v1.0.0
```

## Documentation

```typescript
type Reader<Env, Result> = (env: Env) => Result;

function pipe<A>(a: A, ...fns: Array<(x: unknown) => unknown>): unknown;

function of<Env, A>(a: A): Reader<Env, A>;
function ask<Env>(): Reader<Env, Env>;
function asks<Env, A>(selector: (env: Env) => A): Reader<Env, A>;
function map<A, B>(f: (a: A) => B): <Env>(reader: Reader<Env, A>) => Reader<Env, B>;
function chain<A, Env, B>(f: (a: A) => Reader<Env, B>): (reader: Reader<Env, A>) => Reader<Env, B>;
function local<EnvOuter, EnvInner>(f: (outer: EnvOuter) => EnvInner): <A>(reader: Reader<EnvInner, A>) => Reader<EnvOuter, A>;
function ap<Env, A>(fa: Reader<Env, A>): <B>(fab: Reader<Env, (a: A) => B>) => Reader<Env, B>;
function chainRight<Env, B>(rb: Reader<Env, B>): <A>(ra: Reader<Env, A>) => Reader<Env, B>;
function chainLeft<Env, B>(rb: Reader<Env, B>): <A>(ra: Reader<Env, A>) => Reader<Env, A>;
function prop<Env, K extends keyof Env>(key: K): Reader<Env, Env[K]>;
function Do<Env>(): Reader<Env, Record<string, never>>;
function bindTo<K extends string>(key: K): <Env, A>(reader: Reader<Env, A>) => Reader<Env, { [P in K]: A }>;
function bind<K extends string, A, EnvB, B>(key: K, f: (a: A) => Reader<EnvB, B>): <EnvA>(reader: Reader<EnvA, A>) => Reader<EnvA & EnvB, A & { [P in K]: B }>;
function tap<Env, A>(sideEffect: (a: A, env: Env) => void): (reader: Reader<Env, A>) => Reader<Env, A>;
function flow<A, B>(...fns: Array<Function>): (a: A) => B;
function asksReader<Env, A>(f: (env: Env) => Reader<Env, A>): Reader<Env, A>;
function flatten<Env, A>(mma: Reader<Env, Reader<Env, A>>): Reader<Env, A>;
function sequence<Env, A>(readers: Array<Reader<Env, A>>): Reader<Env, Array<A>>;
function struct<Env, S>(readers: S): Reader<Env, { [K in keyof S]: S[K] extends Reader<any, infer A> ? A : never }>;
```
