import { bindTo, of, pipe } from '../../src';

/**
 * `bindTo` wraps the result of a Reader into an object with a specified key.
 * This is often used to start a "Do" block chain.
 */

const reader = pipe(of(42), bindTo('value'));

const result = reader({});
console.log(result); // { value: 42 }
