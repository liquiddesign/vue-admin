import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import ViewDashboard from "./components/ViewDashboard.vue";
import ViewProfile from "./components/ViewProfile.vue";
import ViewAdministratorsRoles from "./components/ViewAdministratorsRoles.vue";
import ViewAdministratorsUsers from "./components/ViewAdministratorsUsers.vue";
import ViewAdministratorsRolesEdit from "./components/ViewAdministratorsRolesEdit.vue";
import ViewAdministratorsRolesCreate from "./components/ViewAdministratorsRolesCreate.vue";

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
        path: '/administrators/users',
        component: ViewAdministratorsUsers,
        meta: {title: 'Přehled'}
    },
    {
        name: 'administratorsRoles',
        path: '/administrators/roles',
        component: ViewAdministratorsRoles,
        meta: {title: 'Přehled'}
    },
    {
        name: 'administratorsRolesCreate',
        path: '/administrators/roles/create',
        component: ViewAdministratorsRolesCreate,
        meta: {title: 'Přehled', 'permissions': ['users']}
    },
    {
        name: 'administratorsRolesEdit',
        path: '/administrators/roles/edit/:id',
        component: ViewAdministratorsRolesEdit,
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