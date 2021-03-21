import React from 'react'

import AdminNavigation from './Navigation/AdminNavigation'

export default function App({ children }) {
    return (
        <div className="bg-light">
            <div className="grid">
                <header className="grid-sidebar">
                    <AdminNavigation />
                </header>
                <main className="grid-content">
                    { children }
                </main>
            </div>
        </div>
    )
}