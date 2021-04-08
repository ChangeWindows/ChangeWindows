import clsx from 'clsx'
import React from 'react'

import Navigation from './Navigation/Navigation'

export default function App({ children, can, background = false }) {
    return (
        <div className="bg-light">
            <div className="grid">
                <header className="grid-sidebar">
                    <Navigation can={can} />
                </header>
                <main className={clsx('grid-content', { 'auth': background })}>
                    { children }
                </main>
            </div>
        </div>
    )
}