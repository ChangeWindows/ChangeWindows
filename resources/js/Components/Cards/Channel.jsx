import clsx from 'clsx';
import React from 'react'

export default function Channel({ date, build, channel, disabled = false }) {

    return (
        <div className="col">
            <div className={clsx('channel', 'card', { 'channel-disabled': disabled })}>
                <div className="channel-name" style={{ color: channel.color }}>{channel.name}</div>
                <div className="channel-build">{build || 'No flight'}</div>
                <div className="channel-date">{date || 'No flight'}</div>
            </div>
        </div>
    );
};