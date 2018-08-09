import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueAnalytics from 'vue-analytics';
import advertItemCom from '@/components/index-com/advert-item';
import learnMoreCom from '@/components/index-com/learn-more';
import instantBuyCom from '@/components/common/instant-buy';
import telegramLoginCom from '@/components/third-party/telegram-login';
import filters from './filters';
import i18n from './i18n/i18n';
import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'

import './utils/element';
import './assets/css/reset.css';
import 'swiper/dist/css/swiper.css';
import { VeeValidate, Veeconfig } from './utils/validation';

Vue.use(VueAwesomeSwiper);
Vue.use(VeeValidate, Veeconfig);
Vue.use(Croppa);
Vue.component('advert-item', advertItemCom); // 有多处用到，则注册全局组件
Vue.component('learn-more', learnMoreCom); // 有多处用到，则注册全局组件
Vue.component('instant-buy', instantBuyCom); // 有多处用到，则注册全局组件
Vue.component('telegram-login', telegramLoginCom);
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// google analytic
Vue.use(VueAnalytics, {
    id: 'UA-123355471-1',
    disableScriptLoader: true, // 必须在html中完成初始化，这里显式禁止去下载ga脚本
    router, // 确保路由切换时可以自动统计
    autoTracking: {
        pageviewOnLoad: false // 当通过网址进来时已经GA在初始化时就发起一次pageview的统计，这里不要重复统计
    }
});

// baiDu analytic
var _hmt = window._hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?24ba14ce3347946c7d59f64e6f853724";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

router.beforeEach((to, from, next) => {
    let token = store.state.token;

    try {
        if (to.path) {
            // console.log('to_>', to.fullPath);
            _hmt.push(['_setAutoPageview', false]);
            _hmt.push(['_trackPageview', '/#' + to.fullPath]);
        }
    } catch (error) {
        console.error('router skip error_>', error)
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({name: 'index'});
        } else {
            next();
        }
    } else {
        next();
    }
});

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
})