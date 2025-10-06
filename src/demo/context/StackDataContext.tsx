import React, { createContext, useState, ReactNode } from 'react';
import { PageProps } from '@/lib/components/stackoptions';
import useLayoutStore from '@/demo/api';

// Define types for our context
export interface StackDataContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  loadPageList: () => Promise<PageProps[]>;
  loadPage: (pageId: string) => Promise<PageProps | boolean>;
  savePage: (pageProps: PageProps) => Promise<PageProps | boolean>;
  updatePage: (pageProps: PageProps) => Promise<PageProps | boolean>;
  deletePage: (pageId: string) => Promise<PageProps | boolean>;
  insertPage: (pageProps: PageProps) => Promise<PageProps | boolean>;
}

// Create the context with a default value
const StackDataContext = createContext<StackDataContextType | undefined>(undefined);

// Props interface for the provider
interface StackDataProviderProps {
  children: ReactNode;
}

export const StackDataProvider: React.FC<StackDataProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const layoutStore: any = useLayoutStore();

  const loadPageList = async (): Promise<PageProps[]> => {
    try {
      setLoading(true);
      return await layoutStore.getPageList() || [];
    } catch (error) {
      console.error('Failed to load page list:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadPage = async (pageId: string): Promise<PageProps | boolean> => {
    try {
      setLoading(true);
      return await layoutStore.getPageById(pageId);
    } catch (error) {
      console.error('Data loading error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const savePage = async (pageProps: any): Promise<PageProps | boolean> => {
    try {
      return await layoutStore.savePage(pageProps);
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  };

  const updatePage = async (pageProps: any): Promise<PageProps | boolean> => {
    try {
      return await layoutStore.updatePage(pageProps);
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  };

  const deletePage = async (pageId: string): Promise<PageProps | boolean> => {
    try {
      return await layoutStore.deletePage(pageId);
    } catch (error) {
      console.error('Data deleting error:', error);
      return false;
    }
  };

  const insertPage = async (pageProps: any): Promise<PageProps | boolean> => {
    try {
      return await layoutStore.insertPage(pageProps);
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  };

  // Using JSX instead of React.createElement for better TypeScript support
  return (
    <StackDataContext.Provider
      value={{
        loading,
        setLoading,
        loadPageList,
        loadPage,
        savePage,
        insertPage,
        updatePage,
        deletePage,
      }}
    >
      {children}
    </StackDataContext.Provider>
  );
};

export default StackDataContext;