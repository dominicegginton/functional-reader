import {
  Reader,
  of,
  ask,
  asks,
  map,
  chain,
  local,
  ap,
  chainRight,
  chainLeft,
  prop,
  Do,
  tap,
  pipe,
} from './index';

interface Logger {
  readonly log: (message: string) => void;
}

interface Config {
  readonly apiUrl: string;
  readonly version: string;
  readonly features: {
    readonly enableBeta: boolean;
  };
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
const getApiEndpoint = asks((env: Env) => `${env.config.apiUrl}/users`);
const isBetaEnabled = asks((env: Env) => env.config.features.enableBeta);

const logMessage =
  (msg: string): Reader<Logger, void> =>
    (l: Logger) =>
      l.log(msg);

const logWithEnv = (msg: string): Reader<Env, void> => pipe(logMessage(msg), local(getLogger));

const getGreeting = pipe(
  isBetaEnabled,
  chain((enabled) => (enabled ? of('Welcome to the Beta experience!') : of('Welcome back!'))),
);

const authorize = (requiredRole: 'admin' | 'user'): Reader<Env, boolean> =>
  asks((env) => env.currentUser?.role === requiredRole);

const debugEnv = pipe(
  ask<Env>(),
  map((env) => `Debug Info: version ${env.config.version}`),
);

const getStatusReport = pipe(
  of((ver: string) => (ep: string) => `System ${ver} connected to ${ep}`),
  ap(asks((e: Env) => e.config.version)),
);
const fullStatus = pipe(getStatusReport, ap(getApiEndpoint));

const processUserTask = (taskId: string) =>
  pipe(
    Do<Env>(),
    chain(() =>
      pipe(
        authorize('admin'),
        chain((isAdmin) =>
          !isAdmin
            ? pipe(
              logWithEnv(`Unauthorized access attempt on task ${taskId}`),
              chainRight(of('Access Denied')),
            )
            : pipe(
              logWithEnv(`Processing admin task: ${taskId}`),
              tap<Env, unknown>((_, env) => env.logger.log(`Logging via tap for task ${taskId}`)),
              chain(() =>
                pipe(
                  getGreeting,
                  chain((greeting) =>
                    pipe(
                      logWithEnv(`Greeting sent: ${greeting}`),
                      chainRight(
                        pipe(
                          getApiEndpoint,
                          map(
                            (endpoint) =>
                              `Task ${taskId} processed via ${endpoint} (${greeting})`,
                          ),
                          chainLeft(logWithEnv('Task processing completed successfully')),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
        ),
      ),
    ),
  );

const baseEnv = {
  logger: {
    log: (msg: string) => console.log(`[LOG] ${msg}`),
  },
  config: {
    apiUrl: 'https://api.example.com',
    version: '2.4.0',
    features: { enableBeta: false },
  },
};

const adminEnv: Env = {
  ...baseEnv,
  currentUser: { id: 1, role: 'admin' },
};

const userEnv: Env = {
  ...baseEnv,
  currentUser: { id: 2, role: 'user' },
};

const betaAdminEnv: Env = {
  ...adminEnv,
  config: { ...adminEnv.config, features: { enableBeta: true } },
};

console.log('--- Functional Reader: All Application Paths ---');

console.log('System Status:', fullStatus(adminEnv));
console.log(debugEnv(adminEnv));

console.log('\nPath 1: Admin User (Standard)');
console.log('Result:', processUserTask('TRK-101')(adminEnv));

console.log('\nPath 2: Regular User (Unauthorized)');
console.log('Result:', processUserTask('TRK-102')(userEnv));

console.log('\nPath 3: Admin User (Beta Feature Enabled)');
console.log('Result:', processUserTask('TRK-103')(betaAdminEnv));

console.log('\nPath 4: Unauthenticated User');
console.log('Result:', processUserTask('TRK-104')(baseEnv));
