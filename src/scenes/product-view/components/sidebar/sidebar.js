/* eslint-disable prefer-destructuring */
import React from 'react';
import { useParams, Link, generatePath } from 'react-router-dom';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Saved from '../../../../components/svg/saved';
import s from './sidebar.module.scss';
import { routes } from '../../../routes';
import Avatar from '../../../../components/avatar/avatar';
import { useProductsCollection } from '../../../../stores/products/products-collection';

const Sidebar = ({ owner, saved }) => {
  const { productId } = useParams();
  const { save, removeFromSaved } = useProductsCollection();
  const saveProduct = () => save.run(productId);
  const removeProduct = () => removeFromSaved.run(productId);

  const { fullName, location, avatar, id } = owner;
  const link = generatePath(routes.account, {
    userId: id,
  });

  return (
    <div className={s.sidebar}>
      <div className={s.author}>
        <Link to={link} href={link} className={s.link}>
          <Avatar avatar={avatar} size={4.2} />
          <div className={s.authorName}>{fullName}</div>
        </Link>
        {location && (
          <div className={s.authorLocation}>{location}</div>
        )}
      </div>

      <div className={s.btns}>
        <button>Chat with seller</button>
        <button onClick={saved ? removeProduct : saveProduct}>
          <Saved
            color={saved ? '#349A89' : '#B7B7B7'}
            fullFill={saved}
          />
          <span>Add to favorite</span>
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  owner: PropTypes.object,
  saved: PropTypes.bool,
};

export default observer(Sidebar);
