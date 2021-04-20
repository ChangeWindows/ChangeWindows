require('./bootstrap');

require('alpinejs');

import React from 'react';
import { render } from 'react-dom';
import { InertiaProgress } from '@inertiajs/progress';
import { App } from '@inertiajs/inertia-react';

const el = document.getElementById('app');
InertiaProgress.init({
    color: '#0066ff'
});

render(
    <App
        initialPage={JSON.parse(el.dataset.page)}
        resolveComponent={name => require(`./Pages/${name}`).default}
    />,
    el
)