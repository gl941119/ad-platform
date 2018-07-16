<template>
	<div class="ad-serving">
		<h3>{{$t('adServing.adSer')}}</h3>
		<p><el-button @click="newProject(isCheck)" type="text">{{$t('adServing.trafficking')}}</el-button></p>
		<div class="ad-serving-info">
			<div class="ad-serving-info-top">
				<div class="ad-serving-info-top-price">
					<h5>{{$t('adServing.averagePrice')}}</h5>
					<div>{{averagePrice}}</div>
					<div>
						<el-button type="text" v-if="isCheck == 1" @click="dialogTableVisible = true">{{$t('adServing.adjustment')}}</el-button>
					</div>
					<el-dialog :title="$t('adServing.strategy')" :visible.sync="dialogTableVisible">
					  <el-form :model="form">
					    <el-form-item :label="$t('adServing.all')" :label-width="formLabelWidth">
					        <el-input-number v-model="form.advertPrice" controls-position="right" @change="handleChange">
					        </el-input-number>
					    </el-form-item>
					    <div v-for="(item, index) in form.conceptManageList" :key="index">
					    	<el-form-item :label="item.name" :label-width="formLabelWidth">
						      	<el-input-number v-model="item.conceptPrice" controls-position="right" @change="handleChange">
						      	</el-input-number>
						    </el-form-item>
					    </div>
					     <el-form-item :label-width="formLabelWidth">
					      	<div>{{$t('adServing.prompt')}}</div>
					    </el-form-item>
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
					advertPrice:'',
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
					console.log(res);
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
	
</style>