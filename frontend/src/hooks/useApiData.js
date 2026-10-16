import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

// Keep request identity stable with a URL string; cancel work when a screen leaves.
export default function useApiData(url) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ data: null, loading: true, error: '' });
  const retry = useCallback(() => setAttempt(value => value + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    if (!url) {
      setState({ data: null, loading: false, error: '' });
      return () => controller.abort();
    }
    setState({ data: null, loading: true, error: '' });
    axiosInstance.get(url, { signal: controller.signal, silent: true })
      .then(({ data }) => {
        if (!controller.signal.aborted) setState({ data, loading: false, error: '' });
      })
      .catch(error => {
        if (!controller.signal.aborted) setState({ data: null, loading: false, error: error.userMessage || 'Unable to load this information.' });
      });
    return () => controller.abort();
  }, [url, attempt]);
  return { ...state, retry };
}
