import { createFixtures, type DemoState } from './fixtures';
export const DEMO_STORAGE_KEY = 'stratus-one-demo-v1';
let memory: DemoState | undefined;
let storageAvailable = true;
export function readDemo(): DemoState {
  if (!memory) {
    try {
      const raw = sessionStorage.getItem(DEMO_STORAGE_KEY);
      const saved = raw ? JSON.parse(raw) : null;
      if (saved?.version === 1 && ['opportunities','tasks','packs','quotes'].every(key => Array.isArray(saved[key])) && typeof saved.profile?.full_name === 'string' && typeof saved.profile?.organization === 'string') memory = saved;
    } catch { storageAvailable = false; }
    memory ??= createFixtures();
  }
  return structuredClone(memory);
}
export function writeDemo(state: DemoState) {
  // Save before swapping memory so writes remain consistent for the current tab.
  try { sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state)); }
  catch { storageAvailable = false; }
  memory = structuredClone(state);
}
export function resetDemo() { writeDemo(createFixtures()); }
export const demoStorageAvailable = () => storageAvailable;
