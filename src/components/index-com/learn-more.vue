<template>
    <div class="learn-more">
        <div class="learn-more-container" @click="learnMore">
            <div class="learn-more-container-text">{{title}}</div>
            <i v-if="type===1" class="learn-more-container-icon el-icon-arrow-right"></i>
            <i v-else class="learn-more-container-icon el-icon-arrow-down"></i>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['type'], // 1 -> go to   2 -> load more
        data() {
            return {}
        },
        computed: {
            title(){
                let text;
                switch (this.type) {
                    case 1:
                        text = '了解更多';
                        break;
                
                    default:
                        text = '查看更多';
                        break;
                }
                return text;
            }
        },
        methods: {
            learnMore(){
                this.$emit('seemore')
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