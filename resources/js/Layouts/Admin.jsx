import React from 'react'

import AdminNavigation from './Navigation/AdminNavigation'

export default function App({ children, can, auth }) {
    return (
        <div className="bg-light">
            <div className="grid" style={{ height: window.innerHeight}}>
                <header className="grid-sidebar">
                    <AdminNavigation can={can} auth={auth} />
                </header>
                <main className="grid-content">
                    { children }
                </main>
            </div>
        </div>
    )
}