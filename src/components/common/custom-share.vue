<template>
    <el-dialog :title="$t('share.shareTiltle')" :close-on-click-modal="false" :lock-scroll="false" :visible.sync="dialogVisible" width="360px">
        <div id="thisDiv" class="show-share">
            <p class="show-share-title">{{$t('share.shareOne')}}{{$t('share.shareTwo')}}</p>
            <p class="show-share-title">http://www.afdchain.com</p>
            <div class="show-share-btn">
                <el-button class="show-share-btn-text" size="mini" @click="clickCopy('thisDiv')">{{$t('share.shareCopy')}}</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
	import Utils from '../../utils/util.js';
    export default {
        data() {
            return {
            	utils: new Utils(),
            }
        },
        computed: {
            dialogVisible: {
                get(){
                    return this.$store.state.dialogVisible;
                },
                set(){
                    this.$store.commit('setDialogVisible', false);
                }
            }
        },
        methods: {
        	clickCopy(value){
        		var message = this.utils.copy(value);
        		this.$message(message);
        	}
        }
    }
</script>
<style lang="scss" scoped>
    .show-share {
        width: 262px;
        height: 160px;
        border: 1px solid #979797;
        margin: 0 auto 36px;
        position: relative;
        padding: 35px 10px;
        &-title {
            color: #FF9500;
            font-size: 20px;
            line-height: 30px;
        }
        &-btn {
            position: absolute;
            padding: 10px 20px;
            background: #fff;
            left: 50%;
            top: 0;
            transform: translate(-50%, -50%);
            &-text {
                display: block;
                margin: 0 auto;
                width: 116px;
                background: #FF9500;
                border: none;
                color: #fff;
                box-shadow:0px 2px 4px 0px #955700;
                &:hover,
                &:active,
                &:focus {
                    background: #FF9500;
                    color: #fff;
                }
                &:active {
                    background: #FCA529;
                }
            }
        }
    }
</style>