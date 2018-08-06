<template>
	<div class="invite">
		<div class="invite_top">
			<h3 class="invite_top_title">{{$t('invite.inviteUser')}}</h3>
			<p>
				<input style="opacity: 0;" id="inviteCode" :value="copyValue"/>
			</p>
			<p class="invite_top_code" style="display: inline-block;">
				<span>{{$t('invite.inviteLink')}}：</span>
				<span>http://www.afdchain.com/?type=register&inviteCode={{inviteCode}}</span>
				<el-button data-clipboard-target="#inviteCode" class="purse_address_bind" @click="inviteCodeCopy()">{{$t('invite.copyLink')}}</el-button>
			</p>
			<p class="invite_top_code">
				<span style="margin-right: 30px;">{{$t('invite.inviteImg')}}：</span>
				<el-button data-clipboard-text="http://imgs.afdchain.com/web-upload/picture/bb09761b1d54424a9698c489a5e2cb09.png" class="purse_address_bind" @click="copyImg()">{{$t('invite.copyImg')}}</el-button>
			</p>
			<div class="invite_top_intro">{{$t('invite.info')}}</div>
		</div>
		<div class="invite_data">
			<div class="invite_data_title">{{$t('invite.inviteUser')}}</div>
			<el-container>
				<el-aside class="invite_data_aside">
					<div style="width: 277px;height: 492px;position: relative;">
						<img style="width: 277px;height: 492px;" src="http://imgs.afdchain.com/web-upload/picture/bb09761b1d54424a9698c489a5e2cb09.png"/>
						<div class="invite_data_data_imgBox">
							<img width="50" :src="'data:image/png;base64, ' + imageQrAddress">
						</div>
					</div>
				</el-aside>
				<el-main class="invite_data_data">
					<el-table border :data="inviteData">
						<el-table-column type="index" :label="$t('invite.num')" width="50" :index="indexMethod">
						</el-table-column>
						<el-table-column :label="$t('invite.userAccout')">
							<template slot-scope="scope">
								<div v-if="scope.row.nickname">{{scope.row.nickname}}</div>
								<div v-else>{{scope.row.email}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="createTime" :label="$t('invite.timer')">
						</el-table-column>
					</el-table>
					<div class="invite_data_data_pages">
						<el-pagination
							background
					      @current-change="handleCurrentChange"
					      :current-page="currentPage"
					      :page-size="size"
					      layout="prev, pager, next"
					      :total="total">
					    </el-pagination>
					</div>
				</el-main>
			</el-container>
		</div>
	</div>
</template>
<script>
	import Request from '../../../utils/require.js';
	import Cache from '../../../utils/cache';
	import Config from '../../../utils/config.js';
	import Clipboard from 'clipboard';
	export default {
		data() {
			return {
				inviteCode: '',
				inviteData: [],
				currentPage: 0,
				size: 5,
				total:0,
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
				copyValue:'',
				imageQr:'',
				imageQrAddress:'',
			}
		},
		mounted() {
			this.queryCode();
		},
		computed: {
            language:{
            	get(){
            		var language = this.$t('invite.inviteInfo');
            		return language;
            	},
            	set(val){
            		this.language = val;
            	}
            },
        },
        watch:{
        	language(val){
        		this.copyValue = this.language + 'http://www.afdchain.com/?type=register&inviteCode='+this.inviteCode;
        	}
        },
		methods: {
			copyImg(){
				
			},
			indexMethod(index) { //表格序号
				return index + 1;
			},
			inviteCodeCopy(){
				let clipboard = new Clipboard('.purse_address_bind');
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
			queryCode() {
				Request({
					url: 'QueryInviteCode',
					data: {
						accountId: this.accountId,
					},
					type: 'get'
				}).then(res => {
					this.inviteCode = res.data.inviteCode;
					this.copyValue = this.language + 'http://www.afdchain.com/?type=register&inviteCode='+this.inviteCode;
					this.imageQr = 'http://www.afdchain.com/?type=register&inviteCode='+this.inviteCode;
					this.queryInviteData();
					this.queryQr();
				})
			},
			queryQr(){
				Request({
					url: 'GetQrCode',
					data: {
		                contents: this.imageQr,
		                width: 120,
		                height: 120,
		            },
		            type: 'get',
				}).then(res => {
					this.imageQrAddress = res.data;
				})
			},
			queryInviteData() {
				Request({
					url: 'QueryInviteData',
					data: {
						page:this.currentPage,
						pageSize:this.size,
						inviteCode:this.inviteCode,
					},
					type: 'get'
				}).then(res => {
					this.inviteData = res.data;
					this.total = res.total;
				})
			},
			handleCurrentChange(page) {
				this.size = page;
				this.queryInviteData();
			},
			handleSizeChange(page) {
				this.currentPage = page;
				this.queryInviteData();
			}
		}
	}
</script>
<style lang="scss" scoped>
.invite{
	background: #FFFFFF;
	padding: 20px;
	&_top {
		margin: 30px 0;
		&_code {
			color: #333333;
			overflow: hidden;
			margin-bottom: 12px;
		}
		&_intro{
			color: #999999;
			margin-top: 10px;
		}
		&_title{
			font-size: 24px;
		}
	}
	&_data{
		&_title{
			margin: 10px 0 20px 0;
		}
		&_aside{
			width: 277px;
			margin-right:60px;
		}
		&_data_imgBox{
			position: absolute;
		    bottom: 38px;
		    width: 60px;
		    right: 108px;
		    padding: 5px;
		    height: 60px;
		    box-sizing: border-box;
		    background: rgb(255, 255, 255);
		}
		&_data{
			padding: 0;
			&_pages{
				font-size: 20px;
				text-align: center;
				margin-top: 30px;
			}
		}
	}
}
	.purse_address_bind {
		display: inline-block;
		margin-left: 20px;
		border-radius: 5px;
		background:rgba(255,149,0,1);
		border-radius:4px;
		color: #FFFFFF;
		border: 0;
	}
</style>