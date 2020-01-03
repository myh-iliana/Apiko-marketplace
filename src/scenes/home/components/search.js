import React from 'react';
import s from './search.module.scss';

const Search = () => {
  return (
    <div className={s.container}>
      <select className={s.select}>
        <option selected hidden disabled>
          Choose Category
        </option>
        <option className={s.option}>option1</option>
        <option className={s.option}>option2</option>
        <option className={s.option}>option3</option>
      </select>
      <input
        type="text"
        className={s.input}
        placeholder="Price from (USD)"
      />{' '}
      <div className={s.line}></div>
      <input
        type="text"
        className={s.input}
        placeholder="Price to (USD)"
      />
    </div>
  );
};

export default Search;
