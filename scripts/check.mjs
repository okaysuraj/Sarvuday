// Verify the API contract and client builds without databases or test fixtures.
import { resolve } from 'node:path';
import { generateApi } from './generate-api.mjs';
import { npm, root } from './tooling.mjs';

try {
  console.log('Checking generated API types…');
  await generateApi({ check: true });
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
