<template>
	<div class="newCrowdfunding">
		<h3>众筹申请</h3>
		<p>请尽可能详细得填写相关资料，以便投资委员会合理地评估贵项目（评估期间双方都应严格遵守保密义务）</p>
		<ul class="newCrowdfunding_team">
			<h5>团队</h5>
			<li class="newCrowdfunding_item_li">
				<label>团队名称</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>团队联系方式</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>主要成员所在地</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>核心团队成员</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>顾问团队</label>
			</li>
		</ul>
		<ul class="newCrowdfunding_project">
			<h5>项目情况</h5>
			<li class="newCrowdfunding_item_li">
				<label>项目名称</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>项目简介</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>概念</label>
			</li><li class="newCrowdfunding_item_li">
				<label>技术</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>官网</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>白皮书地址</label>
			</li>
		</ul>
		<ul class="newCrowdfunding_tokens_issued">
			<h5>代币发行</h5>
			<li class="newCrowdfunding_item_li">
				<label>英文简写</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>中文简写</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>英文全名</label>
			</li><li class="newCrowdfunding_item_li">
				<label>logo</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>本轮众筹标题</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>发行总量</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>众筹总量</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>本轮次发行量</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>众筹价格</label>
			</li><li class="newCrowdfunding_item_li">
				<label>目标货币</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>发行硬顶</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>发行软顶</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>本轮众筹时间</label>
			</li>
		</ul>
		<ul class="newCrowdfunding_file">
			<h5>合规性文件</h5>
			<li class="newCrowdfunding_item_li">
				<label>相关牌照</label>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				newPerson: {
					name: '',
					dept: '',
					intro:'',
				},
			}
		},
		methods:{
			add() {
				/*var tmpPersions = this.splContacts;
				tmpPersions.push(this.newPerson);
				this.newPerson = {};
				this.splContacts = tmpPersions;*/
			},
			deleted(value) {
				/*console.log("deleted:", this.splContacts, value)
				this.splContacts.splice(value, 1);*/
			},
		}
	}
</script>

<style>
</style>