import { bindTo } from './bindTo';
import { of } from './of';

describe('bindTo', () => {
  test('wraps a Reader result into a record', () => {
    const reader = bindTo('foo')(of<{ val: number }, number>(42));
    expect(reader({ val: 0 })).toEqual({ foo: 42 });
  });
});
