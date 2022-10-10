import React from 'react';

import clsx from 'clsx';

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
      className={clsx('row', { 'mb-3': !fullWidth }, className)}
    >
      <div className={fullWidth ? 'col-12 mt-3 pb-3 my-md-0' : 'col-12 col-md-4 mt-3 mb-4 my-md-0'}>
        <h4 className={clsx('h5 mb-0', { 'text-danger': danger })}>{title}</h4>
        {description && <p className="text-muted mb-0"><small>{description}</small></p>}
        {action}
      </div>
      <div className={fullWidth ? 'col-12' : 'col-12 col-md-8'}>
        {disabledCard ?
          <>{children}</>
        :
          <div className="card">
            <div className="card-body">
              <div className={clsx('row g-3', containerClassName)}>
                {children}
              </div>
            </div>
          </div>
        }
      </div>
    </fieldset>
  )
}
