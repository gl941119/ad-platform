<template>
	<div class="my_crowdfunding">
		<div class="advertising_revenu_account_flow">
			<div class="my_crowdfunding_title">
				<p class="my_crowdfunding_title_info">{{$t('initiated.iInitiated')}}</p>
				<el-button class="my_crowdfunding_title_button" @click="newProject()" type="text">{{$t('initiated.newCrowd')}}
				</el-button>
			</div>
			<el-table :data="crowdfundingData" style="width: 100%" @sort-change="sortChange" :default-sort="{prop: 'date', order: 'descending'}">
				<el-table-column prop="shotEnName" :label="$t('initiated.token')">
				</el-table-column>
				<el-table-column prop="proDesc" :label="$t('initiated.desc')" width="300">
				</el-table-column>
				<el-table-column :label="$t('initiated.lowTop')">
					<template slot-scope="scope">
						{{scope.row.topLimit}}/{{scope.row.lowLimit}}
					</template>
				</el-table-column>
				<el-table-column :label="$t('initiated.degree')">
					<template slot-scope="scope">
						<div v-if="scope.row.croAchieve != 0">{{scope.row.croAchieve/scope.row.topLimit | filter}}-{{scope.row.croAchieve}}</div>
						<div v-else>0%-{{scope.row.croAchieve}}</div>
					</template>
				</el-table-column>
				<el-table-column :label="$t('initiated.status')">
					<template slot-scope="scope">
						<div v-if="scope.row.isCheck==0" @click="openDetail(scope.row.id,0)">{{$t('initiated.review')}}</div>
						<div v-if="scope.row.isCheck==1" @click="openDetail(scope.row.id,1)">{{$t('initiated.over')}}</div>
						<div v-if="scope.row.isCheck==2">
							{{$t('initiated.refuse')}}
							<el-tooltip :content="scope.row.description" placement="top" effect="light">
								<button class="change" @click="openDetail(scope.row.id,2)">
									{{$t('buttonAll.change')}}
								</button>
							</el-tooltip>
						</div>
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
				crowdfundingData: [],
				currentPage: 1,
				size: 30,
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
		computed: {
			slangChange() {
				var lang = this.$store.state.slangChange || this.$i18n.locale;
				if(lang == 'en'){
					lang = lang.toUpperCase();
				}
				return lang;
			}
		},
		watch: {
			slangChange(val, oldval) {
				this.crowdfunding();
			}
		},
		methods: {
			newProject(){
				this.$router.push({
					name: 'newCrowdfunding',
				});
			},
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
		&_info{
			font-size: 24px;
		}
		&_button {
			margin-bottom: 30px;
			float: right;
			font-size:18px;
			color:rgba(255,255,255,1);
			line-height:25px;
			background:rgba(255,149,0,1);
			border-radius:4px;
			padding: 5px 20px;
		}
	}
	.ad-serving_title_button{
			font-size:18px;
			color:rgba(255,255,255,1);
			line-height:25px;
			background:rgba(255,149,0,1);
			border-radius:4px;
			padding: 5px 20px;
	}
	.my_crowdfunding_data_pages {
		margin-top: 30px;
		text-align: center;
	}
	.change{
		color: dodgerblue;
	    display: inline-block;
	    background: transparent;
	}
	.change:hover{
		cursor: pointer;
	}
}
</style>