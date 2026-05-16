# functional-reader

A purely functional, dependency-free dependency injection library for TypeScript based on the Reader Monad.

## Features

- **Purely Functional**: Built on the Reader Monad pattern.
- **Type-Safe**: Full TypeScript support with excellent type inference.
- **Zero Dependencies**: Lightweight and fast.
- **Composable**: Utilities for mapping, chaining, and adapting environments.
- **Curried**: All functions are fully curried for maximum flexibility.

## Comparison with Other Libraries

While many libraries offer functional programming and dependency management in TypeScript, **functional-reader** focuses on being a lightweight, specialized tool.

| Feature / Goal                                 | functional-reader        | fp-ts (Reader)           | lodash/fp                      |
|------------------------------------------------|-------------------------|--------------------------|---------------------------------|
| Reader Monad / Dependency Injection            | Core feature            | Included module          | Not available                  |
| Zero runtime dependencies                      | Yes                    | No (requires fp-ts)      | No (lodash dependency)          |
| TypeScript support & inference                 | Excellent               | Excellent                | Partial (not Reader-aware)      |
| Lightweight / Minimal bundle                   | Yes                    | No (fp-ts is large)      | No (lodash is large)            |
| API Simplicity                                | Minimal, approachable   | Broader/complex          | Simple, but not monadic         |
| Curried / Point-Free APIs                     | Yes                     | Yes                      | Partial                         |
| Explicit error handling (neverthrow compatible)| Yes                     | Yes (with effort)        | No                              |
| Do-notation & record chaining helpers          | Included                | Included                 | No                              |
| Pure FP without typeclass bloat                | Yes                     | No (full typeclass)      | Yes (pure, but not Reader)      |

### Why functional-reader?
- **Focused**: A small, dependency-free implementation of the Reader monad.
- **TypeScript-native**: Designed for first-class type inference and autocompletion.
- **Lightweight**: Zero dependencies and minimal bundle size overhead.
- **Approachable**: A readable API that is easy to learn and integrate.
- **Interoperable**: Designed to play well with other modern libraries like `neverthrow`.

## Compatibility & Interoperability

**functional-reader** is unopinionated, making it easy to integrate into existing TypeScript projects:

| Interop Scenario                            | Support Description                                                           |
|---------------------------------------------|------------------------------------------------------------------------------|
| **neverthrow**                              | Returns or operates on `Result<T, E>` out-of-the-box.                         |
| **fp-ts**                                   | Compatible API surface; easily migrated or combined.                          |
| **RxJS / Promises**                         | Readers can be evaluated inside observables or async flows.                   |
| **Legacy Code**                             | Since a Reader is just `(env) => value`, it plugs in directly everywhere.     |
| **Standard Utilities**                      | Works seamlessly with standard JS utilities (lodash, ramda, etc.).            |

## Install

> **Note**: functional-reader is distributed directly via this repository to emphasize transparency, autonomy, and source engagement over reliance on third-party registries. This approach allows users to review, audit, and tailor the library to their needs, while avoiding potential risks or restrictions imposed by centralized package platforms.

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
