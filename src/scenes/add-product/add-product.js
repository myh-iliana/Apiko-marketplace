import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { values } from 'mobx';

import { useStore } from '../../stores/create-store';
import { routes } from '../routes';
import Header from '../../components/header/header';
import AddForm from './components/add-form';
import s from './add-product.module.scss';

const AddProduct = () => {
  // const [added, setAdded] = useState(false);
  const store = useStore();
  const files = values(store.files.items);

  const onSubmit = async ({ title, description, photos, location, price }) => {
    await store.userProducts.addProduct.run({
      title,
      description,
      photos: files,
      location,
      price: +price,
    });
  };

  return (
    <div className={s.container}>
      <Header />
      <AddForm onSubmit={onSubmit} />
      {/*{added && <Redirect to={routes.account} />}*/}
    </div>
  );
};

export default observer(AddProduct);
