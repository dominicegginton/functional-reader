import {
  pipe,
  flow,
  of,
  ask,
  asks,
  asksReader,
  flatten,
  map,
  chain,
  local,
  ap,
  chainRight,
  chainLeft,
  prop,
  Do,
  bindTo,
  bind,
  tap,
  sequence,
  struct,
  iif,
  Reader,
} from '../src';

/**
 * A comprehensive example demonstrating every utility in functional-reader.
 */

// --- Types ---

interface Logger {
  readonly log: (msg: string) => void;
}

interface Config {
  readonly env: 'dev' | 'prod';
  readonly version: string;
}

interface Database {
  readonly getUsers: () => Promise<readonly string[]>;
}

interface AppEnv {
  readonly logger: Logger;
  readonly config: Config;
  readonly db: Database;
}

// --- 1. Construction & Extraction ---

const getLogger = prop<AppEnv, 'logger'>('logger');
const getConfig = asks((env: AppEnv) => env.config);
const getFullEnv = ask<AppEnv>();

// --- 2. Functional Utilities ---

const formatMsg = flow(
  (msg: string) => msg.trim(),
  (msg: string) => `[APP] ${msg}`,
);

const log = (msg: string): Reader<AppEnv, void> =>
  asksReader((env: AppEnv) => {
    env.logger.log(formatMsg(msg));
    return of(undefined);
  });

// --- 3. Advanced Sequencing & Branching ---

const checkEnv = iif(
  (env: AppEnv) => env.config.env === 'prod',
  of('Production'),
  of('Development'),
);

const fetchUsers = asks((env: AppEnv) => env.db.getUsers());

// --- 4. Combinators ---

const getSystemStats = struct({
  version: pipe(
    getConfig,
    map((c) => c.version),
  ),
  mode: checkEnv,
  checks: sequence([of('db:ok'), of('cache:ok')]),
});

// --- 5. The Main Workflow (Do-notation & Applicative) ---

const processRequest = (requestId: string) =>
  pipe(
    Do<AppEnv>(),
    // Use tap for side effects
    tap((_, env) => log(`Starting request ${requestId}`)(env)),
    // Use bind to collect results
    bind('stats', () => getSystemStats),
    // Use bindTo for simple wrapping
    bind('id', () => bindTo('value')(of(requestId))),
    // Use ask to get everything
    bind('env', () => getFullEnv),
    // Use fetchUsers
    bind('users', () => fetchUsers),
    // Use ap for applicative style
    bind('message', ({ stats }) =>
      pipe(
        of((v: string) => `System is in ${v} mode (v${stats.version})`),
        ap(of(stats.mode)),
      ),
    ),
    // Use flatten to demonstrate collapsing
    chain((state) => flatten(of(of(state)))),
    // Use chainRight to move to the next operation ignoring previous result
    chainRight(asks((env: AppEnv) => `Finished ${requestId} on ${env.config.env}`)),
  );

// --- 6. Environment Adaptation ---

interface GlobalEnv {
  readonly services: AppEnv;
}

const main = (reqId: string): Reader<GlobalEnv, string> =>
  pipe(
    processRequest(reqId),
    // Use local to adapt the environment
    local((global: Readonly<GlobalEnv>) => global.services),
    // Satisfy the unused getLogger and use chainLeft
    chainLeft(
      pipe(
        local((g: Readonly<GlobalEnv>) => g.services)(getLogger),
        map(() => 'unused'),
      ),
    ),
  );

// --- Execution ---

const mockEnv: GlobalEnv = {
  services: {
    logger: { log: (msg) => console.log(msg) },
    config: { env: 'dev', version: '2.1.0' },
    db: { getUsers: () => Promise.resolve(['Alice', 'Bob']) },
  },
};

const run = async () => {
  console.log('--- Starting Full Example ---');
  const result = await main('req-123')(mockEnv);
  console.log('Final Result:', result);
};

run().catch(console.error);
