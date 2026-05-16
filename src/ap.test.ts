import { ap } from './ap';
import { of } from './of';

describe('ap', () => {
  test('applies a function contained within a Reader to a value contained within another Reader', () => {
    const fab = of<{ val: number }, (n: number) => number>((n) => n * 2);
    const fa = of<{ val: number }, number>(21);
    const reader = ap(fa)(fab);
    expect(reader({ val: 0 })).toBe(42);
  });
});
