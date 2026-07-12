import { useMemo } from "react";
import type { GridStackOptions, GridStackWidget } from "gridstack";
import {
  collectPageInteractions,
  type WidgetInteractions,
} from "../utils/pageInteractions";
import type { InteractionRule } from "../utils/componentCommunication";

export interface PageEventsDialogProps {
  open: boolean;
  onClose: () => void;
  layout: GridStackOptions | GridStackWidget[] | undefined;
  /** Optionally jump to editing a component's events. */
  onEditWidget?: (widgetId: string) => void;
  t?: (key: string) => string;
}

const actionColor: Record<string, string> = {
  "set-shared-state": "bg-blue-50 text-blue-700 border-blue-200",
  "set-prop": "bg-violet-50 text-violet-700 border-violet-200",
  "emit-event": "bg-amber-50 text-amber-700 border-amber-200",
  "emit-request": "bg-rose-50 text-rose-700 border-rose-200",
};

function Chip({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-xs ${className}`}
    >
      {label}
    </span>
  );
}

function RuleRow({ rule }: { rule: InteractionRule }) {
  const color =
    actionColor[rule.action] || "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <div className="flex flex-wrap items-center gap-2 py-1 text-sm">
      <Chip label={rule.event} className="bg-gray-100 text-gray-800 border-gray-200" />
      <span className="text-gray-400">→</span>
      <Chip label={rule.action} className={color} />
      {rule.targetPath && (
        <code className="text-xs text-gray-600">{rule.targetPath}</code>
      )}
      {rule.targetWidgetId && (
        <span className="text-xs text-gray-400">@{rule.targetWidgetId}</span>
      )}
      {rule.valueFrom && (
        <span className="text-xs text-gray-400">value={rule.valueFrom}</span>
      )}
      {rule.enabled === false && (
        <Chip label="disabled" className="bg-gray-100 text-gray-400 border-gray-200" />
      )}
    </div>
  );
}

export function PageEventsDialog({
  open,
  onClose,
  layout,
  onEditWidget,
  t = (k) => k,
}: PageEventsDialogProps) {
  const summary = useMemo(() => collectPageInteractions(layout), [layout]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="flex h-[85vh] w-full max-w-3xl flex-col rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h2 className="text-lg font-semibold">{t("Page Events")}</h2>
            <p className="text-xs text-gray-500">
              {t(
                "All interaction rules on this page. Edit per-component via Properties → Event."
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
            aria-label="close"
          >
            ✕
          </button>
        </div>

        {/* Hint: this dialog shows interaction rules only; page-level data sources
            (e.g. loading a record from a URL query param) live in the Data Source tab. */}
        <div className="border-b bg-blue-50/60 px-4 py-2 text-xs text-blue-800">
          {t(
            "This dialog is read-only and shows interaction rules only. To load page data from a URL query param (e.g. {{query.item}} on a detail page), configure a page-level data source in the Data Source tab.",
          )}
        </div>

        {/* Summary */}
        <div className="flex flex-wrap gap-2 border-b bg-gray-50 p-3 text-xs">
          <Chip
            label={`${summary.widgets.length} ${t("components")}`}
            className="bg-white text-gray-700 border-gray-200"
          />
          <Chip
            label={`${summary.totalRules} ${t("rules")}`}
            className="bg-white text-gray-700 border-gray-200"
          />
          {summary.reactedEvents.map((e) => (
            <Chip key={`r-${e}`} label={`⟳ ${e}`} className="bg-gray-100 text-gray-700 border-gray-200" />
          ))}
          {summary.emittedEvents.map((e) => (
            <Chip key={`e-${e}`} label={`↗ ${e}`} className="bg-amber-50 text-amber-700 border-amber-200" />
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {summary.widgets.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500">
              {t(
                "No interaction rules on this page yet. Select a component and open Properties → Event to add rules."
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {summary.widgets.map((w: WidgetInteractions) => (
                <div key={w.widgetId} className="rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between border-b bg-gray-50 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">
                        {w.componentName}
                      </span>
                      <code className="text-xs text-gray-400">{w.widgetId}</code>
                      <Chip
                        label={`${w.rules.length}`}
                        className="bg-white text-gray-600 border-gray-200"
                      />
                    </div>
                    {onEditWidget && (
                      <button
                        onClick={() => onEditWidget(w.widgetId)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        {t("Edit")}
                      </button>
                    )}
                  </div>
                  <div className="divide-y px-3 py-1">
                    {w.rules.map((rule, i) => (
                      <RuleRow key={rule.id || i} rule={rule} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer legend */}
        <div className="border-t p-2 text-center text-[11px] text-gray-400">
          ⟳ {t("reacts to")} · ↗ {t("emits")} ·{" "}
          {t("Note: code-level emits (component .emit) are not shown here.")}
        </div>
      </div>
    </div>
  );
}

export default PageEventsDialog;
