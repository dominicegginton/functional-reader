import { provide } from './provide';
import { ask } from './ask';
import { pipe } from './pipe';

describe('provide', () => {
  it('should provide the environment to the reader', () => {
    const reader = pipe(ask<{ foo: string }>(), provide({ foo: 'bar' }));
    const result = reader({});
    expect(result).toEqual({ foo: 'bar' });
  });
});
