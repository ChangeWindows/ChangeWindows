import React from "react";

import clsx from "clsx";

export default function Fieldset({
  title,
  disabledCard = false,
  fullWidth = false,
  description,
  action,
  children,
  className,
  containerClassName,
  danger = false,
  ...props
}) {
  return (
    <fieldset
      {...props}
      className={clsx("row", { "mb-3": !fullWidth }, className)}
    >
      <div className="col-12">
        {disabledCard ? (
          <div className={clsx("row g-2", containerClassName)}>{children}</div>
        ) : (
          <div className="card">
            <div className="card-body">
              <div className={clsx("row g-3", containerClassName)}>
                <div className="col-12 d-flex justify-content-between">
                  <h4 className={clsx("h5 mb-0", { "text-danger": danger })}>
                    {title}
                  </h4>
                  {action}
                </div>
                {children}
              </div>
            </div>
          </div>
        )}
      </div>
    </fieldset>
  );
}
