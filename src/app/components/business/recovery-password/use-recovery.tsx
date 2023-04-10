import { useSearchParams } from 'react-router-dom';
import { useDocumentTitle } from 'usehooks-ts';

import { selectRecoveryState, storeActions, useActions, useAppSelector } from '@store';
import {
  RecoveryFailedForm,
  RecoveryFirst,
  RecoveryMailForm,
  RecoverySecond,
  RecoverySuccessedForm,
} from '@components';
import { StateStatus } from '@types';

export const useRecovery = () => {
  const recoveryState = useAppSelector(selectRecoveryState);
  const [searchParams, setSearchParams] = useSearchParams();
  const actions = useActions(storeActions);

  useDocumentTitle('Восстановление пароля');

  const getCorrectForm = (): JSX.Element | null => {
    const code = searchParams.get('code');

    if (code && recoveryState.status === StateStatus.Idle) {
      actions.setRecoveryStep(2);

      return <RecoverySecond code={code} />;
    }

    switch (recoveryState.step) {
      case 1:
        return <RecoveryFirst />;
      case 'mail':
        return <RecoveryMailForm />;
    }

    switch (recoveryState.status) {
      case StateStatus.Failed:
        return <RecoveryFailedForm />;
      case StateStatus.Succeeded:
        return <RecoverySuccessedForm />;
    }

    return null;
  };

  return {
    recoveryState,
    getCorrectForm,
  };
};
