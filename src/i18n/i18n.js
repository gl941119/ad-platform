import Vue from 'vue'
import locale from 'element-ui/lib/locale'; //解决i18n与vue——i18n的兼容性
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages,
});
locale.i18n((key, value) => i18n.t(key, value));//解决i18n与vue——i18n的兼容性
export default i18n