import React, {createContext, useReducer} from 'react';

import { getCurrentUserFromStorage } from './helpers';

const initialState = {
  appName: 'MVP App Starter',
  currentUser: getCurrentUserFromStorage(),
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'updateAppName': {
        return {...state, appName: action.value};
      }
      case 'updateCurrentUser': {
        return {...state, currentUser: action.value};
      }
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }