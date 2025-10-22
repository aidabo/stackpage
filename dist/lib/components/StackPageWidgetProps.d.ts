export declare const useWidgetProps: (widgetId?: string) => {
    getProps: () => object | undefined;
    setProps: (props: object) => void;
    updateProps: (updates: Partial<object>) => void;
    hasProps: boolean;
};
