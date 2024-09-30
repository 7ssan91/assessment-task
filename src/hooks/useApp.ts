import { useContext } from "react";
import { externalHttp, formatHttpError, formatHttpResponse } from "../clients";
import { API_ENDPOINTS, API_SERVICE_URLS } from "../clients/configs";
import {
  AppContext,
  AppContextProps,
  SET_APP_LOADING,
  SET_APP_READY,
} from "../context/AppContext";
import { useFetch } from "./useFetch";

export interface GetLoyaltyProgramsReqProps {
  sessionType: number;
  userId: number;
  currency: string;
  isArabic: boolean;
}

export interface AppHookInterface {
  appState: AppContextProps;
  appDispatch: any;
  lang: string;
  pathname: string;
  hostname: string;
  config: any;
  setLang: (lang: string | null) => Promise<any>;
}

export const useApp = (): AppHookInterface => {
  const app = useContext(AppContext);
  const { appDispatch } = app;
  const client = useFetch(API_SERVICE_URLS.USER);
  const externalApiClient = externalHttp({
    baseURL: "",
  });
  //Set app context data
  const setAppData = ({ lang }: { lang: string }) => {
    const isArabic = lang === "ar" || false;
    appDispatch({
      type: SET_APP_READY,
      payload: {
        isAppLoading: false,
        lang,
        isArabic,
      },
    });
  };
  const setLang = async (lang = "en") => {
    try {
      setAppData({
        lang,
      });
    } catch (error: any) {
      console.error("useApp:getAllOpsCountries", error);
      return formatHttpError(error);
    }
  };

  return {
    ...app,
    setAppData,
    setLang,
  };
};
