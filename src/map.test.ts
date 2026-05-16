import { map } from './map';
import { of } from './of';

describe('map', () => {
  test('transforms the result of a Reader', () => {
    const reader = map((n: number) => n * 2)(of<{ val: number }, number>(21));
    expect(reader({ val: 0 })).toBe(42);
  });
});
