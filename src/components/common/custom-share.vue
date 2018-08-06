<template>
    <el-dialog :title="$t('share.shareTiltle')" :close-on-click-modal="false" :lock-scroll="false" :visible.sync="dialogVisible" width="360px">
        <div id="thisDiv" class="show-share">
            <p class="show-share-title"> 
            	{{$t('share.shareOne')}}<br/>http://www.afdchain.com
            </p>
            <input class="show-share-title" id="show-share-title" :value="copyValue"  style="opacity: 0;" />
            <div class="show-share-btn">
                <el-button class="show-share-btn-text" data-clipboard-target="#show-share-title" size="mini" @click="clickCopy()">{{$t('share.shareCopy')}}</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
    import Request from '../../utils/require.js';
    import Cache from '../../utils/cache';
	import Clipboard from 'clipboard';
    export default {
        data() {
            return {
                accountId:this.$store.state.id || Cache.getSession('bier_userid'),
                token:this.$store.state.token|| Cache.getSession("bier_token"),
                copyValue:'',
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
            },
            inviteCode:{
            	get(){
                    let code = this.$store.state.inviteCode|| Cache.getSession("bier_inviteCode");
            		return code;
                },
            	set(){
            		
            	}
            },
            language:{
            	get(){
            		var language = this.$t('share.shareOne');
            		return language;
            	},
            	set(val){
            		this.language = val;
            	}
            },
        },
        watch:{
        	inviteCode(val){
        		this.inviteCode = val;
        	},
        	language(val){
        		this.copyValue = this.language + 'http://www.afdchain.com/?type=register&inviteCode='+this.inviteCode;
        	}
        },
        mounted(){
        	this.copyValue = this.language + 'http://www.afdchain.com/?type=register&inviteCode='+this.inviteCode;
        },
        methods: {
        	clickCopy(){
        		let clipboard = new Clipboard('.show-share-btn-text');
		        clipboard.on('success', e => {
			        this.$message({
	                    message: this.$t('messageNotice.copy'),
	                    type:'success'
	                });
		          	// 释放内存
		          	clipboard.destroy()
		        })
		        clipboard.on('error', e => {
		          	// 不支持复制
		          	this.$message({
	                    message: this.$t('messageNotice.defaultCopy'),
	                    type:'warning'
	                });
		          	// 释放内存
		          	clipboard.destroy()
		        })
        	},
        }
    }
</script>
<style lang="scss" scoped>
    .show-share {
        width: 320px;
        height: 230px;
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