import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { apiClient } from '../api/client';

export function errorMessage(error: unknown): string {
  const detail = (error as any)?.response?.data?.detail;
  return typeof detail === 'string'
    ? detail
    : (error as Error)?.message || 'Please check your connection and try again.';
}

/** Requests exist only while a screen is visible; rapid navigation cancels stale work. */
export function useApiResource<T = any>(path: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  const reload = useCallback(() => setRevision((value) => value + 1), []);
  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();
      setLoading(!!path);
      setError(null);
      setData(null);
      if (path)
        apiClient
          .get<T>(path, { signal: controller.signal })
          .then((response) => {
            if (!controller.signal.aborted) setData(response.data);
          })
          .catch((cause) => {
            if (!controller.signal.aborted) setError(errorMessage(cause));
          })
          .finally(() => {
            if (!controller.signal.aborted) setLoading(false);
          });
      return () => controller.abort();
    }, [path, revision]),
  );
  return { data, loading, error, reload };
}
