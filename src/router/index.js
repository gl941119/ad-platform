import Vue from 'vue';
import VueRouter from 'vue-router';

const IndexCom = () =>
	import('@/pages/index/index');
const PersonalCenter = () =>
	import('@/pages/personalCenter/personal');
const Purse = () =>
	import('@/pages/personalCenter/purse/purse');
const Revenue = () =>
	import('@/pages/personalCenter/advertisingRevenue/revenue');
const Main = () =>
	import('@/pages/personalCenter/main/main');

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
			path: '/personalCenter',//个人中心
			name: 'personalCenter',
			component: PersonalCenter,
			redirect: {
				name: 'purse'
			},
			children: [
				{
					path: 'purse',//钱包
					name: 'purse',
					component: Purse,
				},
				{
					path: 'revenue',//广告收益账户
					name: 'revenue',
					component: Revenue,
				},
				{
					path: 'main',//广告主账户
					name: 'main',
					component: Main,
				},
			],
		}
	]
})

export default router;