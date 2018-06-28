import Vue from 'vue';
import VueRouter from 'vue-router';

const IndexCom = () =>
	import('@/pages/index/index');
const PersonalCenter = () =>
	import('@/pages/personalCenter/personal');
const Purse = () =>
	import('@/pages/personalCenter/purse/purse');

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [{
			path: '/',
			redirect: {
				name: 'index'
			},
		},
		{
			path: '/index',
			name: 'index',
			component: IndexCom,
		},
		{
			path: '/personalCenter',
			name: 'personalCenter',
			component: PersonalCenter,
			redirect: {
				name: 'purse'
			},
			children: [{
				path: 'purse',
				name: 'purse',
				component: Purse,
			}, ],
		}
	]
})

export default router;