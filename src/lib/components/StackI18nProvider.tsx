// stack-page/src/lib/i18n/StackI18nProvider.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { StackI18n } from './types';

const StackI18nContext = createContext<StackI18n | null>(null);

export function StackI18nProvider({
  i18n,
  children,
}: {
  i18n: StackI18n;
  children: React.ReactNode;
}) {
  return (
    <StackI18nContext.Provider value={i18n}>
      {children}
    </StackI18nContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(StackI18nContext);
  if (!ctx) {
    return (key: string) => key;
  }
  return ctx.t;
}
