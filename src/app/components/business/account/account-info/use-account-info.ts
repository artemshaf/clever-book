import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImportantAccountData, storeActions, useActions } from '@store';
import { toast } from '@components';
import { formResolver } from './resolver';
import { AccountInfoStatusText } from '@types';

type useAccountInfoProps = {
  defaultValues: ImportantAccountData;
};

export const useAccountInfo = ({ defaultValues }: useAccountInfoProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const actions = useActions(storeActions);
  const form = useForm<ImportantAccountData>({
    defaultValues,
    mode: 'all',
    resolver: formResolver,
  });

  const getChangedFields = (data: ImportantAccountData) => {
    const watchedFields = form.watch();

    const fields = Object.keys(watchedFields);

    return fields.filter(
      (key) => data[key as keyof ImportantAccountData] !== defaultValues[key as keyof ImportantAccountData]
    );
  };

  const getChangedValues = (fields: string[]) => {
    const values = form.getValues();
    const objectWithValues: Record<string, unknown> = {};

    fields.map((key) => {
      objectWithValues[key] = values[key as keyof ImportantAccountData];

      return key;
    });

    return objectWithValues;
  };

  const handleIsEdit = () => {
    if (isEdit) {
      form.reset();
    }
    setIsEdit((prev) => !prev);
  };

  const onSubmit: SubmitHandler<ImportantAccountData> = async (account) => {
    if (!defaultValues.id) return;

    const onlyChangedFields = getChangedFields(account);
    const onlyChangedValues = getChangedValues(onlyChangedFields);
    const dto: Record<string, unknown> = {};

    Object.keys(onlyChangedValues).map((key) => {
      if (key === 'login') {
        dto.username = onlyChangedValues.login;

        return key;
      }

      dto[key] = onlyChangedValues[key];

      return key;
    });

    await actions
      .UpdateAccount({
        account: {
          ...dto,
        },
        user: defaultValues.id,
      })
      .unwrap()
      .then(async () => {
        toast.success(AccountInfoStatusText.Success);
      })
      .catch(() => toast.error(AccountInfoStatusText.Failed));

    await actions.GetAccount();
  };

  return {
    isEdit,
    setIsEdit,
    onSubmit: form.handleSubmit(onSubmit),
    form,
    handleIsEdit,
  };
};
