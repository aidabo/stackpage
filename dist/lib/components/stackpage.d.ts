import { ReactNode } from 'react';
import { ComponentMapProvider, ComponentPropsProvider, GoBackListFn, LoadLayoutFn, SaveLayoutFn, FileUploadFn, ApiCallFn, CustomActionFn, GetSelectOptionsFn } from './stackoptions';
export interface StackPageOptions {
    options: any;
}
export interface StackPageProps {
    pageid: string;
    pageMode: "edit" | "preview" | "view";
    onLoadLayout: LoadLayoutFn;
    onSaveLayout?: SaveLayoutFn;
    gobackList?: GoBackListFn;
    componentMapProvider?: ComponentMapProvider;
    componentPropsProvider?: ComponentPropsProvider;
    onFileUpload?: FileUploadFn;
    onApiCall?: ApiCallFn;
    onCustomAction?: CustomActionFn;
    onGetSelectOptions?: GetSelectOptionsFn;
    options?: StackPageOptions;
    children?: ReactNode;
}
declare const StackPage: (props: StackPageProps) => import("react/jsx-runtime").JSX.Element;
export default StackPage;
