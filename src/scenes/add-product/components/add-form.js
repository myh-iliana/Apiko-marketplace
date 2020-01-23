import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { observer } from 'mobx-react';
import * as Yup from 'yup';

import { useStore } from 'src/stores/create-store';
import Row from 'src/components/form/row/row';
import Button from 'src/components/form/button/button';
import Name from 'src/components/form/name/name';
import styles from 'src/components/form/form.module.scss';
import Loader from 'src/components/loader/loader';
import Container from 'src/components/container/container';

import File from './file/file';
import s from './add-form.module.scss';

const AddForm = ({ onSubmit }) => {
  const store = useStore();
  const { isLoading } = store;
  const formikProps = {
    initialValues: {
      title: '',
      location: '',
      photos: [],
      description: '',
      price: '',
    },

    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .max(255, 'Must be shorter than 255')
        .required("Can't be empty"),
      location: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .max(255, 'Must be shorter than 255')
        .required("Can't be empty"),
      price: Yup.number().required("Can't be empty"),
    }),

    onSubmit,
  };

  return (
    <Container>
      <div className={s.container}>
        <div className={`${styles.form} ${s.form}`}>
          <Name>Add product</Name>
          <Formik {...formikProps}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className={s.formAlign}>
                <Row
                  label="title"
                  type="text"
                  name="title"
                  placeholder="For example: Iron man suit"
                  required
                />
                <Row
                  label="location"
                  type="text"
                  name="location"
                  placeholder="For example: Los Angeles, CA"
                  required
                />
                <Row
                  label="description"
                  type="textarea"
                  name="description"
                  placeholder="For example: Iron man suit"
                />
                <File
                  name="photos"
                  label="photos"
                  onChange={async (e) => {
                    await store.files.upload.run(e.currentTarget.files);
                  }}
                />
                <Row
                  label="price"
                  type="text"
                  name="price"
                  placeholder="For example: 100"
                  required
                />
                {isLoading ? (
                  <Loader />
                ) : (
                  <Button disabled={isLoading && 'disabled'} className={s.btn}>
                    SUBMIT
                  </Button>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

AddForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default observer(AddForm);
