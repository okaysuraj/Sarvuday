import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { createApi, apiErrorMessage } from '../../shared/api.ts';
import { legacyRoutes, resolveLegacyRoute } from '../../mobile/src/navigation/legacy-routes.ts';
import { root } from '../tooling.mjs';

test('typed requests preserve cancellation, query parameters and request bodies', async () => {
  const requests = [];
  const api = createApi({
    request: async (config) => {
      requests.push(config);
      return { data: { id: 'saved' } };
    },
  });
  const controller = new AbortController();
  assert.deepEqual(
    await api.post('/assessments/score/phq9', {
      body: { responses: [{ question_id: 1, selected_option_score: 0 }] },
    }),
    { id: 'saved' },
  );
  await api.get('/user/tracking/mood/history', {
    query: { limit: 20 },
    signal: controller.signal,
    silent: true,
  });
  await api.patch('/user/tracking/goals/{goal_id}/increment', { path: { goal_id: 'opaque/id' } });
  assert.deepEqual(requests[0].data, { responses: [{ question_id: 1, selected_option_score: 0 }] });
  assert.equal(requests[1].signal, controller.signal);
  assert.deepEqual(requests[1].params, { limit: 20 });
  assert.equal(requests[1].silent, true);
  assert.equal(requests[2].url, '/user/tracking/goals/opaque%2Fid/increment');
  await assert.rejects(
    api.patch('/user/tracking/goals/{goal_id}/increment'),
    /Missing API path parameter/,
  );
});

test('both apps show the same useful error messages', () => {
  assert.equal(
    apiErrorMessage({ response: { data: { detail: [{ msg: 'Answer every question' }] } } }),
    'Answer every question',
  );
  assert.equal(apiErrorMessage({ response: { data: { detail: 'Not allowed' } } }), 'Not allowed');
  assert.equal(apiErrorMessage(null), 'Unable to reach the server. Please try again.');
});

test('every retired URL redirects to an existing canonical screen and retains query values', () => {
  for (const [source, destination] of Object.entries(legacyRoutes)) {
    const input = source.replaceAll('[id]', 'session-123') + '?id=session-123&note=a%26b';
    const target = resolveLegacyRoute(input);
    assert.equal(
      target,
      destination.replaceAll('[id]', 'session-123') + '?id=session-123&note=a%26b',
      source,
    );
    const file = resolve(root, 'mobile/src/app', destination.slice(1) + '.tsx');
    assert.ok(existsSync(file), `Missing destination for ${source}: ${destination}`);
    assert.equal(resolveLegacyRoute(target), null, `Redirect cycle for ${source}`);
  }
  assert.equal(
    resolveLegacyRoute('mobile://patient/mood_check_in?emotions=calm'),
    '/tracking/mood-check-in?emotions=calm',
  );
  assert.equal(
    resolveLegacyRoute('exp://127.0.0.1:8081/--/patient/mood_check_in'),
    '/tracking/mood-check-in',
  );
  assert.equal(resolveLegacyRoute('/session/video/session-123'), '/call/session-123');
  assert.equal(resolveLegacyRoute('/patient/video_call'), null);
  assert.equal(resolveLegacyRoute('/unknown'), null);
  assert.equal(resolveLegacyRoute('/patient/%ZZ'), null);
});

test('all six primary tabs have actual route files', () => {
  const directory = resolve(root, 'mobile/src/app/(tabs)');
  const layout = readFileSync(resolve(directory, '_layout.tsx'), 'utf8');
  const declared = [...layout.matchAll(/<Tabs\.Screen\s+name="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(declared.length, 6);
  for (const name of declared) {
    assert.ok(existsSync(resolve(directory, `${name}.tsx`)), `Missing tab route: ${name}`);
  }
});
