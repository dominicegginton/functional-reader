import { flow } from './flow';

describe('flow', () => {
  test('composes multiple functions into a single function', () => {
    const f = flow(
      (n: number) => n * 2,
      (n: number) => n + 2,
    );
    expect(f(20)).toBe(42);
  });
});
