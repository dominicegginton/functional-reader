import { asks } from './asks';

describe('asks', () => {
  test('selects a part of the environment', () => {
    const reader = asks((env: { readonly val: number }) => env.val * 2);
    expect(reader({ val: 21 })).toBe(42);
  });
});
