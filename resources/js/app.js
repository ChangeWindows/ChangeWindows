import React from 'react';
import { render } from 'react-dom';
import { InertiaProgress } from '@inertiajs/progress';
import { App } from '@inertiajs/inertia-react';

const el = document.getElementById('app');
InertiaProgress.init({
    color: '#0066ff'
});

import { createInertiaApp } from '@inertiajs/inertia-react';

createInertiaApp({
    title: title => `${title} &middot; ChangeWindows`,
    resolve: name => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        render(<App {...props} />, el);
    }
});

function appHeight() {
    const doc = document.documentElement
    doc.style.setProperty('--vh', (window.innerHeight * .01) + 'px');
}

window.addEventListener('resize', appHeight);
appHeight();

if (navigator.platform == 'iPad') {
    window.onorientationchange = function() {
        appHeight();
    }       
}