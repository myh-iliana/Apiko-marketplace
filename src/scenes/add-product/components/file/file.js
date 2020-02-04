import React from 'react';
import { useField } from 'formik';
import { observer } from 'mobx-react';
import { values } from 'mobx';
import PropTypes from 'prop-types';

import { useStore } from 'src/stores/create-store';
import s from './file.module.scss';

const File = ({ label, setFieldValue, ...props }) => {
  const store = useStore();
  const [{ value, ...field }] = useField(props);
  const files = values(store.files.items);

  return (
    <div>
      <div className={s.label}>{label}</div>
      <div className={s.container}>
        <label htmlFor={field.name}>
          {files.length !== 0
            ? files.map((item) => (
                <div key={item} className={s.images} style={{ backgroundImage: `url(${item})` }} />
              ))
            : null}
          <div className={s.lines}>
            <div />
            <div />
          </div>
          <input id={field.name} className={s.input} type="file" multiple {...field} {...props} />
        </label>
      </div>
    </div>
  );
};

File.propTypes = {
  label: PropTypes.node,
  setFieldValue: PropTypes.func,
};

export default observer(File);
