import classNames from 'classnames';
import { Button, Loader, Modal, Rating, toast, Typography } from '@components';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ModalReviewProps } from './modal-review-types';

import styles from './modal-review.module.scss';
import { CommentDto, DataTestIds, ReviewsStatusText, ReviewsUpdateStatusText, User } from '@types';
import { selectAccountState, storeActions, useActions, useAppSelector } from '@store';
import { formResolver } from './resolver';
import { scrollTop } from '@helpers';
import { useState } from 'react';

export const ModalReview = ({
  initialData,
  commentId,
  isProfile,
  book,
  open,
  setOpen,
  className,
  ...props
}: ModalReviewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: accountData } = useAppSelector(selectAccountState);

  const { handleSubmit, control, reset } = useForm<CommentDto>({
    defaultValues: { book: +book.id, user: accountData?.id, rating: 1, text: '', ...initialData },
    resolver: formResolver,
  });

  const actions = useActions(storeActions);

  const onSubmit: SubmitHandler<CommentDto> = async (data) => {
    if (!accountData) return;

    setIsLoading(true);

    if (commentId) {
      await actions
        .UpdateCommentByCommentId({
          dto: data,
          commentId,
        })
        .unwrap()
        .then(async () => {
          if (isProfile) {
            await actions.GetAccount();
          } else {
            await actions.GetBookById({ id: data.book });
          }

          toast.success(ReviewsUpdateStatusText.Success);
        })
        .catch(() => {
          toast.error(ReviewsUpdateStatusText.Failed);
        });
    } else {
      await actions
        .AddCommentById({
          ...data,
        })
        .unwrap()
        .then(async () => {
          await actions.GetBookById({ id: data.book });

          toast.success(ReviewsStatusText.Success);
        })
        .catch(() => {
          toast.error(ReviewsStatusText.Failed);
        });
    }

    setIsLoading(false);
    reset();
    setOpen(false);
    scrollTop();
  };

  if (isLoading) return <Loader />;

  if (!open) return null;

  return (
    <Modal
      data-test-id={DataTestIds.BookModalWrapper}
      open={open}
      setOpen={setOpen}
      withClose={true}
      className={classNames(styles.modal, className)}
      {...props}
    >
      <Typography className={styles.title} data-test-id={DataTestIds.ModalTitle} variant='h4'>
        Оцените книгу
      </Typography>
      <Typography className={styles.mark} variant='span'>
        Ваша оценка
      </Typography>
      <form id='hook-form' className={styles.form} data-test-id=''>
        <Controller
          name='rating'
          control={control}
          render={({ field: { value, onChange } }) => (
            <Rating
              data-test-id={DataTestIds.StarWrapper}
              onRatingChange={onChange}
              className={styles.rating}
              rate={value}
              isChanged={true}
            />
          )}
        />
        <Controller
          name='text'
          control={control}
          render={({ field: { value, onChange } }) => (
            <textarea
              value={value}
              onChange={onChange}
              data-test-id={DataTestIds.Comment}
              className={styles.area}
              placeholder='Оставить отзыв'
            />
          )}
        />

        <Button
          type='submit'
          onClick={handleSubmit(onSubmit)}
          data-test-id={DataTestIds.ButtonComment}
          className={styles.btn}
        >
          оценить
        </Button>
      </form>
    </Modal>
  );
};
