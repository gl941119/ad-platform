<template>
	<div class="invite">
		<div class="invite_top">
			<h3 class="invite_top_title">邀请用户</h3>
			<p class="invite_top_code"><span>邀请码：</span>{{inviteCode}}</p>
			<div class="invite_top_intro">受邀用户今后点击广告创造的价值将会以BRB的形式奖励给您</div>
		</div>
		<div class="invite_data">
			<div class="invite_data_title">邀请用户</div>
			<el-table border :data="inviteData" style="width: 100%">
				<el-table-column prop="createTime" label="邀请时间">
				</el-table-column>
				<el-table-column prop="email" label="用户账号">
				</el-table-column>
				<!--<el-table-column prop="province" label="最近登录">
				</el-table-column>-->
				<el-table-column prop="earnings" label="分润">
				</el-table-column>
			</el-table>
			<div class="invite_data_data_pages">
				<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="size"
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import Request from '../../../utils/require.js';
	import Cache from '../../../utils/cache';
	import Config from '../../../utils/config.js';
	export default {
		data() {
			return {
				inviteCode: '',
				inviteData: [],
				currentPage: 0,
				size: 5,
				total:0,
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
			}
		},
		mounted() {
			this.queryCode();
		},
		methods: {
			queryCode() {
				Request({
					url: 'QueryInviteCode',
					data: {
						accountId: this.accountId,
					},
					type: 'get'
				}).then(res => {
					this.inviteCode = res.data.inviteCode;
					this.queryInviteData();
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
	.invite_top {
		margin: 30px 0;
		.invite_top_code {
			margin: 10px 0;
		}
	}
	
	.invite_data_title {
		margin: 10px 0 20px 0;
	}
	
	.invite_data_data_pages {
		margin-top: 30px;
	}
</style>