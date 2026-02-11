function isDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const localFlag = window.localStorage?.getItem("stackpage:debug");
  const globalFlag = (window as any).__STACKPAGE_DEBUG__;
  return localFlag === "1" || globalFlag === true;
}

export function debugLog(...args: any[]): void {
  if (!isDebugEnabled()) return;
  // eslint-disable-next-line no-console
  console.log(...args);
}

export function debugWarn(...args: any[]): void {
  if (!isDebugEnabled()) return;
  // eslint-disable-next-line no-console
  console.warn(...args);
}

