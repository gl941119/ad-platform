<template>
	<div class="advertising_revenue">
		<div class="advertising_revenue_top">
			<h3>AFTD</h3>
			<ul class="advertising_revenue_top_item">
				<li class="advertising_revenue_top_item_li active">{{balance}} AFTD</li>
				<!--<li class="advertising_revenue_top_item_li"><span class="advertising_revenue_top_item_li_line">|</span>{{$t('project.freeze')}} 1000.61254223 AFTD</li>-->
			</ul>
			<button class="advertising_revenue_top_money" @click="withdraw()">{{$t('project.withdraw')}}</button>
		</div>
		<!--提現-->
		<div class="withdraw" v-if="withdrawView">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="withdraw"><i class="el-icon-close"></i></span>
				<ul class="withdraw_item">
					<li class="withdraw_item_li"><label>{{$t('project.useBalance')}}</label><span>1111111111</span></li>
					<li class="withdraw_item_li"><label>{{$t('project.handlingFee')}}</label><span>11111111</span></li>
					<li class="withdraw_item_li">
						<span>{{$t('project.revenue')}}</span><i class="custom-element-icon-jiantou1-copy"></i><span>{{$t('project.myWallet')}}</span>
					</li>
					<li class="withdraw_item_li"><label>{{$t('project.withdrawal')}}：</label>
						<el-input :placeholder="$t('project.enterMoney')" v-model="input" clearable>
						</el-input>
					</li>
					<li class="withdraw_item_li"><label>{{$t('passwordInfo.tradePassword')}}：</label>
						<el-input :placeholder="$t('passwordInfo.enterTradePassword')" type="password" v-model="input1" clearable>
						</el-input>
					</li>
					<button class="right_now">{{$t('project.withdraw')}}</button>
				</ul>
			</div>
		</div>
		<div class="withdraw" v-if="withdrawed">
			<div class="withdraw_box">
				<div class="center">
					<i class="custom-element-icon-duihao"></i>
				</div>
				<p  class="center">已提交体现申请</p>
				<button class="allright">{{$t('buttonAll.ok')}}</button>
			</div>
		</div>
		<div class="advertising_revenu_account_flow">
			<div class="advertising_revenu_account_flow_time">
				<div class="advertising_revenu_account_flow_title">{{$t('accountFlow.accountStatement')}}</div>
				<div class="advertising_revenu_account_flow_date">
					<el-date-picker v-model="startTime" type="date" :placeholder="$t('accountFlow.startTime')">
					</el-date-picker>
					<el-date-picker v-model="endTime" type="date" :placeholder="$t('accountFlow.endTime')">
					</el-date-picker>
					<button class="search" @click="revenueData">{{$t('accountFlow.search')}}</button>
				</div>
			</div>
			<el-table :data="flowData" style="width: 100%">
				<el-table-column prop="createTime" :label="$t('accountFlow.dataTime')">
				</el-table-column>
				<el-table-column prop="desc" :label="$t('accountFlow.desc')" width="300">
				</el-table-column>
				<el-table-column :label="$t('accountFlow.flowDirection')">
					<template slot-scope="scope">
						<div v-if="scope.row.flowType == 1">
							充值
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="money" :label="$t('accountFlow.amountOfMoney')">
				</el-table-column>
			</el-table>
			<div class="advertising_revenu_account_flow_data_pages">
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
	import Utils from '../../../utils/util.js';
	import Cache from '../../../utils/cache';
	export default {
		data() {
			return {
				flowData: [],
				balance: '',
				value1: '',
				currentPage: 1,
				size: 5,
				total:0,
				withdrawView: false,
				withdrawed:false,
				startTime: '',
				endTime: '',
				util: new Utils(),
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
			}
		},
		mounted() {
			this.BasicInformation();
			this.revenueData();
		},
		methods: {
			BasicInformation() {
				Request({
					url: 'QueryRevenueBasicInformation',
					data: {
						accountId: this.accountId
					},
					type: 'get'
				}).then(res => {
					this.balance = res.data.balance;
				})
			},
			revenueData() {
				if(this.startTime){
					var startTime = this.util.format(this.startTime, 'yyyy-MM-dd HH:mm:ss');
				}
				if(this.endTime){
					var endTime = this.util.format(this.endTime, 'yyyy-MM-dd HH:mm:ss');
				}
				Request({
					url: 'QueryRevenueAccountFlow',
					data: {
						incomeId: this.accountId,
						page: this.currentPage,
						pageSize: this.pageSizes,
						flowType: 1,
						startTime: startTime,
						endTime: endTime
					},
					type: 'get'
				}).then(res => {
					console.log(res)
					this.flowData = res.data;
					this.total = res.total;
				})
			},
			handleCurrentChange(page) {
				this.currentPage = page;
				this.revenueData();
			},
			handleSizeChange(page) {
				this.size = page;
				this.revenueData();
			},
			withdraw() {
				this.withdrawView = !this.withdrawView;
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../../assets/css/global.scss';
	@import '../../../assets/css/variable.scss';
	@import '../../../assets/css/withdraw.scss';
	@import '../../../assets/css/newProject.scss';
	.advertising_revenue{
		background: #FFFFFF;
		padding: 20px;
	}
	.custom-element-icon-jiantou1-copy{
		margin: 0 10px;
	}
	.center{
		text-align: center;
		margin: 10px 0;
		font-size:24px;
		color:rgba(96,98,102,1);
		.custom-element-icon-duihao{
			color: #44DB01;
		    margin-top: 35px;
		    font-size: 54px;
		    display: inline-block;
		}
	}
	.allright{
		width:116px;
		height:28px;
		background:rgba(245,247,250,1);
		border-radius:100px;
		border:1px solid rgba(220,223,230,1);
		margin-top: 66px;
		position: absolute;
	    right: 50%;
	    margin-right: -58px;
	}
</style>