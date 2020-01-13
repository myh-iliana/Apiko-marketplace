/* eslint-disable prefer-destructuring */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { useStore } from 'src/stores/create-store';
import Loader from '../../../components/loader/loader';
import s from './sidebar.module.scss';
import Saved from '../../../components/svg/saved';

const Sidebar = ({ id }) => {
  const store = useStore();
  const owner = store.entities.users.collection.get(id);
  const getUser = store.entities.users.getUser;
  const isLoading = store.entities.users.getUser.isLoading;

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

  return (
    <div className={s.sidebar}>
      <div className={s.author}>
        <div
          className={s.avatar}
          style={{ backgroundImage: `url(${avatar})` }}
        />
        <div className={s.authorName}>{fullName}</div>
        {location && (
          <div className={s.authorLocation}>{location}</div>
        )}
      </div>

      <div className={s.btns}>
        <button>Chat with seller</button>
        <button>
          <Saved fill="#535353" />
          <span>Add to favorite</span>
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  id: PropTypes.number,
};

export default observer(Sidebar);
