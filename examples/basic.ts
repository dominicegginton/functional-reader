import { pipe, of, map, chain } from '../src';

/**
 * Basic example showing how to create and compose Readers.
 */

const getGreeting = (name: string) => of(`Hello, ${name}`);

const shout = (msg: string) => `${msg.toUpperCase()}!`;

const welcome = (name: string) =>
  pipe(
    getGreeting(name),
    map(shout),
    chain((msg) => of(`${msg} Welcome to functional-reader.`)),
  );

const result = welcome('World')({});

console.log(result); // HELLO, WORLD! Welcome to functional-reader.
