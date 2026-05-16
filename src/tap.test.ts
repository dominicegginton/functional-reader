import { tap } from './tap';
import { of } from './of';

describe('tap', () => {
  test('performs a side effect without changing the result', () => {
    // eslint-disable-next-line functional/no-let
    let sideEffect = 0;
    const reader = tap<{ val: number }, number>((n) => (sideEffect = n))(of(42));
    expect(reader({ val: 0 })).toBe(42);
    expect(sideEffect).toBe(42);
  });
});
