import { pipe } from './pipe';
import { of } from './of';
import { map } from './map';

describe('pipe', () => {
  test('pipes a value through a series of functions', () => {
    const reader = pipe(
      of<{ val: number }, number>(21),
      map((n) => n * 2),
    );
    expect(reader({ val: 0 })).toBe(42);
  });
});
