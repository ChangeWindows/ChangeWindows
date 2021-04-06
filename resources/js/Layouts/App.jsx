import React from 'react'

import Navigation from './Navigation/Navigation'

export default function App({ children, can }) {
    return (
        <div className="bg-light">
            <div className="grid">
                <header className="grid-sidebar">
                    <Navigation can={can} />
                </header>
                <main className="grid-content">
                    { children }
                </main>
            </div>
        </div>
    )
}