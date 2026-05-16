import { Do } from './Do';
import { chain } from './chain';
import { of } from './of';

describe('Do', () => {
  test('initializes a "Do" block', () => {
    const reader = chain(() => of(42))(Do<{ val: number }>());
    expect(reader({ val: 0 })).toBe(42);
  });
});
