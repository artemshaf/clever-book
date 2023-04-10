import { useCallback, useEffect } from 'react';
import { FreeMode, Pagination } from 'swiper';
import { AccountAvatarStatusText, AccountResponseDto } from '@types';
import {
  selectAccountImportantData,
  selectAccountState,
  selectFileState,
  storeActions,
  useActions,
  useAppSelector,
} from '@store';
import { toast } from '@components';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { SwiperProps } from 'swiper/react';

export const useAccount = () => {
  const accountState = useAppSelector(selectAccountState);
  const { account: accountFile } = useAppSelector(selectFileState);
  const actions = useActions(storeActions);
  const accountInfo = useAppSelector(selectAccountImportantData);
  const handleFileSelect = (file: File) => {
    actions.setAccountFile(file);
  };

  const initPage = useCallback(async () => {
    await Promise.all([actions.getBooks(), actions.getGenreList(), actions.GetAccount()]);
  }, [actions]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  useEffect(() => {
    const profileAvatar = async (userProfile: AccountResponseDto, file: File) => {
      try {
        const uploadedData = await actions.UploadAccountAvatar({ file }).unwrap();

        if (!uploadedData[0]) {
          throw new Error('Ошибка загрузки аватара!');
        }

        const updateAvatarData = await actions.UpdateAccountAvatar({
          avatarId: uploadedData[0].id,
          file: { file },
          userId: userProfile.id,
        });

        if (!updateAvatarData.payload) {
          throw new Error('Ошибка загрузки аватара!');
        }

        const account = await actions.GetAccount().unwrap();

        if (!account) {
          throw new Error('Ошибка получения новых данных профиля!');
        }

        toast.success(AccountAvatarStatusText.Success);
      } catch (error) {
        toast.error(AccountAvatarStatusText.Failed);
      }
    };

    if (accountFile && accountState.profile) {
      profileAvatar(accountState.profile, accountFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFile]);

  const swiperSliderProps: SwiperProps = {
    pagination: {
      clickable: true,
      bulletClass: 'account__swiper__bullet',
      bulletActiveClass: 'account__swiper__bullet_active',
    },
    slidesPerView: 4,
    breakpoints: {
      1000: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      765: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      500: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
    grabCursor: true,
    spaceBetween: 30,
    modules: [Pagination, FreeMode],
    wrapperTag: 'ul',
  };

  return {
    swiperSliderProps,
    handleFileSelect,
    accountInfo,
    accountState,
    accountFile,
  };
};
