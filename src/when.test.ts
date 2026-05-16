import { when } from './when';
import { of } from './of';

describe('when', () => {
  it('should return result if predicate is true', () => {
    const reader = when((env: { readonly run: boolean }) => env.run, of(1));
    expect(reader({ run: true })).toBe(1);
  });

  it('should return undefined if predicate is false', () => {
    const reader = when((env: { readonly run: boolean }) => env.run, of(1));
    expect(reader({ run: false })).toBeUndefined();
  });
});
