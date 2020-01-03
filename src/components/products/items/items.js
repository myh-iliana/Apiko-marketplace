import React from 'react';
import { observer } from 'mobx-react';
import { Link, generatePath } from 'react-router-dom';

import { useStore } from '../../../stores/create-store';
import s from './items.module.scss';
import { routes } from '../../../scenes/routes';
import Saved from '../../svg/saved';

const Items = () => {
  const store = useStore();
  const { items } = store.latestProducts;

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {items.map(({ id, photos, title, price, saved }) => {
          const link = generatePath(routes.product, {
            productId: id,
          });

          return (
            <li key={id} className={s.item}>
              <div className={s.img}>
                <Link to={link} className={s.link}>
                  <img
                    className={s.img}
                    src={
                      photos[0]
                        ? photos[0]
                        : 'https://farm5.staticflickr.com/4363/36346283311_74018f6e7d_o.png'
                    }
                    alt={title}
                  />
                </Link>
                <span className={s.saved}>
                  <Saved
                    color={saved ? '#349A89' : '#B7B7B7'}
                    fullFill={saved}
                  />
                </span>
              </div>
              <Link to={link} className={s.link}>
                <div className={s.name}>{title}</div>
              </Link>
              <div className={s.price}>${price}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default observer(Items);
