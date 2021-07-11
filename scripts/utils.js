import chalk from 'chalk';

export const generateSourceMap = process.env.OMIT_SOURCEMAP !== 'true';

export const logMessage = (message, level = 'info') => {
  const color =
    level === 'error'
      ? 'red'
      : level === 'warning'
      ? 'yellow'
      : level === 'info'
      ? 'blue'
      : 'white';

  const log = (m) =>
    console.log(
      `[${new Date().toISOString()}]`,
      chalk[color](typeof m === 'string' ? m : JSON.stringify(m, null, 4))
    );

  return Array.isArray(message) ? message.forEach((m) => log(m)) : log(message);
};

export const compilerPromise = (name, compiler) =>
  new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling `);
    });
    compiler.hooks.done.tap(name, (stats) => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return reject(new Error(`Failed to compile ${name}`));
    });
  });
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const clientOnly = () => process.argv.includes('--client-only');

export const noStream = () => process.argv.includes('--no-stream');

export default {
  clientOnly,
  compilerPromise,
  generateSourceMap,
  logMessage,
  sleep,
};
