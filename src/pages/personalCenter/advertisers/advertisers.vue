<template>
	<div class="newCrowdfunding">
		<h3>众筹申请</h3>
		<p>请尽可能详细得填写相关资料，以便投资委员会合理地评估贵项目（评估期间双方都应严格遵守保密义务）</p>
		<ul class="newCrowdfunding_item">
			<h5>团队</h5>
			<li class="newCrowdfunding_item_li">
				<label>团队名称</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>团队联系方式</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>主要成员所在地</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>核心团队成员</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>顾问团队</label>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>项目情况</h5>
			<li class="newCrowdfunding_item_li">
				<label>项目名称</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>项目简介</label>
				<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>概念</label>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>技术</label>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>代币信息</h5>
			<li class="newCrowdfunding_item_li">
				<label>英文简写</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>中文简写</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>英文全名</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>logo</label>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>相关链接</h5>
			<li class="newCrowdfunding_item_li">
				<label>官网</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>白皮书地址</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				newPerson: {
					name: '',
					dept: '',
					intro: '',
				},
			}
		},
		methods: {
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

<style lang="scss" scoped>
	.newCrowdfunding{
		.newCrowdfunding_item{
			h5{
				font-size: 18px;
				margin: 5px 0;
			}
			.newCrowdfunding_item_li{
				display: flex;
				margin: 10px 0;
				label{
					width: 150px;
				}
			}
		}
	}
</style>