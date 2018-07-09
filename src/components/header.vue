<template>
	<header class="header">
		<div class="header-content">
			<div class="header-content-logo"><img width="54" src="../assets/imgs/img/logo.png"></div>
			<div class="header-content-tab clearfix">
				<div class="header-content-tab-left">
					<router-link class="header-content-tab-left-menu" :to="{ name: 'index' }">首页</router-link>
					<router-link class="header-content-tab-left-menu" :to="{ name: 'crowdsale' }">众筹</router-link>
					<router-link class="header-content-tab-left-menu" :to="{ name: 'advertisement' }">项目</router-link>
					<!-- <router-link class="header-content-tab-left-menu"
                                    :to="{ name: 'news' }">媒体</router-link> -->
					<!-- <router-link class="header-content-tab-left-menu"
                                    :to="{ name: 'home' }">周末狂欢夜</router-link> -->
				</div>
				<div class="header-content-tab-right">
					<div class="header-content-tab-right-item">
						<a href="javascript:;" @click="switchLang()" v-if="'en' == $i18n.locale">EN</a>
						<a href="javascript:;" @click="switchLang()" v-if="'zh' == $i18n.locale">ZN</a><span>|</span></div>
					<div class="header-content-tab-right-item">
						<a href="javascript:;">biertalk</a><span>|</span></div>
					<div class="header-content-tab-right-item">
						<a href="javascript:;">帮助</a><span>|</span></div>
					<div class="header-content-tab-right-item">
						<a v-if="!userName" @click="toLogin" href="javascript:;">登录</a>
						<a v-if="userName" @click="toPersonCenter" href="javascript:;">{{userName}}</a>
					</div>
				</div>
			</div>
		</div>
		<el-dialog :title="title" :close-on-click-modal="false" :visible.sync="dialogModalVisible" width="360px">
			<div v-show="!registerModel.registerVisible">
				<el-form class="login-modal" :model="loginModal.form" ref="loginModalForm">
					<el-form-item label="账号" prop="email" :label-width="loginModal.formLabelWidth">
						<el-input placeholder="请输入账号" auto-complete="off" v-model="loginModal.form.email"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="passwordAgain" :label-width="loginModal.formLabelWidth">
						<el-input placeholder="请输入密码" auto-complete="off" type="password" v-model="loginModal.form.password"></el-input>
					</el-form-item>
					<el-form-item label="验证码" prop="verifyCode" class="login-verify" :label-width="loginModal.formLabelWidth">
						<el-input placeholder="输入验证码" auto-complete="off" class="login-verify-input" @keyup.enter.native="loginSubmit" v-model="loginModal.form.verifyCode"></el-input>
						<div class="login-verify-btn" @click="changeCode">
							<custom-identify :identify-code="code" :content-width="120" :font-size-min="20"></custom-identify>
						</div>
					</el-form-item>
					<div class="register-foot">
						<el-button type="default" size="small" class="register-foot-btn" round @click="loginSubmit">登 录</el-button>
						<el-button type="default" size="small" class="register-foot-btn" round @click="goToRegister">注 册</el-button>
					</div>
					<div class="register-foot">
						<telegram-login mode="callback" :telegram-login="telegramBot" @callback="callbackFunction"></telegram-login>
					</div>
				</el-form>
			</div>

			<div v-show="registerModel.registerVisible">
				<el-form class="register" :model="registerModel.form" ref="registerModelForm" :rules="registerModel.rule">
					<el-form-item label="邮箱" prop="email" :label-width="registerModel.formLabelWidth">
						<el-input placeholder="请输入邮箱" auto-complete="off" v-model="registerModel.form.email"></el-input>
					</el-form-item>
					<el-form-item label="验证码" prop="verifyCode" class="register-verify" :label-width="registerModel.formLabelWidth">
						<el-input placeholder="请输入验证码" auto-complete="off" v-model="registerModel.form.verifyCode"></el-input>
						<div class="register-verify-btn">
							<span style="color:#909399;">|</span>
							<el-button @click="sendVerifyCode" v-if="disabled" type="text">发送验证码</el-button>
							<el-button v-else disabled type="text">(<span>{{num}}</span>s)后重试</el-button>
						</div>
					</el-form-item>
					<el-form-item label="密码" prop="password" :label-width="registerModel.formLabelWidth">
						<el-popover ref="popover" placement="right" width="200" trigger="focus">
							<div>
								<p>1、密码长度必须介于8到16个字符之间。</p>
								<p>2、密码只能包含英文字母（A-Z）、数字字符（0-9）以及标点符号。</p>
								<p>3、密码至少包含1个英文字母和1个数字字符。</p>
								<p>4、密码不能与账号相同。</p>
							</div>
							<el-input placeholder="请输入密码" auto-complete="off" slot="reference" type="password" v-model="registerModel.form.password"></el-input>
						</el-popover>
					</el-form-item>
					<el-form-item label="确认密码" prop="passwordAgain" :label-width="registerModel.formLabelWidth">
						<el-input placeholder="请输入确认密码" auto-complete="off" type="password" v-model="registerModel.form.passwordAgain"></el-input>
					</el-form-item>
					<el-form-item label="邀请码" :label-width="registerModel.formLabelWidth">
						<el-input placeholder="请输入邀请码,可选" auto-complete="off" v-model="registerModel.form.inviteCode"></el-input>
					</el-form-item>
					<div class="register-foot">
						<el-button type="default" size="small" class="register-foot-btn" round @click="registerSubmit">注 册</el-button>
					</div>
				</el-form>
			</div>

		</el-dialog>
	</header>
</template>
<script>
	import customIdentifyCom from '@/components/common/custom-identify';
	import Cache from '../utils/cache.js';
	import Utils from '../utils/util.js';
	import Request from '../utils/require.js';
	import Config from '../utils/config.js';
	import validateFun from '../utils/validate.js';
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			function passTest(str) {
				// return /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.*?[~/`!@#$%^&*()_+|{}?;:><\-\]\\[\/].*$/.test(str) && /^.{8,16}$/.test(str) && str !== this.registerModel.form.email
				return /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.{8,16}$/.test(str) && str !== this.registerModel.form.email
			}
			let emailValidate = validateFun.validateTest('邮箱不能为空', '邮箱格式不符', val => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val));
			let passwordValidate = validateFun.validateTest('密码不能为空', '密码格式不符', passTest.bind(this))
			let passwordAgainValidate = validateFun.validateTest('确认密码不能为空', '确认密码不一致', val => val === this.registerModel.form.password)
			return {
				utils: new Utils(),
				code: '',
				source: '0123456789',
				codeLen: 4,
				disabled: true,
				num: 60,
				telegramBot: Config.TelegramBot,
				dialogModalVisible: false,
				title: '用户注册',
				registerModel: {
					registerVisible: false,
					formLabelWidth: '6em',
					rule: {
						email: [{
							validator: emailValidate,
							trigger: 'blur'
						}],
						verifyCode: [{
							required: true,
							message: '验证码不能为空',
							trigger: 'blur'
						}],
						password: [{
							validator: passwordValidate,
							trigger: 'blur'
						}],
						passwordAgain: [{
							validator: passwordAgainValidate,
							trigger: 'blur'
						}],
					},
					form: {
						email: '',
						verifyCode: '',
						password: '',
						passwordAgain: '',
						inviteCode: '',
					}
				},
				loginModal: {
					loginVisible: false,
					formLabelWidth: '6em',
					form: {
						email: '',
						password: '',
						verifyCode: '',
					}
				},
				userName: '',
			}
		},
		mounted() {
			this.getUserName()
		},
		methods: {
			...mapMutations({
				changeNamecom: 'changeNamecom'
			}),
			switchLang() {
				if(this.$i18n.locale == "en") {
					this.$store.state.slangChange = 'zh';
					this.$i18n.locale = 'zh';
					this.changeNamecom();
					Cache.setLocal('bier_langChange', 'zh');
				} else {
					this.$store.state.slangChange = 'en'
					this.$i18n.locale = 'en';
					this.changeNamecom();
					Cache.setLocal('bier_langChange', 'en');
				}
			},
			toLogin() {
				this.dialogModalVisible = true;
				this.title = '用户登录';
				this.registerModel.registerVisible = false;
				this.createCode(this.source, this.codeLen);
			},
			toPersonCenter() {
				this.$router.push({
					name: 'personalCenter'
				});
			},
			getUserName() {
				this.userName = this.$store.state.usernickname || Cache.getSession('bier_usernickname') || this.$store.state.username || Cache.getSession('bier_username')
			},
			sendVerifyCode() {
				if(this.registerModel.form.email) {
					Request({
						url: 'SendVerifyCode',
						data: {
							email: this.registerModel.form.email,
							codeType: 1,
						}
					}).then(res => {
						this.disabled = false;
						let timer = setInterval(() => {
							this.num--;
							if(this.num < 1) {
								clearInterval(timer);
								this.disabled = true;
								this.num = 60;
							}
						}, 1000);
					})
				} else {
					this.$message({
						message: 'email is empty',
						type: 'warning'
					})
				}
			},
			callbackFunction(user) {
				console.log('hanguishuai_bot_>', user);
				Request({
					url: 'TelegramAuthorizeCB',
					data: user,
					flag: true,
				}).then(res => {
					console.log('TelegramAuthorize_>', res.data);
					this.handleLoginSucc(res.data);
				})
			},
			registerSubmit() {
				let {
					email,
					verifyCode,
					password,
					inviteCode
				} = this.registerModel.form;
				this.$refs.registerModelForm.validate((valid) => {
					if(valid) {
						Request({
							url: 'Register',
							data: {
								authCode: verifyCode,
								email,
								password,
								inviteCode
							},
							flag: true
						}).then(res => {
							this.dialogModalVisible = false;
							this.handleLoginFunc(email, password);
							this.$message({
								message: res.message,
								type: 'success'
							});
						});
					} else {
						this.$message({
							message: '信息填写不符合规则',
							type: 'warning'
						});
					}
				});
			},
			loginSubmit() {
				let {
					email,
					password,
					verifyCode
				} = this.loginModal.form;
				if(email && password) {
					if(verifyCode === this.code) {
						this.handleLoginFunc(email, password);
					} else {
						this.createCode(this.source, this.codeLen);
						this.$message({
							message: '验证码不正确',
							type: 'warning'
						});
					}
				} else {
					this.$message({
						message: '账号和密码不能为空',
						type: 'warning'
					});
				}
			},
			handleLoginFunc(email, password) {
				Request({
					url: 'Login',
					data: {
						email,
						password
					},
					type: 'get'
				}).then(res => {
					this.handleLoginSucc(res.data);
				})
			},
			handleLoginSucc(data) {
				let {
					id,
					email,
					nickname,
					token,
					phone
				} = data;
				this.$store.commit('setUserId', id);
				this.$store.commit('setUserName', email);
				this.$store.commit('setUserNickName', nickname);
				this.$store.commit('setToken', token);
				Cache.setSession('bier_userid', id);
				Cache.setSession('bier_username', email);
				nickname && Cache.setSession('bier_usernickname', nickname);
				Cache.setSession('bier_token', token);
				this.getUserName();
				this.dialogModalVisible = false;
			},
			goToRegister() {
				this.title = '用户注册';
				this.$refs.registerModelForm && this.$refs.registerModelForm.resetFields();
				this.registerModel.registerVisible = true;
			},
			changeCode() {
				this.createCode(this.source, this.codeLen);
			},
			createCode(source, len) {
				this.code = this.utils.makeCode(source, len);
			}
		},
		components: {
			'custom-identify': customIdentifyCom,
		}
	}
</script>
<style lang="scss" scoped>
	@import '../assets/css/global.scss';
	@import '../assets/css/variable.scss';
	.header {
		width: 100%;
		background-color: #13161f;
		&-content {
			width: $contentWidth;
			height: $headerBarHeight;
			margin: 0 auto;
			color: #fff;
			@include content-flex();
			&-tab {
				margin-left: 62px;
				height: 100%;
				flex: auto;
				&-left {
					float: left;
					&-menu {
						display: inline-block;
						height: 100%;
						margin-right: 36px;
						color: #fff;
						@include header-layout;
					}
				}
				&-right {
					color: #fff;
					float: right;
					@include header-layout;
					@include content-flex();
					&-item {
						& a {
							color: #fff;
							height: 100%;
							display: inline-block;
							padding: 0 25px;
						}
						&:last-child a {
							padding-right: 0;
						}
					}
				}
			}
		}
	}
	
	.login-verify {
		position: relative;
		&-input {
			width: 108px;
		}
		&-btn {
			position: absolute;
			top: 0;
			right: 0;
			height: 40px;
			cursor: pointer;
		}
	}
	
	.register-verify {
		position: relative;
		&-btn {
			position: absolute;
			top: 1px;
			right: 6px;
		}
	}
	
	.register-foot {
		@include content-flex(flex-end);
		&-btn {
			width: 110px;
			background: #FF9500;
			border: none;
			color: #fff;
			&:hover,
			&:active,
			&:focus {
				background: #FF9500;
				color: #fff;
			}
			&:active {
				background: #FCA529;
			}
		}
	}
	
	.login-modal .register-foot {
		@include content-flex(space-around);
	}
	
	.router-link-active {
		background: #333;
	}
</style>