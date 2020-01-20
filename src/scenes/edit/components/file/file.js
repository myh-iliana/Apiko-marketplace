import React, { useEffect } from 'react';
import { useField } from 'formik';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Avatar from '../../../../components/avatar/avatar';
import s from './file.module.scss';
import { useStore } from '../../../../stores/create-store';

const File = ({ label, setFieldValue, ...props }) => {
  const [{ value, ...field }] = useField(props);
  const store = useStore();
  const { avatar } = store.viewer.user;
  const file = store.files.items[0] || avatar;

  useEffect(() => {
    setFieldValue('avatar', file);
  }, [file]);

  return (
    <div className={s.container}>
      <Avatar size={6.25} avatar={file} />
      <label htmlFor="avatar" className={s.label}>
        <span>{label}</span>
        <input
          id="avatar"
          className={s.input}
          type="file"
          {...field}
          {...props}
        />
      </label>
    </div>
  );
};

File.propTypes = {
  label: PropTypes.node,
  setFieldValue: PropTypes.func,
};

export default observer(File);
