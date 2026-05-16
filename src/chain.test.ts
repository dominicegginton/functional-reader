import { chain, compose } from './chain';
import { of } from './of';

describe('chain', () => {
  test('sequences two Readers', () => {
    const reader = chain((n: number) => of(n * 2))(of<{ val: number }, number>(21));
    expect(reader({ val: 0 })).toBe(42);
  });

  test('compose is an alias for chain', () => {
    expect(compose).toBe(chain);
  });
});
