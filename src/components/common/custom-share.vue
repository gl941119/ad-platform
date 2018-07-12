<template>
    <el-dialog :title="$t('share.shareTiltle')" :close-on-click-modal="false" :lock-scroll="false" :visible.sync="dialogVisible" width="360px">
        <div id="thisDiv" class="show-share">
            <p class="show-share-title">{{$t('share.shareOne')}}</p> 
            <p class="show-share-title">{{$t('share.shareTwo')}}</p>
            <p class="show-share-content first">To gain Token by click, AFDChain No cheat No fraud.</p>
            <p class="show-share-content">http://www.afdchain.com</p>
        </div>
        <el-button class="show-share-btn" size="mini" @click="clickCopy">{{$t('share.shareCopy')}}</el-button>
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
        margin-bottom: 36px;
        &-title {
            color: #FF9500;
            font-size: 20px;
            line-height: 28px;
            text-align: center;
        }
        &-content {
            font-size: 12px;
            text-align: center;
            line-height: 22px;
            &.first {
                margin-top: 24px;
            }
        }
        &-btn {
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
</style>