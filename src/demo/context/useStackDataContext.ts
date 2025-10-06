import { useContext } from 'react';
import StackDataContext from './StackDataContext';
import type { StackDataContextType } from './StackDataContext';

export const useStackDataContext = (): StackDataContextType => {
  const context = useContext(StackDataContext);
  if (context === undefined) {
    throw new Error('useStackDataContext must be used within a StackDataProvider');
  }
  return context;
};