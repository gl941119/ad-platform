import zhLocale from './zh-CN'
const zh = {
	header: {
		home: '首页',
		crowdfunding: '众筹',
		project: '项目',
		help:'帮助',
	},
	home:{
		quotes:'行情播报',
		Quotes:'查看更多',
		Quotes:'了解更多',
		Quotes:'立即抢购',
		Quotes:'已结束',
		Quotes:'去交易',
	},
	messageCode:{
		exceptions:'系统异常',
		success:'操作成功',
		failure:'操作失败',
		registered:'注册成功',
		userNotExist:'用户不存在，无法登录',
		notRegister:'用户已经存在，无法注册',
		tooManyUsers:'用户存在过多，无法登录',
		disabled:'该用户已禁用，无法登录',
		alreadyBound:'当前用户已经绑定邮箱，无法重新绑定',
		wrongPassword:'密码错误，无法登录',
		originalPassword:'原密码错误，请重新输入',
		transactionPassword:'原交易密码错误，请重新输入',
		verificationCode:'验证码错误',
		codeSendSuccess:'验证码发送成功',
		codeSendFaild:'验证码发送失败',
		codeSentTooFrequently:'验证码发送过于频繁，请稍后再试',
		codeNotExist:'邀请码不存在',
		bindedTelegram:'该telegram账号已经注册平台账号，无法绑定',
		onShelves:'众筹信息已经上架，无法修改',
		underReview:'众筹信息审核中，无法修改',
		notApplyAgain:'您已经存在广告，无法再次申请',
		loginInvalid:'登录失效，请重新登录',
	},
	...zhLocale
};
export default zh
