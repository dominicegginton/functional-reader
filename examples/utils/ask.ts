import { ask } from '../../src';

/**
 * `ask` creates a Reader that returns the entire environment.
 */

interface Env {
  readonly apiUrl: string;
}

const reader = ask<Env>();

const env: Env = { apiUrl: 'https://api.example.com' };

console.log(reader(env)); // { apiUrl: 'https://api.example.com' }
