import { sequence } from './sequence';
import { of } from './of';

describe('sequence', () => {
  test('combines an array of Readers', () => {
    const reader = sequence([of(1), of(2), of(3)]);
    expect(reader({ val: 0 })).toEqual([1, 2, 3]);
  });
});
