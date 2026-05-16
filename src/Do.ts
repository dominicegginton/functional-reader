import { Reader } from './reader';
import { of } from './of';

/**
 * Initializes a "Do" block for chainable compositions using an object to store intermediate results.
 */
export const Do = <Env>(): Reader<Env, Record<string, never>> => of({});
