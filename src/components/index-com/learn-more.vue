<template>
    <div class="learn-more">
        <div class="learn-more-container" @click="learnMore">
            <div class="learn-more-container-text">了解更多</div>
            <i class="learn-more-container-icon el-icon-arrow-right"></i>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            learnMore(){
                this.$router.push({name: 'crowdsale'})
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/variable.scss';
    @import '../../assets/css/global.scss';
    .learn-more {
        @include content-flex(center);
        width: 100%;
        &-container {
            cursor: pointer;
            @include content-flex(center);
            &-text {
                @extend %platform-title;
            }
            &-icon {
                @extend %platform-title;
                margin-left: 6px;
            }
        }
    }
</style>