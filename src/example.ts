import {
  Reader,
  of,
  ask,
  asks,
  asksReader,
  map,
  chain,
  compose,
  flatten,
  local,
  ap,
  chainRight,
  chainLeft,
  prop,
  Do,
  bind,
  bindTo,
  tap,
  pipe,
  flow,
  sequence,
  struct,
} from './index';

interface Logger {
  readonly log: (message: string) => void;
}

interface Config {
  readonly apiUrl: string;
  readonly version: string;
}

interface User {
  readonly id: number;
  readonly role: 'admin' | 'user';
}

interface Env {
  readonly logger: Logger;
  readonly config: Config;
  readonly currentUser?: User;
}

const getLogger = prop<Env, 'logger'>('logger');
const logMessage =
  (msg: string): Reader<Logger, void> =>
    (l) =>
      l.log(msg);
const logWithEnv = (msg: string): Reader<Env, void> => pipe(logMessage(msg), local(getLogger));

const formatVersion = flow(
  (v: string) => v.split('.'),
  (parts) => `v${parts[0]} (major)`,
);

const getApiEndpoint = asks((env: Env) => `${env.config.apiUrl}/v1`);

const authorize = (requiredRole: 'admin' | 'user'): Reader<Env, boolean> =>
  asksReader((env: Env) => of(env.currentUser?.role === requiredRole));

const getDebugInfo = pipe(
  ask<Env>(),
  map((env) => `[DEBUG] Env: version=${env.config.version} user=${env.currentUser?.id ?? 'none'}`),
);

const getSystemStatus = struct<Env, {
  readonly endpoint: Reader<Env, string>;
  readonly version: Reader<Env, string>;
  readonly checks: Reader<Env, ReadonlyArray<string>>;
}>({
  endpoint: getApiEndpoint,
  version: asks((env: Env) => formatVersion(env.config.version)),
  checks: sequence([of('db:ok'), of('cache:ok')]),
});

const processUserTask = (taskId: string): Reader<Env, unknown> =>
  pipe(
    Do<Env>(),
    bind('isAdmin', () => authorize('admin')),
    chain(
      ({ isAdmin }) =>
        (!isAdmin
          ? pipe(
            logWithEnv(`Unauthorized access attempt on task ${taskId}`),
            chainRight(of('Access Denied')),
          )
          : pipe(
            Do<Env>(),
            bind('status', () => getSystemStatus),
            bind('user', () => asks((env: Env) => env.currentUser)),
            tap(({ user }) => console.log(`[DEBUG] Processing for user ${user?.id}`)),
            map(
              ({ status }) =>
                `Task ${taskId} processed at ${status.endpoint} (${status.version})`,
            ),
            chainLeft(logWithEnv(`Task ${taskId} successful`)),
            bindTo('response'),
            (nested) => flatten(of(nested)),
            compose((res: { readonly response: string }) =>
              pipe(
                of((r: typeof res) => ({ ...r, timestamp: Date.now() })),
                ap(of(res)),
              ),
            ),
          )) as Reader<Env, unknown>,
    ),
  );

const baseEnv: Env = {
  logger: { log: (msg: string) => console.log(`[LOG] ${msg}`) },
  config: { apiUrl: 'https://api.example.com', version: '2.4.0' },
};

const adminEnv: Env = {
  ...baseEnv,
  currentUser: { id: 1, role: 'admin' },
};

const userEnv: Env = {
  ...baseEnv,
  currentUser: { id: 2, role: 'user' },
};

console.log('--- Functional Reader: Comprehensive Task Example ---');

console.log('\n--- Debug Info (ask) ---');
console.log(getDebugInfo(adminEnv));

console.log('\n--- System Status (Struct/Sequence) ---');
console.log(getSystemStatus(adminEnv));

console.log('\n--- Path 1: Admin User (Success) ---');
console.log('Result:', JSON.stringify(processUserTask('TRK-101')(adminEnv), null, 2));

console.log('\n--- Path 2: Regular User (Denied) ---');
console.log('Result:', processUserTask('TRK-102')(userEnv));

console.log('\n--- Path 3: Unauthenticated (Denied) ---');
console.log('Result:', processUserTask('TRK-103')(baseEnv));
