<template>
<div class="user-term">
    <div class="user-register">
        <div v-html="content"></div>
    </div>
    <div class="user-term-footer">
        <el-button @click="goToIndex" round class="user-term-footer-btn">{{$t('register.agree')}}</el-button>
    </div>
</div>

</template>
<script>
    import userRegEn from './user-register-en.js';
    import userRegZh from './user-register-ch.js';
    export default {
        data() {
            return {}
        },
        computed: {
            language() {
                return this.$store.state.slangChange;
            },
            content() {
                return this.language.toUpperCase() === 'EN' ? userRegEn : userRegZh;
            }
        },
        methods: {
            goToIndex(){
                this.$router.push({name: 'index'});
                this.$store.commit('setDialogModalVisible', 'register');
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '../../assets/css/global.scss';
.user-term {
    width: 100%;
    height: calc(100vh - 65px);
    background: #F5F5F5;
    padding-top: 60px;
    &-footer {
        margin-top: 50px;
        text-align: center;
        &-btn {
            @include my-button;
        }
    }
}
    .user-register {
        margin: 0 auto;
        width: 850px;
        height: 654px;
        overflow: auto;
        border: 1px solid #333333;
        background: #fff;
        padding: 20px;
        line-height: 22px;
    }

</style>