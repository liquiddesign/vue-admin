import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import ViewDashboard from "./components/ViewDashboard.vue";
import ViewProfile from "./components/ViewProfile.vue";
import ViewAdministrators from "./components/ViewAdministrators.vue";

const routes: Array<RouteRecordRaw> = [
    {
        name: 'home',
        path: '/',
        component: ViewDashboard,
        meta: {title: 'Přehled'}
    },
    {
        name: 'profile',
        path: '/profile',
        component: ViewProfile,
        meta: {title: 'Přehled'}
    },
    {
        name: 'administratorsUsers',
        path: '/administrators',
        component: ViewAdministrators,
        meta: {title: 'Přehled'}
    },
    {
        name: 'administratorsUsers',
        path: '/administrators',
        component: ViewAdministrators,
        meta: {title: 'Přehled'}
    },
    {
        name: 'administratorsRolesCreate',
        path: '/administrators/roles/create',
        component: ViewAdministrators,
        meta: {title: 'Přehled', 'permissions': ['users']}
    },
    {
        name: 'administratorsRolesEdit',
        path: '/administrators/roles/edit/:id',
        component: ViewAdministrators,
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