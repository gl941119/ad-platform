<template>
	<div class="user-management-list">
		<div class="user-management-list-title">
			<h3>{{$t('purse.wallet')}}</h3>
			<div class="balance">
				<p>{{$t('purse.bindWalletAddress')}}{{$t('purse.main')}}</p>
				<p>{{$t('purse.one')}}</p>
				<p>{{$t('purse.two')}}</p>
				<p>{{$t('purse.three')}}</p>
				<div class="purse_address">
					<label>{{$t('purse.eth')}}</label>
					<div class="input">
						<el-input v-model="purseAddress" :disabled="disabled"></el-input>
					</div>
					<el-button class="purse_address_bind" :disabled="disabled" @click="bind">{{$t('buttonAll.bind')}}</el-button>
				</div>
				<div class="purse_address">
					<label>{{$t('purse.balance')}}</label>
					<div class="input">
						<el-input disabled v-model="balance"></el-input>
					</div>
				</div>
			</div>
			<!--<div class="balance">
				≈ <span>2.61254212</span> BTC ≈ <span>19.36115238</span> ETH ≈ <span>19361.15</span> USD
			</div>-->
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
				disabled:false,
				balance:'',
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
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
		mounted(){
			this.queryWallet();
		},
		methods: {
			bind(){
				var str = this.purseAddress;
				var value = /^0x.{40}$/.test(str);
				if(value){
					Request({
						url: 'QueryBindWalletAddress',
						data: {
							id: this.accountId,
							walletAddress:this.purseAddress
						},
						type: 'post',
						flag:true,
					}).then(res => {
							this.$message({
								message:this.$t('messageNotice.bindSuccess'),
								type:'success'
							});
							this.queryWallet();
					})
				}else{
					this.$message({
						message:this.$t('messageNotice.walltLimit'),
						type:'warning'
					});
				}
			},
			queryWallet(){
				Request({
					url: 'QueryWalletAddress',
					data: {
						accountId: this.accountId,
					},
					type: 'get',
					flag:true,
				}).then(res => {
					this.purseAddress = res.data.walletAddress;
					if(res.data.walletAddress){
						this.disabled = true;
						this.QueryBalance();
					}
				}).catch(e => {
                    if(e.data && e.data.islogin){
                        this.$router.push({name: 'index'});
                    }
                })
			},
			QueryBalance(){
				Request({
					url: 'QueryBalance',
					data: {
						address: this.purseAddress,
					},
					type: 'get',
					flag:true,
				}).then(res => {
					this.balance = res.data.balance;
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
		margin-top: 20px;
		label{
			width: 120px;
		    font-size: 16px;
		    max-height: 40px;
		    display: flex;
		    align-items: center;
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
			color: #FFFFFF;
			border: 0;
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