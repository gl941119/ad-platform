<template>
	<div class="advertising_revenue">
		<div class="advertising_revenue_top">
			<h3>AFDT</h3>
			<ul class="advertising_revenue_top_item">
				<li class="advertising_revenue_top_item_li active">{{balance}} AFDT</li>
				<!--<li class="advertising_revenue_top_item_li"><span class="advertising_revenue_top_item_li_line">|</span>{{$t('project.freeze')}} 1000.61254223 AFDT</li>-->
			</ul>
			<button class="advertising_revenue_top_money" @click="withdraw()">{{$t('project.withdraw')}}</button>
		</div>
		<!--提現-->
		<div class="withdraw" v-if="withdrawView">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="withdraw"><i class="el-icon-close"></i></span>
				<ul class="withdraw_item">
					<li class="withdraw_item_li"><label>{{$t('project.useBalance')}}</label><span class="span">{{balance}}</span></li>
					<li class="withdraw_item_li"><label>{{$t('project.handlingFee')}}</label><span class="span">{{handlingFee}} AFDT</span></li>
					<li class="withdraw_item_li">
						<span>{{$t('project.revenue')}}</span><i class="custom-element-icon-jiantou1-copy"></i><span>{{$t('project.myWallet')}}</span>
					</li>
					<li class="withdraw_item_li">
						<label>{{$t('project.withdrawal')}}：</label>
						<input class="tixian" :class="[errors.has('money')?'llo':'']" :data-vv-as="$t('project.emptyMoney')" v-validate="{ required: true, regex: /^(?:[1-9]\d0|[1-9]\d{2,}00)$/}" name="money" :placeholder="$t('project.enterMoney')" v-on:change="getHandlingFee" v-model="money" />
					</li>
					<span class="is-danger" v-show="errors.has('money')">{{ errors.first('money') }}</span>
					<li class="withdraw_item_li"><label>{{$t('passwordInfo.tradePassword')}}：</label>
						<input class="tixian" :placeholder="$t('passwordInfo.enterTradePassword')" type="password" v-model="input1" />
					</li>
					<div style="text-align: center;">
						<button class="right_now">{{$t('project.withdraw')}}</button>
					</div>
				</ul>
			</div>
		</div>
		<div class="withdraw" v-if="withdrawed">
			<div class="withdraw_box">
				<div class="center">
					<i class="custom-element-icon-duihao"></i>
				</div>
				<p  class="center">{{$t('project.requireWithdraw')}}</p>
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
			<el-tabs type="border-card">
				<el-tab-pane value="1">
				    <span slot="label">提现记录</span>
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
							background
							@current-change="handleCurrent"
					      :current-page="current"
					      :page-size="size"
					      layout="prev, pager, next"
					      :total="total">
					    </el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane>
				    <span slot="label" value="2">收益记录</span>
				    <el-table :data="flowDatas" style="width: 100%">
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
							background
							@current-change="handleCurrentChange"
					      :current-page="currentPage"
					      :page-size="size"
					      layout=" prev, pager, next"
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
				flowDatas:[],
				balance: '',
				money: '',
				input1:'',
				currentPage: 1,
				current: 1,
				size: 30,
				total:0,
				totals:0,
				withdrawView: false,
				withdrawed:false,
				startTime: '',
				endTime: '',
				util: new Utils(),
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
				authStatus:'',
				id:'',
			}
		},
		computed: {
            handlingFee: {
                get(){
                    return this.money*1/1000;
                },
            }
        },
		mounted() {
			this.BasicInformation();
		},
		methods: {
			getHandlingFee() {
				return  this.money*1/1000;
			},
			BasicInformation() {
				Request({
					url: 'QueryRevenueBasicInformation',
					data: {
						accountId: this.accountId
					},
					type: 'get'
				}).then(res => {
					this.balance = res.data.balance;
					this.authStatus = res.data.authStatus;
					this.id = res.data.id;
					this.revenueData();
					this.revenueDatas();
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
						incomeId: this.id,
						page: this.current,
						pageSize: this.size,
						flowType: 1,
						startTime: startTime,
						endTime: endTime
					},
					type: 'get'
				}).then(res => {
					console.log(res);
					this.flowData = res.data;
					this.total = res.total;
				})
			},
			revenueDatas() {
				if(this.startTime){
					var startTime = this.util.format(this.startTime, 'yyyy-MM-dd HH:mm:ss');
				}
				if(this.endTime){
					var endTime = this.util.format(this.endTime, 'yyyy-MM-dd HH:mm:ss');
				}
				Request({
					url: 'QueryRevenueAccountFlow',
					data: {
						incomeId: this.id,
						page: this.currentPage,
						pageSize: this.size,
						flowType: 2,
						startTime: startTime,
						endTime: endTime
					},
					type: 'get'
				}).then(res => {
					this.flowDatas = res.data;
					this.totals = res.total;
				})
			},
			handleCurrentChange(page){
				this.currentPage = page;
				this.revenueDatas();
			},
			handleCurrent(page){
				this.current = page;
				this.revenueData();
			},
			withdraw() {
				var value = this.authStatus;
				switch(value){
					case 0:
						this.$message(this.$t('messageNotice.noAuth'))
						break;
					case 1:
						this.withdrawView = !this.withdrawView;
						this.money = '';
						break;
					case 2:
						this.$message(this.$t('messageNotice.onAuth'))
						break;
					case 3:
						this.$message(this.$t('messageNotice.refuseAuth'))
						break;
				}
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
	.is-danger{
		display: block;
		display: block;
	    padding-left: 100px;
	    color:rgba(250,85,85,1);
	    margin: 5px 0;
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