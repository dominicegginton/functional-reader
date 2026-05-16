import { defer } from './defer';
import { of } from './of';

describe('defer', () => {
  it('should lazily initialize the reader', () => {
    const factory = jest.fn(() => of(1));
    const reader = defer(factory);
    expect(factory).not.toHaveBeenCalled();
    const result = reader({});
    expect(result).toBe(1);
    expect(factory).toHaveBeenCalled();
  });
});
