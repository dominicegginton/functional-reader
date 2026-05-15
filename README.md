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
function tap<Env, A>(sideEffect: (a: A, env: Env) => void): (reader: Reader<Env, A>) => Reader<Env, A>;
```
