import { alt } from './alt';
import { of } from './of';
import { pipe } from './pipe';

describe('alt', () => {
  it('should return primary result if not null/undefined', () => {
    const reader = pipe(of(1), alt(of(2)));
    expect(reader({})).toBe(1);
  });

  it('should return secondary result if primary is null', () => {
    const reader = pipe(of(null), alt(of(2)));
    expect(reader({})).toBe(2);
  });

  it('should return secondary result if primary is undefined', () => {
    const reader = pipe(of(undefined), alt(of(2)));
    expect(reader({})).toBe(2);
  });
});
