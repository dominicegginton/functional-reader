import { traverse } from './traverse';
import { of } from './of';

describe('traverse', () => {
  it('should map over an array with readers and return a reader of an array', () => {
    const f = (n: number) => of(n * 2);
    const reader = traverse(f)([1, 2, 3]);
    const result = reader({});
    expect(result).toEqual([2, 4, 6]);
  });
});
