import React, { createContext, useEffect, useReducer } from 'react';
import { APP_CONFIGS } from '../clients/configs';

export interface AppContextProps {
  isAppLoading?: boolean;
  lang?: string;
  isArabic?: boolean;
  globalData?: any;
  activePageUrl?: string;
  hostname?: string;
  ssrAuthenticated?: boolean;
  ssrAuthUser?: string;
}

export interface AppStateActionProps {
  type: string;
  payload?: any;
}

export const defaultAppContext: AppContextProps = {
  isAppLoading: true,
  lang: 'en',
  isArabic: false,
  globalData: {},
  activePageUrl: '/',
  ssrAuthUser: '',
  ssrAuthenticated: false
};

export const SET_APP_LOADING = 'SET_APP_LOADING';
export const SET_APP_READY = 'SET_APP_READY';
export const SET_APP_GLOBAL_DATA = 'SET_APP_GLOBAL_DATA';

export const AppContext = createContext<any>(defaultAppContext);

export const appReducer = (
  state: AppContextProps,
  action: AppStateActionProps
): any => {

  switch (action.type) {
    case SET_APP_LOADING:
      return { ...state, isAppLoading: action.payload };
    case SET_APP_READY:
      return { ...state, ...action.payload };
    case SET_APP_GLOBAL_DATA:

      return {
        ...state,
        globalData: {
          ...state.globalData,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const AppContextProvider: React.FC<{
  pathname?: string;
  hostname?: string;
  children?: any;
  initSSRprops?: AppContextProps;
}> = ({ initSSRprops = {}, ...props }) => {
  const { pathname, hostname } =
    typeof window !== 'undefined'
      ? window.location
      : { pathname: props?.pathname || '/', hostname: props?.hostname || '' };

  const [appState, appDispatch] = useReducer(appReducer, {
    ...defaultAppContext,
    ...initSSRprops,
  });
  const appConfigs = {
    pathname,
    hostname,
    config: APP_CONFIGS,
    appState,
    appDispatch,
  };


  return (
    <AppContext.Provider value={appConfigs}>
      {props?.children}
    </AppContext.Provider>
  );
};
