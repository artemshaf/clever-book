import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from 'usehooks-ts';

import { LocalStorageKeys, PAGES } from '@utils';
import { User, LoginData, StateStatus } from '@types';
import { useAccount, useIsLogin } from '@hooks';
import { selectLoginState, storeActions, useActions, useAppSelector } from '@store';

import { formResolver } from './resolver';

export const useLogin = () => {
  const form = useForm<LoginData>({
    resolver: formResolver,
    mode: 'all',
  });

  const loginState = useAppSelector(selectLoginState);
  const actions = useActions(storeActions);
  const navigate = useNavigate();
  const { setAccount } = useAccount();

  useDocumentTitle('Зайти в аккаунт');

  const onSubmit: SubmitHandler<LoginData> = (formData) => {
    actions.setLoginRequest(formData);
  };

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.Token);

    if (!token) return;

    if (loginState.status !== StateStatus.Succeeded) return;

    setAccount(JSON.parse(localStorage.getItem(LocalStorageKeys.Account) as string) as User);

    navigate(PAGES.HOME);
  }, [loginState.status, navigate, setAccount]);

  return {
    onSubmit: form.handleSubmit(onSubmit),
    form,
    loginState,
    actions,
    navigate,
  };
};
