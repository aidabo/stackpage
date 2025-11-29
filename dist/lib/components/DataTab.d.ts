import { default as React } from 'react';
import { ApiCallFn, CustomActionFn, FileUploadFn, GetSelectOptionsFn } from '..';
interface DataTabProps {
    selectedInstance: any;
    componentType: string;
    componentProps: any;
    currentProps: any;
    onPropertyChange: (data: any) => void;
    onFileUpload?: FileUploadFn;
    onApiCall?: ApiCallFn;
    onCustomAction?: CustomActionFn;
    onGetSelectOptions?: GetSelectOptionsFn;
    setSelectedInstance: (instance: any) => void;
    setSelectedComponent: (component: string | null) => void;
    componentSchema: any;
}
export declare const DataTab: React.FC<DataTabProps>;
export {};
