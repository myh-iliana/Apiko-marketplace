/* eslint-disable prefer-destructuring */
import React, { useState } from 'react';
import { useParams, Link, generatePath, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from 'src/components/form/button/button';
import Saved from '../../../../components/svg/saved';
import { routes } from '../../../routes';
import Avatar from '../../../../components/avatar/avatar';
import { useProductsCollection } from '../../../../stores/products/products-collection';
import Name from '../../../../components/form/name/name';
import s from './sidebar.module.scss';
import Row from '../../../../components/form/row/row';
import { Error } from '../../../../components/messages/messages';

const Sidebar = ({ owner, saved }) => {
  const [isVisible, setIsVisible] = useState(false);
  const history = useHistory();
  const { productId } = useParams();
  const { save, removeFromSaved, collection } = useProductsCollection();
  const { title, createChat } = collection.get(productId);
  const { fullName, location, avatar, id } = owner;
  const link = generatePath(routes.account, {
    userId: id,
  });

  const saveProduct = () => save.run(productId);
  const removeProduct = () => removeFromSaved.run(productId);
  const handleChatOpen = () => setIsVisible(true);
  const handleChatClose = () => setIsVisible(false);

  const onSubmit = async ({ message }) => {
    try {
      const chatId = await createChat.run(message);
      setIsVisible(false);
      history.push(generatePath(routes.chat, { chatId }));
    } catch {
      console.log();
    }
  };

  const formikProps = {
    initialValues: {
      message: '',
    },

    validationSchema: Yup.object().shape({
      message: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .required("Can't be empty"),
    }),

    onSubmit,
  };

  const customStyles = {
    content: {
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '870px',
      padding: '17px 78px 34px 78px',
      boxSizing: 'border-box',
      position: 'relative',
      border: 'none',
      borderRadius: '7px',
      boxShadow: '0px 2px 42px rgba(0, 0, 0, 0.111233)',
    },

    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.37)',
    },
  };

  return (
    <div className={s.sidebar}>
      <div className={s.author}>
        <Avatar avatar={avatar} size={4.2} />
        <Link to={link} href={link} className={s.link}>
          <div className={s.authorName}>{fullName}</div>
        </Link>
        {location && <div className={s.authorLocation}>{location}</div>}
      </div>

      <>
        <div className={s.btns}>
          <button onClick={handleChatOpen}>Chat with seller</button>
          <button onClick={saved ? removeProduct : saveProduct}>
            <Saved color={saved ? '#349A89' : '#B7B7B7'} fullFill={saved} />
            <span>Add to favorite</span>
          </button>
        </div>

        <Modal isOpen={isVisible} onRequestClose={handleChatClose} style={customStyles}>
          <Name>Contact seller</Name>
          <button className={s.cross} onClick={handleChatClose}>
            &#x2716;
          </button>
          <div className={s.title}>Subject: {title}</div>
          <div className={s.owner}>
            <Avatar avatar={avatar} size={4.2} />
            <div className={s.ownerInfo}>
              <div>{fullName}</div>
              <div>{location}</div>
            </div>
          </div>
          <Formik {...formikProps}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className={s.form}>
                <Row
                  label="message"
                  type="textarea"
                  name="message"
                  placeholder="For example: Iron man suit"
                />
                <Error>{createChat.errorMsg}</Error>

                <Button className={s.btn}>Submit</Button>
              </form>
            )}
          </Formik>
        </Modal>
      </>
    </div>
  );
};

Sidebar.propTypes = {
  owner: PropTypes.object,
  saved: PropTypes.bool,
};

export default observer(Sidebar);
