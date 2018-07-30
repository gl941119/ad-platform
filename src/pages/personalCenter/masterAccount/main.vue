<template>
	<div class="master_account">
		<div class="advertising_revenue_top">
			<h3>AFDT</h3>
			<ul class="advertising_revenue_top_item">
				<li class="advertising_revenue_top_item_li active">{{balance}} AFDT</li>
				<!--<li class="advertising_revenue_top_item_li"><span class="advertising_revenue_top_item_li_line">|</span>{{$t('project.freeze')}} 1000.61254223 AFDT</li>-->
			</ul>
			<button class="advertising_revenue_top_money" @click="recharge()">{{$t('project.recharge')}}</button>
		</div>
		<div class="withdraw" v-if="rechargeView">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="recharge"><i class="el-icon-close"></i></span>
				<ul class="withdraw_item">
					<li class="withdraw_item_li"><label>{{$t('project.moneyAccount')}}：</label>
						<span>0x1ac6bc75a9E1D32a91e025257eAEFC0E8965A16F</span>
					</li>
					<li class="withdraw_item_li" style="height: 126px;"><label>{{$t('crowdFunding.qrCode')}}：</label>
						<div class="img">
							<img src="../../../assets/imgs/img/code.png" />
						</div>
					</li>
					<li class="withdraw_item_li"><label>{{$t('project.useBalance')}}：</label>
						<span>{{balance}} AFDT</span>
					</li>
					<p>{{$t('project.notic')}}</p>
					<div style="text-align: center;">
						<button class="right_now" @click="close">{{$t('buttonAll.ok')}}</button>
					</div>
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
			<el-tabs type="border-card">
			  <el-tab-pane value='1'>
			    <span slot="label">{{$t('accountFlow.rechargeRecord')}}</span>
			    <el-table :data="flowData" style="width: 100%">
				<el-table-column prop="createTime" width="150" :label="$t('accountFlow.dataTime')">
				</el-table-column>
				<el-table-column prop="desc" :label="$t('accountFlow.desc')" >
				</el-table-column>
				<el-table-column prop="money" width="200" :label="$t('accountFlow.amountOfMoney')">
				</el-table-column>
			</el-table>
			<div class="advertising_revenu_account_flow_data_pages">
				<el-pagination 
					background
					@current-change="handleCurrent" 
					:current-page="current" 
					:page-size="size" 
					layout="prev, pager, next" 
					:total="total">
				</el-pagination>
			</div>
			  </el-tab-pane>
			  <el-tab-pane value='2' :label="$t('accountFlow.expenses')">
			  	<el-table :data="flowDatas" style="width: 100%">
				<el-table-column prop="createTime" width="150" :label="$t('accountFlow.dataTime')">
				</el-table-column>
				<el-table-column prop="desc" :label="$t('accountFlow.desc')">
				</el-table-column>
				<el-table-column prop="money" width="200" :label="$t('accountFlow.amountOfMoney')">
				</el-table-column>
			</el-table>
			<div class="advertising_revenu_account_flow_data_pages">
				<el-pagination 
					background
					@current-change="handleCurrentChange" 
					:current-page="currentPage" 
					:page-size="size" 
					layout="prev, pager, next" 
					:total="totals">
				</el-pagination>
			</div>
			  </el-tab-pane>
			</el-tabs>
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
				flowDatas: [],
				balance: '',
				currentPage: 1,
				current: 1,
				size: 30,
				total: 0,
				totals: 0,
				rechargeView: false,
				startTime: '',
				endTime: '',
				util: new Utils(),
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
				id:'',
			}
		},
		mounted() {
			this.BasicInformation();
		},
		methods: {
			close(){
				this.rechargeView = false
			},
			BasicInformation() {
				Request({
					url: 'QueryMainBasicInformation',
					data: {
						accountId: this.accountId,
					},
					type: 'get'
				}).then(res => {
					this.balance = res.data.balance;
					this.id = res.data.id;
					this.mainData();
					this.mainDatas();
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
						mainId: this.id,
						page: this.current,
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
			mainDatas() {
				if(this.startTime){
					var startTime = this.util.format(this.startTime, 'yyyy-MM-dd HH:mm:ss');
				}
				if(this.endTime){
					var endTime = this.util.format(this.endTime, 'yyyy-MM-dd HH:mm:ss');
				}
				Request({
					url: 'QueryMainAccountFlow',
					data: {
						mainId: this.id,
						page: this.currentPage,
						pageSize: this.size,
						flowType: 2,
						startTime: startTime,
						endTime: endTime
					},
					type: 'get'
				}).then(res => {
					console.log(res);
					this.flowDatas = res.data;
					this.totals = res.total;
				})
			},
			handleCurrent(page) {
				this.current = page;
				this.mainData();
			},
			handleCurrentChange(page) {
				this.currentPage = page;
				this.mainDatas();
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