import { GridStackOptions, GridStackWidget } from "gridstack";
import type { SourceData } from "../components/StackPageContext";

export type SourceLike = SourceData;

export interface PrefetchedDataUpdate {
  id: string;
  result: any;
}

export function cloneSource(source?: SourceLike | null): SourceLike | undefined {
  if (!source) return undefined;
  return {
    lists: [...source.lists],
    dataSources: source.dataSources.map((dataSource) => ({ ...dataSource })),
  };
}

export function stripRuntimeDataFromSource(
  source?: SourceLike | null,
): SourceLike | undefined {
  if (!source) return undefined;
  const cloned = cloneSource(source);
  if (!cloned) return undefined;
  return {
    lists: cloned.lists,
    dataSources: cloned.dataSources.map((dataSource) => {
      if (dataSource.type === "static") {
        return { ...dataSource };
      }
      const { data: _data, ...persisted } = dataSource;
      return { ...persisted };
    }),
  };
}

export function applyPrefetchedDataToSource(
  source?: SourceLike | null,
  updates: PrefetchedDataUpdate[] = [],
): SourceLike | undefined {
  if (!source) return undefined;
  const cloned = cloneSource(source);
  if (!cloned) return undefined;
  const updateMap = new Map(updates.map((update) => [update.id, update.result]));

  return {
    lists: cloned.lists,
    dataSources: cloned.dataSources.map((dataSource) => {
      if (dataSource.type === "static") {
        return { ...dataSource };
      }
      const update = updateMap.get(dataSource.id);
      if (!update) return { ...dataSource };
      return { ...dataSource, data: update?.data };
    }),
  };
}

function collectBindingSourceIdsFromNode(
  node: GridStackWidget,
  requiredSourceIds: Set<string>,
): void {
  if (node.content) {
    try {
      const content = JSON.parse(node.content) as {
        props?: Record<string, any>;
      };
      const bindings = content.props?.__bindings;
      if (bindings && typeof bindings === "object") {
        Object.values(bindings).forEach((binding: any) => {
          if (binding?.sourceId) {
            requiredSourceIds.add(String(binding.sourceId));
          }
        });
      }
    } catch {
      // ignore malformed node content
    }
  }

  if (node.subGridOpts?.children?.length) {
    node.subGridOpts.children.forEach((child) =>
      collectBindingSourceIdsFromNode(child as GridStackWidget, requiredSourceIds),
    );
  }
}

export function collectBindingSourceIdsFromLayout(
  layout: GridStackOptions | GridStackWidget[] | undefined,
): Set<string> {
  const requiredSourceIds = new Set<string>();
  const children = Array.isArray(layout)
    ? layout
    : layout?.children || [];

  children.forEach((node) =>
    collectBindingSourceIdsFromNode(node as GridStackWidget, requiredSourceIds),
  );

  return requiredSourceIds;
}
