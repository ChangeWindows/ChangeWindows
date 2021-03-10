import clsx from 'clsx';
import React from 'react'

export default function Channel({ date, build, channel, disabled = false }) {

    return (
        <div className="col">
            <div className={clsx('channel', 'card', { 'channel-disabled': disabled })}>
                <div className={clsx('channel-name', `text-${channel.class}`)}>{channel.name}</div>
                <div className="channel-build">{build}</div>
                <div className="channel-date">{date}</div>
            </div>
        </div>
    );
};