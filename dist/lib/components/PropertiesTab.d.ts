interface PropertiesTabProps {
    onFileUpload?: (file: File) => Promise<string>;
    onApiCall?: (endpoint: string, data?: any) => Promise<any>;
    onCustomAction?: (action: string, data: any) => Promise<any>;
    onGetSelectOptions?: (propertyName: string, componentType: string) => Promise<string[]>;
}
export declare const PropertiesTab: ({ onFileUpload, onApiCall, onCustomAction, onGetSelectOptions }: PropertiesTabProps) => import("react/jsx-runtime").JSX.Element;
export {};
