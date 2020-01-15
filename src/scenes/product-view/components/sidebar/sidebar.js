/* eslint-disable prefer-destructuring */
import React, { useEffect } from 'react';
import { useParams, Link, generatePath } from 'react-router-dom';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { useStore } from 'src/stores/create-store';
import Loader from '../../../../components/loader/loader';
import Saved from '../../../../components/svg/saved';
import s from './sidebar.module.scss';
import { routes } from '../../../routes';
import Avatar from '../../../../components/avatar/avatar';

const Sidebar = ({ id, saved }) => {
  const { productId } = useParams();
  const store = useStore();
  const owner = store.entities.users.collection.get(id);
  const getUser = store.entities.users.getUser;
  const isLoading = store.entities.users.getUser.isLoading;
  const saveProduct = () =>
    store.entities.products.save.run(productId);
  const removeProduct = () =>
    store.entities.products.removeFromSaved.run(productId);

  useEffect(() => {
    if (!owner) {
      getUser.run(id);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!owner) {
    return <h2>Cannot find owner</h2>;
  }

  const { fullName, location, avatar } = owner;
  const link = generatePath(routes.account, {
    userId: owner.id,
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
  id: PropTypes.number,
  saved: PropTypes.bool,
};

export default observer(Sidebar);
