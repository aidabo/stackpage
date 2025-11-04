import { ApiCallFn, CustomActionFn, FileUploadFn, GetSelectOptionsFn } from '..';
interface PropertiesTabProps {
    onFileUpload?: FileUploadFn;
    onApiCall?: ApiCallFn;
    onCustomAction?: CustomActionFn;
    onGetSelectOptions?: GetSelectOptionsFn;
}
export declare const PropertiesTab: ({ onFileUpload, onApiCall, onCustomAction, onGetSelectOptions, }: PropertiesTabProps) => import("react/jsx-runtime").JSX.Element;
export {};
