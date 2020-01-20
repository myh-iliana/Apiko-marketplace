import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { observer } from 'mobx-react';
import * as Yup from 'yup';

import Row from 'src/components/form/row/row';
import Button from 'src/components/form/button/button';
import Name from 'src/components/form/name/name';
import { useStore } from 'src/stores/create-store';
import s from 'src/components/form/form.module.scss';

import Loader from '../../../components/loader/loader';
import File from './file/file';

const EditForm = ({ onSubmit }) => {
  const store = useStore();
  const viewer = store.viewer.user;
  const { isLoading } = store.viewer.edit;
  // eslint-disable-next-line max-len
  const phoneRegExp = /^(?:(\+))?(?:[0-9]{0,3}[\s.\/-]?)?(?:(?:\((?=\d{3}\)))?(\d{3})(?:(?!\(\d{3})\))?[\s.\/-]?)?(?:(?:\((?=\d{3}\)))?(\d{3})(?:(?!\(\d{3})\))?[\s.\/-]?)?(?:(?:\((?=\d{4}\)))?(\d{4})(?:(?!\(\d{4})\))?[\s.\/-]?)?$/;
  const formikProps = {
    initialValues: {
      fullName: viewer.fullName,
      phone: viewer.phone === null ? '' : viewer.phone,
      avatar: viewer.avatar === null ? '' : viewer.avatar,
      location: viewer.location === null ? '' : viewer.location,
    },

    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .max(255, 'Must be shorter than 255')
        .required("Can't be empty"),
      phone: Yup.string().matches(
        phoneRegExp,
        'Phone number is not valid',
      ),
    }),

    onSubmit,
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        <Name>Edit profile</Name>
        <Formik {...formikProps}>
          {({ handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <File
                name="avatar"
                label="Upgrade Photo"
                onChange={async (e) => {
                  await store.files.upload.run(e.currentTarget.files);
                }}
                setFieldValue={setFieldValue}
              />

              <Row label="full name" type="text" name="fullName" />
              <Row
                label="phone number"
                type="text"
                name="phone"
                placeholder="+91(980)-995-9215"
              />

              {isLoading ? (
                <Loader />
              ) : (
                <Button disabled={isLoading && 'disabled'}>
                  Save
                </Button>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default observer(EditForm);
