<template>
	<div class="master_account">
		<div class="advertising_revenue_top">
			<h3>AFD</h3>
			<ul class="advertising_revenue_top_item">
				<li class="advertising_revenue_top_item_li active">{{balance}} AFD</li>
				<li class="advertising_revenue_top_item_li"><span class="advertising_revenue_top_item_li_line">|</span>冻结 1000.61254223 AFD</li>
			</ul>
			<div class="advertising_revenue_top_money" @click="recharge()">充值</div>
		</div>
		<div class="withdraw" v-if="rechargeView">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="recharge"><i class="el-icon-close"></i></span>
				<ul class="withdraw_item">
					<li class="withdraw_item_li"><label>收款账户：</label>
						<el-input placeholder="请输入内容" v-model="input" clearable>
						</el-input>
					</li>
					<li class="withdraw_item_li" style="height: 126px;"><label style="width: 100px;">可用余额：</label>
						<div class="img">
							<img src="../../../assets/imgs/swiper-img/swiper2.jpg" />
						</div>
					</li>
					<li class="withdraw_item_li"><label style="width: 100px;">可用余额：</label>
						<span>111111111111111111111</span>
					</li>
					<p>充值金额到账后，相应金额会自动出现在广告主账户中</p>
					<button class="right_now" style=";position:absolute;top: 278px;">好的</button>
				</ul>
			</div>
		</div>
		<div class="advertising_revenu_account_flow">
			<div class="advertising_revenu_account_flow_time">
				<div class="advertising_revenu_account_flow_title">账户流水</div>
				<div class="advertising_revenu_account_flow_date">
					<el-date-picker v-model="value1" type="date" placeholder="选择日期">
					</el-date-picker>
					<el-date-picker v-model="value1" type="date" placeholder="选择日期">
					</el-date-picker>
				</div>
			</div>
			<el-table border :data="flowData" style="width: 100%">
				<el-table-column prop="createTime" label="时间">
				</el-table-column>
				<el-table-column prop="desc" label="描述" width="300">
				</el-table-column>
				<el-table-column prop="flowType" label="流向">
				</el-table-column>
				<el-table-column prop="money" label="金额（BRB）">
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
	export default {
		data() {
			return {
				flowData: [],
				balance:'',
				currentPage: 1,
				size: 5,
				total:0,
				rechargeView: false,
				value1:'',
				staticDays: new Date('2017','3','28'),
			}
		},
		mounted(){
			this.BasicInformation();
			this.mainData();
		},
		methods: {
			BasicInformation(){
				Request({
					url: 'QueryMainBasicInformation',
					data: {
						accountId:1
					},
					type: 'get'
				}).then(res => {
					this.balance = res.data.balance;
				})
			},
			mainData() {
				Request({
					url: 'QueryMainAccountFlow',
					data: {
						mainId: 2,
						page: this.currentPage,
						pageSize: this.size
					},
					type: 'get'
				}).then(res => {
					this.flowData = res.data;
					this.total = res.total;
					console.log('QueryMainAccountFlow res_>', res);
				})
			},
			handleCurrentChange(page) {
				this.currentPage = page;
				this.mainData();
			},
			handleSizeChange(page) {
				this.size = page;
				this.mainData();
			},
			recharge() {
				this.rechargeView = !this.rechargeView;
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../../assets/css/global.scss';
	@import '../../../assets/css/variable.scss';
	@import '../../../assets/css/withdraw.scss';
	@import '../../../assets/css/newProject.scss';
</style>