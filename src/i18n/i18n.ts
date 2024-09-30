import translations from "./ar.json";

export type KeyValueString = { [key: string]: string };

export const i18n = (
  language: string = "en",
  translationsData: KeyValueString = {}
): any => {
  const allTranslations: KeyValueString = {
    ...translations,
    ...translationsData,
  };

  const __T = (_key: string, vars: any = {}) => {
    const key = _key.toLowerCase();
    const args = Object.keys(vars);
    if (language === "ar") {
      if (allTranslations?.[key]) {
        const result = allTranslations?.[key] || _key;
        return args.length > 0
          ? args.reduce(
              (acc, val) => acc.replace(`{${val}}`, vars[val]),
              result
            )
          : result;
      }
      return args.length > 0
        ? args.reduce((acc, val) => acc.replace(`{${val}}`, vars[val]), _key)
        : _key;
    }
    return args.length > 0
      ? args.reduce((acc, val) => acc.replace(`{${val}}`, vars[val]), _key)
      : _key;
  };

  const __TK = (enValue?: string, arValue?: string) => {
    return language === "ar" ? arValue : enValue;
  };

  return {
    __T,
    __TK,
  };
};
