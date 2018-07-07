import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import advertItemCom from '@/components/index-com/advert-item';
import telegramLoginCom from '@/components/third-party/telegram-login';
import filters from './filters'

import './utils/element';
import './assets/css/reset.css';
import 'swiper/dist/css/swiper.css';
import { VeeValidate, Veeconfig } from './utils/validation';

Vue.use(VueAwesomeSwiper);
Vue.use(VeeValidate, Veeconfig);
Vue.component('advert-item', advertItemCom); // 有多处用到，则注册全局组件
Vue.component('telegram-login', telegramLoginCom);
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
})
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})