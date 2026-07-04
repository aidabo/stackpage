import { get } from "./get";

/**
 * Runtime context for resolving dynamic datasource parameters.
 * See docs/planning/13_stackpage_dynamic_datasource_params_spec.md.
 *
 * Namespaces are whitelisted; a token referencing anything else resolves to
 * undefined (and the param is dropped). No arbitrary global/property access.
 */
export interface ParamContext {
  /** URL search params (all keys), e.g. Object.fromEntries(useSearchParams()). */
  query?: Record<string, string>;
  /** Live page state object (same store getPageState reads). */
  state?: Record<string, any>;
  /** Route params, e.g. { pageid }. */
  params?: Record<string, string>;
}

export type ParamNamespace = "query" | "state" | "params";

const ALLOWED_NAMESPACES: ParamNamespace[] = ["query", "state", "params"];

/** Matches a single {{ns.path}} token anywhere in a string. */
const TOKEN_RE = /\{\{\s*([a-zA-Z0-9_]+)\.([^}]+?)\s*\}\}/g;
/** Matches a value that is exactly one {{ns.path}} token (nothing else). */
const PURE_TOKEN_RE = /^\{\{\s*([a-zA-Z0-9_]+)\.([^}]+?)\s*\}\}$/;

function isAllowed(ns: string): ns is ParamNamespace {
  return (ALLOWED_NAMESPACES as string[]).includes(ns);
}

/**
 * Resolve a single {{ns.path}} reference against the context.
 * - `state` uses lodash-style get() so both nested and flat dot-keys resolve
 *   consistently with getPageState.
 * - `query`/`params` prefer a direct key (params may legitimately contain dots),
 *   falling back to get() for nested access.
 * Returns undefined for unknown namespaces or missing values.
 */
function resolveToken(ns: string, rawPath: string, ctx: ParamContext): any {
  if (!isAllowed(ns)) return undefined;
  const bag = ctx[ns];
  if (bag == null) return undefined;
  const path = rawPath.trim();
  if (!path) return undefined;

  if (ns === "state") {
    return get(bag, path);
  }
  // query / params
  if (Object.prototype.hasOwnProperty.call(bag, path)) {
    return (bag as Record<string, any>)[path];
  }
  return get(bag, path);
}

/**
 * Resolve one parameter value.
 * - Non-string values pass through unchanged.
 * - A pure single-token value returns the resolved value with its original type
 *   preserved (number/boolean/object stay as-is; undefined signals "drop").
 * - A string with embedded token(s) is interpolated; unresolved tokens become "".
 * - A plain string with no token is returned unchanged.
 */
export function resolveParamValue(value: any, ctx: ParamContext): any {
  if (typeof value !== "string") return value;

  const pure = value.match(PURE_TOKEN_RE);
  if (pure) {
    return resolveToken(pure[1], pure[2], ctx);
  }

  if (!value.includes("{{")) return value;

  return value.replace(TOKEN_RE, (_match, ns: string, path: string) => {
    const resolved = resolveToken(ns, path, ctx);
    return resolved === undefined || resolved === null ? "" : String(resolved);
  });
}

/**
 * Resolve a datasource's raw `parameters` map against the runtime context.
 * Params whose resolved value is undefined/null/"" are dropped — consistent
 * with DataSourceService's existing "skip empty" behaviour for API params, so
 * an unresolved {{token}} never reaches the wire as a literal.
 *
 * Backward compatible: any value without a `{{token}}` is returned untouched.
 */
export function resolveParams(
  raw: Record<string, any> | undefined,
  ctx: ParamContext
): Record<string, any> {
  const result: Record<string, any> = {};
  if (!raw) return result;

  for (const [key, value] of Object.entries(raw)) {
    const resolved = resolveParamValue(value, ctx);
    if (resolved === undefined || resolved === null || resolved === "") {
      continue;
    }
    result[key] = resolved;
  }
  return result;
}

/** True if a raw parameters map contains at least one {{token}} reference. */
export function hasDynamicParams(
  raw: Record<string, any> | undefined
): boolean {
  if (!raw) return false;
  return Object.values(raw).some(isDynamicParamValue);
}

/** True when a single param value carries a dynamic {{ns.path}} token. */
export function isDynamicParamValue(value: unknown): boolean {
  return typeof value === "string" && value.includes("{{");
}

export interface TestParamInput {
  key: string;
  value: string;
  /** Author-supplied concrete value used to stand in for a dynamic token. */
  testValue?: string;
}

/** Author-facing source of a param value in the datasource dialog. */
export type ParamSource = "static" | "query" | "state" | "params";

/**
 * Parse a stored param value into a dialog source + path.
 * A value that is exactly one whitelisted `{{ns.path}}` token → that source and
 * inner path; anything else (literal, partial interpolation, unknown ns) →
 * `static` with the raw value as the path.
 */
export function parseParamSource(value: string | undefined): {
  source: ParamSource;
  path: string;
} {
  if (typeof value === "string") {
    const match = value.match(PURE_TOKEN_RE);
    if (match && isAllowed(match[1])) {
      return { source: match[1] as ParamSource, path: match[2].trim() };
    }
  }
  return { source: "static", path: value ?? "" };
}

/**
 * Build a stored param value from a dialog source + path.
 * `static` → the literal path as-is. A dynamic source with a non-empty path →
 * `{{source.path}}`; with an empty path → "" (nothing bound yet).
 */
export function buildParamValue(source: ParamSource, path: string): string {
  if (source === "static") return path ?? "";
  const trimmed = (path ?? "").trim();
  return trimmed ? `{{${source}.${trimmed}}}` : "";
}

/**
 * Build the effective parameters for the datasource dialog's Test tab, where
 * runtime context (URL query / page state) is unavailable. Dynamic ({{token}})
 * params use their test value (dropped when blank, mirroring the runtime
 * "unresolved token → drop" rule); static params use their literal value.
 * Blank keys/values are skipped.
 */
export function buildTestParams(
  items: TestParamInput[]
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const item of items) {
    const key = (item.key || "").trim();
    if (!key) continue;
    if (isDynamicParamValue(item.value)) {
      const testValue = (item.testValue ?? "").trim();
      if (testValue !== "") out[key] = testValue;
    } else if (item.value !== "" && item.value != null) {
      out[key] = item.value;
    }
  }
  return out;
}
