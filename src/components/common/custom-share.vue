<template>
    <el-dialog title="分享" :close-on-click-modal="false" :lock-scroll="false" :visible.sync="dialogVisible" width="360px">
        <div id="thisDiv" class="show-share">
            <p>点击即挖矿，流量即币值 ！上阿凡达不上当不受骗！</p>
            <p>To gain Token by click, AFDChain No cheat No fraud.</p>
            <a href="http://www.afdchain.com">http://www.afdchain.com</a>
        </div>
        <el-button size="mini" @click="clickCopy">点我复制</el-button>
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
        border: 1px solid #999;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 16px;
    }
</style>