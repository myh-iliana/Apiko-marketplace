import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Item from '../item/item';
import s from './list.module.scss';

const List = ({ items }) => {
  return (
    <ul className={s.list}>
      {items.map((item) => {
        return (
          <li key={item.id} className={s.item}>
            <Item product={item} key={item.id} />
          </li>
        );
      })}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.array,
};

export default observer(List);
