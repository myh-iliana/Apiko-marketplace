import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Row from 'src/components/form/row/row';
import Button from 'src/components/form/button/button';
import Name from 'src/components/form/name/name';
import s from 'src/components/form/form.module.scss';

const RestoreForm = ({ onSubmit }) => {
  const formikProps = {
    initialValues: {
      email: '',
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Must be avalid email address')
        .max(255, 'Must be shorter than 255')
        .required("Can't be empty"),
    }),

    onSubmit,
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        <Name>Restore password</Name>
        <Formik {...formikProps}>
          {({ errors, handleSubmit }) => {
            const isEmpty = Object.entries(errors).length === 0;
            const isDisabled = !isEmpty;

            return (
              <form noValidate onSubmit={handleSubmit}>
                <Row
                  label="email"
                  type="email"
                  name="email"
                  placeholder="Example@gmail.com"
                />

                <Button disabled={isDisabled && 'disabled'}>
                  Continue
                </Button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

RestoreForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default observer(RestoreForm);
