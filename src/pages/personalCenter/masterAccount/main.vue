<template>
	<div class="master_account">
		<div class="advertising_revenue_top">
			<h3>AFD</h3>
			<ul class="advertising_revenue_top_item">
				<li class="advertising_revenue_top_item_li active">{{balance}} AFD</li>
				<li class="advertising_revenue_top_item_li"><span class="advertising_revenue_top_item_li_line">|</span>{{$t('project.freeze')}} 1000.61254223 AFD</li>
			</ul>
			<button class="advertising_revenue_top_money" @click="recharge()">{{$t('project.recharge')}}</button>
		</div>
		<div class="withdraw" v-if="rechargeView">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="recharge"><i class="el-icon-close"></i></span>
				<ul class="withdraw_item">
					<li class="withdraw_item_li"><label>{{$t('project.moneyAccount')}}：</label>
						<el-input :placeholder="$t('project.enterMoneyAccount')" v-model="input" clearable>
						</el-input>
					</li>
					<li class="withdraw_item_li" style="height: 126px;"><label style="width: 100px;">{{$t('project.useBalance')}}：</label>
						<div class="img">
							<img src="../../../assets/imgs/swiper-img/swiper2.jpg" />
						</div>
					</li>
					<li class="withdraw_item_li"><label style="width: 100px;">{{$t('project.useBalance')}}：</label>
						<span>111111111111111111111</span>
					</li>
					<p>{{$t('project.notic')}}</p>
					<button class="right_now" style=";position:absolute;top: 278px;">好的</button>
				</ul>
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
					<button @click="mainData" class="search">{{$t('accountFlow.search')}}</button>
				</div>
			</div>
			<el-table :data="flowData" style="width: 100%">
				<el-table-column prop="createTime" :label="$t('accountFlow.dataTime')">
				</el-table-column>
				<el-table-column prop="desc" :label="$t('accountFlow.desc')" width="300">
				</el-table-column>
				<el-table-column prop="flowType" :label="$t('accountFlow.flowDirection')">
				</el-table-column>
				<el-table-column prop="money" :label="$t('accountFlow.amountOfMoney')">
				</el-table-column>
			</el-table>
			<div class="advertising_revenu_account_flow_data_pages">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="size" layout="sizes, prev, pager, next, jumper" :total="total">
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
				currentPage: 1,
				size: 5,
				total: 0,
				rechargeView: false,
				startTime: '',
				endTime: '',
				util: new Utils(),
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
			}
		},
		mounted() {
			this.BasicInformation();
			this.mainData();
		},
		methods: {
			BasicInformation() {
				Request({
					url: 'QueryMainBasicInformation',
					data: {
						accountId: this.accountId,
					},
					type: 'get'
				}).then(res => {
					if(res.data){
						this.balance = res.data.balance;
					}
				})
			},
			mainData() {
				if(this.startTime){
					var startTime = this.util.format(this.startTime, 'yyyy-MM-dd HH:mm:ss');
				}
				if(this.endTime){
					var endTime = this.util.format(this.endTime, 'yyyy-MM-dd HH:mm:ss');
				}
				Request({
					url: 'QueryMainAccountFlow',
					data: {
						mainId: this.accountId,
						page: this.currentPage,
						pageSize: this.size,
						flowType: 1,
						startTime: startTime,
						endTime: endTime
					},
					type: 'get'
				}).then(res => {
					this.flowData = res.data;
					this.total = res.total;
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
	.master_account{
		background: #FFFFFF;
		padding: 20px;
	}
</style>