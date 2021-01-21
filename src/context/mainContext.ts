import React from 'react';
import { useRootContext } from './contextHook';

export const ReactUIContext = React.createContext<
  ReturnType<typeof useRootContext>
>(null);
