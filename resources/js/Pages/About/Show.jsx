import { faSunHaze } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import App from '../../Layouts/App'

export default function Show() {
    return (
        <App>
            <div className="container-fluid">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                        <div className="card">
                            <div className="card-body">
                                <h1><FontAwesomeIcon icon={faSunHaze} fixedWidth /> About Horizon</h1>
                                <p className="m-0">A fancy new project.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}