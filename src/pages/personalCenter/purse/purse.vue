<template>
	<div class="user-management-list">
		<div class="user-management-list-title">
			<h3>{{$t('purse.balance')}}0AFDT</h3>
			<div class="balance">
				<p>{{$t('purse.bindWalletAddress')}}</p>
				<p>{{$t('purse.main')}}{{$t('purse.one')}}{{$t('purse.two')}}</p>
				<div class="purse_address">
					<label style="width: 160px;">{{$t('purse.eth')}}</label>
					<el-input v-model="purseAddress"></el-input>
					<button class="purse_address_bind" @click="bind">{{$t('buttonAll.bind')}}</button>
				</div>
			</div>
			<div class="balance">
				≈ <span>2.61254212</span> BTC ≈ <span>19.36115238</span> ETH ≈ <span>19361.15</span> USD
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
	.balance {
		margin-top: 20px;
	}
	
	.purse_address {
		display: flex;
		justify-content: space-between;
	}
	
	.purse_address_bind {
		margin-left: 20px;
		width: 100px;
		border-radius: 5px;
		background: #FFFFFF;
		color: #000000;
		border: 1px solid #333333;
	}
</style>