interface PropertyFieldProps {
    name: string;
    value: any;
    onChange: (value: any) => void;
    onFileUpload?: (file: File) => Promise<string>;
    onGetSelectOptions?: (propertyName: string, componentType: string) => Promise<string[]>;
    componentType?: string;
}
export declare const PropertyField: ({ name, value, onChange, onFileUpload, onGetSelectOptions, componentType, }: PropertyFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
