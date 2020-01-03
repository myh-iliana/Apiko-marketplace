import React from 'react';

import s from './search.module.scss';

const Search = () => {
  return (
    <div className={s.container}>
      <input
        type="text"
        className={s.input}
        placeholder="Search products by name"
      />
      <input type="text" className={s.input} placeholder="Location" />
      <button type="submit" className={s.btn}>
        Search
      </button>
    </div>
  );
};

export default Search;
