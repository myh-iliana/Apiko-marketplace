import React, { useState } from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';

import { Error } from '../../messages/messages';
import { ReactComponent as Eye } from './eye.svg';
import s from './row.module.scss';

const Row = ({ label, type, ...props }) => {
  const [show, setShow] = useState(false);
  const [field, meta] = useField(props);

  const showPassword = () => setShow(!show);
  const isPassword = type === 'password';
  const passwordFieldType = isPassword && show ? 'text' : 'password';
  const fieldType = isPassword ? passwordFieldType : type;

  return (
    <>
      <label className={s.row} htmlFor={field.name}>
        <div className={s.label}>{label}</div>
        <input
          {...field}
          {...props}
          type={fieldType}
          className={s.field}
        />
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
};

export default Row;
