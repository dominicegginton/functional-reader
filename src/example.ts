import {
  Reader,
  of,
  ask,
  asks,
  map,
  chain,
  local,
  compose,
  ap,
  chainRight,
  chainLeft,
  prop,
  Do,
  tap,
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

const logWithEnv = (msg: string): Reader<Env, void> => local(getLogger, logMessage(msg));

const getGreeting = chain(isBetaEnabled, (enabled) =>
  enabled ? of('Welcome to the Beta experience!') : of('Welcome back!'),
);

const authorize = (requiredRole: 'admin' | 'user'): Reader<Env, boolean> =>
  asks((env) => env.currentUser?.role === requiredRole);

const debugEnv = map(ask<Env>(), (env) => `Debug Info: version ${env.config.version}`);

const getStatusReport = ap(
  of((ver: string) => (ep: string) => `System ${ver} connected to ${ep}`),
  asks((e: Env) => e.config.version),
);
const fullStatus = ap(getStatusReport, getApiEndpoint);

const processUserTask = (taskId: string) =>
  chain(Do<Env>(), () =>
    chain(authorize('admin'), (isAdmin) => {
      if (!isAdmin) {
        return chainRight(
          logWithEnv(`Unauthorized access attempt on task ${taskId}`),
          of('Access Denied'),
        );
      }

      return compose(
        tap<Env, unknown>((_, env) => env.logger.log(`Logging via tap for task ${taskId}`))(
          logWithEnv(`Processing admin task: ${taskId}`),
        ),
        () =>
          chain(getGreeting, (greeting) =>
            chainRight(
              logWithEnv(`Greeting sent: ${greeting}`),
              chainLeft(
                map(
                  getApiEndpoint,
                  (endpoint) => `Task ${taskId} processed via ${endpoint} (${greeting})`,
                ),
                logWithEnv('Task processing completed successfully'),
              ),
            ),
          ),
      );
    }),
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
