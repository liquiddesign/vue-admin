import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import ViewDashboard from "./components/ViewDashboard.vue";
import ViewProfile from "./components/ViewProfile.vue";

const routes: Array<RouteRecordRaw> = [
    {
        name: 'home',
        path: '/',
        component: ViewDashboard,
        meta: {title: 'Přehled', 'permissions': ['users']}
    },
    {
        name: 'profile',
        path: '/profile',
        component: ViewProfile,
        meta: {title: 'Přehled', 'permissions': ['users']}
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkActiveClass: "mm-active",
    linkExactActiveClass: "exact-active",
});

export default router;