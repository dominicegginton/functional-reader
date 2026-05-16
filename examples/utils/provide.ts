import { ask, pipe, provide } from '../../src';

/**
 * `provide` fixes the environment for a Reader.
 */

interface Env {
  readonly apiUrl: string;
}

const getApiUrl = pipe(ask<Env>(), provide({ apiUrl: 'https://api.example.com' }));

const result = getApiUrl({});
console.log(result); // { apiUrl: 'https://api.example.com' }
