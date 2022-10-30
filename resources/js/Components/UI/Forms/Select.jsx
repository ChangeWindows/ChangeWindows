import React from 'react';

import clsx from 'clsx';

export default function Select({
  disabled,
  value,
  label,
  helper,
  id,
  errors,
  onChange,
  nullProps,
  selects,
  selectLabel,
  selectValue
}) {
  return (
    <>
      <div
        className={
          clsx(
            'form-floating w-100',
            { 'is-invalid': errors }
          )
        }
      >
        <select
          className="form-select"
          id={id}
          defaultValue={value}
          onChange={onChange}
          disabled={disabled}
        >
          {!!nullProps && <option value={nullProps.value} disabled={!nullProps.selectable}>{nullProps.label}</option>}
          {selects.map((item, key) => (
            <option value={selectValue(item)} key={key}>
              {selectLabel(item)}
            </option>
          ))}
        </select>
        <label htmlFor={id}>{label}</label>
      </div>
      {errors &&
        <div className="invalid-feedback">{errors}</div>
      }
      {!!helper && <small className="form-text">{helper}</small>}
    </>
  )
}
