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

### Core Types

- `Reader<Env, Result>`: A computation that requires an environment `Env` to produce a result `Result`.

### Construction

- `of<Env, A>(a: A)`: Creates a Reader that always returns `a`.
- `ask<Env>()`: Creates a Reader that returns the entire environment.
- `asks<Env, A>(selector: (env: Env) => A)`: Creates a Reader that selects a part of the environment.
- `asksReader<Env, A>(f: (env: Env) => Reader<Env, A>)`: Creates a Reader that selects a part of the environment and returns a new Reader.
- `prop<Env, K extends keyof Env>(key: K)`: Creates a Reader that extracts a specific property from the environment.

### Transformation & Composition

- `map<A, B>(f: (a: A) => B)`: Transforms the result of a Reader.
- `chain<A, Env, B>(f: (a: A) => Reader<Env, B>)`: Sequences two Readers where the second depends on the first.
- `flatten<Env, A>(mma: Reader<Env, Reader<Env, A>>)`: Collapses a nested Reader into a single Reader.
- `local<EnvOuter, EnvInner>(f: (outer: EnvOuter) => EnvInner)`: Adapts a Reader to a different environment type.
- `ap<Env, A>(fa: Reader<Env, A>)`: Applies a function contained within a Reader to a value in another Reader.

### Sequencing & Side Effects

- `chainRight<Env, B>(rb: Reader<Env, B>)`: Sequences two Readers and returns the result of the second.
- `chainLeft<Env, B>(rb: Reader<Env, B>)`: Sequences two Readers and returns the result of the first.
- `tap<Env, A>(sideEffect: (a: A, env: Env) => void)`: Performs a side effect without changing the Reader's result.

### Combinators

- `sequence<Env, A>(readers: Array<Reader<Env, A>>)`: Combines an array of Readers into one that returns an array of results.
- `struct<Env, S>(readers: S)`: Combines an object of Readers into one that returns an object of results.

### Do-Notation

- `Do<Env>()`: Initializes a "Do" block for chainable record compositions.
- `bindTo<K extends string>(key: K)`: Wraps a Reader's result into a record with a specified key.
- `bind<K extends string, A, EnvB, B>(key: K, f: (a: A) => Reader<EnvB, B>)`: Binds the result of a Reader to a key in a "Do" block.

### Functional Utilities

- `pipe(a, ...fns)`: Pipes a value through a series of functions.
- `flow(...fns)`: Composes multiple functions into a single function.

