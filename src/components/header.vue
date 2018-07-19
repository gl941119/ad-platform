<template>
	<header class="header">
		<div class="header-content">
			<div class="header-content-logo" style="margin-left: 65px;"><img height="30" src="../assets/imgs/img/logo.png"></div>
			<div class="header-content-tab clearfix">
				<div class="header-content-tab-left">
					<router-link class="header-content-tab-left-menu" :to="{ name: 'index' }">{{$t('header.home')}}</router-link>
					<router-link class="header-content-tab-left-menu" :to="{ name: 'crowdsale' }">{{$t('header.daico')}}</router-link>
					<router-link class="header-content-tab-left-menu" :to="{ name: 'advertisement' }">{{$t('header.project')}}</router-link>
					<!-- <router-link class="header-content-tab-left-menu"
                                    :to="{ name: 'news' }">{{$t('header.medium')}}</router-link> -->
					<!-- <router-link class="header-content-tab-left-menu"
                                    :to="{ name: 'home' }">{{$t('header.sunday')}}</router-link> -->
				</div>
				<div class="header-content-tab-right">
					<div class="header-content-tab-right-item languae">
						<el-select size="mini" class="language_height" v-model="select" slot="prepend" @change="change(select)">
							<el-option label="English" value="en"></el-option>
							<el-option label="简体中文" value="zh"></el-option>
							<el-option label="한국어" value="ko"></el-option>
							<el-option label="日本語" value="ja"></el-option>
						</el-select>
					</div>
					<!--<div class="header-content-tab-right-item">
						<a href="javascript:;" @click="switchLang()" v-if="'en' == $i18n.locale">EN</a>
						<a href="javascript:;" @click="switchLang()" v-if="'zh' == $i18n.locale">ZN</a><span>|</span></div>-->
					<div class="header-content-tab-right-item">
						<span>|</span><a href="javascript:;"><i class="custom-element-icon-telegram"></i></a><span>|</span></div>
					<div class="header-content-tab-right-item">
						<a href="javascript:;"><i class="custom-element-icon-questionsign"></i></a><span>|</span></div>
					<div class="header-content-tab-right-item">
						<a v-if="!userName" @click="toLogin" href="javascript:;">{{$t('header.login')}}</a>
						<a v-if="userName" @click="toPersonCenter" href="javascript:;">{{userName}}</a>
					</div>
				</div>
			</div>
		</div>
		<el-dialog :title="title" :close-on-click-modal="false" :visible.sync="dialogModalVisible" width="360px">
			<div v-show="!registerModel.registerVisible">
				<el-form class="login-modal" :model="loginModal.form" ref="loginModalForm">
					<el-form-item :label="$t('login.account')" prop="email" :label-width="loginModal.formLabelWidth">
						<el-input :placeholder="$t('login.enterAccount')" auto-complete="off" v-model="loginModal.form.email"></el-input>
					</el-form-item>
					<el-form-item :label="$t('login.password')" prop="passwordAgain" :label-width="loginModal.formLabelWidth">
						<el-input :placeholder="$t('login.enterPassword')" auto-complete="off" type="password" v-model="loginModal.form.password"></el-input>
					</el-form-item>
					<el-form-item :label="$t('login.verifyCode')" prop="verifyCode" class="login-verify" :label-width="loginModal.formLabelWidth">
						<el-input :placeholder="$t('login.enterCode')" auto-complete="off" class="login-verify-input" @keyup.enter.native="loginSubmit" v-model="loginModal.form.verifyCode"></el-input>
						<div class="login-verify-btn" @click="changeCode">
							<custom-identify :identify-code="code" :content-width="120" :font-size-min="20"></custom-identify>
						</div>
					</el-form-item>
					<div class="register-foot">
						<el-button type="default" size="small" class="register-foot-btn" round @click="loginSubmit">{{$t('login.login')}}</el-button>
						<el-button type="default" size="small" class="register-foot-btn" round @click="goToRegister">{{$t('register.register')}}</el-button>
					</div>
					<div class="register-other">
						<telegram-login mode="callback" :telegram-login="telegramBot" @callback="callbackFunction"></telegram-login>
					</div>
				</el-form>
			</div>

			<div v-show="registerModel.registerVisible">
				<el-form class="register" :model="registerModel.form" ref="registerModelForm" :rules="registerModel.rule">
					<el-form-item :label="$t('register.registerEmail')" prop="email" :label-width="registerModel.formLabelWidth">
						<el-input :placeholder="$t('register.enterRegisterEmial')" auto-complete="off" v-model="registerModel.form.email"></el-input>
					</el-form-item>
					<el-form-item :label="$t('register.registerCode')" prop="verifyCode" class="register-verify" :label-width="registerModel.formLabelWidth">
						<el-input :placeholder="$t('register.enterRegisterCode')" auto-complete="off" v-model="registerModel.form.verifyCode"></el-input>
						<div class="register-verify-btn">
							<span style="color:#909399;">|</span>
							<el-button @click="sendVerifyCode" v-if="disabled" type="text">{{$t('register.sendCode')}}</el-button>
							<el-button v-else disabled type="text">(<span>{{num}}</span>s){{$t('register.again')}}</el-button>
						</div>
					</el-form-item>
					<el-form-item :label="$t('register.registerPassword')" prop="password" :label-width="registerModel.formLabelWidth">
						<el-popover ref="popover" placement="right" width="200" trigger="focus">
							<div>
								<p>{{$t('passwordNotic.one')}}</p>
								<p>{{$t('passwordNotic.two')}}</p>
								<p>{{$t('passwordNotic.three')}}</p>
								<p>{{$t('passwordNotic.four')}}</p>
							</div>
							<el-input :placeholder="$t('register.enterRegisterPassword')" auto-complete="off" slot="reference" type="password" v-model="registerModel.form.password"></el-input>
						</el-popover>
					</el-form-item>
					<el-form-item :label="$t('register.registerOncePassword')" prop="passwordAgain" :label-width="registerModel.formLabelWidth">
						<el-input :placeholder="$t('register.enterOncePassword')" auto-complete="off" type="password" v-model="registerModel.form.passwordAgain"></el-input>
					</el-form-item>
					<el-form-item :label="$t('register.registerVerifyCode')" :label-width="registerModel.formLabelWidth">
						<el-input :placeholder="$t('register.registerInviteCode')" auto-complete="off" v-model="registerModel.form.inviteCode"></el-input>
					</el-form-item>
					<div class="register-foot">
						<el-button type="default" size="small" class="register-foot-btn" round @click="registerSubmit">{{$t('register.register')}}</el-button>
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
			let emailValidate = validateFun.validateTest(this.$t('messageNotice.emailEmpty'), this.$t('messageNotice.emailFormat'), val => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val));
			let passwordValidate = validateFun.validateTest(this.$t('messageNotice.passwordEmpty'), this.$t('messageNotice.passwordFormat'), passTest.bind(this))
			let passwordAgainValidate = validateFun.validateTest(this.$t('messageNotice.oncePasswordEmpty'), this.$t('messageNotice.oncePasswordEqual'), val => val === this.registerModel.form.password)
			return {
				utils: new Utils(),
				code: '',
				source: '0123456789',
				codeLen: 4,
				disabled: true,
				num: 60,
				telegramBot: Config.TelegramBot,
				dialogModalVisible: false,
				title: this.$t('register.userRegister'),
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
							message: this.$t('messageNotice.codeEmpty'),
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
				select:'en',
			}
        },
        computed: {
            userName: {
                get(){
                    return this.$store.state.usernickname || Cache.getSession('bier_usernickname') || this.$store.state.username || Cache.getSession('bier_username');
                },
                set(){}
            }
        },
		methods: {
			change(value){
				this.$i18n.locale = value;
				this.$store.commit('setLanguage', value);
				Cache.setLocal('bier_langChange', value);
			},
			switchLang() {
				if(this.$i18n.locale == "en") {
					this.$i18n.locale = 'zh';
					this.$store.commit('setLanguage', 'zh');
					Cache.setLocal('bier_langChange', 'zh');
				} else {
					this.$i18n.locale = 'en';
					this.$store.commit('setLanguage', 'en');
					Cache.setLocal('bier_langChange', 'en');
				}
			},
			toLogin() {
				this.dialogModalVisible = true;
				this.title = this.$t('login.userLogin');
				this.registerModel.registerVisible = false;
				this.createCode(this.source, this.codeLen);
			},
			toPersonCenter() {
				this.$router.push({
					name: 'personalCenter'
				});
			},
			getUserName() {
				return this.$store.state.usernickname || Cache.getSession('bier_usernickname') || this.$store.state.username || Cache.getSession('bier_username')
			},
			sendVerifyCode() {
				if(this.registerModel.form.email) {
					Request({
						url: 'SendVerifyCode',
						data: {
							email: this.registerModel.form.email,
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
								message: this.utils.judgeLanguage(store.state.slangChange, res.message),
								type: 'success'
							});
						});
					} else {
						this.$message({
							message: this.$t('messageNotice.formatMatch'),
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
							message: this.$t('messageCode.verificationCode'),
							type: 'warning'
						});
					}
				} else {
					this.$message({
						message: this.$t('messageNotice.notEmpty'),
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
					phone,
					heardUrl
				} = data;
				this.$store.commit('setUserId', id);
				this.$store.commit('setUserName', email);
				this.$store.commit('setUserNickName', nickname);
				this.$store.commit('setToken', token);
				this.$store.commit('setHeardUrl', heardUrl);
				
				Cache.setSession('bier_userid', id);
				Cache.setSession('bier_username', email);
				nickname && Cache.setSession('bier_usernickname', nickname);
				Cache.setSession('bier_token', token);
				heardUrl && Cache.setSession('bier_heardUrl', heardUrl);
				this.userName = this.getUserName();
				this.dialogModalVisible = false;
			},
			goToRegister() {
				this.title = this.$t('register.userRegister');
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
	.languae{
		width: 100px;
		margin-right: 20px;
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
    
    .register-other {
        min-height: 30px;
        position: relative;
    }
	
	.login-modal .register-foot {
		@include content-flex(space-around);
	}
	
	.router-link-active {
		background: #333;
	}
</style>