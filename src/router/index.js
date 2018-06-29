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
	import('@/pages/personalCenter/masterAccount/main');
const Crowdfunding = () =>
	import('@/pages/personalCenter/myCrowdfunding/crowdfunding');
const Invite = () =>
	import('@/pages/personalCenter/invite/invite');
const Settings = () =>
	import('@/pages/personalCenter/accountSettings/settings.vue');
const Project = () =>
	import('@/pages/personalCenter/crowdfundingProject/project.vue');
const NewProject = () =>
	import('@/pages/personalCenter/crowdfundingProject/newCrowdfunding.vue');
const Advertisers = () =>
	import('@/pages/personalCenter/advertisers/advertisers');
	
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
				{
					path: 'crowdfunding',//我的众筹
					name: 'crowdfunding',
					component: Crowdfunding,
				},
				{
					path: 'invite',//邀请用户
					name: 'invite',
					component: Invite,
				},
				{
					path: 'settings',//账号设置
					name: 'settings',
					component: Settings,
				},
				{
					path: 'project',//众筹项目方
					name: 'project',
					component: Project,
				},
				{
					path: 'newCrowdfunding',//申请新的众筹
					name: 'newCrowdfunding',
					component: NewProject,
				},
				{
					path: 'advertisers',//广告主-广告投放管理
					name: 'advertisers',
					component: Advertisers,
				},
			],
		}
	]
})

export default router;