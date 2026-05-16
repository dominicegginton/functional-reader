import { of } from './of';

describe('of', () => {
  test('returns the provided value', () => {
    const reader = of<{ val: number }, number>(42);
    expect(reader({ val: 0 })).toBe(42);
  });
});
