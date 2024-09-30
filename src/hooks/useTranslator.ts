import { i18n, KeyValueString } from "../i18n";
import { useApp } from "./useApp";

export const useTranslator = (additionalString: KeyValueString = {}): any => {
  const {
    appState: { lang },
  } = useApp();

  const { __T, __TK } = i18n(lang, additionalString);
  return { __T, __TK };
};
