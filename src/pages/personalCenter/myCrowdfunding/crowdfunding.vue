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
				<el-table-column :label="$t('projectList.status')">
					<template slot-scope="scope">
						<div v-if="scope.row.status==1">{{$t('projectList.currency')}}</div>
						<div v-if="scope.row.status==2">{{$t('projectList.coin')}}</div>
						<div v-if="scope.row.status==3">{{$t('projectList.currencyIn')}}</div>
						<div v-if="scope.row.status==4">{{$t('projectList.coinIn')}}</div>
						<div v-if="scope.row.status==5">{{$t('projectList.currencyFailed')}}</div>
						<div v-if="scope.row.status==6">{{$t('projectList.coinFailed')}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="updateTime" :label="$t('projectList.updateTime')">
				</el-table-column>
			</el-table>
			<div class="my_crowdfunding_data_pages">
				<el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="size"
      layout="prev, pager, next"
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
				size: 30,
				total:0,
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
			}
		},
		mounted() {
			this.crowdfunding();
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
				})
			},
			handleCurrentChange(page){
				this.currentPage = page;
				this.crowdfunding();
			},
		}
	}
</script>
<style lang="scss" scoped>
.my_crowdfunding{
	background: #FFFFFF;
	padding: 20px;
	.my_crowdfunding_data_pages {
		margin-top: 30px;
		text-align: center;
	}
	&_title{
		font-size:24px;
		color:rgba(51,51,51,1);
		line-height:33px;
		&_intro {
			margin: 26px 0;
			font-size:16px;
			color: #333333;
			color:rgba(51,51,51,1);
			line-height:28px;
		}
	}
}
</style>