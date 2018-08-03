<template>
    <div class="forget-password">
        <div class="forget-password-container">
            <div class="forget-password-container-title">{{$t('forgetPassword.passwordReset')}}</div>
            <el-steps class="forget-password-container-steps" :active="currActive" simple>
                <el-step :title="$t('forgetPassword.enterEmail')" icon="custom-element-icon-icon-test2"></el-step>
                <el-step :title="$t('forgetPassword.resetPassword')" icon="custom-element-icon-icon-test"></el-step>
                <el-step :title="$t('forgetPassword.finish')" icon="custom-element-icon-icon-test1"></el-step>
            </el-steps>
            <div v-show="currActive===2" class="forget-password-container-succ">
                <i class="custom-element-icon-duihao"></i>
                <div>{{$t('forgetPassword.success')}}</div>
                <div>{{$t('forgetPassword.againLogin')}}</div>
            </div>
            <el-form class="forget-password-container-form" 
            @validate="forgetPwdValidate"
            :rules="forgetPwd.rule"
            ref="forgetPwdForm"
            :model="forgetPwd">
                <el-form-item v-show="currActive===0 || currActive===1" prop="email" class="forget-password-container-form-item">
                    <el-input :placeholder="$t('forgetPassword.pleaseEnterEmail')"
                                name="email" auto-complete="off" 
                                v-model="forgetPwd.email"></el-input>
                                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </el-form-item>
                <el-form-item v-show="currActive===1" class="forget-password-container-form-item">
                    <el-input class="verify" :placeholder="$t('forgetPassword.enterCode')" auto-complete="off" 
                                v-model="forgetPwd.verify"></el-input>
                    <el-button @click="sendVerify" v-if="disabledVerify" class="btn">{{$t('register.sendCode')}}</el-button>
                    <el-button v-else disabled class="btn-disabled">(<span>{{num}}</span>s){{$t('register.again')}}</el-button>  
                </el-form-item>
                <el-form-item v-show="currActive===1" prop="password" class="forget-password-container-form-item">
                    <el-input :placeholder="$t('forgetPassword.setPassword')"
                    type="password"
                    auto-complete="off" 
                                v-model="forgetPwd.password"></el-input>
                </el-form-item>
                <el-form-item class="forget-password-container-form-btn">
                    <el-button :disabled="btnDisabled" type="primary" size="small" @click="nextStep">{{$t('forgetPassword.next')}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import validateFun from '../../utils/validate.js';
import Request from '../../utils/require.js';
import Utils from '../../utils/util.js';
import Cache from '../../utils/cache.js';
function passTest(str) {
    // return /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.*?[~/`!@#$%^&*()_+|{}?;:><\-\]\\[\/].*$/.test(str) && /^.{8,16}$/.test(str) && str !== this.registerModel.form.email
    return /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.{8,16}$/.test(str) && str !== this.forgetPwd.email
}
export default {
    data(){
        let emailValidate = validateFun.validateTest(this.$t('messageNotice.emailEmpty'), this.$t('messageNotice.emailFormat'), val => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val));
        let passwordValidate = validateFun.validateTest(this.$t('messageNotice.passwordEmpty'), this.$t('messageNotice.passwordFormat'), passTest.bind(this));
        return {
            utils: new Utils(),
            currActive: 0,
            btnDisabled: true,
            disabledVerify: true,
            num: 60,
            forgetPwd: {
                rule: {
                    email: [{validator: emailValidate, trigger: 'change'}],
                    password: [{validator: passwordValidate, trigger: 'blur'}],
                },
                email: '',
                verify: '',
                password: '',
            }
        }
    },
    methods: {
        nextStep(){
            switch (this.currActive) {
                case 0:
                    this.currActive = 1;
                    break;
                case 1:
                    let {email, verify, password} = this.forgetPwd;
                    if(verify){
                        this.$refs.forgetPwdForm.validate((valid) => {
                            if(valid) {
                                Request({
                                    url: 'SetNewPassword',
                                    data: {
                                        authCode: verify,
                                        email,
                                        newPassword: validateFun.encrypt(password),
                                    },
                                    flag: true
                                }).then(res => {
                                    this.currActive = 2;
                                    this.$message({
                                        message: this.utils.judgeLanguage(this.language, res.message),
                                        type: 'success'
                                    });
                                }).catch(console.error)
                            } else {
                                this.$message({
                                    message: this.$t('messageNotice.formatMatch'),
                                    type: 'warning'
                                });
                            }
                        });
                    } else {
                        this.$message({message: 'verify is empty', type: 'warning'})
                    }
                    break;
                case 2:
                    this.$router.push({name: 'index'})
                    break;
            
                default:
                    break;
            }
        },
        forgetPwdValidate(prop, validate){
            if(prop === 'email'&& validate){
                this.btnDisabled = false;
            }
        },
        sendVerify(){
            if(this.forgetPwd.email){
                Request({
                    url: 'SendForgetPwdCode',
                    data: {
                        email: this.forgetPwd.email,
                    }
                }).then(res => {
                    this.disabledVerify = false;
                    let timer = setInterval(() => {
                        this.num--;
                        if(this.num < 1) {
                            clearInterval(timer);
                            this.disabledVerify = true;
                            this.num = 60;
                        }
                    }, 1000);
                    this.$message({
                        message: this.utils.judgeLanguage(this.language, res.message),
                        type: 'success'
                    });
                })
            }else{
                this.$message({
                    message: 'email is empty',
                    type: 'warning'
                })
            }
        }
    },
    destroyed() {
        // 显示share
        Cache.setSession('globalShow', 'show');
        this.$store.commit('setGlobalShow', 'show');
    },
}
</script>
<style lang="scss" scoped>
.forget-password {
    width: 100%;
    height: calc(100vh - 64px);
    background: #F5F5F5;
    &-container {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        background: #fff;
        &-title {
            padding: 36px 0 20px;
            font-size: 24px;
            width: 800px;
            margin: 0 auto;
            border-bottom: 2px solid #E0E0E0;
            text-align: center;
            line-height: 33px;
            color: #333333;
        }
        &-steps {
            margin: 45px auto 0;
            width: 800px;
        }
        &-form {
            padding-top: 50px;
            &-item {
                margin: 28px auto 0;
                width: 376px;
                & .verify {
                    float: left;
                    width: 246px;
                }
                & .btn {
                    float: left;
                    width: 130px;
                    border: none;
                    background: #3B99FB;
                    color: #fff;
                }
                & .btn-disabled {
                    width: 130px;
                    background: #D8D8D8;
                    color: #fff;
                }
            }
            &-btn {
                margin: 40px auto 0;
                width: 376px;
                & button {
                    width: 100%;
                    display: block;
                }
            }
        }
        &-succ {
            width: 150px;
            margin: 70px auto 0;
            text-align: center;
            & i {
                display: inline-block;
                font-size: 65px;
                color: #28D661;
                margin-bottom: 30px;
            }
            & div {
                font-size: 24px;
                color: #333333;
                &:last-child {
                    font-size: 14px;
                    margin-top: 5px;
                    color: #666666;
                }
            }
        }
    }
}
</style>
