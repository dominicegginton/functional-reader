import { prop } from '../../src';

/**
 * `prop` creates a Reader that extracts a specific property
 * from the environment.
 */

interface Env {
  readonly version: string;
}

const getVersion = prop<Env, 'version'>('version');

console.log(getVersion({ version: '1.0.0' })); // 1.0.0
