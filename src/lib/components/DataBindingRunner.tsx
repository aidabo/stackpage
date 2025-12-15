import React, { useEffect, useCallback } from "react";
import { useStackPage } from "./StackPageContext";
import { useDataBinding } from "./useDataBinding";
import { StackActionsRef } from "./stackactions";

interface DataBindingRunnerProps {
  stackActionsRef: React.RefObject<StackActionsRef>;
}

export const DataBindingRunner: React.FC<DataBindingRunnerProps> = ({
  stackActionsRef,
}) => {
  const { source } = useStackPage();

  // Function to apply bindings to all widgets
  const applyBindingsToWidgets = useCallback(() => {
    if (!stackActionsRef.current) return;

    const widgetMetaMap = stackActionsRef.current.rawWidgetMetaMap.value;

    widgetMetaMap.forEach((widget: any, widgetId: string) => {
      try {
        if (widget.content) {
          const content = JSON.parse(widget.content);
          if (content.props && content.props.__bindings) {
            // Apply data binding to get bound props
            const boundProps = useDataBinding(content.props);

            // Update widget content with bound props
            const updatedContent = {
              ...content,
              props: {
                ...content.props,
                ...boundProps,
              },
            };

            // Update the widget in the map
            widgetMetaMap.set(widgetId, {
              ...widget,
              content: JSON.stringify(updatedContent),
            });

            console.log(`Applied bindings to widget ${widgetId}:`, boundProps);
          }
        }
      } catch (error) {
        console.error(`Error applying bindings to widget ${widgetId}:`, error);
      }
    });
  }, [stackActionsRef, source]);

  // Apply bindings when source changes (e.g., API data loaded)
  useEffect(() => {
    applyBindingsToWidgets();
  }, [source.dataSources, applyBindingsToWidgets]);

  // Re-apply bindings periodically for data sources with refresh intervals
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    source.dataSources.forEach((ds) => {
      if (ds.refreshInterval && ds.refreshInterval > 0) {
        const interval = setInterval(() => {
          console.log(`Refreshing data source: ${ds.name}`);
          applyBindingsToWidgets();
        }, ds.refreshInterval * 1000);

        intervals.push(interval);
      }
    });

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [source.dataSources, applyBindingsToWidgets]);

  return null;
};
