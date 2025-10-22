export declare function StatusButton({ onClick, icon, label, className, successMessage, errorMessage, }: {
    onClick: () => Promise<void>;
    icon: React.ReactNode;
    label: string;
    className?: string;
    successMessage?: string;
    errorMessage?: string;
}): import("react/jsx-runtime").JSX.Element;
