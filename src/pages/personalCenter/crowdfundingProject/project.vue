<template>
	<div class="my_crowdfunding">
		<div class="advertising_revenu_account_flow">
			<p class="my_crowdfunding_title">我发起的众筹</p>
			<router-link tag="p" :to="{ name: 'newCrowdfunding'}" class="my_crowdfunding_title_intro">申请新的众筹</router-link>
			<el-table border :data="flowData" style="width: 100%" @sort-change="sortChange" :default-sort = "{prop: 'date', order: 'descending'}">
				<el-table-column prop="date" label="Token名称">
				</el-table-column>
				<el-table-column prop="name" label="描述" width="300">
				</el-table-column>
				<el-table-column prop="province" sortable label="硬顶/软顶">
				</el-table-column>
				<el-table-column prop="city" label="完成度">
				</el-table-column>
				<el-table-column prop="city" label="状态">
				</el-table-column>
				<el-table-column prop="city" label="状态更新时间">
				</el-table-column>
			</el-table>
			<div class="my_crowdfunding_data_pages">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="pageSizes" layout="sizes, prev, pager, next, jumper">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				flowData: [],
				currentPage: 0,
				pageSizes:5
			}
		},
		methods:{
			sortChange(){
				
			},
			handleCurrentChange(page){
				this.pageSizes = page;
			},
			handleSizeChange(page){
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.my_crowdfunding_title_intro {
		margin-bottom: 30px;
		float: right;
	}
	.my_crowdfunding_data_pages {
		margin-top: 30px;
	}
</style>