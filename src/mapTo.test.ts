import { mapTo } from './mapTo';
import { of } from './of';
import { pipe } from './pipe';

describe('mapTo', () => {
  it('should map the result to a constant value', () => {
    const reader = pipe(of(1), mapTo('a'));
    expect(reader({})).toBe('a');
  });
});
