import { prop } from './prop';

describe('prop', () => {
  test('extracts a property from the environment', () => {
    const reader = prop<{ val: number }, 'val'>('val');
    expect(reader({ val: 42 })).toBe(42);
  });
});
