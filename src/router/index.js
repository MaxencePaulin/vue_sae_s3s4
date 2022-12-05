import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomePage from '../views/HomePageView'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import AdminView from '../views/AdminView'
import store from '@/store/index.js'
import ErrorView from '../views/ErrorView.vue'
import AccountView from '../views/AccountView'
import UnauthorizedView from "@/views/UnauthorizedView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: "/home",
        name: "homepage",
        component: HomePage
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/authenticated']) {
                return next({ name: 'home' })
            }
            next()
        }
    },
    {
        path: "/register",
        name: "register",
        component: RegisterView,
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/authenticated']) {
                return next({ name: 'home' })
            }
            next()
        }
    },
    {
        path: "/admin",
        name: "admin",
        component: AdminView,
        beforeEnter: (to, from, next) => {
            console.log(store.state)
            console.log(store.getters["auth/user"])
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
            }
            if (store.getters["auth/user"].id_role !== 3) {
                return next({
                    name: 'unauthorized'
                })
            }
            next()
        }
    },
    {
        path: "/account",
        name: "account",
        component: AccountView,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
            }
            next()
        }
    },
    {
        path: "/unauthorized",
        name: "unauthorized",
        component: UnauthorizedView
    },
    {
        path: '*',
        name: "404",
        component: ErrorView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
