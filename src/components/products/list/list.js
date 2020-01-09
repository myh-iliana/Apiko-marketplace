import React from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../../stores/create-store';
import Item from '../item/item';
import s from './list.module.scss';

const List = () => {
  const store = useStore();
  const { items } = store.latestProducts;

  return (
    <ul className={s.list}>
      {items.map((item) => {
        return (
          <li key={item.id} className={s.item}>
            <Item product={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default observer(List);
