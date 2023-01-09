import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePageView from '../views/HomePageView.vue'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import AdminView from '../views/AdminView'
import store from '@/store/index.js'
import ErrorView from '../views/ErrorView.vue'
import AccountView from '../views/AccountView'
import UnauthorizedView from "@/views/UnauthorizedView.vue";
import SearchArtist from "@/views/SearchArtist.vue";
import SearchPrestataire from "@/views/SearchPrestataire";
import ArtistView from "@/views/ArtistView.vue";
import PrestataireView  from "@/views/PrestataireView.vue";
import AddCommentView from "@/views/AddCommentView.vue";
import feedBackView from "@/views/FeedBackView.vue";
import AddCommentFestView from "@/views/AddCommentFestView.vue";
import TicketView from "@/views/TicketView.vue";
import BoughtTicketView from "@/views/BoughtTicketView.vue";

import PlanningView from '../views/PlanningView.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePageView
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
        path: "/artist",
        name: "artist",
        component: SearchArtist,
        beforeEnter: async (to, from, next) => {
            await store.dispatch('artist/getAllArtists').catch(() => {
                return next({ name: '404' })
            });
            if (store.getters['artist/allArtists'] === null) {
                return next({ name: '404' });
            }
            next();
        }
    },
    {
        path: "/artist/:id",
        name: "artistId",
        component: ArtistView,
        beforeEnter: async (to, from, next) => {
            await store.dispatch('artist/getArtist', to.params.id).catch(() => {
                return next({ name: '404' })
            });
            if (store.getters['artist/artist'] === null) {
                return next({ name: '404' });
            }
            await store.dispatch('artist/getGuestBookArtist', to.params.id).catch(() => {
                return next({ name: '404' })
            });
            await store.dispatch('concert/getAllConcerts').catch(() => {
                return next({ name: '404' })
            });
            if (store.getters['concert/allConcerts'] === null) {
                return next({ name: '404' });
            }
            next();
        }
    },
    {
        path: "/prestataire",
        name: "prestataire",
        component: SearchPrestataire,
        beforeEnter: async (to, from, next) => {
            await store.dispatch('prestataire/getAllPrestataires').catch(() => {
                return next({ name: '404' })
            });
            if (store.getters['prestataire/allPrestataires'] === null) {
                return next({ name: '404' });
            }
            next();
        }
    },
    {
        path: "/prestataire/:id",
        name: "prestataireId",
        component: PrestataireView,
        beforeEnter: async (to, from, next) => {
            await store.dispatch('prestataire/getPrestataire', to.params.id).catch(() => {
                return next({ name: '404' })
            });
            if (store.getters['prestataire/prestataire'] === null) {
                return next({ name: '404' });
            }
            await store.dispatch('prestataire/getGuestBookPrestataire', to.params.id).catch(() => {
                return next({ name: '404' })
            });
            next();
        }
    },
    {
        path: "/commentArtist/:id",
        name: "commentArtist",
        component: AddCommentView,
        beforeEnter: async (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({ name: 'login' })
            }
            await store.dispatch('artist/getArtist', to.params.id).catch(() => {
                return next({ name: '404' })
            });
            if (store.getters['artist/artist'] === null) {
                return next({ name: '404' });
            }
            await store.dispatch('artist/getGuestBookArtist', to.params.id).catch(() => {
                return next({ name: '404' })
            });
            next();
        }
    },
    {
        path: "/commentPrestataire/:id",
        name: "commentPrestataire",
        component: AddCommentView,
        beforeEnter: async (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({ name: 'login' })
            }
            await store.dispatch('prestataire/getPrestataire', to.params.id).catch(() => {
                return next({ name: '404' })
            });
            if (store.getters['prestataire/prestataire/artist'] === null) {
                return next({ name: '404' });
            }
            await store.dispatch('prestataire/getGuestBookPrestataire', to.params.id).catch(() => {
                return next({ name: '404' })
            });
            next();
        }
    },
    {
        path: "/commentFest",
        name: "commentFest",
        component: AddCommentFestView,
        beforeEnter: async (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({ name: 'login' })
            }
            next();
        }
    },
    {
        path: "/admin",
        name: "admin",
        component: AdminView,
        beforeEnter: (to, from, next) => {
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
        path: "/feedback",
        name: "feedback",
        component: feedBackView,
        beforeEnter: async (to, from, next) => {
            let response = await store.dispatch('feedback/getAllFeedBack');
            if (response === -1) {
                return next({ name: '404' });
            }
            await store.commit('feedback/SET_FEEDBACK_FEST');
            next();
        }
    },
    {
        path: "/planning",
        name: "planning",
        component: PlanningView
    },
    {
        path: "/ticket",
        name: "ticket",
        component: TicketView,
        beforeEnter: async (to, from, next) => {
            let response = await store.dispatch('ticket/getAllTicket');
            if (response === -1) {
                return next({ name: '404' });
            }
            next();
        }
    },
    {
        path: "/ticket/:id",
        name: "ticketId",
        component: BoughtTicketView,
        beforeEnter: async (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({ name: 'login' })
            }
            let response = await store.dispatch('ticket/getAllTicket');
            if (response === -1) {
                return next({ name: '404' });
            }
            response = await store.dispatch('ticket/getTicket', to.params.id);
            if (response === -1) {
                return next({ name: '404' });
            }
            if (!store.getters['ticket/currentTicket']) {
                return next({ name: '404' });
            }
            next();
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
