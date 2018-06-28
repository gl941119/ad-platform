import Vue from 'vue';
import VueRouter from 'vue-router';

const IndexCom = () =>
    import ('@/pages/index/index');

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {name: 'index'},
        },
        {
            path: '/index',
            name: 'index',
            component: IndexCom,
        },
    ]
})

export default router;