import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
    routes: [
        { path: '/', component: () => import('./views/Home') },
        { path: '/profile', component: () => import('./views/Profile') },
        { path: '/login', component: () => import('./views/Login') },
        { path: '/register', component: () => import('./views/Register') },
    ]
});

export default router;