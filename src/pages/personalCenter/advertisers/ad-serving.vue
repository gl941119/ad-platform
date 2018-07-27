<template>
	<div class="ad-serving">
		<div class="ad-serving_title">
			<div class="ad-serving_title_info">{{$t('adServing.adSer')}}</div>
			<el-button class="ad-serving_title_button" :title="title" @click="newProject(isCheck)" type="text">{{$t('adServing.trafficking')}}
			</el-button>
		</div>
		<div class="ad-serving-info">
			<div class="ad-serving-info-top">
				<div class="ad-serving-info-top-title">PPC</div>
				<ul class="ad-serving-info-top-item">
					<li class="ad-serving-info-top-item-li">
						<h5>{{$t('adServing.averagePrice')}} (AFDT)</h5>
						<div class="ad-serving-info-top-item-li-data" v-if="isCheck == 1">{{averagePrice}}</div> 
						<div class="ad-serving-info-top-item-li-button"> 
							<el-button v-if="isCheck == 1" type="text" @click="dialogTableVisible = true">{{$t('adServing.adjustment')}}</el-button>
						</div>
						<el-dialog width="20%" :title="$t('adServing.strategy')" :visible.sync="dialogTableVisible">
						  <el-form :model="form">
						    <el-form-item :label="$t('adServing.all')" :label-width="formLabelWidth">
						        <el-input-number v-model="form.advertPrice" :step="0.05" :min="0.1" controls-position="right">
						        </el-input-number>
						    </el-form-item>
						    <div v-for="(item, index) in form.conceptManageList" :key="index">
						    	<el-form-item :label="item.name" :label-width="formLabelWidth">
							      	<el-input-number v-model="item.conceptPrice" :step="0.05" :min="0.1" controls-position="right">
							      	</el-input-number>
							    </el-form-item>
						    </div>
						  	</el-form>
							<div slot="footer" class="dialog-footer">
							    <el-button type="primary" @click="changePrice">{{$t('buttonAll.revise')}}</el-button>
							</div>
						</el-dialog>
					</li>
					<li class="ad-serving-info-top-item-li">
						<h5>{{$t('adServing.currentPosition')}}</h5>
						<div class="ad-serving-info-top-item-li-data">{{currentPosition}}</div> 
						<!--<div class="ad-serving-info-top-item-li-button"> 
							<el-button type="text">{{$t('adServing.banner')}}</el-button>
						</div>-->
					</li>
					<li class="ad-serving-info-top-item-li">
						<h5>{{$t('adServing.totalnumber')}}</h5>
						<div class="ad-serving-info-top-item-li-data">{{totalClicks}}</div> 
						<div class="ad-serving-info-top-item-li-button"> 
							<el-button type="text">{{$t('adServing.stop')}}{{deadline}}</el-button>
						</div>
					</li>
					<li class="ad-serving-info-top-item-li">
						<h5>{{$t('adServing.yestoday')}}</h5>
						<div class="ad-serving-info-top-item-li-data">{{yesterdayClicks}}</div> 
					</li>
					<li class="ad-serving-info-top-item-li">
						<h5>{{$t('adServing.accountMoney')}}(AFDT)</h5>
						<div class="ad-serving-info-top-item-li-data">
							{{accountAmount}} AFDT
						</div> 
						<div class="ad-serving-info-top-item-li-button"> 
							<el-button class="button" type="primary" size="small">{{$t('project.recharge')}}</el-button>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require.js';
    import Config from '../../../utils/config.js';
	export default {
		data() {
			return {
				dialogTableVisible:false,
				formLabelWidth: '120px',
				form:{
					advertPrice:'0.1',
					conceptManageList:[],
				},
				accountId:this.$store.state.id || Cache.getSession('bier_userid'),
				averagePrice:'',
				isCheck:'',
				advertId:'',
				title:'',//拒绝原因
				accountAmount:'',
				currentPosition:'',
				deadline:'',
				totalClicks:'',
				yesterdayClicks:'',
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
				this.queryDetail();
			}
		},
		mounted(){
			this.queryDetail();
		},
		methods: {
			newProject(value){
				this.$router.push({
					path: 'advertisers/'+ value,
					params: {
						value: value,
					}
				});
			},
			queryDetail(){
				Request({
					url: 'QueryPrice',
					data: {
						accountId: this.accountId,
					},
					type: 'get',
					flag: true,
				}).then(res => {
					let {
						advertId,
						averagePrice,
						isCheck,
						noPassReason,
						accountAmount,
						currentPosition,
						deadline,
						totalClicks,
						yesterdayClicks,
					} = res.data;
					this.form = res.data;
					this.advertId = advertId;
					this.averagePrice = averagePrice;
					this.isCheck = isCheck;
					if(this.isCheck == 2){
						this.title = noPassReason;
					}
					this.accountAmount = accountAmount;//账户余额
					this.currentPosition = currentPosition;//当前位置
					this.deadline = deadline;//截止日期
					this.totalClicks = totalClicks;//累计点击
					this.yesterdayClicks = yesterdayClicks;//昨日点击
				})
			},
			changePrice(){
				var that = this;
				Request({
					url: 'ChangePrice',
					data: {
						accountId: this.accountId,
						advertPrice:this.form.advertPrice,
						advertId:this.advertId,
						conceptManageList:this.form.conceptManageList,
					},
					type: 'post',
					flag: true,
				}).then(res => {
					if(res.success){
						that.dialogTableVisible = false;
						this.$message(this.$t('messageNotice.changeSuccess'));
						that.queryDetail();
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.ad-serving{
	&_title{
		margin-bottom: 30px;
		&_info{
			margin-left: 36px;
			margin-right: 40px;
			font-size:24px;
			color:rgba(51,51,51,1);
			display: inline-block;
		}
		&_button{
			display: inline-block;
			font-size:18px;
			color:rgba(255,255,255,1);
			line-height:25px;
			background:rgba(255,149,0,1);
			border-radius:4px;
			padding: 5px 20px;

		}
	}
}
	.ad-serving-info{
		padding: 20px 36px;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 12px 0px rgba(0,0,0,0.06);
		border:1px solid rgba(228,231,237,1);
		&-top{
			&-title{
				margin: 15px 0;
				font-size:18px;
				color:rgba(96,98,102,1);
			}
			&-item{
				width: 100%;
				height:170px;
				border:1px solid rgba(229,229,229,1);
				&-li{
					width: 20%;
					height: 120px;
					border-right: 1px solid #EEEEEE;
					box-sizing: border-box;
					float: left;
					text-align: center;
					margin: 25px 0;
					font-size:16px;
					h5{
						color:rgba(96,98,102,1);
					}
					&-data{
						color:rgba(102,102,102,1);
						margin: 20px 0;
					}
					&-button{
						button{
							color: #009EC2;
						}
						.button{
							background: #009EC2;
							color: #FFFFFF;
    						border: 0;
						}
					}
				}
				&-li:last-child{
					border: 0;
				}
			}
		}
	}
</style>