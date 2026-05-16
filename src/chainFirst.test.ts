import { chainFirst } from './chainFirst';
import { of } from './of';
import { pipe } from './pipe';

describe('chainFirst', () => {
  it('should run the second reader but return the first result', () => {
    const sideEffect = jest.fn();
    const reader = pipe(
      of(1),
      chainFirst((a) => (env: { readonly foo: string }) => {
        sideEffect(a, env);
        return a + 1;
      }),
    );
    const env = { foo: 'bar' };
    const result = reader(env);
    expect(result).toBe(1);
    expect(sideEffect).toHaveBeenCalledWith(1, env);
  });
});
