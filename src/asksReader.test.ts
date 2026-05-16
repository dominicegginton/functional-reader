import { of } from './of';
import { asksReader } from './asksReader';

describe('asksReader', () => {
  test('selects a part of the environment and returns a new Reader', () => {
    const reader = asksReader((env: { readonly val: number }) => of(env.val * 2));
    expect(reader({ val: 21 })).toBe(42);
  });
});
