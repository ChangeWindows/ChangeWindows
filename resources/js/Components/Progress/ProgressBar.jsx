import clsx from 'clsx';
import React from 'react'

export default function ProgressBar({ color = false, progress }) {
    return (
        <div
            className={clsx(
                'progress-bar',
                { [`bg-${color}`]: color }
            )}
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
        />
    );
};