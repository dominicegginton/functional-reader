import { ask, asks } from '../src';

interface Env {
  apiUrl: string;
}

const getApiUrl = asks((env: Readonly<Env>) => env.apiUrl);
const getEnv = ask<Env>();

const env = { apiUrl: 'https://api.example.com' };

console.log(getApiUrl(env)); // https://api.example.com
console.log(getEnv(env)); // { apiUrl: 'https://api.example.com' }
