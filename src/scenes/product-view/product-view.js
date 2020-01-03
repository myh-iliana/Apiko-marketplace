import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/create-store';
import Loader from '../../components/loader/loader';

const ProductView = () => {
  const params = useParams();
  const product = useStore((store) =>
    store.entities.products.collection.get(params.productId),
  );
  const getProduct = useStore(
    (store) => store.entities.products.getProduct,
  );

  useEffect(() => {
    if (!product) {
      getProduct.run(params.productId);
    }
  }, []);

  if (!product) {
    return <h1>Not found</h1>;
  }

  return (
    <div>
      <span>{product.title}</span>
    </div>
  );
};

export default observer(ProductView);
