{/*
 `Storage` User will determine what storage object will he/she be using.
 This way, user cant pass unnecessary string values
*/}
type StorageType = 'session' | 'local';

{/*
 `UseStorageReturnValue` This is just a return value type for our hook.
 We can add additional typings later.
*/}
type UseStorageReturnValue = {
  getItem: (key: string, type?: StorageType) => string;
};


const useStorage = (): UseStorageReturnValue => {
  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

  const getItem = (key: string, type?: StorageType): string => {
    const storageType: 'localStorage' | 'sessionStorage' = `${type ?? 'session'}Storage`;
    return isBrowser ? window[storageType][key] : '';
  };

  return {
    getItem,
  };
};

export default useStorage;