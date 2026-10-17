// FastAPI is the source of truth; both clients consume this generated contract.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import openapiTS, { astToString } from 'openapi-typescript';
import { backend, python, root, run } from './tooling.mjs';

export async function generateApi({ check = false } = {}) {
  const schema = JSON.parse(
    run(python, ['-m', 'scripts.export_openapi'], {
      cwd: backend,
      stdio: ['ignore', 'pipe', 'inherit'],
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
    }),
  );
  const content =
    '// Generated from FastAPI. Run npm run api:generate; do not edit by hand.\n' +
    astToString(await openapiTS(schema, { alphabetize: true, defaultNonNullable: false }));
  const destination = resolve(root, 'shared/api-types.d.ts');
  if (check) {
    if (readFileSync(destination, 'utf8') !== content) {
      throw new Error('The API contract changed. Run npm run api:generate and commit the result.');
    }
  } else {
    mkdirSync(resolve(root, 'shared'), { recursive: true });
    writeFileSync(destination, content);
  }
  console.log(check ? 'API contract is current.' : 'Generated shared/api-types.d.ts.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generateApi({ check: process.argv.includes('--check') });
}
