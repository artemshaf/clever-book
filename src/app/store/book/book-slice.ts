import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountResponseDto, Book, Comment, CommentResponseDto, StateStatus, User } from '@types';
import { LoadingConstants } from '@utils';
import { BookThunks, RootState, SlicesName } from '@store';

interface IBookInitialState {
  status: StateStatus;
  error: string | null;
  book: Book | null;
}

const name = SlicesName.Book;

const initialState: IBookInitialState = {
  status: StateStatus.Idle,
  error: null,
  book: null,
};

export const bookSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInitial: (state) => {
      state = initialState;
    },
    addCommentToBook: (state, action: PayloadAction<{ comment: CommentResponseDto; user: AccountResponseDto }>) => {
      const comment: Comment = {
        id: action.payload.comment.data.id,
        createdAt: new Date(action.payload.comment.data.attributes.createdAt),
        rating: action.payload.comment.data.attributes.rating,
        text: action.payload.comment.data.attributes.text,
        user: {
          avatarUrl: action.payload.user.avatar,
          commentUserId: action.payload.user.id,
          firstName: action.payload.user.firstName,
          lastName: action.payload.user.lastName,
        },
      };

      state.book?.comments?.push(comment);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BookThunks.GetBookById.pending, (state) => {
        state.status = StateStatus.Pending;
      })
      .addCase(BookThunks.GetBookById.fulfilled, (state, action: PayloadAction<Book>) => {
        state.book = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Rejected) && action.type.startsWith(name),
        (state, action) => {
          state.status = StateStatus.Failed;
          state.error = action.payload || action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Fulfilled) && action.type.startsWith(name),
        (state, _) => {
          state.status = StateStatus.Succeeded;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Pending) && action.type.startsWith(name),
        (state, _) => {
          state.error = null;
          state.status = StateStatus.Pending;
          state.book = null;
        }
      );
  },
});

export const { reducer: bookReducer, actions: bookActions } = bookSlice;

export const selectBookState = (state: RootState) => state.book;
