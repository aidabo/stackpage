export const DEFAULT_PAGE_STATE_KEYS = [
  "selectedId",
  "keyword",
  "activeTab",
  "dialogOpen",
] as const;

export type CanonicalPageStateKey = (typeof DEFAULT_PAGE_STATE_KEYS)[number];

export type PageState = Record<string, any>;

export const DEFAULT_PAGE_STATE: PageState = {
  selectedId: null,
  keyword: "",
  activeTab: "components",
  dialogOpen: false,
};

export function normalizePageState(input?: Record<string, any> | null): PageState {
  return {
    ...DEFAULT_PAGE_STATE,
    ...(input && typeof input === "object" ? input : {}),
  };
}

export function isCanonicalPageStateKey(
  key: string,
): key is CanonicalPageStateKey {
  return (DEFAULT_PAGE_STATE_KEYS as readonly string[]).includes(key);
}

export function createPageStatePath(
  ...segments: Array<string | number | null | undefined>
) {
  return segments
    .map((segment) => String(segment ?? "").trim())
    .filter(Boolean)
    .join(".");
}
