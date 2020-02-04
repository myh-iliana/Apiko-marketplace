import React, { useState } from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';

import { Error } from '../../messages/messages';
import { ReactComponent as Eye } from './eye.svg';
import s from './row.module.scss';

const Row = ({ label, type, required = false, ...props }) => {
  const [show, setShow] = useState(false);
  const [field, meta] = useField(props);

  const showPassword = () => setShow(!show);
  const isPassword = type === 'password';
  const isTextarea = type === 'textarea';
  const passwordFieldType = isPassword && show ? 'text' : 'password';
  const fieldType = isPassword ? passwordFieldType : type;

  return (
    <>
      <label className={s.row} htmlFor={field.name}>
        <div className={s.label}>
          {label} <span className={s.star}>{required && '*'}</span>
        </div>
        {isTextarea ? (
          <textarea
            {...field}
            {...props}
            className={s.field}
            style={{ height: '12rem', padding: '1rem' }}
          >
            {meta.value}
          </textarea>
        ) : (
          <input {...field} {...props} type={fieldType} className={s.field} value={meta.value} />
        )}
        {isPassword ? (
          <Eye
            className={s.eye}
            fill={show ? 'red' : 'black'}
            onClick={showPassword}
            onKeyDown={(e) => e.keyCode === 13 && showPassword()}
            role="button"
            tabIndex={0}
          />
        ) : null}
      </label>
      {meta.touched && meta.error && <Error>{meta.error}</Error>}
    </>
  );
};

Row.propTypes = {
  label: PropTypes.node,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default Row;
