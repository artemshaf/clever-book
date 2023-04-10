import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { selectCorrectGenreByPath, selectSearchStateText, selectTopPanelState, useAppSelector } from '@store';
import { BookListItem } from '@types';
import { getFilteredBooksByGenre, getFilteredBooksByText, getSortedBooks } from '@helpers';

type UseFilteredBooksProps = {
  books: BookListItem[] | null;
};

export const useFilteredBooks = ({ books }: UseFilteredBooksProps) => {
  const [correctBooks, setCorrectBooks] = useState(() => books);
  const filteredText = useAppSelector(selectSearchStateText);
  const location = useLocation();
  const splitedPath = location.pathname.split('/');
  const correctGenre =
    useAppSelector((state) => selectCorrectGenreByPath(state, splitedPath[splitedPath.length - 1] || '')) || '';
  const { sortedByRate, display, selectedGenre } = useAppSelector(selectTopPanelState);

  useEffect(() => {
    if (!books) return;

    let data = books;

    if (selectedGenre) {
      data = getFilteredBooksByGenre(data, selectedGenre);
    } else if (correctGenre) {
      data = getFilteredBooksByGenre(data, correctGenre);
    }

    if (filteredText) {
      data = getFilteredBooksByText(data, filteredText);
    }

    if (sortedByRate) {
      data = getSortedBooks(data, sortedByRate);
    }

    setCorrectBooks(data);
  }, [filteredText, correctGenre, books, sortedByRate, selectedGenre]);

  return {
    correctBooks,
    setCorrectBooks,
    filteredText,
    display,
    location,
  };
};
