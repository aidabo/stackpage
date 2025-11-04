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
    attributes: {
        type: string;
        title: string;
        excerpt?: string;
        image?: string;
        status?: 'draft' | 'published';
        published_at?: Date | null;
        margin: string;
        padding: string;
        background: string;
        showMenubar: boolean;
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
