import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
    routes: [
        { path: '/', component: () => import('../views/CommunityRoutines') },
        { path: '/profile', component: () => import('../views/Profile') },
        { path: '/login', component: () => import('../views/Login') },
        { path: '/register', component: () => import('../views/Register') },
        { path: '/personal-routines', component: () => import('../views/PersonalRoutines') },
        { path: '/community-routines', component: () => import('../views/CommunityRoutines') },
        { path: '/create-routine', component: () => import('../views/CreateRoutine')},
    ]
});

export default router;