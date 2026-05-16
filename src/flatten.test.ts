import { flatten } from './flatten';
import { of } from './of';

import { Reader } from './reader';

describe('flatten', () => {
  test('collapses a nested Reader into a single Reader', () => {
    const reader = flatten(
      of<{ readonly val: number }, Reader<{ readonly val: number }, number>>(of(42)),
    );
    expect(reader({ val: 0 })).toBe(42);
  });
});
