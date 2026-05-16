import { asksReader, of } from '../../src';

/**
 * `asksReader` creates a Reader that selects a part of the environment
 * and returns a new Reader which is then executed with the same environment.
 */

interface Env {
  readonly prefix: string;
}

const reader = asksReader((env: Env) => of(`${env.prefix}: hello`));

console.log(reader({ prefix: 'LOG' })); // LOG: hello
