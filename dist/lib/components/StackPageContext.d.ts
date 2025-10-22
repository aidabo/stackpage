export interface ComponentInstance {
    id: string;
    type: string;
    props: Record<string, any>;
}
export interface StackPageContextType {
    selectedComponent: string | null;
    setSelectedComponent: (component: string | null) => void;
    selectedInstance: ComponentInstance | null;
    setSelectedInstance: (instance: ComponentInstance | null) => void;
    pageAttributes: {
        margin: string;
        padding: string;
        background: string;
        showMenubar: boolean;
        image?: string;
        tag?: string;
        status?: string;
    };
    setPageAttributes: (attributes: any) => void;
    activeTab: "components" | "properties" | "page";
    setActiveTab: (tab: "components" | "properties" | "page") => void;
    widgetProps: Map<string, object>;
    updateWidgetProps: (widgetId: string, props: object) => void;
}
export declare const StackPageContext: import('react').Context<StackPageContextType | undefined>;
export declare const useStackPage: () => StackPageContextType;
export declare const useStackPageWidgetProps: () => {
    widgetProps: Map<string, object>;
    updateWidgetProps: (widgetId: string, props: object) => void;
};
