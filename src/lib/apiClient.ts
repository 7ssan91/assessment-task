import { http } from "../clients";

export const apiClient: any = (baseURL: string, req: any, res: any) => {
  const { lang, currencyIso } = {
    lang: "en",
    currencyIso: "SAR",
  };
  const headers: any = {
    lang: lang === "en" ? 1 : 0,
    currency: currencyIso,
  };
  const client = http({
    baseURL,
    headers,
  });
  return client;
};
