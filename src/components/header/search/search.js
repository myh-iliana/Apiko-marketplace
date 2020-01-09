import React from 'react';

import s from './search.module.scss';

const Search = () => {
  return (
    <div className={s.container}>
      <form className={s.container}>
        <input
          type="search"
          name="search"
          className={s.input}
          placeholder="Search products by name"
          autoComplete="on"
        />
        <input
          type="text"
          className={s.input}
          placeholder="Location"
        />
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
