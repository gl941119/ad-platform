import Vue from 'vue';
import VueRouter from 'vue-router';
const Register = () => import('@/pages/login/register');
const Login = () => import('@/pages/login/login');

const IndexCom = () => import('@/pages/index/index');
const CrowdSaleCom = () => import('@/pages/crowdsale-detail/crowdsale');
const IcoDetailCom = () => import('@/pages/crowdsale-detail/ico-detail');
const AdvertisementCom = () => import('@/pages/advert-detail/advertisement');
const PersonalCenter = () => import('@/pages/personalCenter/personal');
const Purse = () => import('@/pages/personalCenter/purse/purse');
const Revenue = () => import('@/pages/personalCenter/advertisingRevenue/revenue');
const Main = () => import('@/pages/personalCenter/masterAccount/main');
const Crowdfunding = () => import('@/pages/personalCenter/myCrowdfunding/crowdfunding');
const Invite = () => import('@/pages/personalCenter/invite/invite');
const Settings = () => import('@/pages/personalCenter/accountSettings/settings.vue');
const Project = () => import('@/pages/personalCenter/crowdfundingProject/project.vue');
const NewProject = () => import('@/pages/personalCenter/crowdfundingProject/newCrowdfunding.vue');
const CrowdfundingDetail = () => import('@/pages/personalCenter/crowdfundingProject/details.vue');
const Disclaimer = () => import('@/pages/personalCenter/crowdfundingProject/disclaimer.vue');
const Advertisers = () => import('@/pages/personalCenter/advertisers/advertisers');
const Adserving = () => import('@/pages/personalCenter/advertisers/ad-serving');
const AdvertisersDisclaimer = () => import('@/pages/personalCenter/advertisers/disclaimer');

// mass
const ForgetPasswordCom = () => import('@/pages/mass/forget-password');
const UserRegisterTermCom = () => import('@/pages/mass/user-register-term');

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: 'index',
            },
        },
        {
            path: '/index',
            name: 'index',
            component: IndexCom,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: { hideShare: true },
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { hideShare: true },
        },
        {
            path: '/crowdsale',
            name: 'crowdsale',
            component: CrowdSaleCom,
        },
        {
            path: '/icodetail/:id',
            name: 'icodetail',
            component: IcoDetailCom,
        },
        {
            path: '/advertisement',
            name: 'advertisement',
            component: AdvertisementCom,
        },
        {
            path: '/personalCenter', // 个人中心
            name: 'personalCenter',
            meta: { requiresAuth: true },
            component: PersonalCenter,
            redirect: {
                name: 'purse',
            },
            children: [
                {
                    path: 'purse', // 钱包
                    name: 'purse',
                    component: Purse,
                },
                {
                    path: 'revenue', // 广告收益账户
                    name: 'revenue',
                    component: Revenue,
                },
                {
                    path: 'main', // 广告主账户
                    name: 'main',
                    component: Main,
                },
                {
                    path: 'crowdfunding', // 我的众筹
                    name: 'crowdfunding',
                    component: Crowdfunding,
                },
                {
                    path: 'invite', // 邀请用户
                    name: 'invite',
                    component: Invite,
                },
                {
                    path: 'settings', // 账号设置
                    name: 'settings',
                    component: Settings,
                },
                {
                    path: 'project', // 众筹项目
                    name: 'project',
                    component: Project,
                },
                {
                    path: 'newCrowdfunding', // 申请新的众筹
                    name: 'newCrowdfunding',
                    component: NewProject,
                },
                {
                    path: 'crowdfundingDetail/:id/:value', // 众筹详情
                    name: 'crowdfundingDetail',
                    component: CrowdfundingDetail,
                },
                {
                    path: 'adserving', // 广告主-整体情况查询
                    name: 'adserving',
                    component: Adserving,
                },
                {
                    path: 'advertisers/:value', // 广告主-广告投放管理
                    name: 'advertisers',
                    component: Advertisers,
                },
            ],
        },
        {
            path: '/crowdfunding/disclaimer', // 众筹免责声明
            name: 'disclaimer',
            component: Disclaimer,
        },
        {
            path: '/advertisers/disclaimer', // 众筹免责声明
            name: 'advertisersDisclaimer',
            component: AdvertisersDisclaimer,
        },
        {
            path: '/resetpwd', // 忘记密码
            name: 'resetpwd',
            component: ForgetPasswordCom,
            meta: { hideShare: true },
        },
        {
            path: '/userterm', // 用户协议
            name: 'userterm',
            component: UserRegisterTermCom,
            meta: { hideShare: true },
        },
        { path: '*', redirect: '/' },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
});

export default router;
