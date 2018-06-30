<template>
	<div class="advertising_revenue">
		<div class="advertising_revenue_top">
			<h3>BRB</h3>
			<ul class="advertising_revenue_top_item">
				<li class="advertising_revenue_top_item_li active">3245.61254234 BRB</li>
				<li class="advertising_revenue_top_item_li"><span class="advertising_revenue_top_item_li_line">|</span>冻结 1000.61254223 BRB</li>
			</ul>
			<div class="advertising_revenue_top_money" @click="withdraw()">提现</div>
		</div>
		<!--提現-->
		<div class="withdraw" v-if="withdrawView">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="withdraw"><i class="el-icon-close"></i></span>
				<ul class="withdraw_item">
					<li class="withdraw_item_li"><label>可用金额</label><span>1111111111</span></li>
					<li class="withdraw_item_li"><label>手续费</label><span>11111111</span></li>
					<li class="withdraw_item_li">
						<span>广告收益账户</span>《===》<span>我的钱包</span>
					</li>
					<li class="withdraw_item_li"><label>提现金额：</label>
						<el-input placeholder="请输入内容" v-model="input" clearable>
						</el-input>
					</li>
					<li class="withdraw_item_li"><label>交易密码：</label>
						<el-input placeholder="请输入内容" type="password" v-model="input1" clearable>
						</el-input>
					</li>
					<button class="right_now">提现</button>
				</ul>
			</div>
		</div>
		<div class="advertising_revenu_account_flow">
			<div class="advertising_revenu_account_flow_time">
				<div class="advertising_revenu_account_flow_title">账户流水</div>
				<div class="advertising_revenu_account_flow_date">
					<el-date-picker v-model="daysRange" :default-value="staticDays" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
			</div>
			<el-table border :data="flowData" style="width: 100%">
				<el-table-column prop="date" label="时间">
				</el-table-column>
				<el-table-column prop="name" label="描述" width="300">
				</el-table-column>
				<el-table-column prop="province" label="流向">
				</el-table-column>
				<el-table-column prop="city" label="金额（BRB）">
				</el-table-column>
			</el-table>
			<div class="advertising_revenu_account_flow_data_pages">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSizes" layout="sizes, prev, pager, next, jumper">
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
				flowData: [],
				daysRange: [],
				currentPage: 0,
				pageSizes: 5,
				withdrawView: false,
				staticDays: new Date(),
			}
		},
		mounted() {
			this.BasicInformation();
			this.revenueData();
		},
		methods: {
			BasicInformation(){
				Request({
					url: 'QueryRevenueBasicInformation',
					data: {
						accountId:1
					},
					type: 'get'
				}).then(res => {
					console.log('QueryRevenueBasicInformation res_>', res);
				})
			},
			revenueData() {
				Request({
					url: 'QueryRevenueAccountFlow',
					data: {
						incomeId: 1,
						page: this.currentPage,
						pageSize: this.pageSizes
					},
					type: 'get'
				}).then(res => {
					console.log('QueryRevenueAccount res_>', res);
				})
			},
			handleCurrentChange(page) {
				this.pageSizes = page;
			},
			handleSizeChange(page) {

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
</style>