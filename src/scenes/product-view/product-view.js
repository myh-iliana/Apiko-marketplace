import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/create-store';
import Loader from '../../components/loader/loader';
import Header from '../../components/header/header';
import Product from './components/product';
import s from './product-view.module.scss';

const ProductView = () => {
  return (
    <>
      <Header />
      <Product />
    </>
  );
};

export default observer(ProductView);
