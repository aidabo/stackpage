interface PageTabProps {
    onFileUpload?: (file: File) => Promise<string>;
    onGetTags?: () => Promise<Array<string>>;
}
export declare const PageTab: ({ onFileUpload, onGetTags }: PageTabProps) => import("react/jsx-runtime").JSX.Element;
export {};
