import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { User } from '@types';
import Cookies from 'js-cookie';
import { CookiesKeys, LocalStorageKeys } from '@utils';
import { useCallback } from 'react';
import { storeActions, useActions } from '@store';

export const useAccount = () => {
  const actions = useActions(storeActions);
  const accountInfo = useReadLocalStorage<User>(LocalStorageKeys.Account);
  const [account, setAccount] = useLocalStorage(LocalStorageKeys.Account, accountInfo);

  const setAcc = useCallback(
    (user: User) => {
      setAccount(user);
      actions.setAccountData(user);
      Cookies.set(CookiesKeys.Account, JSON.stringify(user), { expires: 7 });
    },
    [setAccount, actions]
  );

  const removeAccount = () => {
    setAccount(null);
    Cookies.remove(CookiesKeys.Account);
    localStorage.removeItem(LocalStorageKeys.Account);
  };

  const getAccountInfo = () => {
    if (account) return account;

    const user = Cookies.get(CookiesKeys.Account);

    if (user) return JSON.parse(user) as User;

    return null;
  };

  return {
    account: getAccountInfo(),
    setAccount: setAcc,
    removeAccount,
  };
};
