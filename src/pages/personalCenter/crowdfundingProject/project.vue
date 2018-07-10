<template>
	<div class="my_crowdfunding">
		<div class="advertising_revenu_account_flow">
			<p class="my_crowdfunding_title">我发起的众筹</p>
			<router-link tag="p" :to="{ name: 'newCrowdfunding'}" class="my_crowdfunding_title_intro">申请新的众筹</router-link>
			<el-table border :data="crowdfundingData" style="width: 100%" @sort-change="sortChange" :default-sort="{prop: 'date', order: 'descending'}">
				<el-table-column prop="shotEnName" label="Token名称">
				</el-table-column>
				<el-table-column prop="proDesc" label="描述" width="300">
				</el-table-column>
				<el-table-column label="硬顶/软顶">
					<template slot-scope="scope">
						{{scope.row.lowLimit}}/{{scope.row.topLimit}}
					</template>
				</el-table-column>
				<el-table-column label="完成度">
					<template slot-scope="scope">
						{{scope.row.totalCrowdfund/scope.row.lowLimit | filter}}-{{scope.row.lowLimit}}
					</template>
				</el-table-column>
				<el-table-column prop="city" label="状态">
					<template slot-scope="scope">
						<div v-if="scope.row.isCheck==0">待审核</div>
						<div v-if="scope.row.isCheck==1">已上架</div>
						<div v-if="scope.row.isCheck==2">审核未通过-<span @click="openDetail(scope.row.id,1)">点击修改</span></div>
					</template>
				</el-table-column>
				<el-table-column prop="updateTime" label="状态更新时间">
				</el-table-column>
			</el-table>
			<div class="my_crowdfunding_data_pages">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="size" layout="sizes, prev, pager, next, jumper" :total="total">
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
				crowdfundingData: [{
					totalCrowdfund: '3333',
					lowLimit: '4345',
				}, {
					totalCrowdfund: '3333',
					lowLimit: '1',
				}],
				currentPage: 1,
				size: 5,
				total: 0,
				mathData: [],
			}
		},
		mounted() {
			this.crowdfunding();
		},
		filters: {
			filter: function(value) {
				if(!value) return '';
				var str = Number(value * 100).toFixed(0);
				return str += "%";
			}
		},
		methods: {
			crowdfunding() {
				Request({
					url: 'QueryMyNewCrowdfunding',
					data: {
						accountId: 1,
						page: this.currentPage,
						pageSize: this.size
					},
					type: 'get'
				}).then(res => {
					this.crowdfundingData = res.data;
					this.total = res.total;
				})
			},
			openDetail(id, value) {
				this.$router.push({
					path: 'crowdfundingDetail/' + id + '/' + value,
					params: {
						id: id,
						value: value,
					}
				});
			},
			handleCurrentChange(page) {
				this.currentPage = page;
				this.crowdfunding();
			},
			handleSizeChange(page) {
				this.size = page;
				this.crowdfunding();
			},
			sortChange() {

			},
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