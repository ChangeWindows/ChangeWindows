require('./bootstrap');

require('alpinejs');

import { App } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'
import { InertiaProgress } from '@inertiajs/progress'

const el = document.getElementById('app')
InertiaProgress.init()

render(
    <App
        initialPage={JSON.parse(el.dataset.page)}
        resolveComponent={name => require(`./Pages/${name}`).default}
    />,
    el
)