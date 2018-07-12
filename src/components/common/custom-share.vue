<template>
    <el-dialog :title="$t('share.shareTiltle')" :close-on-click-modal="false" :lock-scroll="false" :visible.sync="dialogVisible" width="360px">
        <div id="thisDiv" class="show-share">
            <p class="show-share-title">{{$t('share.shareOne')}}{{$t('share.shareTwo')}}</p>
            <p class="show-share-title">http://www.afdchain.com</p>
            <div class="show-share-btn">
                <el-button class="show-share-btn-text" size="mini" @click="clickCopy">{{$t('share.shareCopy')}}</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {}
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
            clickCopy() {
                var text = document.getElementById('thisDiv');
                if (document.body.createTextRange) {
                    var range = document.body.createTextRange();
                    range.moveToElementText(text);
                    range.select();
                } else if (window.getSelection) {
                    var selection = window.getSelection();
                    var range = document.createRange();
                    range.selectNodeContents(text);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else {
                    console.log('please press Ctrl/Cmd+C to copy');
                }
                document.execCommand('Copy', 'false', null);
                this.slct();
                this.$message({message:'copy success', type: 'success'})             
            },
            slct() {
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
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