import Vue from 'vue';
import VeeValidate, {
    Validator,
} from 'vee-validate';
import zh from 'vee-validate/dist/locale/zh_CN';
/** 自定义验证信息 */
const dictionary = {
    zh: {
        messages: {
            required: (field) => field + '不能为空',
            regex: (field) => field,
            max: (field) => field,
            email: () => '请输入正确的邮箱格式',
            numeric: (field) => field,
        },
        attributes: {
            email: '邮箱',
            password: '密码',
            oncePassword: '确认密码',
            code: '验证码',
            phoneNumber: '手机号',
        },
    },
};

Validator.localize({ zh });

/** 配置验证器 */
const VeeConfig = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'fieldBags',
    delay: 0,
    messages: null,
    locale: 'zh',
    dictionary,
    events: 'blur',
    strict: true,
};

// Validator.extend('phone', {
//   messages: {
//     zh_CN:field => field + '必须是11位手机号码',
//   },
//   validate: value => {
//     return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
//   }
// });

Vue.use(VeeValidate, VeeConfig);
