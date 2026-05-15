# functional-reader

A purely functional, dependency-free dependency injection library for TypeScript based on the Reader Monad.

## Features

- **Purely Functional**: Built on the Reader Monad pattern.
- **Type-Safe**: Full TypeScript support with excellent type inference.
- **Zero Dependencies**: Lightweight and fast.
- **Composable**: Utilities for mapping, chaining, and adapting environments.

## Install

```bash
npm install github:dominicegginton/functional-reader
```

## Documentation

```typescript
type Reader<Env, Result> = (env: Env) => Result;

function of<Env, A>(a: A): Reader<Env, A>;
function ask<Env>(): Reader<Env, Env>;
function asks<Env, A>(selector: (env: Env) => A): Reader<Env, A>;
function map<Env, A, B>(reader: Reader<Env, A>, f: (a: A) => B): Reader<Env, B>;
function chain<Env, A, B>(reader: Reader<Env, A>, f: (a: A) => Reader<Env, B>): Reader<Env, B>;
function compose<Env, A, B>(reader: Reader<Env, A>, f: (a: A) => Reader<Env, B>): Reader<Env, B>;
function local<EnvOuter, EnvInner, A>(f: (outer: EnvOuter) => EnvInner, reader: Reader<EnvInner, A>): Reader<EnvOuter, A>;
function ap<Env, A, B>(fab: Reader<Env, (a: A) => B>, fa: Reader<Env, A>): Reader<Env, B>;
function chainRight<Env, A, B>(ra: Reader<Env, A>, rb: Reader<Env, B>): Reader<Env, B>;
function chainLeft<Env, A, B>(ra: Reader<Env, A>, rb: Reader<Env, B>): Reader<Env, A>;
function prop<Env, K extends keyof Env>(key: K): Reader<Env, Env[K]>;
function Do<Env>(): Reader<Env, Record<string, never>>;
function tap<Env, A>(sideEffect: (a: A, env: Env) => void): (reader: Reader<Env, A>) => Reader<Env, A>;
```
