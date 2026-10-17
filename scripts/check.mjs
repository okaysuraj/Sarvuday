// One repeatable check; all database writes are confined to a disposable container.
import { randomBytes } from 'node:crypto';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { generateApi } from './generate-api.mjs';
import { backend, npm, python, root, run } from './tooling.mjs';

async function checkBackend() {
  const name = `sarvuday-check-${process.pid}`;
  const password = randomBytes(16).toString('hex');
  let started = false;
  try {
    run(
      'docker',
      [
        'run',
        '--detach',
        '--name',
        name,
        '--publish',
        '127.0.0.1::5432',
        '--env',
        `POSTGRES_PASSWORD=${password}`,
        '--env',
        'POSTGRES_DB=sarvuday_check',
        'postgres:17-alpine',
      ],
      { stdio: ['ignore', 'pipe', 'inherit'] },
    );
    started = true;
    let ready = false;
    for (let attempt = 0; attempt < 30; attempt++) {
      try {
        run('docker', ['exec', name, 'pg_isready', '-U', 'postgres'], { stdio: 'ignore' });
        ready = true;
        break;
      } catch {
        await delay(1000);
      }
    }
    if (!ready) throw new Error('The disposable PostgreSQL instance did not become ready.');
    const binding = run('docker', ['port', name, '5432/tcp'], {
      stdio: ['ignore', 'pipe', 'inherit'],
      encoding: 'utf8',
    }).trim();
    const port = binding.split(':').at(-1);
    run(python, ['-m', 'unittest', 'discover', '-s', 'tests', '-q'], {
      cwd: backend,
      env: {
        ...process.env,
        SARVUDAY_TEST_DATABASE_URL: `postgresql://postgres:${password}@127.0.0.1:${port}/sarvuday_check`,
      },
    });
  } finally {
    if (started) run('docker', ['rm', '--force', '--volumes', name], { stdio: 'ignore' });
  }
}

try {
  console.log('Checking generated API types…');
  await generateApi({ check: true });
  console.log('Checking API formatting and route compatibility…');
  const tests = readdirSync(resolve(root, 'scripts/tests')).filter((file) =>
    file.endsWith('.test.mjs'),
  );
  run(process.execPath, [
    '--experimental-strip-types',
    '--test',
    ...tests.map((file) => resolve(root, 'scripts/tests', file)),
  ]);
  console.log('Checking migrations and critical backend workflows…');
  await checkBackend();
  for (const [app, script] of [
    ['frontend', 'lint'],
    ['frontend', 'build'],
    ['mobile', 'typecheck'],
  ]) {
    console.log(`Checking ${app}: ${script}…`);
    npm(['run', script], resolve(root, app));
  }
  if (process.argv.includes('--full')) {
    console.log('Exporting the Android, iOS and Expo web clients…');
    npm(
      ['exec', '--', 'expo', 'export', '--platform', 'all', '--output-dir', 'dist/check'],
      resolve(root, 'mobile'),
    );
  }
  console.log('All repository checks passed.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
