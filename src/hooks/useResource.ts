import { isDemoMode } from '../lib/mode';
import { useCallback, useEffect, useState } from 'react';

/** Ignores late reads after navigation/retry; callers memoize the loader. */
export function useResource<T>(load: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => setRevision(value => value + 1), []);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    load().then(value => { if (active) setData(value); }).catch(() => {
      if (active) setError(isDemoMode() ? 'Local demo data could not be loaded. Retry or use Reset demo.' : 'Unable to load data. Check your connection and Supabase setup, then retry.');
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [load, revision]);
  return { data, loading, error, refresh };
}
