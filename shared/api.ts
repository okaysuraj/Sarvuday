// Shared contract and request formatting. Each app keeps its own authenticated transport.
import type { paths } from './api-types';

type Method = 'get' | 'post' | 'patch' | 'delete';
type Route<M extends Method> = {
  [P in keyof paths]: M extends keyof paths[P]
    ? paths[P][M] extends { responses: unknown }
      ? P
      : never
    : never;
}[keyof paths];
type Operation<M extends Method, P extends Route<M>> = M extends keyof paths[P]
  ? paths[P][M]
  : never;
type Json<T> = T extends { content: { 'application/json': infer Value } } ? Value : unknown;
type Success<T> = T extends { responses: infer R }
  ? Json<R[Extract<keyof R, 200 | 201 | 202 | 204>]>
  : unknown;
type Parameters<T> = T extends { parameters: infer P } ? P : never;
type PathOptions<T> = Parameters<T> extends { path: infer P } ? { path: P } : { path?: never };
type QueryOptions<T> =
  Parameters<T> extends { query: infer Q }
    ? { query: Q }
    : Parameters<T> extends { query?: infer Q }
      ? { query?: Q }
      : { query?: never };
type BodyOptions<T> = T extends { requestBody: infer B }
  ? { body: Json<B> }
  : T extends { requestBody?: infer B }
    ? { body?: Json<B> }
    : { body?: never };
type Options<T> = PathOptions<T> &
  QueryOptions<T> &
  BodyOptions<T> & {
    signal?: AbortSignal;
    silent?: boolean;
  };
type Arguments<T> = {} extends Options<T> ? [options?: Options<T>] : [options: Options<T>];

interface RequestOptions {
  path?: Record<string, string | number>;
  query?: Record<string, unknown>;
  body?: unknown;
  signal?: AbortSignal;
  silent?: boolean;
}

export interface ApiTransport {
  request<T>(config: {
    method: Method;
    url: string;
    data?: unknown;
    params?: unknown;
    signal?: AbortSignal;
    silent?: boolean;
  }): Promise<{ data: T }>;
}

export function createApi(transport: ApiTransport) {
  function method<M extends Method>(verb: M) {
    return async function request<P extends Route<M>>(
      route: P,
      ...args: Arguments<Operation<M, P>>
    ): Promise<Success<Operation<M, P>>> {
      const options = (args[0] || {}) as RequestOptions;
      const url = route.replace(/\{([^}]+)\}/g, (_, name: string) => {
        const value = options.path?.[name];
        if (value == null) throw new Error(`Missing API path parameter: ${name}`);
        return encodeURIComponent(String(value));
      });
      const response = await transport.request<Success<Operation<M, P>>>({
        method: verb,
        url,
        data: options.body,
        params: options.query,
        signal: options.signal,
        silent: options.silent,
      });
      return response.data;
    };
  }
  return {
    get: method('get'),
    post: method('post'),
    patch: method('patch'),
    delete: method('delete'),
  };
}

export function apiErrorMessage(error: unknown): string {
  const failure = (error || {}) as {
    userMessage?: string;
    message?: string;
    response?: { data?: { detail?: unknown; message?: unknown } };
  };
  const detail = failure.response?.data?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item: { msg?: string }) => item.msg)
      .filter(Boolean)
      .join('. ');
  }
  if (typeof failure.response?.data?.message === 'string') return failure.response.data.message;
  if (failure.userMessage) return failure.userMessage;
  return failure.response
    ? 'The request could not be completed.'
    : 'Unable to reach the server. Please try again.';
}
