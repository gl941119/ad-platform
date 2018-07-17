<template>
	<div class="user-management-list">
		<div class="user-management-list-title">
			<h3>{{$t('purse.balance')}}0AFDT</h3>
			<div class="balance">
				<p>{{$t('purse.bindWalletAddress')}}{{$t('purse.main')}}</p>
				<p>{{$t('purse.one')}}</p>
				<p>{{$t('purse.two')}}</p>
				<div class="purse_address">
					<label>{{$t('purse.eth')}}</label>
					<div class="input">
						<el-input v-model="purseAddress"></el-input>
					</div>
					<button class="purse_address_bind" @click="bind">{{$t('buttonAll.bind')}}</button>
				</div>
			</div>
			<div class="balance">
				≈ <span>2.61254212</span> BTC ≈ <span>19.36115238</span> ETH ≈ <span>19361.15</span> USD
			</div>
			<div class="img_box">
				<img src="../../../assets/imgs/img/connect.png" />
			</div>
		</div>
	</div>
</template>
<script>
	import Request from '../../../utils/require.js';
	import Cache from '../../../utils/cache.js';
	export default {
		data() {
			return {
				purseAddress:'',
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
			}
		},
		computed: {
			slangChange() {
				return this.$store.state.slangChange || Cache.getLocal('bier_langChange');
			}
		},
		methods: {
			bind(){
				Request({
					url: 'QueryBindWalletAddress',
					data: {
						id: this.accountId,
						walletAddress:this.purseAddress
					},
					type: 'post',
					flag:true,
				}).then(res => {
					if(res.success == 1){
						this.$message(this.$t('messageNotice.bindSuccess'));
						this.purseAddress = '';
					}
				})
			}
		}
	};
</script>
<style lang="scss" scoped>
.user-management-list-title{
	background: #FFFFFF;
	padding: 20px;
	h3{
		font-size: 24px;
	}
	.balance {
		margin-top: 20px;
		font-size: 16px;
		color: #333333;
		p{
			font-size: 16px;
			margin: 5px 0;
			color: #333333;
		}
	}
}
	
	.purse_address {
		display: flex;
		justify-content:flex-start;
		margin-top: 20px;
		label{
			width: 120px;
			font-size: 16px;
			line-height: 32px;
		}
		.input{
			width: 500px;
			overflow: hidden;
		}
		.purse_address_bind {
			margin-left: 20px;
			width: 100px;
			border-radius: 5px;
			background:rgba(255,149,0,1);
			border-radius:4px;
			color: #FFFFFF;
			:hover{
				cursor: pointer;
			}
		}
	}
	
	.img_box{
		width:402px;
		height:715px;
		overflow: hidden;
		margin: 0 auto;
		img{
			width:402px;
			height:715px;
		}
	}
</style>