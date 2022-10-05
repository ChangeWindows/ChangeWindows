import React from 'react';

import AmaranthIcon, { aiCircleCheck, aiCircleInfo, aiCircleExclamation } from '@changewindows/amaranth';

import clsx from 'clsx';

export default function Status({ status }) {
  return (
    <>
      {!!status &&
        <div className={clsx('alert mt-3 d-flex', `alert-${status.type ?? 'info'}`)}>
          <p className="m-0 me-2">
            <AmaranthIcon icon={status.type === 'success' ? aiCircleCheck : (status.type === 'info' ? aiCircleInfo : aiCircleExclamation)} />
          </p>
          <div>
            {status.title && <h4 className="h5 text-dark m-0">{status.title}</h4>}
            <p className="m-0">{status.message}</p>
          </div>
        </div>
      }
    </>
  )
}
