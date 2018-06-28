import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './utils/element';
import './assets/css/reset.css';
import 'swiper/dist/css/swiper.css';

Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
