<template>
	<div class="user-management-list">
		<div class="user-management-list-title">
			<h3>余额0AFDT</h3>
			<div class="balance">
				<p>绑定您的钱包地址，用于提现在平台获得的广告收益、核对作为广告主的充值记录、检查您的账户余额</p>
				<p>这意味着：1、ETH钱包地址将可以用于接收基于ERC20协议的平台代币AFDT。2、如果您需要投放广告，则需要从本地址向平台充值以便核对</p>
				<div class="purse_address">
					<label style="width: 160px;">ETH 钱包地址</label>
					<el-input v-model="purseAddress"></el-input>
					<button class="purse_address_bind" @click="bind">绑定</button>
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
	export default {
		data() {
			return {
				purseAddress:'',
			}
		},
		methods: {
			bind(){
				Request({
					url: 'QueryBindWalletAddress',
					data: {
						id: 5,
						walletAddress:this.purseAddress
					},
					type: 'post',
					flag:true,
				}).then(res => {
					console.log(res);
					if(res.data.success == 1){
						this.$message('绑定成功');
					}else{
						this.$message('绑定失败');
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