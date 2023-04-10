import { DetailedHTMLProps, LiHTMLAttributes } from 'react';
import { AccountBook, Book, BookListItem, DataTestIds, Genre, TopPanelSortByRate, User } from '@types';
import { Typography } from '@components';
import { ALL_BOOKS_CATEGORY_NAME } from '@utils';

export const getFilteredBooksByText = (books: BookListItem[], filteredText: string): BookListItem[] => {
  if (!filteredText) return books;

  const result = books.filter((item) => item.title.toLowerCase().includes(filteredText.toLowerCase()));

  return result;
};

export const getFilteredBooksByGenre = (books: BookListItem[], genre: Omit<Genre, 'id'>) =>
  genre.name === ALL_BOOKS_CATEGORY_NAME
    ? books
    : books.filter((book) => book.categories.map((item) => item.toLowerCase()).includes(genre.name.toLowerCase()));

export const getCorrectNameBreadcrumbsByGenre = (genres: Genre[], path: string) =>
  genres.find((gnr) => gnr.path === path)?.name || ALL_BOOKS_CATEGORY_NAME;

export const getSortedBooks = (books: BookListItem[], sortType: TopPanelSortByRate): BookListItem[] => {
  if (!sortType) return books;

  const result = JSON.parse(JSON.stringify(books)) as BookListItem[];

  if (sortType === 'asc') {
    result.sort((a, b) => {
      if (!a.rating) {
        return 1;
      }
      if (!b.rating) {
        return -1;
      }

      return b.rating - a.rating;
    });

    return result;
  }

  result.sort((a, b) => {
    if (!a.rating) {
      return -1;
    }
    if (!b.rating) {
      return 1;
    }

    return a.rating - b.rating;
  });

  return result;
};

export interface IBookTextWithFilter extends DetailedHTMLProps<LiHTMLAttributes<HTMLElement>, HTMLLIElement> {
  title: string;
  filteredText?: string;
}

const getCorrectTextArray = (text: string, filter: string): string[] => {
  const regExp = new RegExp(filter, 'ig');
  const matchesArray: string[] = [];
  const matches = text.match(regExp);

  if (!matches) {
    matchesArray.push(text);

    return matchesArray;
  }

  text.split(regExp).map((item, index, array) => {
    const lastIndex = array.length - 1;

    matchesArray.push(item);

    if (index < lastIndex) {
      const matchText = matches.shift() as string;

      matchesArray.push(matchText);
    }

    return item;
  });

  return matchesArray;
};

export const GetCorrectTextWithFilter = ({ title, filteredText, ...props }: IBookTextWithFilter) => {
  if (!filteredText) {
    return (
      <Typography variant='span' {...props}>
        {title}
      </Typography>
    );
  }

  const splitedTitle = getCorrectTextArray(title, filteredText);

  return (
    <Typography {...props}>
      {splitedTitle.map((item, index) => {
        if (index % 2 === 0) {
          return <Typography style={{ display: 'inline' }}>{item}</Typography>;
        }

        return (
          <Typography data-test-id={DataTestIds.HighlightMatches} className='highlight-search-text'>
            {item}
          </Typography>
        );
      })}
    </Typography>
  );
};
