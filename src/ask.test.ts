import { ask } from './ask';

describe('ask', () => {
  test('returns the entire environment', () => {
    const reader = ask<{ val: number }>();
    expect(reader({ val: 42 })).toEqual({ val: 42 });
  });
});
