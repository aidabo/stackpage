interface PropertyFieldProps {
    name: string;
    value: any;
    onChange: (value: any) => void;
    onFileUpload?: (file: File) => Promise<string>;
}
export declare const PropertyField: ({ name, value, onChange, onFileUpload, }: PropertyFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
