import React from "react";

import clsx from "clsx";

export default function TextField({
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
}) {
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
              style={{ minHeight }}
              disabled={disabled}
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
              disabled={disabled}
            />
          )}
          <label htmlFor={id} className={clsx(disableFloating && 'd-none')}>{label}</label>
        </div>
        {errors && <div className="invalid-feedback">{errors}</div>}
      </div>
      {!!helper && <small className="form-text">{helper}</small>}
    </>
  );
}
