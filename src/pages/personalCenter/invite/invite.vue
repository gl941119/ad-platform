<template>
	<div class="invite">
		<div class="invite_top">
			<h3 class="invite_top_title">邀请用户</h3>
			<p class="invite_top_code"><span>邀请码：</span>dufn</p>
			<div class="invite_top_intro">受邀用户今后点击广告创造的价值将会以BRB的形式奖励给您</div>
		</div>
		<div class="invite_data">
			<div class="invite_data_title">邀请用户</div>
			<el-table border :data="inviteData" style="width: 100%">
				<el-table-column prop="date" label="邀请时间">
				</el-table-column>
				<el-table-column prop="name" label="用户账号">
				</el-table-column>
				<el-table-column prop="province" label="最近登录">
				</el-table-column>
				<el-table-column prop="city" label="分润">
				</el-table-column>
			</el-table>
			<div class="invite_data_data_pages">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSizes" layout="sizes, prev, pager, next, jumper">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				inviteData: [],
				currentPage: 0,
				pageSizes: 5
			}
		},
		methods: {
			handleCurrentChange(page) {
				this.pageSizes = page;
			},
			handleSizeChange(page) {

			}
		}
	}
</script>
<style lang="scss" scoped>
	.invite_top {
		margin: 30px 0;
		.invite_top_code{
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