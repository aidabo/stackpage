import { useEffect, useRef } from "react";
import { DataSourceService } from "./DataSourceService";
import {
  resolveParams,
  hasDynamicParams,
  type ParamContext,
} from "../utils/paramResolver";
import { applyPrefetchedDataToSource } from "../utils/pagePersistence";

/**
 * Tier B — reactive datasource re-fetch.
 * See docs/planning/13_stackpage_dynamic_datasource_params_spec.md.
 *
 * Watches page state and re-fetches any non-static datasource whose parameters
 * contain a `{{state.*}}` token, whenever the resolved value of that token
 * changes. Query/route tokens don't change mid-session, so sources that only
 * reference `{{query.*}}` / `{{params.*}}` are left to the initial pre-fetch.
 *
 * The initial fetch is handled by stackpage's load-time pre-fetch; this hook
 * seeds each source's signature on first observation (no refetch) and only
 * refetches on a genuine change, debounced to absorb keystroke-rate updates.
 */

const DEBOUNCE_MS = 350;
const STATE_TOKEN_RE = /\{\{\s*state\./;

interface ReactiveDataSourceOptions {
  source: any;
  setSource: (source: any) => void;
  pageState: Record<string, any>;
  urlQuery?: Record<string, string>;
  pageid?: string;
  enabled?: boolean;
}

/** True when a params map contains at least one `{{state.*}}` token — i.e. the
 * source should be re-fetched reactively when page state changes. */
export function referencesState(params?: Record<string, any>): boolean {
  if (!params) return false;
  return Object.values(params).some(
    (v) => typeof v === "string" && STATE_TOKEN_RE.test(v)
  );
}

export function useReactiveDataSources({
  source,
  setSource,
  pageState,
  urlQuery,
  pageid,
  enabled = true,
}: ReactiveDataSourceOptions): void {
  const signatureRef = useRef<Map<string, string>>(new Map());
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );
  // Always refetch against the latest source (the debounced timer may fire
  // after `source` has changed).
  const sourceRef = useRef(source);
  sourceRef.current = source;

  // Reset tracking when the page changes so a new page doesn't inherit stale
  // signatures from the previous one.
  useEffect(() => {
    signatureRef.current.clear();
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current.clear();
  }, [pageid]);

  useEffect(() => {
    if (!enabled) return;
    const dataSources = source?.dataSources || [];
    if (!dataSources.length) return;

    const ctx: ParamContext = {
      query: urlQuery || {},
      state: pageState || {},
      params: pageid ? { pageid } : {},
    };

    for (const ds of dataSources) {
      if (!ds || ds.type === "static") continue;
      const rawParams = ds.parameters;
      if (!hasDynamicParams(rawParams) || !referencesState(rawParams)) continue;

      const resolved = resolveParams(rawParams, ctx);
      const signature = JSON.stringify(resolved);
      const previous = signatureRef.current.get(ds.id);

      // First observation: the load-time pre-fetch already ran with these
      // params, so record the signature without refetching.
      if (previous === undefined) {
        signatureRef.current.set(ds.id, signature);
        continue;
      }
      if (previous === signature) continue;

      signatureRef.current.set(ds.id, signature);

      const existingTimer = timersRef.current.get(ds.id);
      if (existingTimer) clearTimeout(existingTimer);

      const timer = setTimeout(() => {
        timersRef.current.delete(ds.id);
        DataSourceService.fetchDataSourceData(
          { ...ds, parameters: resolved },
          {}
        )
          .then((result) => {
            const next = applyPrefetchedDataToSource(sourceRef.current, [
              { id: ds.id, result },
            ]);
            if (next) setSource(next);
          })
          .catch((err) => {
            console.error(
              `[StackPage] reactive refetch failed for ${ds.name} (${ds.id})`,
              err
            );
          });
      }, DEBOUNCE_MS);
      timersRef.current.set(ds.id, timer);
    }
  }, [source, pageState, urlQuery, pageid, enabled, setSource]);

  // Clear pending timers on unmount.
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);
}
