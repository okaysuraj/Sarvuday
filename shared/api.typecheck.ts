// These failures are intentional: contract drift must fail the repository check.
import { createApi, type ApiTransport } from './api';

declare const transport: ApiTransport;
const api = createApi(transport);
void api.post('/user/tracking/sleep', { body: { date: '2026-10-18', duration_hours: 8 } });
void api.post('/assessments/score/phq9', {
  body: { responses: [{ question_id: 1, selected_option_score: 0 }] },
});
// @ts-expect-error The backend expects responses, not answers.
void api.post('/assessments/score/phq9', { body: { answers: [] } });
// @ts-expect-error Unknown endpoints cannot be called through the shared client.
void api.get('/missing-endpoint');
// @ts-expect-error A medication toggle needs its path ID.
void api.patch('/user/tracking/medications/{med_id}/toggle');
// @ts-expect-error Sleep duration must be numeric.
void api.post('/user/tracking/sleep', { body: { duration_hours: '8' } });
