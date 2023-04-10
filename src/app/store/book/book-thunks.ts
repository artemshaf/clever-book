import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookDto, Book, CommentDto, CommentData, CommentResponseDto } from '@types';
import { api } from '@api';
import { ApiUrls } from '@utils';
import { SlicesName } from '@store';
import { AxiosResponse } from 'axios';

const GetBookById = createAsyncThunk<Book, BookDto>(`${SlicesName.Book}/BOOK/:id`, async (data, { getState }) => {
  const { data: bookData }: Awaited<AxiosResponse<Book>> = await api.get(`${ApiUrls.BookById + data.id}`);

  return bookData;
});

const AddCommentById = createAsyncThunk<CommentResponseDto, CommentDto>('BOOK/ADD-COMMENT/:id', async (data) => {
  console.log('thunk prop data', data);

  const comment: Awaited<AxiosResponse<CommentResponseDto>> = await api.post(`${ApiUrls.AddComment}`, {
    data,
  });

  return comment.data;
});

const UpdateCommentByCommentId = createAsyncThunk<CommentResponseDto, { dto: CommentDto; commentId: number }>(
  'BOOK/ADD-COMMENT/:id',
  async (data) => {
    const { dto, commentId } = data;

    const comment: Awaited<AxiosResponse<CommentResponseDto>> = await api.put(
      `${ApiUrls.UpdateCommentById + commentId}`,
      {
        data: dto,
      }
    );

    return comment.data;
  }
);

export const BookThunks = {
  GetBookById,
  UpdateCommentByCommentId,
  AddCommentById,
};
