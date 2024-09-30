import { useContext } from "react";
import { AxiosInstance } from "axios";
import { AppContext } from "../context/AppContext";
import { http } from "../clients";

export const useFetch = (baseURL = "/"): AxiosInstance => {
  const app = useContext(AppContext);
  const { appState } = app;
  
  const client = http({
    baseURL,
    headers: {
      lang: appState?.lang === "en" ? 1 : 0,
    },
  });
  return client;
};
