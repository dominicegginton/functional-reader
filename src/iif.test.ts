import { iif } from './iif';
import { of } from './of';

describe('iif', () => {
  test('conditionally chooses between two Readers', () => {
    const onTrue = of<{ readonly val: number }, string>('true');
    const onFalse = of<{ readonly val: number }, string>('false');
    const reader = iif((env: { readonly val: number }) => env.val > 0, onTrue, onFalse);

    expect(reader({ val: 1 })).toBe('true');
    expect(reader({ val: -1 })).toBe('false');
  });
});
