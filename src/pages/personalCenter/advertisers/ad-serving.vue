<template>
	<div class="ad-serving">
		<div class="ad-serving_title">
			<div class="ad-serving_title_info">{{$t('adServing.adSer')}}</div>
			<el-tooltip :content="title" :disabled="titleShow" placement="top" effect="light">
				<el-button class="ad-serving_title_button" :title="title" @click="newProject(isCheck)" type="text">
					{{$t('adServing.trafficking')}}
				</el-button>
			</el-tooltip>
		</div>
		<div class="ad-serving-info" v-if="isCheck == 1 || isCheck == 3">
			<div class="ad-serving-info-top">
				<div class="ad-serving-info-top-title">{{advertTitle}}</div>
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
						    <el-form-item :label="$t('passwordInfo.tradePassword')" :label-width="formLabelWidth">
						        <input class="passwordInput" type="password" style="display:none;"  />
								<input class="passwordInput" type="text" onfocus="this.type='password'" :class="[errors.has('tradePassword')?'llo':'']" :data-vv-as="$t('messageNotice.emptyTradePassword')" v-validate data-vv-rules="required" name="tradePassword" :placeholder="$t('passwordInfo.tradePassword')" v-model="tradePassword" />
								<span class="is-danger" v-show="errors.has('tradePassword')">{{ errors.first('tradePassword') }}</span>
						    </el-form-item>
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
							<el-button class="button" type="primary" size="small" @click="recharge">{{$t('project.recharge')}}</el-button>
						</div>
					</li>
				</ul>
			</div>
			<!--<div id="main" style="width: 600px;height:400px;"></div>-->
		</div>
	</div>
</template>

<script>
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require.js';
    import Config from '../../../utils/config.js';
    import echarts from '@/utils/echarts'
    import validateFun from '../../../utils/validate.js';
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
				titleShow:true,
				accountAmount:'',
				currentPosition:'',
				deadline:'',
				totalClicks:'',
				yesterdayClicks:'',
				advertTitle:'',
				tradePassword:'',
				existTradePassword:false,
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
			this.info();
//			this.echart();
		},
		methods: {
			info(){
				Request({
					url: 'QuerySettings',
					type: 'get',
				}).then(res => {
					this.existTradePassword = res.data.existTradePassword;
					this.queryDetail();
				})
            },
			/*echart(){
				var myChart = echarts.init(document.getElementById('main'));
				// 绘制图表
				var option = {
		            title: {
		                text: 'ECharts 入门示例'
		            },
		            tooltip : {
		            	
		            },
		            legend: {
		                data:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
		                type: 'plain',
		            },
		            xAxis: {
		            	type: 'category',
        				boundaryGap: false,
        				//坐标轴分隔线
        				splitLine: {
							show: true,
							lineStyle:{
		            			color:'#979797',
		            			width:1,
		            		}
		            	},
		            	//坐标轴字体
		            	axisLabel:{
		            		show:true,
		            		color:'rgba(94,97,102,1)',
		            	},
		            	//坐标轴轴线
		            	axisLine:{
		            		show:true,
		            		lineStyle:{
		            			color:'#979797',
		            			width:1,
		            		}
		            	},
		                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
		            },
		            yAxis: {
		            	type: 'value',
		            	splitLine: {
							show: false,
		            	},
		            	axisLine:{
		            		show:true,
		            		lineStyle:{
		            			color:'#979797',
		            			width:1,
		            		}
		            	},
		            	axisLabel:{
		            		show:true,
		            		color:'rgba(94,97,102,1)',
		            	},
		            },
		            series: [{
		                name: '销量',
		                type: 'line',
        				smooth: true,
        				//区域线的渐变
        				itemStyle: {
			                normal: {
			                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
			                        offset: 0,
			                        color: '#61FAD2'
			                    }, {
			                        offset: 1,
			                        color: '#1C9BF7'
			                    }])
			                }
			            },
			            //区域的渐变
			            areaStyle: {
			                normal: {
			                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
			                        offset: 0,
			                        color: '#61FAD2'
			                    }, {
			                        offset: 1,
			                        color: '#1C9BF7'
			                    }])
			                }
			            },
		                data: [5, 20, 36, 10, 10, 20],
		            }],
		            focusNodeAdjacency : true,
		        };
		
		        // 使用刚指定的配置项和数据显示图表。
		        myChart.setOption(option);
			},*/
			recharge(){
				this.$router.push({
					name:'main'
				})
			},
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
						advertTitle
					} = res.data;
					this.form = res.data;
					this.advertId = advertId;
					this.averagePrice = averagePrice;
					this.isCheck = isCheck;
					if(this.isCheck == 2){
						this.title = noPassReason;
						this.titleShow = !this.titleShow;
					}
					this.accountAmount = accountAmount;//账户余额
					this.currentPosition = currentPosition;//当前位置
					this.deadline = deadline;//截止日期
					this.totalClicks = totalClicks;//累计点击
					this.yesterdayClicks = yesterdayClicks;//昨日点击
					this.advertTitle = advertTitle;
				})
			},
			changePrice(){
				if(this.existTradePassword){
					Request({
						url: 'ChangePrice',
						data: {
							accountId: this.accountId,
							advertPrice:this.form.advertPrice,
							advertId:this.advertId,
							conceptManageList:this.form.conceptManageList,
							tradePassword:validateFun.encrypt(this.tradePassword),
						},
						type: 'post',
						flag: true,
					}).then(res => {
						this.tradePassword = '';
						this.queryDetail();
						this.dialogTableVisible = false;
						this.$message(this.$t('messageNotice.changeSuccess'));
					})
				}else{
					this.$message({
						message:this.$t('adServing.pleaseSetPassword'),
						type:'warn'
					})
				}
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
.passwordInput{
	height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    width: 80%;
}
.is-danger{
	display: block;
	color: #f66;
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
						min-height: 32px;
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