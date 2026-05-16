import { local } from './local';
import { asks } from './asks';

describe('local', () => {
  test('adapts a Reader to a different environment type', () => {
    const reader = local((n: number) => ({ val: n }))(
      asks((env: { readonly val: number }) => env.val),
    );
    expect(reader(42)).toBe(42);
  });
});
