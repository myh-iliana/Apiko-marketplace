import React, { useEffect } from 'react';
import { NavLink, useParams, generatePath } from 'react-router-dom';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { useStore } from '../../../stores/create-store';
import Avatar from '../../../components/avatar/avatar';
import Loader from '../../../components/loader/loader';
import { useUsersCollection } from '../../../stores/users/users-collection';
import { routes } from '../../routes';
import s from './user.module.scss';

const User = ({ listings }) => {
  const store = useStore();
  const { collection, getUser } = useUsersCollection();
  const { user: viewer } = store.viewer;
  const { isLoading } = getUser;
  const { userId } = useParams();
  const user = viewer.id === userId ? viewer : collection.get(userId);
  const link = generatePath(routes.userProducts, { userId });
  const linkFeedbacks = generatePath(routes.userFeedbacks, {
    userId,
  });
  const linkSales = generatePath(routes.userSales, { userId });

  useEffect(() => {
    getUser.run(userId);
  }, [userId]);

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    const { avatar, fullName, location } = user;

    return (
      <>
        <Avatar avatar={avatar} size={6} className={s.avatar} />
        <div className={s.name}>{fullName}</div>
        <div className={s.location}>{location}</div>
        <div className={s.info}>
          <NavLink
            to={linkFeedbacks}
            className={s.item}
            activeClassName={s.active}
          >
            88% <div>Positive feedback</div>
          </NavLink>
          <NavLink
            to={linkSales}
            className={s.item}
            activeClassName={s.active}
          >
            123 <div>Sales</div>
          </NavLink>
          <NavLink
            className={s.item}
            to={link}
            activeClassName={s.active}
          >
            {listings} <div>Active listings</div>
          </NavLink>
        </div>
      </>
    );
  }

  return <h2>Cannot find user</h2>;
};

User.propTypes = {
  listings: PropTypes.number,
};

export default observer(User);
