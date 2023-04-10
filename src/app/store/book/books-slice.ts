import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book, Booking, BookingResponseDto, BookListItem, StateStatus, User } from '@types';
import { LoadingConstants } from '@utils';
import { BooksThunks, RootState, SlicesName } from '@store';

interface IBookInitialState {
  status: StateStatus;
  error: string | null;
  books: BookListItem[] | null;
  currentBook: Book | null;
}

const name = SlicesName.Books;

const initialState: IBookInitialState = {
  status: StateStatus.Idle,
  error: null,
  books: null,
  currentBook: null,
};

export const booksSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInitial: (state) => {
      state = initialState;
    },
    updateBooking: (state, action: PayloadAction<{ bookId: number; booking: BookingResponseDto; account: User }>) => {
      const bookingObject: Booking = {
        customerFirstName: String(action.payload.account.firstName),
        customerId: action.payload.account.id,
        customerLastName: String(action.payload.account.lastName),
        dateOrder: new Date(action.payload.booking.data.attributes.dateOrder),
        id: action.payload.booking.data.id,
        order: action.payload.booking.data.attributes.order,
      };

      const book = state.books?.find((b) => b.id === action.payload.bookId);

      if (book) {
        book.booking = bookingObject;
      }
    },
    deleteBooking: (state, action: PayloadAction<{ bookId: number }>) => {
      const { bookId } = action.payload;
      const book = state.books?.find((b) => b.id === bookId);

      if (book) {
        book.booking = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BooksThunks.getBooks.pending, (state) => {
        state.error = null;
      })
      .addCase(BooksThunks.getBooks.fulfilled, (state, action: PayloadAction<BookListItem[]>) => {
        state.error = null;
        state.books = action.payload;
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
        }
      )
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Pending) && action.type.startsWith(name),
        (state, _) => {
          state.status = StateStatus.Pending;
        }
      );
  },
});

export const { reducer: booksReducer, actions: booksActions } = booksSlice;

export const selectBooksState = (state: RootState) => state.books;
