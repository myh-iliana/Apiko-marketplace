import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { generatePath, Redirect } from 'react-router-dom';
import { values } from 'mobx';

import { useStore } from '../../stores/create-store';
import { routes } from '../routes';
import Header from '../../components/header/header';
import AddForm from './components/add-form';
import s from './add-product.module.scss';

const AddProduct = () => {
  const [redirect, setRedirect] = useState(false);
  const store = useStore();
  const { isError, isLoading } = store.userProducts.addProduct;
  const files = values(store.files.items);
  const userId = store.viewer.user.id;
  const link = generatePath(routes.account, { userId });

  const onSubmit = async ({ title, description, photos, location, price }) => {
    await store.userProducts.addProduct
      .run({
        title,
        description,
        photos: files,
        location,
        price: +price,
      })
      .then(() => !isError && !isLoading && setRedirect(true));
  };

  return (
    <div className={s.container}>
      <Header />
      <AddForm onSubmit={onSubmit} />
      {redirect && <Redirect to={link} />}
    </div>
  );
};

export default observer(AddProduct);
