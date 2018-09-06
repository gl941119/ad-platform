<template>
    <div class="register">
        <div class="register-container">
            <div class="register-container-left">
                <img src="../../assets/imgs/img/login.png" />
            </div>
            <div class="register-container-right">
                <div class="register-container-right-header">
                    <img src="../../assets/imgs/img/login-header.png" />
                </div>
                <ul class="register-container-right-item">
                    <li v-for="(item, index) in liData" :key="index" @click="clickLi(index)" :class="{'active':item.style}" class="register-container-right-item-li">{{item.value}}</li>
                </ul>
                <div class="register-container-right-inputBox">
                    <div class="register-container-right-inputBox-item">
                        <input v-if="index===0" v-validate="{required: true}" name="phoneNumber" class="register-container-right-inputBox-item-input" placeholder="请输入手机号" autocomplete="off" v-model="register.phoneNumber" />
                        <span class="is-danger" v-show="errors.has('phoneNumber')">{{errors.first('phoneNumber')}}</span>
                        <input v-if="index===1" name="account" class="register-container-right-inputBox-item-input" placeholder="请输入邮箱或手机号" autocomplete="off" v-model="register.account" />
                        <span class="is-danger" v-show="errors.has('account')">{{errors.first('account')}}</span>
                        <i class="custom-element-icon-zhanghu"></i>
                    </div>
                    <div v-if="index === 0" class="register-container-right-inputBox-item">
                        <input v-validate="'required'" type="text" name="code" @keyup.enter="quicklyLogin()" class="register-container-right-inputBox-item-input code" placeholder="请输入验证码" autocomplete="off" v-model="register.code" />
                        <span class="is-danger" v-show="errors.has('code')">{{errors.first('code')}}</span>
                        <i class="custom-element-icon-mima"></i>
                        <el-button class="register-container-right-inputBox-item-verifyCode" @click="sendVerifyCode" v-if="disabled" type="text">{{$t('register.sendCode')}}</el-button>
                        <el-button class="register-container-right-inputBox-item-verifyCode" :class="{'sendCode':!disabled}" v-else disabled type="text">(<span>{{num}}</span>s){{$t('register.again')}}</el-button>
                    </div>
                    <div v-if="index===1" class="register-container-right-inputBox-item" slot="reference">
                        <input style="display:none;" name="text" type="text"/>
                        <input style="display:none;" name="pasword" type="password"/>
                        <input name='password' type="password" v-validate="{required: true}" class="register-container-right-inputBox-item-input" placeholder="请输入密码" autocomplete="off"
                            v-model="register.password" />
                        <span class="is-danger" v-show="errors.has('password')">{{errors.first('password')}}</span>
                        <i class="custom-element-icon-mima"></i>
                    </div>
                    <div v-if="index===1" class="register-container-right-inputBox-code">
                        <input placeholder="验证码" v-model="verifyCode" @keyup.enter="nowLogin()"/>
                        <div class="register-container-right-inputBox-code-img">
                            <img v-if="base64Str" width="102" height="38" :src="'data:image/png;base64, ' + base64Str">
						</div>
                        <button  @click="getCode">看不清，换一张</button>
                    </div>
                    <div class="register-container-right-inputBox-text agree">
                        <el-checkbox class="register-container-right-inputBox-text-checkbox" v-model="disclaimerChecked"></el-checkbox>
                        <span class="register-container-right-inputBox-text-span">记住我</span>
                        <button class="register-container-right-inputBox-text-span statement" @click="forgetPassword()" v-if="index===1">忘记密码？</button>
                    </div>
                    <div class="register-container-right-inputBox-item">
                        <button class="register-container-right-inputBox-item-button" v-if="index===0" @click="quicklyLogin()">快速登录</button>
                        <button class="register-container-right-inputBox-item-button" v-else @click="nowLogin()">立即登录</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Request from '../../utils/require.js';
    import Utils from '../../utils/util.js';
    import validateFun from '../../utils/validate.js';
    import Cache from '../../utils/cache.js';
    export default {
        data() {
            return {
                utils: new Utils(),
                liData: [{
                    value: '快速登录',
                    style: true,
                }, {
                    value: '账号密码登录',
                    style: false,
                }],
                register: {
                    phoneNumber: Cache.getCookie('login_phone')||'',
                    account: Cache.getCookie('login_account')||'',
                    password: Cache.getCookie('login_password')||'',
                    code: '',
                },
                verifyCode:'',
                validateKey:'',
                index: 0,
                disclaimerChecked: false,
                disabled: true,
                num: 60,
                base64Str:undefined,
            }
        },
        methods: {
            forgetPassword(){
                this.$router.push({
                    name: 'resetpwd'
                });
            },
            getCode() {
                Request({
                    url: 'GetVerifyFromSer',
                    type: 'get'
                }).then(res => {
                    this.base64Str = res.data.base64Str;
                    this.validateKey = res.data.validateKey;
                })
            },
            sendVerifyCode() {
                let {
                    phoneNumber,
                } = this.register;
                if (this.index === 0) {
                    if (!phoneNumber){
                        this.$message({
                            message:'手机号不能为空',
                            type:'warning',
                        });
                        return;
                    }
                }
                Request({
                    url: 'QuicklyLoginCode',
                    data: {
                        phone: phoneNumber,
                    }
                }).then(res => {
                    this.disabled = false;
                    let timer = setInterval(() => {
                        this.num--;
                        if (this.num < 1) {
                            clearInterval(timer);
                            this.disabled = true;
                            this.num = 60;
                        }
                    }, 1000);
                    // this.$message({
                    //     message: this.utils.judgeLanguage(this.language, res.message),
                    //     type: 'success'
                    // });
                    this.$message({
                        message: '验证码发送成功',
                        type: 'success'
                    });
                }).catch(console.error)

            },
            quicklyLogin(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let {
                            phoneNumber,
                            code,
                        } = this.register;
                        Request({
                            url: 'QuicklyLogin',
                            data: {
                                phone: validateFun.encrypt(phoneNumber),
                                validateCode: code,
                            },
                            flag: true,
                        }).then(res => {
                            // this.$message({
                            //     message: this.utils.judgeLanguage(this.language, res.message),
                            //     type: 'success'
                            // });
                            this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                            this.handleLoginSucc(res.data);
                            if(this.disclaimerChecked){
                                var exp = new Date();
                                exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7); //这里表示保存7天
                                document.cookie = "login_phone=" + phoneNumber + ";expires=" + exp.toGMTString();
                            }
                        })
                    }
                });
            },
            nowLogin() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let {
                            account,
                            password,
                        } = this.register;
                        if(account){
                            let str = /@/;
                            let value = str.test(account);
                            if(value){
                                var type = 1;
                            }else{
                                var type = 0;
                            }
                        }
                        Request({
                            url: 'Login',
                            data: {
                                email: validateFun.encrypt(account),
                                password: validateFun.encrypt(password),
                                validateCode:this.verifyCode,
                                validateKey: this.validateKey,
                                loginType:type,
                            },
                            type: 'post',
                            flag: true,
                        }).then(res => {
                            this.handleLoginSucc(res.data);
                            // this.$message({
                            //     message: this.utils.judgeLanguage(this.language, res.message),
                            //     type: 'success'
                            // });
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            if(this.disclaimerChecked){
                                var exp = new Date();
                                exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7); //这里表示保存7天
                                document.cookie = "login_account=" + account + ";expires=" + exp.toGMTString();
                                document.cookie = "login_password=" + password + ";expires=" + exp.toGMTString();
                            }
                        })
                    }
                });
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
                this.$store.commit('setToken', token);
                this.$store.commit('setHeardUrl', heardUrl);
                var exp = new Date();
                exp.setTime(exp.getTime() + 1000 * 60 * 10); //这里表示保存10分钟
                document.cookie = "login_identify=" + id + ";expires=" + exp.toGMTString();
                document.cookie = 'login_token=' + token + ";expires=" + exp.toGMTString();
                Cache.setSession('bier_userid', id);
                Cache.setSession('bier_username', email);
                Cache.setSession('bier_usernickname', nickname);
                Cache.setSession('bier_token', token);
                Cache.setSession('bier_heardUrl', heardUrl);
                this.$router.push({
                    name: 'index'
                });
            },
            clickLi(index) {
                this.index = index;
                this.liData.forEach((item, index) => {
                    item.style = false;
                });
                this.liData[index].style = true;
                if (index === 1) {
                    this.getCode();
                }
                this.disclaimerChecked = false;
            },
        }
    }
</script>
<style lang="scss" scoped>
    .register {
        width: 1200px;
        margin: 0 auto;

        &-container {
            margin-top: 48px;
            &-left {
                width: 348px;
                float: left;
                margin-right: 144px;
            }

            &-right {
                float: left;

                &-header {
                    width: 372px;
                    text-align: center;
                    margin-bottom: 45px;
                }

                &-item {
                    height: 36px;

                    &-li {
                        width: 187px;
                        height: 36px;
                        float: left;
                        border: 1px solid rgba(187, 187, 187, 1);
                        text-align: center;
                        line-height: 36px;
                        font-size: 14px;
                        color: rgba(51, 51, 51, 1);
                        box-sizing: border-box;

                        &.active {
                            color: rgba(255, 149, 0, 1);
                            border: 1px solid rgba(255, 149, 0, 1);
                            border-right: 1px solid #ff9500 !important;
                            border-left: 1px solid #ff9500 !important;
                        }
                    }
                    &-li:hover {
                        cursor: pointer;
                    }
                    &-li:first-child {
                        border-right: 0;
                        border-radius: 4px 0 0 4px;
                    }

                    &-li:last-child {
                        border-left: 0;
                        border-radius: 0 4px 4px 0;
                    }
                }

                &-inputBox {
                    padding-top: 24px;

                    &-item {
                        margin-bottom: 24px;
                        position: relative;
                        display: flex;

                        .is-danger {
                            font-size: 14px;
                            line-height: 40px;
                            color: #FF9500;
                            margin-left: 20px;
                        }

                        >i {
                            font-size: 24px;
                            color: #999999;
                            position: absolute;
                            top: 8px;
                            left: 10px;
                        }

                        &-input {
                            width: 372px;
                            height: 40px;
                            line-height: 40px;
                            border: 1px solid rgba(220, 223, 230, 1);
                            border-radius: 4px;
                            font-size: 14px;
                            color: rgba(153, 153, 153, 1);
                            padding-left: 41px;
                            padding-right: 10px;

                            &.code {
                                padding-right: 140px;
                            }
                        }

                        &-input:focus {
                            border: 1px solid rgba(255, 149, 0, 1);
                        }

                        &-button {
                            width: 372px;
                            height: 40px;
                            background: rgba(255, 149, 0, 1);
                            border-radius: 20px;
                            text-align: center;
                            line-height: 40px;
                            color: #ffffff;
                            font-size: 18px;
                        }

                        &-button:hover {
                            cursor: pointer;
                        }

                        &-verifyCode {
                            position: absolute;
                            top: 0;
                            left: 242px;
                            width: 130px;
                            text-align: center;
                            background: rgba(255, 149, 0, 1);
                            color: #ffffff;
                            font-size: 16px;
                            height: 40px;

                            &.sendCode {
                                background: #999999;
                            }
                        }
                    }

                    &-code {
                        margin-bottom: 36px;
                        >input {
                            width: 124px;
                            height: 40px;
                            background: rgba(255, 255, 255, 1);
                            border: 1px solid rgba(220, 223, 230, 1);
                            line-height: 40px;
                            padding: 0 10px;
                            font-size: 14px;
                            color: rgba(153, 153, 153, 1);
                        }
                        &-img{
                            display: inline;
                            margin: 0 21px;
                            img{
                                border: 1px solid rgba(220, 223, 230, 1);
                                border-radius: 4px;
                            }
                        }
                        &-img:hover{
                            cursor: pointer;
                        }
                        >button{
                            font-size: 14px;
                            color: rgba(144,147,153,1);
                            background: transparent;
                        }
                        >button:hover{
                            cursor: pointer;
                        }
                    }

                    &-text {
                        font-size: 14px;
                        color: rgba(153, 153, 153, 1);
                        padding-bottom: 12px;

                        &-span {
                            vertical-align: middle;
                            line-height: 19px;
                            &.statement {
                                float: right;
                                background: transparent;
                                color: #1367CE;
                            }
                            &.statement:hover {
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }
</style>