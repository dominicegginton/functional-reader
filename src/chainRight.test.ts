import { chainRight } from './chainRight';
import { of } from './of';

describe('chainRight', () => {
  test('sequences two Readers and returns the result of the second one', () => {
    const ra = of<{ val: number }, string>('a');
    const rb = of<{ val: number }, number>(42);
    const reader = chainRight(rb)(ra);
    expect(reader({ val: 0 })).toBe(42);
  });
});
