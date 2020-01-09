import React from 'react';
import { observer } from 'mobx-react';
import { Link, generatePath } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './item.module.scss';
import { routes } from '../../../scenes/routes';
import Saved from '../../svg/saved';

const Item = ({ product }) => {
  const { id, photos, title, saved, price } = product;
  const link = generatePath(routes.product, {
    productId: id,
  });

  return (
    <>
      <div className={s.img}>
        <Link to={link} className={s.link} href={link}>
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
      <Link to={link} className={s.link} href={link}>
        <div className={s.name}>{title}</div>
      </Link>
      <div className={s.price}>${price}</div>
    </>
  );
};

Item.propTypes = {
  product: PropTypes.object,
};

export default observer(Item);
