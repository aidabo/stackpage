import { GridStackProvider } from "./gridstack/grid-stack-provider";
import { GridStackRenderProvider } from "./gridstack/grid-stack-render-provider";
import {
  GridStackRender,
  ComponentDataType,
  ComponentMap,
} from "./gridstack/grid-stack-render";
import { useGridStackContext } from "./gridstack/grid-stack-context";
import { useGridStackWidgetContext } from "./gridstack/grid-stack-widget-context";
import { useExternalComponentDrag } from "./components/ExternalDragSourceContext";

export {
  GridStackProvider,
  GridStackRenderProvider,
  GridStackRender,
  type ComponentDataType,
  type ComponentMap,
  useGridStackContext,
  useGridStackWidgetContext,
};

import StackPage from "./components/stackpage";
import { StackPageProps, StackPageOptions } from "./components/stackpage";
import {
  ComponentProps,
  PageProps,
  ComponentMapProvider,
  ComponentCatalogProvider,
  ComponentCatalogConfig,
  BusinessComponentGroup,
  ComponentPropsProvider,
  GoBackListFn,
  LoadLayoutFn,
  SaveLayoutFn,
  FileUploadFn,
  CustomActionFn,
  gridOptions,
  subGridOptions,
  FileUploadOptions,
} from "./components/stackoptions";

import {
  DataSource,
  HostFunctionDataSource,
  GetHostDataSourcesFn,
  StackI18n,
} from "./components/types";
import {
  InteractionRule,
  InteractionActionType,
  StackPageRuntimeApi,
  StackPageComponentProps,
  StackPageEventAction,
  StackPageEventSubscription,
  StackPageEventMode,
  StackPageSubscriptionReplyMode,
} from "./utils/componentCommunication";

import "./styles/index.css";

export {
  StackPage,
  useExternalComponentDrag,
  type StackPageProps,
  type StackPageOptions,
  type PageProps,
  type ComponentProps,
  type ComponentMapProvider,
  type ComponentCatalogProvider,
  type ComponentCatalogConfig,
  type BusinessComponentGroup,
  type ComponentPropsProvider,
  type GoBackListFn,
  type LoadLayoutFn,
  type SaveLayoutFn,
  type FileUploadFn,
  type CustomActionFn,
  type FileUploadOptions,
  type DataSource,
  type HostFunctionDataSource,
  type GetHostDataSourcesFn,
  type StackI18n,
  type InteractionRule,
  type InteractionActionType,
  type StackPageRuntimeApi,
  type StackPageComponentProps,
  type StackPageEventAction,
  type StackPageEventSubscription,
  type StackPageEventMode,
  type StackPageSubscriptionReplyMode,
  gridOptions,
  subGridOptions,
};

//export { default as styles } from './styles/index.css';
