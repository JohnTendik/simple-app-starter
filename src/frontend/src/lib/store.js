import React, {createContext, useReducer} from 'react';

const initialState = {
  appName: 'MVP App Starter'
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'updateAppName': {
        return {...state, appName: action.value};
      }
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }