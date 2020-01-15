import React from 'react';
import { useField } from 'formik';
import { observer } from 'mobx-react';

import s from './file.module.scss';
import { useStore } from '../../../../stores/create-store';

const File = ({ label, ...props }) => {
  const store = useStore();
  const [{ value, ...field }, meta] = useField(props);

  return (
    <div>
      <div className={s.label}>{label}</div>
      <div className={s.container}>
        <label htmlFor={field.name}>
          {store.files.items.length !== 0
            ? store.files.items.map((item) => (
                <div
                  className={s.images}
                  style={{ backgroundImage: `url(${item})` }}
                />
              ))
            : null}
          <div className={s.lines}>
            <div />
            <div />
          </div>
          <input
            id={field.name}
            className={s.input}
            type="file"
            multiple
            {...field}
            {...props}
          />
        </label>
      </div>
    </div>
  );
};

export default observer(File);
