import { crypto } from '../crypto';
import { STORAGE_KEYS } from '../constants';

export const localStore = {
  get: (key: string, encrypted: boolean = true): any => {
    if (typeof window !== 'undefined' && window?.localStorage) {
      const value = window.localStorage.getItem(key) || null;
      if (value) {
        if (encrypted) {
          return crypto.decrypt(value);
        }
        return value;
      }
      return null;
    }
    return false;
  },
  set: (
    key: string,
    data: any,
    encrypted: boolean = true
  ): boolean | undefined => {
    if (typeof window !== 'undefined' && window?.localStorage) {
      if (encrypted) {
        const encData = crypto.encrypt(data);
        window.localStorage.setItem(key, encData);
        return true;
      }
      window.localStorage.setItem(key, data);
      return true;
    }
    return false;
  },
  del: (key: string): void => {
    if (typeof window !== 'undefined' && window?.localStorage) {
      window.localStorage.removeItem(key);
    }
  },
  getAuthToken: (): string | null => {
    return localStore.get(STORAGE_KEYS.AUTH_TOKEN) || null;
  },
  isLoggedIn: (): boolean => {
    return !!localStore.getAuthToken();
  },
 
  // setUniqIDToStore: (uniqId: string, encode: boolean = true): void => {
  //   localStore.set(
  //     STORAGE_KEYS.AUTH_UID,
  //     encode ? btoa(uniqId) : uniqId,
  //     false
  //   );
  // },
  setLangToLocalStorage: (lang: string) => {
    localStore.set(STORAGE_KEYS.LANG, lang, true);
  },
  getLangFromLocalStorage: (): string | null => {
    return localStore.get(STORAGE_KEYS.LANG, true) || null;
  },
  clearLocalStore: (): void => {
    localStore.del(STORAGE_KEYS.AUTH_TOKEN);
    localStore.del(STORAGE_KEYS.USER_ID);
    // localStore.del(STORAGE_KEYS.AUTH_UID);
  },
  addMinutes: (date: Date, minutes: number): Date => {
    return new Date(new Date(date).getTime() + minutes * 60000);
  },
  gDate: (date: Date, addMinutes = 0): Date => {
    const back = localStore.addMinutes(date, addMinutes);
    return back;
  },
  getTimeStamp: <T>(Id: string): StorageWTime<T> => {
    const back: StorageWTime<any> = new StorageWTime<any>();
    const data = localStore.get(Id);
    if (data) {
      try {
        const result = JSON.parse(crypto.decrypt(data)) as StorageWTime<T>;
        const now = new Date();
        if (now < localStore.gDate(result.expireDate)) {
          result.HasValue = true;
          return result;
        }
      } catch (error) {
        return back;
      }
    }
    return back;
  },
  setWithTimeStamp: <T>(Id: string, Data: any, expireDate: Date): void => {
    const result: StorageWTime<T> = new StorageWTime<T>();
    result.Data = Data;
    result.expireDate = expireDate;
    const Fresult = crypto.encrypt(JSON.stringify(result));
    localStore.set(Id, Fresult);
  },

};

export class StorageWTime<T> {
  public Data: T | undefined;
  public expireDate: Date = new Date();
  public HasValue: boolean = false;
}
