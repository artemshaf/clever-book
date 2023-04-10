import { BookItemProps } from './book-item-types';
import { BookItemList } from './book-item-list';
import { BookItemTile } from './book-item-tile';

export const BookItem = ({
  location,
  filteredText,
  book,
  variantDisplay = 'list',
  className,
  ...props
}: BookItemProps) => {
  if (variantDisplay === 'tile') {
    return <BookItemTile location={location} filteredText={filteredText} book={book} {...props} />;
  }

  return <BookItemList location={location} filteredText={filteredText} book={book} {...props} />;
};
