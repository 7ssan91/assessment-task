export * from "./apiClient";
export const redirectToRoute = (
  path: string = "/",
  replace?: boolean
): null => {
  if (typeof window !== "undefined") {
    if (replace) {
      window.location.replace(path);
    } else {
      window.location.href = path;
    }
  }
  return null;
};
