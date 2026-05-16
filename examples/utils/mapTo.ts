import { mapTo, of, pipe } from '../../src';

/**
 * `mapTo` maps the result of a Reader to a constant value.
 */

const reader = pipe(of(123), mapTo('Success'));

console.log(reader({})); // 'Success'
