import { struct } from './struct';
import { of } from './of';

describe('struct', () => {
  test('combines an object of Readers', () => {
    const reader = struct({
      a: of(1),
      b: of('foo'),
    });
    expect(reader({ val: 0 })).toEqual({ a: 1, b: 'foo' });
  });
});
