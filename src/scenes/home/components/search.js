import React from 'react';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import queryString from 'query-string';

import s from './search.module.scss';
import { useStore } from '../../../stores/create-store';
import { useQuery } from '../../routes';

const Search = () => {
  const store = useStore();
  const { search } = useLocation();
  const { priceFrom, priceTo } = queryString.parse(search);
  const { submit } = useQuery();

  const onChange = (e) => {
    const { name, value } = e.target;
    const query = submit({ [name]: value });
    store.latestProducts.fetchLatest.run(query);
  };

  const formikProps = {
    initialValues: {
      priceFrom: priceFrom || '',
      priceTo: priceTo || '',
    },

    validationSchema: Yup.object().shape({
      priceFrom: Yup.number(),
      priceTo: Yup.number(),
    }),
  };

  return (
    <div className={s.container}>
      <Formik {...formikProps}>
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit} onChange={onChange}>
            <select
              className={s.select}
              defaultValue="Choose Category"
            >
              <option hidden disabled>
                Choose Category
              </option>
              <option className={s.option}>option1</option>
              <option className={s.option}>option2</option>
              <option className={s.option}>option3</option>
            </select>
            <div className={s.price}>
              <input
                type="text"
                name="priceFrom"
                className={s.input}
                placeholder="Price from (USD)"
                onChange={handleChange}
                value={values.priceFrom}
              />
              <div className={s.line} />
              <input
                type="text"
                name="priceTo"
                className={s.input}
                placeholder="Price to (USD)"
                onChange={handleChange}
                value={values.priceTo}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Search;
