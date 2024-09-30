import Cookies from 'js-cookie';

export const cookieStore = {
  setCookie: (
    cookieName: string,
    cookieValue: string,
    cookieInfo: any = {
      expires: 730,
      path: '/',
    }
  ): void => {
    Cookies.set(cookieName, cookieValue, { ...cookieInfo });
  },
  getCookie: (cookieName: string): string => {
    return Cookies.get(cookieName) || '';
  },
  delCookie: (cookieName: string): void => {
    Cookies.remove(cookieName);
  },
};
