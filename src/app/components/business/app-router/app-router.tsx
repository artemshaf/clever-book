import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { authRoutes, publicRoutes } from '@data';
import { storeActions, useActions } from '@store';
import { LocalStorageKeys, PAGES } from '@utils';
import { Layout } from '@components';
import { getKey } from '@helpers';
import { useAccount } from '@hooks';

export const AppRouter = () => {
  const token = useReadLocalStorage<string>(LocalStorageKeys.Token);
  const [isLogin, setIsLogin] = useLocalStorage(LocalStorageKeys.Token, token);
  const { account } = useAccount();
  const actions = useActions(storeActions);

  useEffect(() => {
    if (!isLogin || !account) return;

    actions.setAccountData(account);
  }, [isLogin, actions, account]);

  return (
    <Routes>
      {!isLogin && publicRoutes.map(({ element, path }) => <Route key={path} path={path} element={element} />)}
      {isLogin && (
        <Route path='/' element={<Layout />}>
          {authRoutes.map(({ element, path }) => (
            <Route key={getKey()} path={path} element={element} />
          ))}
          <Route path='/' key='private-route-home' element={<Navigate to={PAGES.HOME} replace={true} />} />
        </Route>
      )}
      <Route path='*' key='route-all' element={<Navigate to={token ? PAGES.HOME : PAGES.LOGIN} replace={true} />} />
    </Routes>
  );
};
