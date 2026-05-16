import { chainLeft } from './chainLeft';
import { of } from './of';

describe('chainLeft', () => {
  test('sequences two Readers and returns the result of the first one', () => {
    const ra = of<{ val: number }, number>(42);
    const rb = of<{ val: number }, string>('a');
    const reader = chainLeft(rb)(ra);
    expect(reader({ val: 0 })).toBe(42);
  });
});
