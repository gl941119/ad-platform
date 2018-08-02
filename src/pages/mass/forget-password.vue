<template>
    <div class="forget-password">
        <div class="forget-password-container">
            <div class="forget-password-container-title">密码重置</div>
            <el-steps class="forget-password-container-steps" :active="currActive" simple>
                <el-step title="输入邮箱" icon="custom-element-icon-icon-test2"></el-step>
                <el-step title="重置密码" icon="custom-element-icon-icon-test"></el-step>
                <el-step title="完成" icon="custom-element-icon-icon-test1"></el-step>
            </el-steps>
            <el-form class="forget-password-container-form" :model="forgetPwd">
                <el-form-item class="forget-password-container-form-item">
                    <el-input placeholder="请输入邮箱"
                                v-model="forgetPwd.email"></el-input>
                </el-form-item>
                <el-form-item v-show="currActive===1" class="forget-password-container-form-item">
                    <el-input class="verify" placeholder="请输入验证码"
                                v-model="forgetPwd.verify"></el-input>
                    <el-button class="btn">获取验证码</el-button>    
                </el-form-item>
                <el-form-item v-show="currActive===1" class="forget-password-container-form-item">
                    <el-input placeholder="设置登录密码，8-16位字符，字母和数字"
                                v-model="forgetPwd.password"></el-input>
                </el-form-item>
                <el-form-item class="forget-password-container-form-btn">
                    <el-button disabled="btnDisabled" size="small" @click="nextStep">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            currActive: 0,
            btnDisabled: false,
            forgetPwd: {
                email: '',
                verify: '',
                password: '',
            }
        }
    },
    methods: {
        nextStep(){
            if(this.currActive === 0){
                this.currActive = 1;
            }
        }
    }
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
    }
}
</style>
