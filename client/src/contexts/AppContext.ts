import { createContext, useContext } from 'react';

type AppContextType = {
  me: number;
};
type AppContextHook = () => AppContextType;

export const AppContext = createContext<AppContextType>({
  me: -1,
});

export const useAppContext: AppContextHook = () => (
  useContext(AppContext)
);