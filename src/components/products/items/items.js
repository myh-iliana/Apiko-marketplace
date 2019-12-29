import React from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../../stores/create-store';
import s from './items.module.scss';

const Items = () => {
  const store = useStore();
  const { items } = store.latestProducts;

  return (
    <ul className={s.container}>
      {items.map((item) => (
        <li key={item.id} className={s.item}>
          <div className={s.img}>
            <img
              className={s.img}
              src={
                item.photos[0]
                  ? item.photos[0]
                  : 'https://farm5.staticflickr.com/4363/36346283311_74018f6e7d_o.png'
              }
              alt={item.title}
            />
          </div>

          <div className={s.name}>{item.title}</div>
          <div className={s.price}>{item.price}</div>
        </li>
      ))}
    </ul>
  );
};

export default observer(Items);
