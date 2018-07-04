<template>
	<div class="my_crowdfunding">
		<div class="advertising_revenu_account_flow">
			<p class="my_crowdfunding_title">我参与的众筹</p>
			<p class="my_crowdfunding_title_intro">所有众筹成功后相应的币会直接充值到您的BierWallet中，未成功的相关款项会原路返回</p>
			<el-table border :data="crowdfundingData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
				<el-table-column prop="shotEnName" label="Token名称">
				</el-table-column>
				<el-table-column prop="proDesc" label="描述" width="300">
				</el-table-column>
				<el-table-column prop="price" sortable label="支付价格">
				</el-table-column>
				<el-table-column prop="status" label="状态">
				</el-table-column>
				<el-table-column prop="updateTime" label="状态更新时间">
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
	export default {
		data() {
			return {
				crowdfundingData: [],
				currentPage: 1,
				size: 5,
				total:0,
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
						accountId:1,
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
	.my_crowdfunding_title_intro {
		margin: 30px 0;
	}
	.my_crowdfunding_data_pages {
		margin-top: 30px;
	}
</style>