import { BookListItem, DataTestIds, Genre } from '@types';
import { INestedMenuItem } from '@data';

export type MenuNavigation = DataTestIds.Navigation | DataTestIds.Burger;

const getGenresWithCount = (genres: Genre[], books: BookListItem[], type: MenuNavigation = DataTestIds.Navigation) => {
  const genresWithCount: INestedMenuItem[] = [...genres];

  genres.map((item, index) => {
    genresWithCount[index] = {
      ...item,
      itemsCount: 0,
      dataTestId: `${type}-${item.path}`,
      dataTestIdCount: `${type}-book-count-for-${item.path}`,
    };

    return item;
  });

  books.map((book) =>
    book.categories.map((cat) =>
      genresWithCount.map((genre) => {
        if (!genre.itemsCount) {
          genre.itemsCount = 0;
        }

        const isGenreEqual = genre.name.toLowerCase().trim() === cat.toLowerCase().trim();

        if (isGenreEqual) {
          genre.itemsCount += 1;
        }

        return genre;
      })
    )
  );

  return genresWithCount;
};

export function generateMenuData(
  genres: Genre[],
  menu: INestedMenuItem[],
  type: MenuNavigation = DataTestIds.Navigation,
  books?: BookListItem[]
) {
  const copy = JSON.parse(JSON.stringify(menu));

  const data = copy.reduce((acc: INestedMenuItem[], curr: INestedMenuItem, index: number) => {
    if (index > 0) {
      acc.push(curr);

      return acc;
    }

    if (!curr.items) {
      acc.push(curr);

      return acc;
    }

    if (!books) {
      curr.items.push(...genres);

      acc.push(curr);

      return acc;
    }

    const genresWithCount = getGenresWithCount(genres, books, type);

    curr.items.push(...genresWithCount);

    acc.push(curr);

    return acc;
  }, []);

  return data;
}
