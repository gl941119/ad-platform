import VeeValidate, {
	Validator
} from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
/**自定义验证信息 */
const dictionary = {
	zh_CN: {
		messages: {
//			title:()=>'请输入标题',
			required: (field) => field,
			regex:(field) => field,
			max:(field) => field,
			  email: (field) => field,
			  numeric:(field) => field,
		},
		attributes: {
			// userCode: '用户名',
			// password: '密码',
			// title:'标题',
		}
	}
};

/**配置验证器 */
const Veeconfig = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'fieldBags',
	delay: 0,
	locale: 'zh_CN',
	dictionary: dictionary,
	messages: null,
  	events: 'blur',
	strict: true
};
//Validator.updateDictionary(dictionary);

// Validator.extend('phone', {
//   messages: {
//     zh_CN:field => field + '必须是11位手机号码',
//   },
//   validate: value => {
//     return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
//   }
// });

export {
	VeeValidate,
	Veeconfig
}
