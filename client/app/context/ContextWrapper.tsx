// components/ClientProviders.tsx
'use client';

import { ReactNode } from 'react';
import { TransactionProvider } from './TransactionContext';

const  ContextWrapper = ({ children }: { children: ReactNode }) => {
  return <TransactionProvider>{children}</TransactionProvider>;
}

export default ContextWrapper
