import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Row from 'src/components/form/row/row';
import Button from 'src/components/form/button/button';
import Bottom from 'src/components/form/bottom/bottom';
import Name from 'src/components/form/name/name';
import { Error } from 'src/components/messages/messages';
import Loader from 'src/components/loader/loader';

import s from 'src/components/form/form.module.scss';
import { useStore } from '../../../stores/create-store';
import { routes } from '../../routes';

const RegisterForm = ({ onSubmit }) => {
  const store = useStore();
  const { isLoading, errorMsg: error } = store.auth.register;
  const emsilExist = {
    check: error === 'EMAIL_ALREADY_USED',
    msg: 'Email already used',
  };

  const formikProps = {
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      passConfirm: '',
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Must be a valid email address')
        .max(255, 'Must be shorter than 255')
        .required("Can't be empty"),
      fullName: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .max(255, 'Must be shorter than 255')
        .required("Can't be empty"),
      password: Yup.string()
        .min(5, 'Must have minimum 5 characters')
        .required("Can't be empty"),
      passConfirm: Yup.string()
        .min(5, null)
        .required("Can't be empty"),
    }),

    onSubmit,
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        <Name>Register</Name>
        <Formik {...formikProps}>
          {({ values, errors, handleSubmit }) => {
            const isEmpty = Object.entries(errors).length === 0;
            const isMatch = values.password === values.passConfirm;
            const isDisabled = !isEmpty || !isMatch || isLoading;

            return (
              <form noValidate onSubmit={handleSubmit}>
                <Row
                  label="email"
                  type="email"
                  name="email"
                  placeholder="Example@gmail.com"
                />
                {emsilExist.check && <Error>{emsilExist.msg}</Error>}
                <Row
                  label="full name"
                  type="text"
                  name="fullName"
                  placeholder="Tony Stark"
                />
                <Row
                  label="password"
                  type="password"
                  name="password"
                />
                <Row
                  label="password again"
                  type="password"
                  name="passConfirm"
                />
                {!isMatch && <Error>Passwords do not match</Error>}

                {isLoading ? (
                  <Loader />
                ) : (
                  <Button disabled={isDisabled && 'disabled'}>
                    Register
                  </Button>
                )}
              </form>
            );
          }}
        </Formik>
      </div>
      <Bottom
        to={routes.login}
        text="I already have an account, "
        link="LOG IN"
      />
    </div>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default observer(RegisterForm);
