// HTTP HEADER DEFAULT VALUES
export * from './appConfigs';

export const API_SERVICE_URLS = {
  USER: process.env.SERVICE_URL,
};

export const API_ENDPOINTS = {
  client:'client'
}
export const formatUrlParams = (
  urlPath: string,
  params: { [key: string]: any }
): string => {
  const args = Object.keys(params);
  return args.length > 0
    ? args.reduce((acc, val) => acc.replace(`{${val}}`, params[val]), urlPath)
    : urlPath;
};
