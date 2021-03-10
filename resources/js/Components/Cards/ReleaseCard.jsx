import { faArrowRight } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react'

export default function ReleaseCard({ name, channels, alts }) {

    return (
        <div className="col-12 col-sm-6 col-xl-4 col-xxl-3">
            <div className="card release">
                <h3 className="h5">{name}</h3>
                {alts && <p className="text-muted mb-0"><small>{alts.join(', ')}</small></p>}
                <div className="flex-grow-1"></div>
                {channels && <div className="release-channels mt-3">
                    {channels.map((channel, key) => (
                        <span key={key} className={clsx('badge me-1', `bg-${channel.class}`)}>{channel.name}</span>
                    ))}
                </div>}
                <div className="release-actions">
                    <a href="#" className="btn btn-link btn-sm"><FontAwesomeIcon icon={faArrowRight} fixedWidth /> View release</a>
                </div>
            </div>
        </div>
    );
};