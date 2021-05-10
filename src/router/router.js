import Vue from 'vue';
import Router from 'vue-router';
import {Api} from '@/api/api'

Vue.use(Router);

const router = new Router({
    routes: [
        { path: '/', component: () => import('../views/Login'), name: 'login' },
        { path: '/profile', component: () => import('../views/Profile'), meta: {requiresLogin: true} },
        { path: '/personal-routines', component: () => import('../views/PersonalRoutines'),
            meta: {requiresLogin: true},
            props: route => ({ query: route.query.q }) },
        { path: '/community-routines', component: () => import('../views/CommunityRoutines'), meta: {requiresLogin: true} },
        { path: '/create-routine', component: () => import('../views/CreateRoutine'), meta: {requiresLogin: true}},
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresLogin)) {
            if(Api.token) {
                next();
            } else {
                router.push({name: 'login'})
                    .then(/*mostrar un error que diga que tenes que estar loggeado?*/)
                    .catch((failure) => {
                        if (Router.isNavigationFailure(failure, Router.NavigationFailureType.redirected)) {
                            console.log('err');
                        }
                    });
            }
    } else {
        next();
    }
});


export default router;