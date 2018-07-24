<template>
	<div class="ad-serving">
		<div class="ad-serving_title">
			<div class="ad-serving_title_info">{{$t('adServing.adSer')}}</div>
			<el-button class="ad-serving_title_button" @click="newProject(isCheck)" type="text">{{$t('adServing.trafficking')}}
			</el-button>
		</div>
		<div class="ad-serving-info">
			<div class="ad-serving-info-top">
				<div class="ad-serving-info-top-price">
					<h5>{{$t('adServing.averagePrice')}}</h5>
					<div v-if="isCheck == 1">{{averagePrice}}</div>
					<div>
						<el-button type="text" v-if="isCheck == 1" @click="dialogTableVisible = true">{{$t('adServing.adjustment')}}</el-button>
					</div>
					<el-dialog :title="$t('adServing.strategy')" :visible.sync="dialogTableVisible">
					  <el-form :model="form">
					    <el-form-item :label="$t('adServing.all')" :label-width="formLabelWidth">
					        <el-input-number v-model="form.advertPrice" :step="0.05" :min="0.1" controls-position="right" @change="handleChange">
					        </el-input-number>
					    </el-form-item>
					    <div v-for="(item, index) in form.conceptManageList" :key="index">
					    	<el-form-item :label="item.name" :label-width="formLabelWidth">
						      	<el-input-number v-model="item.conceptPrice" :step="0.05" :min="0.1" controls-position="right" @change="handleChange">
						      	</el-input-number>
						    </el-form-item>
					    </div>
					  	</el-form>
						<div slot="footer" class="dialog-footer">
						    <el-button type="primary" @click="changePrice">{{$t('buttonAll.revise')}}</el-button>
						</div>
					</el-dialog>
				</div>
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
					this.form = res.data;
					this.advertId = res.data.advertId;
					this.averagePrice = res.data.averagePrice;
					this.isCheck = res.data.isCheck;
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
			handleChange(){
				
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
	}
</style>