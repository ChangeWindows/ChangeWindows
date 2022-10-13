import React, { forwardRef } from "react";

import clsx from "clsx";

const TextField = forwardRef(({
  type = "text",
  disabled,
  value,
  label,
  helper,
  id,
  name,
  placeholder,
  errors,
  onChange,
  prefix,
  minHeight = 120,
  className,
  disableFloating,
  onFocus
}, ref) => {
  return (
    <>
      <div className={clsx("input-group w-100", className)}>
        {!!prefix && <span className="input-group-text">{prefix}</span>}
        <div
          className={clsx("flex-grow-1", {
            "form-floating": !disableFloating,
            "is-invalid": errors,
          })}
        >
          {type === "textarea" ? (
            <textarea
              className="form-control"
              id={id}
              name={name || id}
              value={value || ""}
              placeholder={placeholder}
              onChange={(event) => onChange(id, event.target.value)}
              onFocus={onFocus}
              style={{ minHeight }}
              disabled={disabled}
              ref={ref}
            />
          ) : (
            <input
              type={type}
              className="form-control"
              id={id}
              name={name || id}
              value={value || ""}
              placeholder={placeholder}
              onChange={(event) => onChange(id, event.target.value)}
              onFocus={onFocus}
              disabled={disabled}
              ref={ref}
            />
          )}
          <label htmlFor={id} className={clsx(disableFloating && 'd-none')}>{label}</label>
        </div>
        {errors && <div className="invalid-feedback">{errors}</div>}
      </div>
      {!!helper && <small className="form-text">{helper}</small>}
    </>
  );
});

export default TextField;
