import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { LocalStorageKeys } from '@utils';

export const useIsLogin = () => {
  const token = useReadLocalStorage<string>(LocalStorageKeys.Token);
  const [isLogin, setIsLogin] = useLocalStorage(LocalStorageKeys.Token, token);

  const removeToken = () => {
    setIsLogin(null);

    localStorage.removeItem(LocalStorageKeys.Token);
  };

  return {
    isLogin,
    setIsLogin,
    removeToken,
  };
};
