import { of } from '../src';

const reader = of(42);
console.log(reader({})); // 42
