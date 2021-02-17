require('./bootstrap');

// Import modules...
import Vue from 'vue';
import { App as InertiaApp, plugin as InertiaPlugin } from '@inertiajs/inertia-vue';
import { InertiaProgress } from '@inertiajs/progress';
import PortalVue from 'portal-vue';
import Permissions from './mixins/Permissions';

Vue.mixin({ methods: { route } });
Vue.mixin(Permissions);
Vue.use(InertiaPlugin);
Vue.use(PortalVue);

InertiaProgress.init();

const app = document.getElementById('app');

new Vue({
    render: (h) =>
        h(InertiaApp, {
            props: {
                initialPage: JSON.parse(app.dataset.page),
                resolveComponent: (name) => require(`./Pages/${name}`).default,
            },
        }),
}).$mount(app);
