import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import advertItemCom from '@/components/index-com/advert-item';
import learnMoreCom from '@/components/index-com/learn-more';
import instantBuyCom from '@/components/common/instant-buy';
import telegramLoginCom from '@/components/third-party/telegram-login';
import filters from './filters';
import i18n from './i18n/i18n';

import './utils/element';
import Cache from './utils/cache';
import './assets/css/reset.css';
import 'swiper/dist/css/swiper.css';
import { VeeValidate, Veeconfig } from './utils/validation';

Vue.use(VueAwesomeSwiper);
Vue.use(VeeValidate, Veeconfig);
Vue.component('advert-item', advertItemCom); // 有多处用到，则注册全局组件
Vue.component('learn-more', learnMoreCom); // 有多处用到，则注册全局组件
Vue.component('instant-buy', instantBuyCom); // 有多处用到，则注册全局组件
Vue.component('telegram-login', telegramLoginCom);
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
})

router.beforeEach((to, from, next) => {
    let token = store.state.token || Cache.getSession('bier_token');

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