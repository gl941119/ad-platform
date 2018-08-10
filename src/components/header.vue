<template>
	<header class="header">
		<div class="header-content">
			<div class="header-content-logo" style="margin-left: 65px;"><img height="30" src="../assets/imgs/img/logo.png"></div>
			<div class="header-content-tab">
				<div class="header-content-tab-left">
					<router-link class="header-content-tab-left-menu" :to="{ name: 'index' }">{{$t('header.home')}}</router-link>
					<!-- <router-link class="header-content-tab-left-menu" :to="{ name: 'crowdsale' }">{{$t('header.daico')}}</router-link> -->
					<router-link class="header-content-tab-left-menu" :to="{ name: 'advertisement' }">{{$t('header.project')}}</router-link>
					<!-- <router-link class="header-content-tab-left-menu"
                                    :to="{ name: 'news' }">{{$t('header.medium')}}</router-link> -->
					<!-- <router-link class="header-content-tab-left-menu"
                                    :to="{ name: 'home' }">{{$t('header.sunday')}}</router-link> -->
				</div>
				<div class="header-content-tab-right">
					<div class="header-content-tab-right-item languae">
						<el-select size="mini" class="language_height" v-model="select" slot="prepend" @change="change(select)">
							<el-option label="English" value="EN"></el-option>
							<el-option label="简体中文" value="zh"></el-option>
							<!--<el-option label="한국어" value="ko"></el-option>-->
							<!--<el-option label="日本語" value="ja"></el-option>-->
						</el-select>
					</div>
					<div class="header-content-tab-right-item">
						<span>|</span><a href="javascript:" @click="goToTelegram"><i class="custom-element-icon-telegram"></i></a><span>|</span></div>
					<!-- <div class="header-content-tab-right-item">
						<a href="javascript:;"><i class="custom-element-icon-questionsign"></i></a><span>|</span></div> -->
					<div class="header-content-tab-right-item head-img">
						<a v-show="!userName" @click="toLogin" href="javascript:"><i class="custom-element-icon-touxiang" style="margin-right:8px;"></i><span class="header-content-tab-right-item-username">{{$t('header.login')}}</span></a>
						<a v-show="userName" @click="toPersonCenter" href="javascript:"><img class="header-content-tab-right-item-img" :src="heardUrl"><span class="header-content-tab-right-item-username">{{userName}}</span></a>
					</div>
				</div>
			</div>
		</div>
        <!--登录dialog-->
		<el-dialog :title="title" :close-on-click-modal="false" :visible.sync="dialogModalVisible" :width="$t('login.modelWidth')">
			<div v-show="!registerModel.registerVisible">
				<el-form class="login-modal" :model="loginModal.form" ref="loginModalForm">
					<el-form-item :label="$t('login.account')" prop="email" :label-width="getLabelWidth(language, 'login')">
						<el-input :placeholder="$t('login.enterAccount')" auto-complete="off" v-model="loginModal.form.email"></el-input>
					</el-form-item>
					<el-form-item :label="$t('login.password')" prop="passwordAgain" :label-width="getLabelWidth(language, 'login')">
						<el-input :placeholder="$t('login.enterPassword')" auto-complete="off" type="password" v-model="loginModal.form.password"></el-input>
					</el-form-item>
					<el-form-item :label="$t('login.verifyCode')" prop="verifyCode" class="login-verify" :label-width="getLabelWidth(language, 'login')">
						<el-input :placeholder="$t('login.enterCode')" auto-complete="off" class="login-verify-input" :class="{'english-lang': language==='EN'}" @keyup.enter.native="loginSubmit" v-model="loginModal.form.verifyCode"></el-input>
						<div class="login-verify-btn" @click="changeCode">
                            <img width="120" height="40" :src="'data:image/png;base64, ' + base64Str">
						</div>
					</el-form-item>
					<div class="register-foot" :style="{'padding-left': getLabelWidth(language, 'login')}">
						<el-button type="text" size="small" class="register-foot-text" @click="goToRegister">{{$t('register.register')}}</el-button>
						<el-button type="text" size="small" class="register-foot-text" @click="goToForgetPwd">{{$t('forgetPassword.forget')}}</el-button>
						<el-button type="default" size="small" class="register-foot-btn" @click="loginSubmit">{{$t('login.login')}}</el-button>
					</div>
                    <!--快速登陸-->
					<div class="register-other">
                        <span class="register-other-text">{{$t('login.quicklyLogin')}}</span>
						<telegram-login mode="callback" :telegram-login="telegramBot" @callback="callbackFunction"></telegram-login>
					</div>
				</el-form>
			</div>
			<div v-show="registerModel.registerVisible">
				<el-form class="register" :model="registerModel.form" ref="registerModelForm" :rules="registerModel.rule">
					<el-form-item :label="$t('register.registerEmail')" prop="email" :label-width="getLabelWidth(language, 'register')">
						<el-input :placeholder="$t('register.enterRegisterEmial')" auto-complete="off" v-model="registerModel.form.email"></el-input>
					</el-form-item>
					<el-form-item :label="$t('register.registerCode')" prop="verifyCode" class="register-verify" :label-width="getLabelWidth(language, 'register')">
						<el-input :placeholder="$t('register.enterRegisterCode')" auto-complete="off" v-model="registerModel.form.verifyCode"></el-input>
						<div class="register-verify-btn">
							<span style="color:#909399;">|</span>
							<el-button @click="sendVerifyCode" v-if="disabled" type="text">{{$t('register.sendCode')}}</el-button>
							<el-button v-else disabled type="text">(<span>{{num}}</span>s){{$t('register.again')}}</el-button>
						</div>
					</el-form-item>
					<el-form-item :label="$t('register.registerPassword')" prop="password" :label-width="getLabelWidth(language, 'register')">
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
					<el-form-item :label="$t('register.registerOncePassword')" prop="passwordAgain" :label-width="getLabelWidth(language, 'register')">
						<el-input :placeholder="$t('register.enterOncePassword')" auto-complete="off" type="password" v-model="registerModel.form.passwordAgain"></el-input>
					</el-form-item>
					<el-form-item :label="$t('register.registerVerifyCode')" :label-width="getLabelWidth(language, 'register')">
						<el-input :placeholder="$t('register.registerInviteCode')" auto-complete="off" v-model="registerModel.form.inviteCode"></el-input>
					</el-form-item>
                    <div class="register-disclaimer">
                        <el-checkbox class="register-foot-disclaimer-item" v-model="disclaimerChecked"></el-checkbox>
                        <a href="javascript:" @click="goTodisclaimer" class="register-foot-disclaimer-item">{{$t('register.disclaimer')}}</a>
                    </div>
					<div class="register-foot">
						<el-button type="default" size="small" class="register-foot-btn" round @click="registerSubmit">{{$t('register.register')}}</el-button>
					</div>
				</el-form>
			</div>
		</el-dialog>

        <el-dialog class="telegram-dialog" :title="$t('header.tips')" :visible.sync="telegramVisible" width="360px">
            <div class="telegram-dialog-content">{{$t('header.tipMsg')}}</div>
            <div class="telegram-dialog-footer" @click="IGotIt" slot="footer">{{$t('header.got')}}</div>
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
	function passTest(str) {
		// return /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.*?[~/`!@#$%^&*()_+|{}?;:><\-\]\\[\/].*$/.test(str) && /^.{8,16}$/.test(str) && str !== this.registerModel.form.email
		return /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.{8,16}$/.test(str) && str !== this.registerModel.form.email
	}
	
	export default {
		data() {
			let emailValidate = validateFun.validateTest(this.$t('messageNotice.emailEmpty'), this.$t('messageNotice.emailFormat'), val => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val));
			let passwordValidate = validateFun.validateTest(this.$t('messageNotice.passwordEmpty'), this.$t('messageNotice.passwordFormat'), passTest.bind(this))
			let passwordAgainValidate = validateFun.validateTest(this.$t('messageNotice.oncePasswordEmpty'), this.$t('messageNotice.oncePasswordEqual'), val => val === this.registerModel.form.password)

			return {
				utils: new Utils(),
				source: '0123456789',
                codeLen: 4,
                id: this.$store.state.id,
                token: this.$store.state.token,
				disabled: true,
				num: 60,
				telegramBot: Config.TelegramBot,
                title: this.$t('register.userRegister'),
                validateKey: undefined,
                base64Str: undefined,
                disclaimerChecked: true,
                telegramVisible: false,
				registerModel: {
					registerVisible: this.$store.state.registerVisible,
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
					form: {
						email: '',
						password: '',
						verifyCode: '',
					}
				},
				select: this.$i18n.locale,
			}
        },
        watch: {
        	language(val, old){
        		this.registerModel.rule = {
						email: [{
							validator: validateFun.validateTest(this.$t('messageNotice.emailEmpty'), this.$t('messageNotice.emailFormat'), val => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)),
							trigger: 'blur'
						}],
						verifyCode: [{
							required: true,
							message: this.$t('messageNotice.codeEmpty'),
							trigger: 'blur'
						}],
						password: [{
							validator: validateFun.validateTest(this.$t('messageNotice.passwordEmpty'), this.$t('messageNotice.passwordFormat'), passTest.bind(this)),
							trigger: 'blur'
						}],
						passwordAgain: [{
							validator: validateFun.validateTest(this.$t('messageNotice.oncePasswordEmpty'), this.$t('messageNotice.oncePasswordEqual'), val => val === this.registerModel.form.password),
							trigger: 'blur'
						}],
					}
            },
        },
        computed: {
            userName: {
                get(){
                    return this.$store.state.usernickname || this.$store.state.username;
                },
                set(){}
            },
            heardUrl() {
                return this.$store.state.heardUrl || Config.headPortrait[5];
            },
            dialogModalVisible: {
                get(){
                    if(this.$store.state.dialogModalVisible === true) {
                        this.toLogin();
                    }
                    if(this.$store.state.dialogModalVisible === 'register'){
                        this.goToRegister();
                        this.$store.commit('setRegisterVisible', true);
                        return true;
                    }
                    return this.$store.state.dialogModalVisible;
                },
                set(val){
                    this.$store.commit('setDialogModalVisible', val)
                }
            },
            language(){
                return this.utils.getCurrLanguage(this.$store);
            },
        },
        mounted(){
        	var arr = window.location.hash;
            this.registerModel.form.inviteCode = arr.split('=')[2];
            var token = Cache.getSession('bier_token')
            var id = Cache.getSession('bier_userid')
            !token && !id && this.getUserInfo()
        },
		methods: {
            getLabelWidth(lang, type){
                return type === 'login' ?
                (lang === 'EN' ? '8em' : '6em') :
                (lang === 'EN' ? '10em' : '6em')
            },
			change(value){
				if(value=='en'){
					value = value.toUpperCase();
				}
				this.$i18n.locale = value;
				this.$store.commit('setLanguage', value);
				Cache.setLocal('bier_langChange', value);
            },
            goToTelegram(){
                // https://t.me/AFDchain99
                this.telegramVisible = true;
            },
            IGotIt(){
                this.telegramVisible = false;
                this.utils.newWin('https://t.me/AFDchain99');
            },
			toLogin() {
                this.createCode().then(() => {
                    this.dialogModalVisible = true;
                    this.title = this.$t('login.userLogin');
                    this.registerModel.registerVisible = false;
                })
            },
            goToForgetPwd(){
                this.dialogModalVisible = false;
                this.$store.commit('setGlobalShow', 'hide');
                Cache.setSession('globalShow', 'hide');
                this.$router.push({name: 'resetpwd'});
            },
			toPersonCenter() {
				this.$router.push({
					name: 'personalCenter'
				});
            },
            goTodisclaimer(){
                this.$store.commit('setDialogModalVisible', false);
                this.$router.push({name: 'userterm'});
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
						this.$message({
							message: this.utils.judgeLanguage(this.language, res.message),
							type: 'success'
						});
					}).catch(console.error)
				} else {
					this.$message({
						message: 'email is empty',
						type: 'warning'
					})
				}
			},
			callbackFunction(user) {
				// console.log('hanguishuai_bot_>', user);
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
                if(this.disclaimerChecked) {
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
                                this.toLogin();
                                this.$message({
                                    message: this.utils.judgeLanguage(this.language, res.message),
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
                } else {
                    this.$message({message: '请阅读免责声明', type: 'warning'});
                }
            },
            // login button
			loginSubmit() {
				let {
					email,
					password,
					verifyCode
                } = this.loginModal.form;
				if(email && password && verifyCode) {
                    this.handleLoginFunc(email, password, verifyCode);
				} else {
					this.$message({
						message: this.$t('messageNotice.notEmpty'),
						type: 'warning'
					});
				}
			},
			handleLoginFunc(email, password, validateCode) {//登录
				Request({
					url: 'Login',
					data: {
						email: validateFun.encrypt(email),
                        password: validateFun.encrypt(password),
                        validateCode,
                        validateKey: this.validateKey,
					},
                    type: 'post',
                    flag: true,
				}).then(res => {
					this.handleLoginSucc(res.data);
					this.queryCode(res.data.id);
				}).catch(e => {
                    // console.log('err',e);
                    if(e.message === '1035'){
                        this.createCode();
                    }
                })
			},
			queryCode(value) {
                Request({
                    url: 'QueryInviteCode',
                    data: {
                        accountId: value,
                    },
                    type: 'get'
                }).then(res => {
					this.$store.commit('setInviteCode', res.data.inviteCode);
					Cache.setSession('bier_inviteCode', res.data.inviteCode);
                })
            },
			handleLoginSucc(data) {
				let {
					id,
					email,
					nickname,
					token,
					phone,
					heardUrl,
				} = data;
				this.$store.commit('setUserId', id);
				this.$store.commit('setUserName', email);
                this.$store.commit('setUserNickName', nickname);
                // cookie 中不保存 token
				token && this.$store.commit('setToken', token);
				this.$store.commit('setHeardUrl', heardUrl);
				var exp = new Date();
                exp.setTime(exp.getTime() + 1000 * 60 * 10); //这里表示保存10分钟
                document.cookie = "login_identify=" + id + ";expires=" + exp.toGMTString();
                token && (document.cookie = 'login_token=' + token + ";expires=" + exp.toGMTString());
				Cache.setSession('bier_userid', id);
				Cache.setSession('bier_username', email);
				nickname && Cache.setSession('bier_usernickname', nickname);
				token && Cache.setSession('bier_token', token);
				heardUrl && Cache.setSession('bier_heardUrl', heardUrl);
                this.dialogModalVisible = false;
                this.$router.push({name: 'index'});
            },
			goToRegister() {
				this.title = this.$t('register.userRegister');
				this.$refs.registerModelForm && this.$refs.registerModelForm.resetFields();
				this.registerModel.registerVisible = true;
			},
			changeCode() {
				this.createCode();
			},
			createCode() {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'GetVerifyFromSer',
                        type: 'get'
                    }).then(res => {
                        Object.assign(this, res.data);
                        resolve();
                    })
                });
            },
            getUserInfo() {
                var id = Cache.getCookie('login_identify')
                var token = Cache.getCookie('login_token')
                token && id &&  
                    Request({
                        url: 'GetUserInfoById',
                        type: 'get',
                        data: {id: this.id}
                    }).then(res => {
                        // console.log('GetUserInfoById_>', res);
                        console.log(111)
                        this.handleLoginSucc(res.data);
                        this.queryCode(this.id);
                    }).catch(console.error)
            },
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
		/*background-color: #13161f;*/
        background: #646464;
		&-content {
			width: $contentWidth;
			height: $headerBarHeight;
			margin: 0 auto;
            color: #fff;
            /*background-color: #13161f;*/
            background: #646464;
			@include content-flex();
			&-tab {
				margin-left: 62px;
				height: 100%;
                flex: auto;
                @include content-flex(space-between);                
				&-left {
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
					@include header-layout;
					@include content-flex();
					&-item {
						& a {
							color: #fff;
							height: 100%;
							display: inline-block;
                            padding: 0 25px;
                        }
                        &.head-img a{
                            @include content-flex();
                        }
						&:last-child a {
							padding-right: 0;
                        }
                        &-img {
                            width: 30px;
                            height: 30px;
                            margin-right: 8px;
                            border-radius: 50%;
                        }
                        &-username {
                            width: 4em;
                            @include text-ellipsis();
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
			width: 115px;
		}
        &-input.english-lang {
            width: 130px;
        }
		&-btn {
			position: absolute;
			top: 0;
			right: 0;
			height: 40px;
            cursor: pointer;
            &>img {
                border: 1px solid #ccc;
                border-radius: 3px;
            }
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
        @include content-flex(center);
        position: relative;
        &-disclaimer {
            position: absolute;
            top: 0;
            left: 0;
            &-item {
                margin-left: 13px;
                color: #909399;
                font-size: 14px;
                line-height: 20px;
            }
        }
        &-text {
            color: #666;
            font-size: 14px;
            &:hover,&:active,
			&:focus {
                color: #999;
            }
        }
		&-btn {
			width: 90px;
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
        margin-top: 30px;
        border-top: 2px solid #E0E0E0;
        &-text {
            position: absolute;
            width: 78px;
            text-align: center;
            line-height: 28px;
            height: 28px;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            font-size: 12px;
            color: #999;
        }
    }
	
	.login-modal .register-foot {
		@include content-flex(space-between);
	}
	
	.router-link-active {
		/*background: #333;*/
        border-bottom: 2px solid #FFFFFF;
    }
    
    .telegram-dialog {
        &-content {
            font-size: 20px;
            text-align: center;
            color: #FF9500;
            margin: 20px 0;
        }
        &-footer {
            color: #333333;
            font-size: 20px;
            margin: -10px -20px -20px;
            text-align: center;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }

    .register-disclaimer {
        margin-left: 1em;
        margin-bottom: 22px;
    }
</style>