import React from 'react';
import { observer } from 'mobx-react';
import Header from '../../components/header/header';
import Product from './components/product';
import s from './product-view.module.scss';

const ProductView = () => {
  return (
    <>
      <Header search />
      <Product />
    </>
  );
};

export default observer(ProductView);
