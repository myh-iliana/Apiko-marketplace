import React from 'react';
import { Formik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import s from './search.module.scss';
import { useStore } from '../../../stores/create-store';

const Search = () => {
  const store = useStore();
  const history = useHistory();
  const { search } = useLocation();
  const parsed = queryString.parse(search);

  const onSubmit = ({ search: keywords, location }) => {
    const query = `?${queryString.stringify({ keywords, location })}`;
    history.push({ search: query });
    store.latestProducts.fetchLatest.run(query);
  };

  const formikProps = {
    initialValues: {
      search: parsed.keywords || '',
      location: parsed.location || '',
    },

    onSubmit,
  };

  return (
    <div className={s.container}>
      <Formik {...formikProps}>
        {({ handleSubmit, handleChange, values }) => (
          <form className={s.container} onSubmit={handleSubmit}>
            <input
              type="search"
              name="search"
              className={s.input}
              placeholder="Search products by name"
              autoComplete="on"
              onChange={handleChange}
              value={values.search}
            />
            <input
              type="search"
              name="location"
              className={s.input}
              placeholder="Location"
              onChange={handleChange}
              value={values.location}
            />
            <button type="submit" className={s.btn}>
              Search
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Search;
