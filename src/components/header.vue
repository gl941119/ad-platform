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
					<div class="header-content-tab-right-item">
						<a href="javascript:" @click="goToTelegram"><i class="custom-element-icon-telegram"></i></a><span>|</span>
                    </div>
                    <div class="header-content-tab-right-item">
						<a href="javascript:" @click="goRegister()">注册</a><span>|</span>
                    </div>
					<!-- <div class="header-content-tab-right-item">
						<a href="javascript:;"><i class="custom-element-icon-questionsign"></i></a><span>|</span></div> -->
					<div class="header-content-tab-right-item head-img">
						<a v-show="!userName" @click="toLogin" href="javascript:"><i class="custom-element-icon-touxiang" style="margin-right:8px;"></i><span class="header-content-tab-right-item-username">{{$t('header.login')}}</span></a>
						<a v-show="userName" @click="toPersonCenter" href="javascript:"><img class="header-content-tab-right-item-img" :src="heardUrl"><span class="header-content-tab-right-item-username">{{userName}}</span></a>
					</div>
					<div class="header-content-tab-right-item languae">
						<el-select size="mini" class="language_height" v-model="select" slot="prepend" @change="change(select)">
							<el-option label="English" value="EN"></el-option>
							<el-option label="简体中文" value="zh"></el-option>
							<!--<el-option label="한국어" value="ko"></el-option>-->
							<!--<el-option label="日本語" value="ja"></el-option>-->
						</el-select>
					</div>
				</div>
			</div>
		</div>
<<<<<<< HEAD
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
        <!--问答弹窗-->
=======
>>>>>>> f333f7968b4d59439c751a0cd1bff9dbeca74165
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
    export default {
        data() {
            return {
                utils: new Utils(),
                id: this.$store.state.id,
                token: this.$store.state.token,
                telegramVisible: false,
                select: this.$i18n.locale,
            }
        },
        computed: {
            userName: {
                get() {
                    return this.$store.state.usernickname || this.$store.state.username;
                },
                set() {}
            },
            heardUrl() {
                return this.$store.state.heardUrl || Config.headPortrait[5];
            },
            language() {
                return this.utils.getCurrLanguage(this.$store);
            },
        },
        mounted() {
            var token = Cache.getSession('bier_token');
            var id = Cache.getSession('bier_userid');
            !token && !id && this.getUserInfo()
            var arr = window.location.hash;
            var inviteCode = arr.split('=')[2];
            console.log('invite code ->', arr, arr.split('='),  inviteCode);
            if(inviteCode){
                this.$store.commit('setRegisterCode', inviteCode);
                Cache.setSession('bier_register_code', inviteCode);
                this.$router.push({name:'register'});
            }
        },
        methods: {
            goRegister(){
                this.$router.push({
                    name:'register',
                });
            },
            getLabelWidth(lang, type) {
                return type === 'login' ?
                    (lang === 'EN' ? '8em' : '6em') :
                    (lang === 'EN' ? '10em' : '6em')
            },
            change(value) {
                if (value == 'en') {
                    value = value.toUpperCase();
                }
                this.$i18n.locale = value;
                this.$store.commit('setLanguage', value);
                Cache.setLocal('bier_langChange', value);
            },
            goToTelegram() {
                // https://t.me/AFDchain99
                this.telegramVisible = true;
            },
            IGotIt() {
                this.telegramVisible = false;
                this.utils.newWin('https://t.me/AFDchain99');
            },
            toLogin() {
                this.$router.push({
                    name:'login',
                })
            },
            toPersonCenter() {
                this.$router.push({
                    name: 'personalCenter'
                });
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
                if (token === 'undefined') {
                    var tokens = Cache.getCookie('login_token');
                }
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
                this.$router.push({
                    name: 'index'
                });
            },
            getUserInfo() {
                var id = Cache.getCookie('login_identify')
                var token = Cache.getCookie('login_token')
                token && id &&
                    Request({
                        url: 'GetUserInfoById',
                        type: 'get',
                        data: {
                            id: this.id
                        }
                    }).then(res => {
                        // console.log('GetUserInfoById_>', res);
                        this.handleLoginSucc(res.data);
                        this.$store.commit('setToken', token);
                        Cache.setSession('bier_token', token);
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
                        &.head-img a {
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

    .languae {
        width: 100px;
        margin-right: 20px;
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

    // .register-disclaimer {
    //     margin-left: 1em;
    //     margin-bottom: 22px;
    // }
</style>