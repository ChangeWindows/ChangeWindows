import clsx from 'clsx';
import React from 'react';

export default function Checkbox({
  className,
  value = 1,
  checked,
  label,
  id,
  name,
  disabled,
  errors,
  onChange,
  helper
}) {
  return (
    <div className={clsx('form-check', className)}>
      <input
        className={
          clsx(
            'form-check-input',
            { 'is-invalid': errors }
          )
        }
        type="checkbox"
        value={value}
        id={id}
        name={name ?? id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
        {!!helper &&
          <small className="form-text">{helper}</small>
        }
      </label>
      {errors &&
        <div className="invalid-feedback">{errors}</div>
      }
    </div>
  )
}
