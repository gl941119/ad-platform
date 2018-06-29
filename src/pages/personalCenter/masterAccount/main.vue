<template>
	<div class="master_account">
		<div class="advertising_revenue_top">
			<h3>AFD</h3>
			<ul class="advertising_revenue_top_item">
				<li class="advertising_revenue_top_item_li active">3245.61254234 AFD</li>
				<li class="advertising_revenue_top_item_li"><span class="advertising_revenue_top_item_li_line">|</span>冻结 1000.61254223 AFD</li>
			</ul>
			<div class="advertising_revenue_top_money" @click="recharge()">充值</div>
		</div>
		<!--充值-->
		<!--<div class="withdraw" v-if="rechargeView">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="recharge"><i class="el-icon-close"></i></span>
				<ul class="withdraw_item">
					<li class="withdraw_item_li"><label>钱包地址：</label>
						<el-input placeholder="请输入内容" v-model="input" clearable>
						</el-input>
					</li>
					<li class="withdraw_item_li"><label style="width: 100px;">二维码：</label>
						<div class="img">
							<img src="../../../assets/imgs/swiper-img/swiper2.jpg" />
						</div>
					</li>
					<button class="right_now" style=";position:absolute;top: 238px;">好的</button>
				</ul>
			</div>
		</div>-->
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
			<div class="advertising_revenu_account_flow_title">账户流水</div>
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
	export default {
		data() {
			return {
				flowData: [],
				currentPage: 0,
				pageSizes: 5,
				rechargeView: false,
			}
		},
		methods: {
			handleCurrentChange(page) {
				this.pageSizes = page;
			},
			handleSizeChange(page) {

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
	.advertising_revenue_top {
		h3 {
			font-size: 24px;
			margin-bottom: 30px;
		}
		margin: 30px 0px;
		.advertising_revenue_top_item {
			float: left;
			color: #ececec;
			margin-right: 20px;
			.advertising_revenue_top_item_li {
				float: left;
				margin: 0 5px;
				.advertising_revenue_top_item_li_line {
					margin-right: 5px;
				}
			}
		}
		.advertising_revenue_top_money {
			float: left;
			padding: 0 20px;
			margin: 0 10px;
			height: 30px;
			line-height: 30px;
			border: 1px solid #333333;
			border-radius: 5px;
		}
	}
	
	.active {
		color: #000000;
	}
	
	.advertising_revenu_account_flow_title {
		margin-bottom: 30px;
		clear: both;
	}
	
	.advertising_revenu_account_flow_data_pages {
		margin-top: 30px;
	}
</style>