import { ReactNode } from "react";
import { ComponentMapProvider, ComponentPropsProvider, GoBackListFn, LoadLayoutFn, SaveLayoutFn } from "./stackoptions";
import "../styles/index.css";
export interface ComponentInstance {
    id: string;
    type: string;
    props: Record<string, any>;
    position?: {
        x: number;
        y: number;
    };
}
interface StackPageContextType {
    selectedComponent: string | null;
    setSelectedComponent: (component: string | null) => void;
    selectedInstance: ComponentInstance | null;
    setSelectedInstance: (instance: ComponentInstance | null) => void;
    pageAttributes: {
        margin: string;
        padding: string;
        background: string;
    };
    setPageAttributes: (attributes: any) => void;
    activeTab: "components" | "properties" | "page";
    setActiveTab: (tab: "components" | "properties" | "page") => void;
}
export declare const useStackPage: () => StackPageContextType;
export interface StackPageProps {
    pageid: string;
    pageMode: "edit" | "preview" | "view";
    onLoadLayout: LoadLayoutFn;
    onSaveLayout?: SaveLayoutFn;
    componentMapProvider?: ComponentMapProvider;
    componentPropsProvider?: ComponentPropsProvider;
    gobackList: GoBackListFn;
    children?: ReactNode;
}
declare const StackPage: ({ pageid, pageMode, onSaveLayout, onLoadLayout, componentMapProvider, componentPropsProvider, gobackList, children, }: StackPageProps) => import("react/jsx-runtime").JSX.Element;
export default StackPage;
