import type { GridStackOptions, GridStackWidget } from "gridstack";
import type { InteractionRule } from "./componentCommunication";

/**
 * Whole-page event overview. Scans a layout (all widgets + subgrids) and
 * collects every component's declarative `__interactions` rules into one view,
 * so authors can see all page events in one place instead of per-component only.
 */

export interface WidgetInteractions {
  widgetId: string;
  componentName: string;
  rules: InteractionRule[];
}

export interface PageInteractionsSummary {
  widgets: WidgetInteractions[];
  totalRules: number;
  /** Distinct event names that rules react to (`rule.event`). */
  reactedEvents: string[];
  /** Distinct event names re-emitted by rules (emit-event / emit-request). */
  emittedEvents: string[];
  /** Distinct shared-state paths written by rules (set-shared-state). */
  stateWrites: string[];
}

function walkNode(node: GridStackWidget, acc: WidgetInteractions[]): void {
  if (node?.content) {
    try {
      const content = JSON.parse(node.content) as {
        name?: string;
        props?: { __interactions?: unknown };
      };
      const rules = content?.props?.__interactions;
      if (Array.isArray(rules) && rules.length > 0) {
        acc.push({
          widgetId: String(node.id ?? ""),
          componentName: String(content.name ?? "?"),
          rules: rules as InteractionRule[],
        });
      }
    } catch {
      // ignore malformed content
    }
  }
  const children = node?.subGridOpts?.children;
  if (Array.isArray(children)) {
    children.forEach((child) => walkNode(child as GridStackWidget, acc));
  }
}

export function collectPageInteractions(
  layout: GridStackOptions | GridStackWidget[] | undefined
): PageInteractionsSummary {
  const widgets: WidgetInteractions[] = [];
  const children = Array.isArray(layout) ? layout : layout?.children || [];
  children.forEach((node) => walkNode(node as GridStackWidget, widgets));

  const reacted = new Set<string>();
  const emitted = new Set<string>();
  const stateWrites = new Set<string>();
  let totalRules = 0;

  for (const widget of widgets) {
    for (const rule of widget.rules) {
      totalRules += 1;
      if (rule.event) reacted.add(rule.event);
      if (
        (rule.action === "emit-event" || rule.action === "emit-request") &&
        rule.targetPath
      ) {
        emitted.add(rule.targetPath);
      }
      if (rule.action === "set-shared-state" && rule.targetPath) {
        stateWrites.add(rule.targetPath);
      }
    }
  }

  return {
    widgets,
    totalRules,
    reactedEvents: [...reacted].sort(),
    emittedEvents: [...emitted].sort(),
    stateWrites: [...stateWrites].sort(),
  };
}
