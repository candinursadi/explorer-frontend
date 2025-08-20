import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Explorer = () => import('../presentation/views/Explorer.vue'); // lazyloaded

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'explorer', component: Explorer }
];

export default createRouter({
    history: createWebHistory(),
    routes
});