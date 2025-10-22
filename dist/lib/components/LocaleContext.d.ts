import { ReactNode } from 'react';
interface LocaleContextType {
    locale: string;
    setLocale: (locale: string) => void;
}
export declare const useLocale: () => LocaleContextType;
interface LocaleProviderProps {
    children: ReactNode;
    defaultLocale?: string;
}
export declare const LocaleProvider: ({ children, defaultLocale }: LocaleProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};
