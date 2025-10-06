import { GridStackOptions, GridStackWidget } from "gridstack";
import { v4 as uuidv4 } from "uuid";
import { ComponentMap } from "..";
import Text from "./Text";

const CELL_HEIGHT = "1rem"; //16px;

const BREAKPOINTS = [
  //{ c: 1, w: 300 },   // 1 column on screens < 300px
  { c: 1, w: 500 },     // 2 columns between 300px - 500px
  { c: 3, w: 800 },     // 4 columns between 500px - 800px
  { c: 6, w: 1024 },    // 6 columns between 800px - 1024px
  //{ c: 8, w: 1200 },  // 8 columns on screens > 1200px
];

/**
 * Default grid options for the main grid.
 * This includes settings for accepting widgets, removable elements, and layout configurations.
 */
export const gridOptions: GridStackOptions = {
  acceptWidgets: true,
  removable: "#trash",
  sizeToContent: true,
  resizable: { handles: 'se'}, 
  minRow: 10,
  columnOpts: {
    breakpointForWindow: true,
    breakpoints: BREAKPOINTS,
    layout: "moveScale",
    columnMax: 12,
  },
  margin: 5,
  cellHeight: CELL_HEIGHT,  
  
  subGridOpts: {
    acceptWidgets: true,
    removable: "#trash",
    resizable: { handles: 'se'}, 
    sizeToContent: true,
    columnOpts: {
      breakpoints: BREAKPOINTS,
      layout: "moveScale",
    },
    margin: 5,
    minRow: 1,
    cellHeight: CELL_HEIGHT,
  },
  children: [],
};

/**
 * Default sub-grid options for nested grids.
 * This includes settings for accepting widgets, removable elements, and layout configurations.
 */
export const subGridOptions: GridStackOptions = {
  acceptWidgets: true,
  removable: "#trash",
  resizable: { handles: 'se'},  
  sizeToContent: true,  
  subGridOpts: {
    acceptWidgets: true,
    removable: "#trash",
    resizable: { handles: 'se'},  
    sizeToContent: true,
    columnOpts: {
      breakpoints: BREAKPOINTS,
      layout: "moveScale",
    },
    margin: 5,
    minRow: 6,
    cellHeight: CELL_HEIGHT,
    children: [],
  },
  children: [],
};

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
export const getDefaultPageProps = (): PageProps => {
  return {
    id: `${uuidv4()}`,
    title: "untitled page",
    grids: gridOptions,
  };
};

/**
 * default component properties
 * This is a default set of properties for components.
 */
const defaultComponentProps: ComponentProps = {
  Text: {
    content: `Any content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.
Even better, continue typing to find the card you're looking for, hit enter, and avoid dragging your mouse altogether.
Some cards have a handy little shortcut, to keep you on track and in flow. Use --- to divide your paragraphs with a line, or \`\`\` to add a code block. You can also drag and drop images directly into the editor to bypass the menu. 
Any content other than text are what we call cards. Cards can be accessed by clicking the ➕ button or typing / at the beginning of a paragraph.`,
    title: "This is text card",
  },
};

const defaultComponents: ComponentMap = {
  Text,
};

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
export const getComponentMap = (fn?: ComponentMapProvider): ComponentMap => {
  if (fn) {
    const customMap = fn();
    // Merge with custom keys overriding defaults
    return { ...defaultComponents, ...customMap };
  }
  return defaultComponents;
};

/**
 * getComponentProps - Returns the default component properties or merges with custom properties if provided.
 * @param fn - A function that returns custom component properties
 * @returns 
 */
export const getComponentProps = (
  fn?: ComponentPropsProvider
): ComponentProps => {
  if (fn) {
    const customObject = fn();
    // Merge with custom keys overriding defaults
    return { ...defaultComponentProps, ...customObject };
  }
  return defaultComponentProps;
};

/**
 * Save page layout, if pageid is not the same as pageProps.id, it will as created a new page
 * @param pageid - The ID of the page to save 
 * @param pageProps - The properties of the page to save
 */
export type SaveLayoutFn = (
  pageid: string,
  pageProps: PageProps
) => Promise<void>;
export type LoadLayoutFn = (pageid: string) => Promise<PageProps>;
export type GoBackListFn = () => void;
