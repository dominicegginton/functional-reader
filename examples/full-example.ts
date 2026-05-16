import { pipe, Do, bind, asks, tap, of } from '../src';

// --- Types ---

interface Logger {
  readonly log: (msg: string) => void;
}

interface Repository {
  readonly save: (data: string) => Promise<void>;
}

interface Config {
  readonly prefix: string;
}

interface Env {
  readonly logger: Logger;
  readonly repo: Repository;
  readonly config: Config;
}

// --- Logic ---

const log = (msg: string) => asks((env: Env) => env.logger.log(`${env.config.prefix}: ${msg}`));

const saveData = (data: string) => asks((env: Env) => env.repo.save(data));

const processTask = (id: string) =>
  pipe(
    Do<Env>(),
    tap(() => log(`Starting task ${id}`)),
    bind('data', () => of(`Data for ${id}`)),
    bind('result', ({ data }) => saveData(data)),
    tap(({ data }) => log(`Finished task ${id} with data: ${data}`)),
  );

// --- Execution ---

const mockEnv: Env = {
  logger: { log: (msg) => console.log(`[LOG] ${msg}`) },
  repo: { save: (data) => Promise.resolve(console.log(`[REPO] Saved: ${data}`)) },
  config: { prefix: 'APP' },
};

processTask('123')(mockEnv);
