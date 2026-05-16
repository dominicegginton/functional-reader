import { defer, of } from '../../src';

/**
 * `defer` creates a Reader that is lazily initialized when it is called.
 */

const reader = defer(() => {
  console.log('Initializing reader...');
  return of(1);
});

console.log('Before calling reader');
console.log(reader({}));
