import Vue from 'vue';
import Router from 'vue-router';
import {Api} from '@/api/api'
import {UserApi} from '@/api/user'

Vue.use(Router);

let beforeRedirect = null;
let redirecting = false

const router = new Router({
    routes: [
        { path: '/', component: () => import('../views/Login'), name: 'login' },
        { path: '/profile', component: () => import('../views/Profile'), meta: {requiresLogin: true} },
        { path: '/personal-routines', component: () => import('../views/PersonalRoutines'),
            meta: {requiresLogin: true},
            props: route => ({ query: route.query.q }) },
        { path: '/community-routines', component: () => import('../views/CommunityRoutines'), meta: {requiresLogin: true} },
        { path: '/create-routine', component: () => import('../views/CreateRoutine'), meta: {requiresLogin: true}},
        { path: '/edit-routine', component: () => import('../views/CreateRoutine'), meta: {requiresLogin: true},
            props: route => ({ query: route.query.id }), name: 'edit'},
        { path: '/routine-detail', component: () => import('../views/CreateRoutine'), meta: {requiresLogin: true},
            props: route => ({ query: route.query.id }), name: 'detail'},
        {path: '/logout', component: () => import('../views/Login'), name: 'logout'},
        {path: '*', component: () => import('../views/NotFound'), name: 'notfound'}
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name === 'logout') {
        UserApi.logout().then(() => {
            router.push('/').then();
        });
    } else if (from.name === 'login' && redirecting) {
        redirecting = false;
        router.push(beforeRedirect)
            .then(/*mostrar un error que diga que tenes que estar loggeado?*/)
            .catch((failure) => {
                if (Router.isNavigationFailure(failure, Router.NavigationFailureType.redirected)) {
                    console.log('err');
                }
            });
    } else if (to.matched.some(record => record.meta.requiresLogin)) {
            if (localStorage.getItem('userToken')) {
                if (!Api.token) Api.token = localStorage.userToken;
                next();
            } else {
                beforeRedirect = to.fullPath;
                redirecting = true;
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