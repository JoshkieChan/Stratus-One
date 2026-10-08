export function validatePublicConfig(url: string | undefined, key: string | undefined): string | null {
  if (!url || !key) return 'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local, then restart Vite.';
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error();
  } catch { return 'VITE_SUPABASE_URL must be an HTTP or HTTPS URL.'; }
  if (key.startsWith('sb_secret_')) return 'Use a publishable key in the browser. Secret keys must never be included in VITE_ variables.';
  if (!key.startsWith('sb_publishable_')) {
    try {
      const payload = JSON.parse(atob(key.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.role !== 'anon') return 'Only a publishable or legacy anon key can be used in the browser.';
    } catch { return 'VITE_SUPABASE_ANON_KEY must be a publishable or legacy anon key.'; }
  }
  return null;
}
