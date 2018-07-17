<template>
	<div class="my_crowdfunding">
		<div class="advertising_revenu_account_flow">
			<p class="my_crowdfunding_title">{{$t('initiated.iInitiated')}}</p>
			<router-link tag="p" :to="{ name: 'newCrowdfunding'}" class="my_crowdfunding_title_intro">{{$t('initiated.newCrowd')}}</router-link>
			<el-table :data="crowdfundingData" style="width: 100%" @sort-change="sortChange" :default-sort="{prop: 'date', order: 'descending'}">
				<el-table-column prop="shotEnName" :label="$t('initiated.token')">
				</el-table-column>
				<el-table-column prop="proDesc" :label="$t('initiated.desc')" width="300">
				</el-table-column>
				<el-table-column :label="$t('initiated.lowTop')">
					<template slot-scope="scope">
						{{scope.row.lowLimit}}/{{scope.row.topLimit}}
					</template>
				</el-table-column>
				<el-table-column :label="$t('initiated.degree')">
					<template slot-scope="scope">
						{{scope.row.croAchieve/scope.row.topLimit | filter}}-{{scope.row.croAchieve}}
					</template>
				</el-table-column>
				<el-table-column prop="city" :label="$t('initiated.status')">
					<template slot-scope="scope">
						<div v-if="scope.row.isCheck==0">{{$t('initiated.review')}}</div>
						<div v-if="scope.row.isCheck==1">{{$t('initiated.over')}}</div>
						<div v-if="scope.row.isCheck==2">{{$t('initiated.refuse')}}-<span @click="openDetail(scope.row.id,1)">{{$t('buttonAll.change')}}</span></div>
					</template>
				</el-table-column>
				<el-table-column prop="updateTime" :label="$t('initiated.statusUpdate')">
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
	import Cache from '../../../utils/cache';
	import Request from '../../../utils/require';
	import Utils from '../../../utils/util.js';
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
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
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
						accountId: this.accountId,
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
.my_crowdfunding{
	background: #FFFFFF;
	padding: 20px;
	&_title{
		font-size: 24px;
		&_intro {
			margin-bottom: 30px;
			float: right;
			font-size:18px;
			color:rgba(153,153,153,1);
			line-height:25px;
		}
	}
	
	.my_crowdfunding_data_pages {
		margin-top: 30px;
		text-align: center;
	}
}
</style>