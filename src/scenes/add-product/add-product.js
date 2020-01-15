import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import AddForm from './components/add-form';
import { useStore } from '../../stores/create-store';
import Header from '../../components/header/header';
import s from './add-product.module.scss';
import { routes } from '../routes';

const AddProduct = () => {
  const [added, setAdded] = useState(false);
  const store = useStore();

  const onSubmit = async ({
    title,
    description,
    photos,
    location,
    price,
  }) => {
    await store.viewer.edit
      .run({ title, description, photos, location, price })
      .then(() => setAdded(true));
  };

  return (
    <div className={s.container}>
      <Header />
      <AddForm onSubmit={onSubmit} />
      {added && <Redirect to={routes.account} />}
    </div>
  );
};

export default observer(AddProduct);
