import { ReactNode } from 'react';
import { ComponentMapProvider, ComponentPropsProvider, GoBackListFn, LoadLayoutFn, SaveLayoutFn, FileUploadFn, GetTagsFn, ApiCallFn, CustomActionFn, GetSelectOptionsFn } from './stackoptions';
export interface StackPageProps {
    pageid: string;
    pageMode: "edit" | "preview" | "view";
    onLoadLayout: LoadLayoutFn;
    onSaveLayout: SaveLayoutFn;
    gobackList: GoBackListFn;
    componentMapProvider?: ComponentMapProvider;
    componentPropsProvider?: ComponentPropsProvider;
    onFileUpload?: FileUploadFn;
    onGetTags?: GetTagsFn;
    onApiCall?: ApiCallFn;
    onCustomAction?: CustomActionFn;
    onGetSelectOptions?: GetSelectOptionsFn;
    children?: ReactNode;
}
declare const StackPage: (props: StackPageProps) => import("react/jsx-runtime").JSX.Element;
export default StackPage;
