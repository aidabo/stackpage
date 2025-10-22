// StackPageWidgetProps.ts
import { useStackPageWidgetProps } from './StackPageContext';

// Hook to get and update widget props for a specific widget
export const useWidgetProps = (widgetId?: string) => {
  const { widgetProps, updateWidgetProps } = useStackPageWidgetProps();
  
  const getProps = () => {
    if (!widgetId) return undefined;
    return widgetProps.get(widgetId);
  };

  const setProps = (props: object) => {
    if (!widgetId) return;
    updateWidgetProps(widgetId, props);
  };

  const updateProps = (updates: Partial<object>) => {
    if (!widgetId) return;
    const currentProps = widgetProps.get(widgetId) || {};
    updateWidgetProps(widgetId, { ...currentProps, ...updates });
  };

  return {
    getProps,
    setProps,
    updateProps,
    hasProps: widgetId ? widgetProps.has(widgetId) : false,
  };
};