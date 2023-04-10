import { ReactNode } from 'react';

import { INestedList } from '../data';

export const getPrettyOfferList = (list: INestedList): ReactNode => (
  <ol>
    {list.map((item) =>
      item.items ? (
        <li>
          {item.text}
          {getPrettyOfferList(item.items)}
        </li>
      ) : (
        <li>{item.text}</li>
      )
    )}
  </ol>
);
