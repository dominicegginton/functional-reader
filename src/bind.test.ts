import { bind } from './bind';
import { Do } from './Do';
import { of } from './of';
import { pipe } from './pipe';

describe('bind', () => {
  test('binds the result of a Reader to a key in a "Do" block', () => {
    const reader = pipe(
      Do<{ val: number }>(),
      bind('foo', () => of(42)),
      bind('bar', ({ foo }) => of(foo + 1)),
    );
    expect(reader({ val: 0 })).toEqual({ foo: 42, bar: 43 });
  });
});
