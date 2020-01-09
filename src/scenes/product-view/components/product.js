import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStore } from 'src/stores/create-store';
import { ReactComponent as Location } from 'src/components/svg/location.svg';
import Loader from '../../../components/loader/loader';
import s from './product.module.scss';
import Sidebar from './sidebar';

const Product = () => {
  const params = useParams();
  const store = useStore();
  const product = store.entities.products.collection.get(
    params.productId,
  );
  // eslint-disable-next-line prefer-destructuring
  const getProduct = store.entities.products.getProduct;
  const loading = store.entities.products.getProduct.isLoading;

  useEffect(() => {
    if (!product) {
      getProduct.run(params.productId);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <h1>Not found</h1>;
  }

  const {
    photos,
    title,
    createdAt,
    location,
    description,
    price,
    ownerId,
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
          <div className={s.descr}>{description}</div>
        </div>
      </div>

      <Sidebar id={ownerId} />
    </div>
  );
};

export default observer(Product);
