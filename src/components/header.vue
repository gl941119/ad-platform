<template>
    <header class="header">
        <div class="header-content">
            <div class="header-content-logo">AFD</div>
            <div class="header-content-tab clearfix">
                <div class="header-content-tab-left">
                    <router-link class="header-content-tab-left-menu"
                                 :to="{ name: 'home' }">首页</router-link>
                    <router-link class="header-content-tab-left-menu"
                                 :to="{ name: 'home' }">众筹</router-link>
                    <router-link class="header-content-tab-left-menu"
                                 :to="{ name: 'home' }">项目</router-link>
                    <router-link class="header-content-tab-left-menu"
                                 :to="{ name: 'home' }">媒体</router-link>
                    <!-- <router-link class="header-content-tab-left-menu"
                                :to="{ name: 'home' }">周末狂欢夜</router-link> -->
                </div>
                <div class="header-content-tab-right">
                    用户名
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        data() {
            return {}
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
            &-right{
                color: #fff;
                float: right;
                @include header-layout;
            }
        }
    }
}
</style>