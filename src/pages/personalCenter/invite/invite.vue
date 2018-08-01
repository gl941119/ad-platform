<template>
	<div class="invite">
		<div class="invite_top">
			<h3 class="invite_top_title">{{$t('invite.inviteUser')}}</h3>
			<p class="invite_top_code">
				<span>{{$t('invite.code')}}：</span>
				<span id="inviteCode"><span style="position: absolute;z-index: -1">http://www.afdchain.com/?inviteCode=</span>{{inviteCode}}</span>
			</p>
			<p class="invite_top_code" style="display: inline-block;">
				<span>{{$t('invite.inviteLink')}}：</span>
				<span>http://www.afdchain.com/?inviteCode={{inviteCode}}</span>
			</p>
			<el-button class="purse_address_bind" @click="inviteCodeCopy('inviteCode')">{{$t('share.shareCopy')}}</el-button>
			<div class="invite_top_intro">{{$t('invite.info')}}</div>
		</div>
		<!--<div class="invite_data">
			<div class="invite_data_title">{{$t('invite.inviteUser')}}</div>
			<el-table :data="inviteData" style="width: 100%">
				<el-table-column prop="createTime" :label="$t('invite.timer')">
				</el-table-column>
				<el-table-column prop="email" :label="$t('invite.userAccout')">
				</el-table-column>-->
				<!--<el-table-column prop="province" :label="$t('invite.recently')">
				</el-table-column>-->
				<!--<el-table-column prop="earnings" :label="$t('invite.divided')">
				</el-table-column>
			</el-table>
			<div class="invite_data_data_pages">
				<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="size"
      layout="sizes, prev, pager, next, jumper" v
      :total="total">
    </el-pagination>
			</div>
		</div>-->
	</div>
</template>
<script>
	import Request from '../../../utils/require.js';
	import Cache from '../../../utils/cache';
	import Config from '../../../utils/config.js';
	import Utils from '../../../utils/util.js';
	export default {
		data() {
			return {
				inviteCode: '',
				inviteData: [],
				currentPage: 0,
				size: 5,
				total:0,
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
				utils: new Utils(),
			}
		},
		mounted() {
			this.queryCode();
		},
		methods: {
			inviteCodeCopy(value){
				this.utils.copy(value);
        		this.$message({message: this.$t('messageNotice.copy'),type:'success'});
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
//					this.queryInviteData();
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
			height: 20px;
			line-height: 20px;
			margin: 10px 0;
			color: #333333;
		}
		&_intro{
			color: #999999;
			margin-top: 10px;
		}
		&_title{
			font-size: 24px;
		}
	}
}
	
	.invite_data_title {
		margin: 10px 0 20px 0;
	}
	
	.invite_data_data_pages {
		font-size: 20px;
		text-align: center;
		margin-top: 30px;
	}
	.purse_address_bind {
		display: inline-block;
		width: 100px;
		margin-left: 20px;
		border-radius: 5px;
		background:rgba(255,149,0,1);
		border-radius:4px;
		color: #FFFFFF;
		border: 0;
	}
</style>