import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingResponseDto, BookingDto } from '@types';
import { api } from '@api';
import { ApiUrls } from '@utils';
import { SlicesName } from '@store';
import { AxiosResponse } from 'axios';

const Booking = createAsyncThunk<BookingDto, BookingDto>(`${SlicesName.Calendar}/BOOKING/ADD`, async (data) => {
  const bookingData: AxiosResponse<BookingDto> = await api.post(`${ApiUrls.BookingById}`, {
    data,
  });

  return bookingData.data;
});

const UpdateBooking = createAsyncThunk<BookingResponseDto, { dto: BookingDto; bookingId: number }>(
  `${SlicesName.Calendar}/BOOKING/UPDATE`,
  async (data) => {
    const bookingData: Awaited<AxiosResponse<BookingResponseDto>> = await api.put(
      `${ApiUrls.BookingById}/${data.bookingId}`,
      {
        data: data.dto,
      }
    );

    return bookingData.data;
  }
);

const DeleteBooking = createAsyncThunk<BookingResponseDto, number>(
  `${SlicesName.Calendar}/BOOKING/DELETE`,
  async (bookingId) => {
    const bookingData: Awaited<AxiosResponse<BookingResponseDto>> = await api.delete(
      `${ApiUrls.BookingById}/${bookingId}`
    );

    return bookingData.data;
  }
);

export const CalendarThunks = {
  Booking,
  UpdateBooking,
  DeleteBooking,
};
