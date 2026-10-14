import { useEffect, useState } from 'react';

/**
 * Fetch a resource from the API once on mount.
 *
 *   const { data, loading, error } = useResource(() => labs.list({ limit: 500 }));
 *
 * Returns:
 *   data    — array (for list endpoints) or object (for singletons)
 *   loading — true until the first response arrives
 *   error   — null or Error
 */
export function useResource(fetcher, deps = []) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.resolve()
      .then(fetcher)
      .then((res) => {
        if (cancelled) return;
        // list endpoints return { data, meta } — pull out the array
        // singleton endpoints return the object directly
        const value = res && typeof res === 'object' && 'data' in res && 'meta' in res
          ? res.data
          : res;
        setData(value);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}