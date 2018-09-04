<template>
    <div class="register">
        <div class="register-container">
            <div class="register-container-left">
                <img src="../../assets/imgs/img/register.png" />
            </div>
            <div class="register-container-right">
                <div class="register-container-right-inputBox">
                    <div class="register-container-right-inputBox-item">
                        <el-select v-model="numberArea" disabled>
                        </el-select>
                    </div>
                    <div class="register-container-right-inputBox-item">
                        <input v-validate="{required: true, regex: /^((13|14|15|17|18)[0-9]{1}\d{8})$/}" name="phoneNumber" class="register-container-right-inputBox-item-input" placeholder="请输入您的常用手机号码" autocomplete="off" v-model="register.phoneNumber" />
                        <span class="is-danger" v-show="errors.has('phoneNumber')">{{errors.first('phoneNumber')}}</span>
                        <i class="custom-element-icon-zhanghu"></i>
                    </div>
                    <div class="register-container-right-inputBox-item">
                        <input v-validate="'required'" name="code" class="register-container-right-inputBox-item-input code" placeholder="请输入验证码" autocomplete="off" v-model="register.code" />
                        <span class="is-danger" v-show="errors.has('code')">{{errors.first('code')}}</span>
                        <i class="custom-element-icon-mima"></i>
                        <el-button class="register-container-right-inputBox-item-verifyCode" @click="sendVerifyCode()" v-if="disabled" type="text">{{$t('register.sendCode')}}</el-button>
                        <el-button class="register-container-right-inputBox-item-verifyCode" :class="{'sendCode':!disabled}" v-else disabled type="text">(<span>{{num}}</span>s){{$t('register.again')}}</el-button>
                    </div>
                    <el-popover ref="popover" placement="right-start" width="200" trigger="focus">
                        <div>
                            <p>{{$t('passwordNotic.one')}}</p>
                            <p>{{$t('passwordNotic.two')}}</p>
                            <p>{{$t('passwordNotic.three')}}</p>
                            <p>{{$t('passwordNotic.four')}}</p>
                        </div>
                        <div class="register-container-right-inputBox-item" slot="reference">
                            <input name='password' v-validate="{required: true, regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!+-^%*#?&]{8,16}$/}" class="register-container-right-inputBox-item-input" placeholder="请输入密码" autocomplete="off" type="password"
                                v-model="register.password" />
                            <span class="is-danger" v-show="errors.has('password')">{{errors.first('password')}}</span>
                            <i class="custom-element-icon-mima"></i>
                        </div>
                    </el-popover>
                    <div class="register-container-right-inputBox-item">
                        <input name="oncePassword" v-validate="'required|confirmed:password'" class="register-container-right-inputBox-item-input" placeholder="请再次输入密码" autocomplete="off" type="password" v-model="register.oncePassword" />
                        <span class="is-danger" v-show="errors.has('oncePassword')">{{errors.first('oncePassword')}}</span>
                        <i class="custom-element-icon-mima"></i>
                    </div>
                    <div class="register-container-right-inputBox-text">
                        <i class="custom-element-icon-right"></i>
                        我有邀请码，
                        <span class="register-container-right-inputBox-text-inviteCode">
                            添加邀请码
                        </span>
                        帮助好友赚取利益
                    </div>
                    <div class="register-container-right-inputBox-item">
                        <input class="register-container-right-inputBox-item-input" placeholder="请输入邀请码（选填）" autocomplete="off" v-model="register.inviteCode" />
                        <i class="custom-element-icon-yaoqingma"></i>
                    </div>
                    <div class="register-container-right-inputBox-text agree">
                        <el-checkbox class="register-container-right-inputBox-text-checkbox" v-model="disclaimerChecked"></el-checkbox>
                        <span class="register-container-right-inputBox-text-span">我已阅读并同意</span>
                        <span @click="$router.push({name: 'userterm'})" class="register-container-right-inputBox-text-span statement">《AFDChin用户协议》</span>
                    </div>
                    <div class="register-container-right-inputBox-item">
                        <button class="register-container-right-inputBox-item-button" @click="registerSubmit">立即注册</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Request from '../../utils/require.js';
    import Utils from '../../utils/util.js';
    export default {
        data() {
            return {
                utils: new Utils(),
                register: {
                    phoneNumber: '',
                    code: '',
                    password: '',
                    oncePassword: '',
                    inviteCode: '',
                },
                numberArea: '+86 中国大陆',
                disclaimerChecked: true,
                disabled: true,
                num: 60,
            }
        },
        methods: {
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
                    url: 'SendVerifyCode',
                    data: {
                        email: phoneNumber,
                        registerType: 0,
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
            registerSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        if(!this.disclaimerChecked){
                            this.$message({
                                message:'请阅读并同意用户协议',
                                type:'warning',
                            });
                            return;
                        }
                        let {
                            phoneNumber,
                            code,
                            password,
                            inviteCode
                        } = this.register;
                        Request({
                            url: 'Register',
                            data: {
                                authCode: code,
                                email: phoneNumber,
                                password,
                                inviteCode,
                                registerType: 0,
                            },
                            flag: true
                        }).then(res => {
                            this.$message({
                                message: this.utils.judgeLanguage(this.language, res.message),
                                type: 'success'
                            });
                            this.$router.push({
                                name:'login',
                            })
                        });
                    }
                });
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
                &-inputBox {
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

                    &-text {
                        font-size: 14px;
                        color: rgba(153, 153, 153, 1);
                        padding: 12px 0;

                        &.agree {
                            padding-top: 0;
                        }

                        &-span {
                            vertical-align: middle;
                            line-height: 19px;
                            &.statement {
                                cursor: pointer;
                                color: #1367CE;
                            }
                        }

                        &-inviteCode {
                            color: #ff9500;
                        }
                    }
                }
            }
        }
    }
</style>