import VeeValidate, {
	Validator
} from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
/**自定义验证信息 */
const dictionary = {
	zh: {
		messages: {
			required: (field) => field + '是必填的',
			regex:(field) => field,
			max:(field) => field,
			email: () => '请输入正确的邮箱格式',
			numeric:(field) => field,
		},
		attributes: {
			email:'邮箱',
			password:'密码',
			oncePassword:'确认密码',
			code:'验证码',
		}
	}
};
/**配置验证器 */
const Veeconfig = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'fieldBags',
	delay: 0,
	locale: 'zh',
	dictionary,
	messages: null,
  	events: 'blur',
	strict: true
};
export {
	VeeValidate,
	Veeconfig
}
