import { GridStackOptions, GridStackWidget } from 'gridstack';
import { ComponentMap } from '..';
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
    id?: string;
    type: string;
    title: string;
    excerpt?: string;
    image?: string;
    published_at?: Date | null;
    status?: 'draft' | 'published';
    attributes?: any;
    layout: GridStackOptions | GridStackWidget[] | undefined;
}
/**
 * component properties interface
 */
export interface ComponentProps {
    [key: string]: any;
}
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
 * @param pageProps - The properties of the page to save
 */
export type SaveLayoutFn = (pageProps: PageProps) => Promise<void>;
/**
 * Load page layout function
 */
export type LoadLayoutFn = (pageid: string) => Promise<PageProps>;
/**
 * Provide goback page navigation
 */
export type GoBackListFn = () => void;
/**
 * FileUploadOptions
 */
export interface FileUploadOptions {
    onProgress?: (p: number) => void;
    onError?: (err: Error) => void;
    options?: any;
}
/**
 * Image, video, audio, file uploaded callback for server upload
 */
export type FileUploadFn = (file: File, props?: FileUploadOptions) => Promise<string>;
/**
 * If component field name  include "/api", use this callback to get data
 */
export type ApiCallFn = (endpoint: string, value?: any) => Promise<any>;
/**
 * if component field name include "action", call this function
 */
export type CustomActionFn = (action: string, data: any) => Promise<any>;
/**
 * New callback for dynamic select options
 */
export type GetSelectOptionsFn = (propertyName: string, componentType: string) => Promise<string[]>;
