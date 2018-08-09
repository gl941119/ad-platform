<template>
    <div class="share-layout">
        <div class="share-layout-div" @click="showShare">
            <i class="custom-element-icon-fenxiang1"></i>
            <span>{{$t('share.shareTiltle')}}</span>
        </div>
    </div>
</template>
<script>
    import Cache from '@/utils/cache'
    export default {
        data() {
            return {}
        },
        methods: {
            showShare() {
                if(!(this.$store.state.token||Cache.getSession("bier_token"))){
                  
                    return;
                }
                this.$store.commit('setDialogVisible', true);
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/variable.scss';
    @import '../../assets/css/global.scss';
    .share-layout {
        width: 1200px;
        position: fixed;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0);
        z-index: 100;
        &-div {
            width: 80px;
            height: 100px;
            background: #536DFE;
            position: absolute;
            right: 100%;
            bottom: 50vh;
            color: #fff;
            @include content-flex(center);
            flex-direction: column;
            font-size: 18px;
            cursor: pointer;
            & i {
                font-size: 35px;
                margin-bottom: 6px;
            }
        }
    }
</style>