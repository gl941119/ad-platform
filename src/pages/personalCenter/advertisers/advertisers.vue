<template>
	<div class="newCrowdfunding">
		<h3>项目内容</h3>
		<p>请尽可能详细得填写相关资料，以便投资委员会合理地评估贵项目（评估期间双方都应严格遵守保密义务）</p>
		<ul class="newCrowdfunding_item">
			<h5>团队</h5>
			<li class="newCrowdfunding_item_li">
				<label>团队名称</label>
				<el-input placeholder="请输入内容"  v-model="newCrowdfunding.teamName" >
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>团队联系方式</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.teamContact">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>主要成员所在地</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.teamLocation">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li coreMembers">
				<label>核心团队成员</label>
				<el-button type="text" @click="queryCore">点击打开核心团队成员</el-button>
			</li>
			<div>
				<el-dialog title="核心团队成员" :visible.sync="centerDialogVisible" size="small">
					<el-table :data="coreTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column property="year" align="center" label="全名">
							<template slot-scope="scope">
								<el-input  v-model="scope.row.name"></el-input>
							</template>
						</el-table-column>
						<el-table-column property="name" align="center" label="头衔" width="200">
							<template slot-scope="scope">
								<el-input  v-model="scope.row.title"></el-input>
							</template>
						</el-table-column>
						<el-table-column property="address" align="center" label="简介">
							<template slot-scope="scope">
								<el-input  v-model="scope.row.desc"></el-input>
							</template>
						</el-table-column>
						<el-table-column property="address" align="center" label="操作">
							<template slot-scope="scope">
								<el-button  @click="addCore">添加</el-button>
								<el-button  @click="deletedCore(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div slot="footer" class="dialog-footer">
						<el-button  @click="saveLink">保存</el-button>
						<el-button  @click="addLink">添加</el-button>
						<el-button  @click="deletedLink">删除</el-button>
					</div>
				</el-dialog>
			</div>
			<li class="newCrowdfunding_item_li">
				<label>顾问团队</label>
				<el-button type="text" @click="queryConsultant">点击打开顾问团队成员</el-button>
			</li>
			<div>
				<el-dialog title="顾问团队成员" :visible.sync="CrowdTeamDialogVisible" size="small">
						<el-table :data="consultantTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column property="year" align="center" label="全名">
								<template slot-scope="scope">
									<el-input  v-model="scope.row.name"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="name" align="center" label="头衔" width="200">
								<template slot-scope="scope">
									<el-input  v-model="scope.row.title"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="address" align="center" label="简介">
								<template slot-scope="scope">
									<el-input  v-model="scope.row.desc"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="address" align="center" label="操作">
								<template slot-scope="scope">
									<el-button  @click="addConsultant">添加</el-button>
									<el-button  @click="deletedConsultant(scope.$index)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div slot="footer" class="dialog-footer">
							<el-button  @click="saveLinkConsultant">保存</el-button>
							<el-button  @click="addLinkConsultant">添加</el-button>
							<el-button  @click="deletedLinkConsultant">删除</el-button>
						</div>
					</el-dialog>
			</div>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>项目情况</h5>
			<li class="newCrowdfunding_item_li">
				<label>项目名称</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.proName">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>项目简介</label>
				<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newCrowdfunding.proDesc">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li exec">
				<label>概念</label>
				<el-input v-model="conceptDatas" placeholder="请输入内容">
				</el-input>
				<i class="el-icon-circle-plus example" @click="conceptFun"></i>
			</li>
			<li class="newCrowdfunding_item_li exec">
				<label>技术</label>
				<el-input v-model="technologyDatas" placeholder="请输入内容">
				</el-input>
				<i class="el-icon-circle-plus example" @click="technologyFun"></i>
			</li>
		</ul>
		<!--概念-->
		<div v-if="concept" class="withdraw">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="conceptFun"><i class="el-icon-close"></i></span>
				<div>
					<conceptCom @listenCondept="listenCondept"></conceptCom>
				</div>
			</div>
		</div>
		<!--技术-->
		<div v-if="technology" class="withdraw">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="technologyFun"><i class="el-icon-close"></i></span>
				<el-input placeholder="请输入技术" v-model="newCrowdfunding.technology1">
				</el-input>
				<el-input placeholder="请输入技术" v-model="newCrowdfunding.technology2">
				</el-input>
				<button class="right_now" style=";position:absolute;top: 278px;" @click="technologyFun">好的</button>
			</div>
		</div>
		<ul class="newCrowdfunding_item">
			<h5>代币信息</h5>
			<li class="newCrowdfunding_item_li">
				<label>英文简写</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.shotEnName">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>中文简写</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.shotCnName">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>英文全名</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.fullEnName">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>logo</label>
				<div>
					<el-upload class="avatar-uploader" :show-file-list="false" action="" :on-change="getImg" :auto-upload="false">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>相关链接</h5>
			<li class="newCrowdfunding_item_li">
				<label>官网</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.website">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>白皮书地址</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.whitePaper">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li" v-for="(item, index) in websites" :key="index">
				<label><el-input placeholder="自定义站点名" v-model="websites[index].websiteName" >
				</el-input></label>
				<el-input placeholder="自定义站点地址" v-model="websites[index].websiteAddress">
				</el-input>
			</li>
			<!--<li class="newCrowdfunding_item_li" v-for="(item, index) in websitesSubmit" :key="index">
				<label class="project_review_details_item_li_label">
					<el-input placeholder="自定义站点名" v-model="websitesSubmit[index].websiteName" >
					</el-input>
				</label>
				<el-input placeholder="自定义站点地址" v-model="websitesSubmit[index].websiteAddress">
				</el-input>
			</li>-->
		</ul>
		<button @click="submit">提交</button>
		<button @click="saveSubmit">保存修改</button>
	</div>
</template>

<script>
	import conceptCom from '@/components/personal-com/concept';
	import customIdentifyCom from '@/components/common/custom-identify';
    import Cache from '../../../utils/cache.js';
    import Utils from '../../../utils/util.js';
    import Request from '../../../utils/require.js';
    import Config from '../../../utils/config.js';
    import validateFun from '../../../utils/validate.js';
	export default {
		data() {
			return {
				coreTeam: [{}],
				consultantTeam: [{}],
				newCore: {
					accountId: this.$store.state.id || Cache.getSession('bier_userid'),
					name: '',
					title: '',
					desc: '',
				},
				newConsultant: {
					accountId: this.$store.state.id || Cache.getSession('bier_userid'),
					name: '',
					title: '',
					desc: '',
				},
				imageUrl: '',
				newCrowdfunding: {
					id:'',
					accountId: this.$store.state.id || Cache.getSession('bier_userid'), //用户id
					teamName: "", //团队名称
					teamContact: "", //团队联系方式
					teamLocation: "", //团队所在地
					proName: "", //项目名称
					proDesc: "", //项目简介
					technology1: "", //技术1
					technology2: "", //技术2
					website: "", //官网
					whitePaper: "", //白皮书地址
					shotEnName: "", //英文简写
					shotCnName: "", //中文简写
					fullEnName: "", //英文全名
				},
				websites:[{},{},{},{},{},{},{},{}],
				checkedData: [],
				concept: false,
				technology: false,
				imageUrl: '', //logo地址
				conceptDatas: '',
				technologyDatas: '',
				centerDialogVisible: false,
				CrowdTeamDialogVisible: false,
				multipleSelection:[],
			}
		},
		components: {
			conceptCom,
		},
		mounted(){
			this.queryDetails();
		},
		methods: {
			submit() {
				Request({
					url: 'QueryNewProject',
					data: {
						accountId: this.newCrowdfunding.accountId,
						teamName: this.newCrowdfunding.teamName,
						teamContact: this.newCrowdfunding.teamContact,
						teamLocation: this.newCrowdfunding.teamLocation,
						proName: this.newCrowdfunding.proName,
						proDesc: this.newCrowdfunding.proDesc,
						listConceptManage:this.checkedData,
						technology1: this.newCrowdfunding.technology1,
						technology2: this.newCrowdfunding.technology2,
						website: this.newCrowdfunding.website,
						whitePaper: this.newCrowdfunding.whitePaper,
						shotEnName: this.newCrowdfunding.shotEnName,
						shotCnName: this.newCrowdfunding.shotCnName,
						fullEnName: this.newCrowdfunding.fullEnName,
						title: this.newCrowdfunding.title,
						logo: this.imageUrl,
						listMermber: this.coreTeam,
						listConsultants: this.consultantTeam,
						websites:this.websites,
					},
					type: 'post',
					flag: true,
				}).then(res => {
					console.log(res);
					if(res.success == 1) {
						this.$message('添加成功');
					} 
				})
			},
			saveSubmit() {
				Request({
					url: 'ChangeProject',
					data: {
						accountId: this.newCrowdfunding.accountId,
						id: this.newCrowdfunding.id,
						teamName: this.newCrowdfunding.teamName,
						teamContact: this.newCrowdfunding.teamContact,
						teamLocation: this.newCrowdfunding.teamLocation,
						proName: this.newCrowdfunding.proName,
						proDesc: this.newCrowdfunding.proDesc,
						listConceptManage:this.checkedData,
						technology1: this.newCrowdfunding.technology1,
						technology2: this.newCrowdfunding.technology2,
						website: this.newCrowdfunding.website,
						whitePaper: this.newCrowdfunding.whitePaper,
						shotEnName: this.newCrowdfunding.shotEnName,
						shotCnName: this.newCrowdfunding.shotCnName,
						fullEnName: this.newCrowdfunding.fullEnName,
						title: this.newCrowdfunding.title,
						logo: this.imageUrl,
						listMermber: this.coreTeam,
						listConsultants: this.consultantTeam,
						websites:this.websites,
					},
					type: 'post',
					flag: true,
				}).then(res => {
					console.log(res);
					if(res.success == 1) {
						this.$message('添加成功');
					} 
				})
			},
			queryDetails(){
				Request({
					url: 'QueryProject',
					data: {
						accountId:this.newCrowdfunding.accountId,			
					},
					type: 'get',
					flag: true,
				}).then(res => {
					console.log(res);
					this.newCrowdfunding = res.data;
					var technologyArr = [];
					if(res.data.technology1) {
						technologyArr.push(res.data.technology1);
					}
					if(res.data.technology2) {
						technologyArr.push(res.data.technology2);
					}
					var arr = [];
					if(res.data.conceptResultList){
						res.data.conceptResultList.forEach(function(item,index){
							arr.push(item.name);
						})
					}
					this.conceptDatas = arr.join('-')
					this.technologyDatas = technologyArr.join('-');
					if(res.data.websiteResultList){
						var length = res.data.websiteResultList.length;
						var obj = {};
						this.websites = res.data.websiteResultList;
						for(var i=0;i<8-length;i++){
							this.websites.push(obj);
						}
					}
				})
			},
			queryCore() {
				Request({
					url: 'QueryAdCoreMember',
					data: {
						advertId: this.newCrowdfunding.id
					},
					type: 'get',
					flag:true,
				}).then(res => {
					this.coreTeam = res.data;
					this.centerDialogVisible = true;
				})
			},
			saveLink() {
				var id = this.$route.params.id;
				Request({
					url: 'ChangeAdCoreMember',
					data: {
						accountId: this.newCrowdfunding.accountId,
						advertId: this.multipleSelection[0].advertId,
						id: this.multipleSelection[0].id,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					type: 'put',
					flag: true,
				}).then(res => {
					if(res.success){
						this.centerDialogVisible = false;
						this.$message('修改成功');
					}
				})
			},
			addLink() {
				Request({
					url: 'AddAdCoreMember',
					data: {
						accountId: this.newCrowdfunding.accountId,
						advertId: this.newCrowdfunding.id,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					flag: true,
				}).then(res => {
					if(res.success == 1) {
						this.centerDialogVisible = false;
						this.$message('添加成功');
					}
				})
			},
			deletedLink() {
				var id = this.$route.params.id;
				Request({
					url: 'DeletedAdCoreMember',
					data: {
						advertId: this.multipleSelection[0].advertId,
						id: this.multipleSelection[0].id
					},
					type: 'DELETE',
					flag: true,
				}).then(res => {
					if(res.success == 1) {
						this.$message('删除成功');
						this.centerDialogVisible = false;
						this.queryDetails();
					}
				})
			},
			queryConsultant() {
				Request({
					url: 'QueryAdConsultant',
					data: {
						advertId: this.newCrowdfunding.id,
					},
					type: 'get',
					flag:true,
				}).then(res => {
					this.consultantTeam = res.data;
					this.CrowdTeamDialogVisible = true;
				})
			},
			addLinkConsultant() {
				var id = this.$route.params.id;
				Request({
					url: 'AddAdConsultant',
					data: {
						accountId: this.newCrowdfunding.accountId,
						advertId: this.newCrowdfunding.id,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					flag: true,
				}).then(res => {
					if(res.success == 1) {
						this.CrowdTeamDialogVisible = false;
						this.$message('添加成功');
					}
				})
			},
			deletedLinkConsultant() {
				var id = this.$route.params.id;
				Request({
					url: 'DeletedAdConsultant',
					data: {
						advertId: this.multipleSelection[0].advertId,
						id: this.multipleSelection[0].id,
					},
					type: 'DELETE',
					flag: true,
				}).then(res => {
					if(res.success) {
						this.CrowdTeamDialogVisible = false;
						this.$message('删除成功');
					}
				})
			},
			saveLinkConsultant() {
				var id = this.$route.params.id;
				Request({
					url: 'ChangeAdConsultant',
					data: {
						id: this.multipleSelection[0].id,
						accountId: this.multipleSelection[0].accountId,
						advertId: this.multipleSelection[0].advertId,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					type: 'put',
					flag: true,
				}).then(res => {
					if(res.success) {
						this.CrowdTeamDialogVisible = false;
						this.$message('修改成功');
					}
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val);
			},
			listenCondept(checkedData) {
				var newCheckedData = [];
				checkedData.forEach(function(item, index) {
					newCheckedData.push(item.name);
				})
				this.conceptDatas = newCheckedData.join('-');
				this.checkedData = checkedData;
				console.log(checkedData);
			},
			addCore() { //核心团队
				var tmpPersions = this.coreTeam;
				tmpPersions.push(this.newCore);
				this.newCore = {};
				this.coreTeam = tmpPersions;
			},
			deletedCore(value) { //核心团队
				var length = this.coreTeam.length;
				if(length <= 1) {
					this.$message("不要删了o，再删就没有了");
				} else {
					this.coreTeam.splice(value, 1);
				}
			},
			addConsultant() { //顾问团队
				var tmpPersions = this.consultantTeam;
				tmpPersions.push(this.newConsultant);
				this.newConsultant = {};
				this.consultantTeam = tmpPersions;
			},
			deletedConsultant(value) { //顾问团队
				console.log(value)
				var length = this.consultantTeam.length;
				if(length <= 1) {
					this.$message("不要删了o，再删就没有了");
				} else {
					this.consultantTeam.splice(value, 1);
				}
			},
			getImg(file) {
				console.log(file)
				this.imageUrl = file.url;
			},
			conceptFun() { //概念弹出窗
				this.concept = !this.concept;
			},
			technologyFun() {
				this.technology = !this.technology;
				var technologyArr = [];
				if(this.newCrowdfunding.technology1) {
					technologyArr.push(this.newCrowdfunding.technology1);
				}
				if(this.newCrowdfunding.technology2) {
					technologyArr.push(this.newCrowdfunding.technology2);
				}
				this.technologyDatas = technologyArr.join('-');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../assets/css/global.scss';
	@import '../../../assets/css/variable.scss';
	@import '../../../assets/css/withdraw.scss';
	@import '../../../assets/css/newProjectDetails.scss';
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
		border: 1px solid #eeeeee;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	
	.exec {
		position: relative;
	}
	
	.example {
		position: absolute;
		top: 14px;
		right: 15px;
	}
</style>