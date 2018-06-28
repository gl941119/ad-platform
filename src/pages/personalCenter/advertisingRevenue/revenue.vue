<template>
	<div class="advertising_revenue">
		<div class="advertising_revenue_top">
			<ul class="advertising_revenue_top_item">
				<li class="advertising_revenue_top_item_li active">3245.61254234  BRB</li>|
				<li class="advertising_revenue_top_item_li">冻结  1000.61254223  BRB</li>
			</ul>
			<div>提现</div>
		</div>
		<div class="advertising_revenu_account_flow">
			<div class="advertising_revenu_account_flow_title">账户流水</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.advertising_revenue_top_item{
		float: left;
		color: #ececec;
		.advertising_revenue_top_item_li{
			float: left;
		}
	}
	.active{
		color: #000000;
	}
</style>