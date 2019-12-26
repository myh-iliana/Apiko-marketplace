import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import * as Yup from 'yup';

import Row from 'src/components/form/row/row';
import Button from 'src/components/form/button/button';
import Bottom from 'src/components/form/bottom/bottom';
import Name from 'src/components/form/name/name';
import { Error } from 'src/components/messages/messages';
import { useStore } from 'src/stores/create-store';
import s from 'src/components/form/form.module.scss';

import { routes } from '../../routes';
import Loader from '../../../components/loader/loader';

const LoginForm = ({ onSubmit }) => {
  const store = useStore();
  const { isLoading, errorMsg: error } = store.auth.login;
  const wrongData = {
    check: error === 'NOT_FOUND' || error === 'WRONG_PASSWORD',
    msg: 'Wrong email and/or password',
  };

  const formikProps = {
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Must be a valid email address')
        .max(255, 'Must be shorter than 255')
        .required("Can't be empty"),
      password: Yup.string()
        .min(5, 'Must have minimum 5 characters')
        .required("Can't be empty"),
    }),

    onSubmit,
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        <Name>Login</Name>
        <Formik {...formikProps}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Row
                label="email"
                type="email"
                name="email"
                placeholder="Example@gmail.com"
              />
              <Row label="password" type="password" name="password" />
              {wrongData.check && <Error>{wrongData.msg}</Error>}

              <div className={s.restore}>
                <Link to={routes.restore} href={routes.restore}>
                  Don’t remember password?
                </Link>
              </div>

              {isLoading ? (
                <Loader />
              ) : (
                <Button disabled={isLoading && 'disabled'}>
                  Continue
                </Button>
              )}
            </form>
          )}
        </Formik>
      </div>
      <Bottom
        to={routes.register}
        text="I have no account, "
        link="REGISTER NOW"
      />
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default observer(LoginForm);
