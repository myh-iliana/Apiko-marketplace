import React from 'react';
import { observer } from 'mobx-react';
import { Link, generatePath } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './item.module.scss';
import { routes } from '../../../scenes/routes';
import Saved from '../../svg/saved';
import { useProductsCollection } from '../../../stores/products/products-collection';

const Item = ({ product }) => {
  const { id, photos, title, saved, price } = product;
  const { save, removeFromSaved } = useProductsCollection();
  const saveProduct = (productId) => save.run(productId);
  const removeProduct = (productId) => removeFromSaved.run(productId);
  const link = generatePath(routes.product, {
    productId: id,
  });

  return (
    <>
      <div className={s.img}>
        <Link to={link} className={s.link} href={link}>
          <div
            className={s.img}
            style={{
              background: `url(${
                photos[0]
                  ? photos[0]
                  : 'https://farm5.staticflickr.com/4363/36346283311_74018f6e7d_o.png'
              }) center/cover no-repeat`,
            }}
          />
        </Link>
        <span className={s.saved}>
          <Saved
            color={saved ? '#349A89' : '#B7B7B7'}
            fullFill={saved}
            onClick={() => (saved ? removeProduct(id) : saveProduct(id))}
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
