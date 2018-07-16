<template>
	<div class="my_crowdfunding">
		<div class="advertising_revenu_account_flow">
			<p class="my_crowdfunding_title">{{$t('personal.myCrowdfunding')}}</p>
			<p class="my_crowdfunding_title_intro">{{$t('projectList.notic')}}</p>
			<el-table :data="crowdfundingData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
				<el-table-column prop="shotEnName" :label="$t('projectList.tokenName')">
				</el-table-column>
				<el-table-column prop="proDesc" :label="$t('projectList.desc')" width="300">
				</el-table-column>
				<el-table-column prop="price" sortable :label="$t('projectList.price')">
				</el-table-column>
				<el-table-column prop="status" :label="$t('projectList.status')">
				</el-table-column>
				<el-table-column prop="updateTime" :label="$t('projectList.updateTime')">
				</el-table-column>
			</el-table>
			<div class="my_crowdfunding_data_pages">
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
				crowdfundingData: [],
				currentPage: 1,
				size: 5,
				total:0,
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
			}
		},
		mounted() {
			this.crowdfunding();
		},
		methods:{
			crowdfunding(){
				Request({
					url: 'QueryMyCrowdfunding',
					data: {
						accountId:this.accountId,
						page:this.currentPage,
						pageSize:this.size
					},
					type: 'get'
				}).then(res => {
					this.crowdfundingData = res.data;
					this.total = res.total;
					console.log('QueryMyCrowdfunding res_>', res);
				})
			},
			handleCurrentChange(page){
				this.currentPage = page;
				this.crowdfunding();
			},
			handleSizeChange(page){
				this.size = page;
				this.crowdfunding();
			}
		}
	}
</script>
<style lang="scss" scoped>
	.my_crowdfunding_data_pages {
		margin-top: 30px;
	}
	.my_crowdfunding_title{
		font-size:24px;
		color:rgba(51,51,51,1);
		line-height:33px;
		&_intro {
			margin: 26px 0;
			font-size:20px;
			color:rgba(51,51,51,1);
			line-height:28px;
		}
	}
</style>