import { of, when } from '../../src';

/**
 * `when` conditionally executes a Reader based on the environment.
 */

const reader = when((env: { readonly debug: boolean }) => env.debug, of('Debug mode is ON'));

console.log(reader({ debug: true })); // 'Debug mode is ON'
console.log(reader({ debug: false })); // undefined
