// Shared process setup for the contract generator and repository checks.
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const backend = resolve(root, 'backend');
const localPython = resolve(
  backend,
  'venv',
  process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python',
);
export const python = process.env.PYTHON || (existsSync(localPython) ? localPython : 'python');

export function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed with exit code ${result.status}`);
  return result.stdout;
}

export function npm(args, cwd = root) {
  // npm_execpath avoids shell quoting and .cmd execution differences on Windows.
  if (!process.env.npm_execpath) throw new Error('Run this command through npm.');
  return run(process.execPath, [process.env.npm_execpath, ...args], { cwd });
}
