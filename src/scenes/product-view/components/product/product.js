import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import { ReactComponent as Location } from 'src/components/svg/location.svg';
import { useProductsCollection } from '../../../../stores/products/products-collection';
import Loader from '../../../../components/loader/loader';
import Sidebar from '../sidebar/sidebar';
import s from './product.module.scss';

const Product = () => {
  const { productId } = useParams();
  const collection = useProductsCollection();
  const product = collection.get(productId);

  useEffect(() => {
    if (!product || !product.owner) {
      collection.getProduct.run(productId);
    }
  }, []);

  if (collection.getProduct.isLoading) {
    return <Loader />;
  } else if (!product) {
    return <h1>Not found</h1>;
  }

  const {
    photos,
    title,
    createdAt,
    location,
    description,
    price,
    owner,
    saved,
  } = product;
  const date = new Date(createdAt);

  return (
    <div className={s.container}>
      <div className={s.post}>
        <div className={s.imgWrapper}>
          <img
            src={
              photos[0]
                ? photos[0]
                : 'https://farm5.staticflickr.com/4363/36346283311_74018f6e7d_o.png'
            }
            alt={title}
            className={s.img}
          />
          <div className={s.price}>${price}</div>
        </div>
        <div className={s.info}>
          <div>
            <h1 className={s.name}>{title}</h1>
            <span className={s.grey}>
              {date.toLocaleDateString()}
            </span>
          </div>
          <div className={s.locationWrapper}>
            <Location className={s.icon} />
            <span className={s.grey}>{location}</span>
          </div>
          <div className={s.line} />
          <pre className={s.description}>{description}</pre>
        </div>
      </div>

      {owner && <Sidebar owner={owner} saved={saved} />}
    </div>
  );
};

export default observer(Product);
