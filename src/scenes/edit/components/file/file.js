import React from 'react';
import { useField } from 'formik';

import Avatar from '../../../../components/avatar/avatar';
import s from './file.module.scss';

const File = ({ label, ...props }) => {
  const [{ value, ...field }, meta] = useField(props);

  return (
    <div className={s.container}>
      <Avatar size={6.25} avatar={value} />
      <label htmlFor={field.name} className={s.label}>
        <span>{label}</span>
        <input
          id={field.name}
          className={s.input}
          type="file"
          {...field}
          {...props}
        />
      </label>
    </div>
  );
};

export default File;
