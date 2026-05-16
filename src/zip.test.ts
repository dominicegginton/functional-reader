import { zip } from './zip';
import { of } from './of';
import { pipe } from './pipe';

describe('zip', () => {
  it('should combine two readers into a tuple', () => {
    const reader = pipe(of(1), zip(of('a')));
    const result = reader({});
    expect(result).toEqual([1, 'a']);
  });

  it('should work with environments', () => {
    const r1 = (env: { readonly a: number }) => env.a;
    const r2 = (env: { readonly b: string }) => env.b;
    const reader = pipe(r1, zip(r2));
    const result = reader({ a: 1, b: 'foo' });
    expect(result).toEqual([1, 'foo']);
  });
});
