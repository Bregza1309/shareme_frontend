import { State, Action, AppContextType, initialState } from './utils/types';
import { createContext, useReducer, Dispatch, ReactNode, useContext } from 'react';
import { reducer } from './utils/utility';

const AppContext = createContext<AppContextType>({
  ...initialState,
  dispatch: () => {},
});
type Props = {
  children: ReactNode;
};
const AppProvider = ({ children }: Props) => {
  const [{ user, searchTerm, loading }, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ user, searchTerm, dispatch, loading }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
export const useAppContext = () => useContext(AppContext);
