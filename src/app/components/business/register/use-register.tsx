import { useDocumentTitle } from 'usehooks-ts';

import { StateStatus } from '@types';
import { selectRegistrationState, useAppSelector } from '@store';
import { RegisterFailedForm, RegisterFirst, RegisterSecond, RegisterSuccessedForm, RegisterThird } from '@components';

export const useRegister = () => {
  const registerState = useAppSelector(selectRegistrationState);

  useDocumentTitle('Регистрация');

  const getCorrectForm = (): JSX.Element | null => {
    switch (registerState.status) {
      case StateStatus.Failed:
        return <RegisterFailedForm />;
      case StateStatus.Succeeded:
        return <RegisterSuccessedForm />;
    }

    switch (registerState.step) {
      case 1:
        return <RegisterFirst />;
      case 2:
        return <RegisterSecond />;
      case 3:
        return <RegisterThird />;
      default:
        return null;
    }
  };

  return {
    registerState,
    getCorrectForm,
  };
};
