import clsx from 'clsx'
import React from 'react'

import Navigation from './Navigation/Navigation'

export default function App({ children, can, auth, background = false }) {
    return (
        <div className="bg-light">
            <div className="grid" style={{ height: window.innerHeight}}>
                <header className="grid-sidebar">
                    <Navigation can={can} auth={auth} />
                </header>
                <main className={clsx('grid-content', { 'auth': background })}>
                    { children }
                </main>
            </div>
        </div>
    )
}