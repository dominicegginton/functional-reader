import * as R from './index';

describe('Reader', () => {
  interface Env {
    readonly val: number;
  }

  test('of', () => {
    const reader = R.of<Env, number>(42);
    expect(reader({ val: 0 })).toBe(42);
  });

  test('ask', () => {
    const reader = R.ask<Env>();
    expect(reader({ val: 42 })).toEqual({ val: 42 });
  });

  test('asks', () => {
    const reader = R.asks((env: Env) => env.val * 2);
    expect(reader({ val: 21 })).toBe(42);
  });

  test('map', () => {
    const reader = R.map((n: number) => n * 2)(R.of<Env, number>(21));
    expect(reader({ val: 0 })).toBe(42);
  });

  test('chain', () => {
    const reader = R.chain((n: number) => R.of(n * 2))(R.of<Env, number>(21));
    expect(reader({ val: 0 })).toBe(42);
  });

  test('local', () => {
    const reader = R.local((n: number) => ({ val: n }))(R.asks((env: Env) => env.val));
    expect(reader(42)).toBe(42);
  });

  test('ap', () => {
    const fab = R.of<Env, (n: number) => number>((n) => n * 2);
    const fa = R.of<Env, number>(21);
    const reader = R.ap(fa)(fab);
    expect(reader({ val: 0 })).toBe(42);
  });

  test('chainRight', () => {
    const ra = R.of<Env, string>('a');
    const rb = R.of<Env, number>(42);
    const reader = R.chainRight(rb)(ra);
    expect(reader({ val: 0 })).toBe(42);
  });

  test('chainLeft', () => {
    const ra = R.of<Env, number>(42);
    const rb = R.of<Env, string>('a');
    const reader = R.chainLeft(rb)(ra);
    expect(reader({ val: 0 })).toBe(42);
  });

  test('prop', () => {
    const reader = R.prop<Env, 'val'>('val');
    expect(reader({ val: 42 })).toBe(42);
  });

  test('Do', () => {
    const reader = R.chain(() => R.of(42))(R.Do<Env>());
    expect(reader({ val: 0 })).toBe(42);
  });

  test('tap', () => {
    // eslint-disable-next-line functional/no-let
    let sideEffect = 0;
    const reader = R.tap<Env, number>((n) => (sideEffect = n))(R.of(42));
    expect(reader({ val: 0 })).toBe(42);
    expect(sideEffect).toBe(42);
  });

  test('pipe', () => {
    const reader = R.pipe(
      R.of<Env, number>(21),
      R.map((n) => n * 2),
    );
    expect(reader({ val: 0 })).toBe(42);
  });
});
