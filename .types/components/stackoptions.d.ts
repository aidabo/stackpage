import { GridStackOptions, GridStackWidget } from "gridstack";
import { ComponentMap } from "..";
/**
 * Default grid options for the main grid.
 * This includes settings for accepting widgets, removable elements, and layout configurations.
 */
export declare const gridOptions: GridStackOptions;
/**
 * Default sub-grid options for nested grids.
 * This includes settings for accepting widgets, removable elements, and layout configurations.
 */
export declare const subGridOptions: GridStackOptions;
/**
 * Page properties interface
 */
export interface PageProps {
    id: string;
    title: string;
    description?: string;
    image?: string;
    tag?: string;
    status?: string;
    pageOptions?: any;
    grids: GridStackOptions | GridStackWidget[] | undefined;
}
/**
 * component properties interface
 */
export interface ComponentProps {
    [key: string]: any;
}
/**
 * getDefaultPageProps - Returns the default properties for a page.
 * @returns Default page properties with a unique ID and default grid options.
 */
export declare const getDefaultPageProps: () => PageProps;
/**
 * ComponentMapProvider - A function that returns a map of components.
 * This will allow for dynamic customization of components.
 */
export type ComponentMapProvider = () => ComponentMap;
/**
 * ComponentPropsProvider - A function that returns a record of component properties.
 * This will allow for dynamic customization of component props.
 */
export type ComponentPropsProvider = () => Record<string, any>;
/**
 * getComponentMap - Returns the default component map or merges with custom components if provided.
 * @param fn a function that returns a custom component map
 * @returns
 */
export declare const getComponentMap: (fn?: ComponentMapProvider) => ComponentMap;
/**
 * getComponentProps - Returns the default component properties or merges with custom properties if provided.
 * @param fn - A function that returns custom component properties
 * @returns
 */
export declare const getComponentProps: (fn?: ComponentPropsProvider) => ComponentProps;
/**
 * Save page layout, if pageid is not the same as pageProps.id, it will as created a new page
 * @param pageid - The ID of the page to save
 * @param pageProps - The properties of the page to save
 */
export type SaveLayoutFn = (pageid: string, pageProps: PageProps) => Promise<void>;
export type LoadLayoutFn = (pageid: string) => Promise<PageProps>;
export type GoBackListFn = () => void;
