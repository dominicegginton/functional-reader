import { iif, of } from '../../src';

interface Env {
  readonly isProduction: boolean;
}

const getLogger = iif(
  (env: Readonly<Env>) => env.isProduction,
  of('Production Logger'),
  of('Debug Logger'),
);

console.log(getLogger({ isProduction: true })); // Production Logger
console.log(getLogger({ isProduction: false })); // Debug Logger
