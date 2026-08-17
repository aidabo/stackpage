import { GridStackOptions, GridStackWidget } from "gridstack";
import type { SourceData } from "../components/StackPageContext";

export type SourceLike = SourceData;

export interface PrefetchedDataUpdate {
  id: string;
  result: any;
}

const getBoundPropRoot = (bindingKey: string) =>
  String(bindingKey || "").split(/[.[]/, 1)[0];

export function stripRuntimeBoundValuesFromProps(
  props?: Record<string, any> | null,
): Record<string, any> | undefined {
  if (!props) return undefined;
  const bindings = props.__bindings;
  if (!bindings || typeof bindings !== "object" || Array.isArray(bindings)) {
    return {...props};
  }

  const persisted = {...props};
  Object.keys(bindings).forEach((bindingKey) => {
    const rootKey = getBoundPropRoot(bindingKey);
    if (rootKey && !rootKey.startsWith("__")) {
      delete persisted[rootKey];
    }
  });
  return persisted;
}

function stripRuntimeBoundValuesFromNode(node: GridStackWidget): GridStackWidget {
  let persistedNode = {...node};
  if (typeof node.content === "string") {
    try {
      const content = JSON.parse(node.content) as {
        name?: string;
        props?: Record<string, any>;
      };
      if (content && typeof content === "object" && !Array.isArray(content)) {
        persistedNode.content = JSON.stringify({
          ...content,
          props: stripRuntimeBoundValuesFromProps(content.props) || {},
        });
      }
    } catch {
      // Preserve malformed content so the existing validation path can report it.
    }
  }

  if (persistedNode.subGridOpts?.children?.length) {
    persistedNode = {
      ...persistedNode,
      subGridOpts: {
        ...persistedNode.subGridOpts,
        children: persistedNode.subGridOpts.children.map((child) =>
          stripRuntimeBoundValuesFromNode(child as GridStackWidget),
        ),
      },
    };
  }
  return persistedNode;
}

export function stripRuntimeBoundValuesFromLayout(
  layout: GridStackOptions | GridStackWidget[] | undefined,
): GridStackOptions | GridStackWidget[] | undefined {
  if (!layout) return layout;
  if (Array.isArray(layout)) {
    return layout.map((node) => stripRuntimeBoundValuesFromNode(node));
  }
  return {
    ...layout,
    children: layout.children?.map((node) =>
      stripRuntimeBoundValuesFromNode(node as GridStackWidget),
    ),
  };
}

export function cloneSource(source?: SourceLike | null): SourceLike | undefined {
  if (!source) return undefined;
  const lists = Array.isArray(source.lists) ? source.lists : [];
  const dataSources = Array.isArray(source.dataSources) ? source.dataSources : [];

  return {
    lists: [...lists],
    dataSources: dataSources.map((dataSource) => ({ ...dataSource })),
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
