import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  AccountAvatarDto,
  AccountAvatarResponseDto,
  AccountInfoDto,
  AccountResponseDto,
  UploadAccountAvatarDto,
} from '@types';
import { api } from '@api';
import { ApiUrls } from '@utils';
import { SlicesName } from '../slices-name';

const GetAccount = createAsyncThunk<AccountResponseDto, void>(`${SlicesName.Account}/GET`, async (_) => {
  const { data }: Awaited<AxiosResponse<AccountResponseDto>> = await api.get(ApiUrls.Profile);

  return data;
});

const UpdateAccount = createAsyncThunk<AccountResponseDto, { account: AccountInfoDto; user: number }>(
  `${SlicesName.Account}/UPDATE-DATA`,
  async (account) => {
    const { account: dto, user } = account;

    const { data }: Awaited<AxiosResponse<AccountResponseDto>> = await api.put(ApiUrls.ProfileUpdateById + user, {
      data: dto,
    });

    return data;
  }
);

const UploadAccountAvatar = createAsyncThunk<AccountAvatarResponseDto[], UploadAccountAvatarDto>(
  `${SlicesName.Account}/UPLOAD-AVATAR`,
  async (account) => {
    const formData = new FormData();

    formData.append('files', account.file);

    const { data }: Awaited<AxiosResponse<AccountAvatarResponseDto[]>> = await api.post(
      ApiUrls.ProfileAvatar,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  }
);

const UpdateAccountAvatar = createAsyncThunk<
  AccountResponseDto,
  { file: UploadAccountAvatarDto; avatarId: number; userId: number }
>(`${SlicesName.Account}/UPDATE-AVATAR`, async (account) => {
  const {
    file: { file },
    userId,
    avatarId,
  } = account;

  const formData = new FormData();

  formData.append('files', file);
  formData.append('avatar', String(avatarId));

  const { data }: Awaited<AxiosResponse<AccountResponseDto>> = await api.put(
    ApiUrls.ProfileUpdateById + userId,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
});

export const AccountThunks = {
  GetAccount,
  UpdateAccount,
  UpdateAccountAvatar,
  UploadAccountAvatar,
};
