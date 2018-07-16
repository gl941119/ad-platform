<template>
	<div class="project_review_details">
		<div class="project_review_details_team">
			<div class="project_review_details_title">{{$t('team.teamInfo')}}</div>
			<ul class="project_review_details_team_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('team.teamName')}}</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.teamName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('team.teamPhone')}}</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.teamContact"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('team.teamAddress')}}</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.teamLocation"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('team.coreMember')}}</label>
					<el-button type="text" @click="queryCore">{{$t('team.openCoreMember')}}</el-button>
				</li>
				<div class="project_review_details_item_li_info">
					<el-dialog :title="$t('team.coreMember')" :visible.sync="centerDialogVisible" size="small">
						<el-table :data="coreTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column property="year" align="center" :label="$t('team.name')">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.name"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="name" align="center" :label="$t('team.title')" width="200">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.title"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="address" align="center" :label="$t('team.desc')">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.desc"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="address" align="center" :label="$t('team.operating')">
								<template slot-scope="scope">
									<i @click="addCore" class="custom-element-icon-jia-copy"></i>
									<i @click="deletedCore(scope.$index)" class="custom-element-icon-jian1"></i>
								</template>
							</el-table-column>
						</el-table>
						<div slot="footer" class="dialog-footer">
							<el-button :disabled="disabled" @click="saveLink">{{$t('buttonAll.save')}}</el-button>
							<el-button :disabled="disabled" @click="addLink">{{$t('buttonAll.add')}}</el-button>
							<el-button :disabled="disabled" @click="deletedLink">{{$t('buttonAll.delete')}}</el-button>
						</div>
					</el-dialog>
				</div>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('team.consultant')}}</label>
					<el-button type="text" @click="queryConsultant">{{$t('team.openConsultant')}}</el-button>
				</li>
				<div class="project_review_details_item_li_info">
					<el-dialog :title="$t('team.consultant')" :visible.sync="CrowdTeamDialogVisible" size="small">
						<el-table :data="consultantTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column property="year" align="center" :label="$t('team.name')">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.name"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="name" align="center" :label="$t('team.title')" width="200">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.title"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="address" align="center" :label="$t('team.desc')">
								<template slot-scope="scope">
									<el-input :disabled="disabled" v-model="scope.row.desc"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="address" align="center" :label="$t('team.operating')">
								<template slot-scope="scope">
									<i @click="addConsultant" class="custom-element-icon-jia-copy"></i>
									<i @click="deletedConsultant(scope.$index)" class="custom-element-icon-jian1"></i>
								</template>
							</el-table-column>
						</el-table>
						<div slot="footer" class="dialog-footer">
							<el-button :disabled="disabled" @click="saveLinkConsultant">{{$t('buttonAll.save')}}</el-button>
							<el-button :disabled="disabled" @click="addLinkConsultant">{{$t('buttonAll.add')}}</el-button>
							<el-button :disabled="disabled" @click="deletedLinkConsultant">{{$t('buttonAll.delete')}}</el-button>
						</div>
					</el-dialog>
				</div>
			</ul>
		</div>
		<div class="project_review_details_team">
			<div class="project_review_details_title">{{$t('projectInfo.info')}}</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('projectInfo.projectName')}}</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.proName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('projectInfo.projectDesc')}}</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.proDesc"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('projectInfo.concept')}}</label>
					<div class="project_review_details_item_li_intro" style="position: relative;">
						<el-input v-model="conceptDatas" :disabled="disabled">
						</el-input>
						<i class="el-icon-circle-plus" v-if="!disabled" style="position: absolute;top: 14px;right: 15px;" @click="conceptFun"></i>
					</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('projectInfo.technology')}}</label>
					<div class="project_review_details_item_li_intro" style="position: relative;">
						<el-input v-model="technologyDatas" :disabled="disabled">
						</el-input>
						<i class="el-icon-circle-plus" v-if="!disabled" style="position: absolute;top: 14px;right: 15px;" @click="technologyFun"></i>
					</div>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">官网</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.website"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">白皮书地址</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.whitePaper"></el-input>
				</li>
			</ul>
		</div>
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
				<el-input :placeholder="$t('projectInfo.enterTechnology1')" v-model="details.technology1">
				</el-input>
				<el-input :placeholder="$t('projectInfo.enterTechnology2')" v-model="details.technology2">
				</el-input>
				<button class="right_now" style=";position:absolute;top: 278px;" @click="technologyFun">{{$t('buttonAll.confirm')}}</button>
			</div>
		</div>
		<div class="project_review_details_team">
			<div class="project_review_details_title">{{$t('tokenInfo.token')}}</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('tokenInfo.english')}}</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.shotEnName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('tokenInfo.chinese')}}</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.shotCnName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">{{$t('tokenInfo.englishName')}}</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.fullEnName"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">logo</label>
					<el-upload class="avatar-uploader" action="" :multiple="false" :show-file-list="false" :auto-upload="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
						<img v-if="details.logo" :src="details.logo" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</li>
			</ul>
		</div>
		<div class="project_review_details_team">
			<div class="project_review_details_title">本轮众筹标题</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">发行总量</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.circulation"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">众筹总量</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.totalCrowdfund"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">本轮次发行量</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.currCirculation"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">众筹价格</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.price"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">单账号兑换限制</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.mostNumber"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">目标货币</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.targetCurrency"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">发行硬顶</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.lowLimit"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">发行软顶</label>
					<el-input class="project_review_details_item_li_intro" :disabled="disabled" v-model="details.topLimit"></el-input>
				</li>
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">本轮众筹时间</label>
					<div v-if="disabled" class="project_review_details_item_li_intro">
						<span>{{details.startTime}}</span> ~ <span>{{details.endTime}}</span>
					</div>
					<div v-if="!disabled" class="project_review_details_item_li_intro">
						<el-date-picker v-model="timeInterval" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</li>
			</ul>
		</div>
		<div class="project_review_details_team">
			<div class="project_review_details_title">合规性文件</div>
			<ul class="project_review_details_item">
				<li class="project_review_details_item_li">
					<label class="project_review_details_item_li_label">相关牌照</label>
					<a v-if="disabled && details.license" :href="details.license" download>下载</a>
					<div v-if="!disabled">
						<el-upload class="upload-demo" action="" :auto-upload="false" :on-change="getFile" :multiple="false">
							<el-button size="small">上传</el-button>
						</el-upload>
					</div>
				</li>
			</ul>
		</div>
		<div v-if="!disabled">
			<button class="check" @click="changeDetails">保存修改</button>
		</div>
	</div>
</template>

<script>
	import Config from '../../../utils/config';
	import conceptCom from '@/components/personal-com/concept';
	import Cache from '../../../utils/cache';
	import Request from '../../../utils/require';
	import Utils from '../../../utils/util.js';
	export default {
		data() {
			return {
				coreTeam: [{
					accountId: this.$store.state.id || Cache.getSession('bier_userid'),
					name: '',
					title: '',
					desc: '',
				}],
				consultantTeam: [{
					accountId: this.$store.state.id || Cache.getSession('bier_userid'),
					name: '',
					title: '',
					desc: '',
				}],
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
				details: {

				},
				disabled: false,
				centerDialogVisible: false,
				CrowdTeamDialogVisible: false,
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
				multipleSelection: [],
				timeInterval: [],
				concept: false,
				technology: false,
				conceptDatas: '',
				technologyDatas: '',
				checkeData: [],
				util: new Utils(),
			};
		},
		components: {
			conceptCom,
		},
		mounted() {
			this.queryDetails();
		},
		methods: {
			queryDetails() {
				var id = this.$route.params.id;
				var value = this.$route.params.value;
				if(value == 1) {
					this.disabled = false;
				} else {
					this.disabled = true;
				}
				Request({
					url: 'QueryCrowdfundingDetails',
					data: {
						id: id
					},
					type: 'get'
				}).then(res => {
					console.log(res);
					this.details = res.data;
					let {
						concept1Id,
						concept2Id,
						concept3Id,
						concept4Id,
					} = res.data;
					this.conceptDatas = [concept1Id, concept2Id, concept3Id, concept4Id].join('-');
					var technologyArr = [];
					if(res.data.technology1) {
						technologyArr.push(res.data.technology1);
					}
					if(res.data.technology2) {
						technologyArr.push(res.data.technology2);
					}
					this.technologyDatas = technologyArr.join('-');
					this.timeInterval = [res.data.startTime, res.data.endTime];
				})
			},
			queryCore() {
				var id = this.$route.params.id;
				Request({
					url: 'QueryCoreMember',
					data: {
						crowdId: id
					},
					type: 'get'
				}).then(res => {
					this.coreTeam = res.data;
					this.centerDialogVisible = true;
				})
			},
			queryConsultant() {
				var id = this.$route.params.id;
				Request({
					url: 'QueryConsultant',
					data: {
						crowdId: id
					},
					type: 'get'
				}).then(res => {
					console.log(res);
					this.consultantTeam = res.data;
					this.CrowdTeamDialogVisible = true;
				})
			},
			changeDetails() {
				var startTime = this.util.format(this.timeInterval[0], 'yyyy-MM-dd HH:mm:ss');
				var endTime = this.util.format(this.timeInterval[1], 'yyyy-MM-dd HH:mm:ss');
				Request({
					url: 'ChangeCrowdfundingDetails',
					data: {
						accountId: this.details.accountId,
						circulation: this.details.circulation,
						concept1Id: this.details.concept1Id,
						concept2Id: this.details.concept2Id,
						concept3Id: this.details.concept3Id,
						concept4Id: this.details.concept4Id,
						currCirculation: this.details.currCirculation,
						endTime: endTime,
						fullEnName: this.details.fullEnName,
						id: this.details.id,
						license: this.details.license,
						logo: this.details.logo,
						lowLimit: this.details.lowLimit,
						mostNumber: this.details.mostNumber,
						price: this.details.price,
						proDesc: this.details.proDesc,
						proName: this.details.proName,
						shotCnName: this.details.shotCnName,
						shotEnName: this.details.shotEnName,
						startTime: startTime,
						targetCurrency: this.details.targetCurrency,
						teamContact: this.details.teamContact,
						teamLocation: this.details.teamLocation,
						teamName: this.details.teamName,
						technology1: this.details.technology1,
						technology2: this.details.technology2,
						title: this.details.title,
						topLimit: this.details.topLimit,
						totalCrowdfund: this.details.totalCrowdfund,
						website: this.details.website,
						whitePaper: this.details.whitePaper
					},
					type: 'put',
					flag:true,
				}).then(res => {
					if(res.success) {
						this.queryDetails();
						this.$message('修改成功');
					}
				})
			},
			addCore() { //核心团队
				var tmpPersions = this.coreTeam;
				tmpPersions.push(this.newCore);
				this.newCore = {};
				this.coreTeam = tmpPersions;
			},
			deletedCore(value) { //核心团队
				console.log(value)
				var length = this.coreTeam.length;
				if(length <= 1) {
					alert("不要删了o，再删就没有了")
				} else {
					this.coreTeam.splice(value, 1);
				}
			},
			saveLink() {
				var id = this.$route.params.id;
				Request({
					url: 'ChangeCoreMember',
					data: {
						id: this.multipleSelection[0].id,
						accountId: this.accountId,
						crowdId: this.multipleSelection[0].crowdId,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					type: 'put',
					flag: true,
				}).then(res => {
					if(res.success) {
						this.$message('修改成功');
						this.queryDetails();
					}
				})
			},
			addLink() {
				var id = this.$route.params.id;
				Request({
					url: 'AddCoreMember',
					data: {
						accountId: this.accountId,
						crowdId: this.details.id,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					flag: true,
				}).then(res => {
					if(res.success == 1) {
						this.$message('添加成功');
						this.queryDetails();
					}
				})
			},
			deletedLink() {
				var id = this.$route.params.id;
				Request({
					url: 'DeletedCoreMember',
					data: {
						crowdId: this.multipleSelection[0].crowdId,
						id: this.multipleSelection[0].id
					},
					type: 'DELETE',
					flag: true,
				}).then(res => {
					if(res.success == 1) {
						this.$message('删除成功');
						this.queryDetails();
					}
				})
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
					alert("不要删了o，再删就没有了")
				} else {
					this.consultantTeam.splice(value, 1);
				}
			},
			addLinkConsultant() {
				var id = this.$route.params.id;
				Request({
					url: 'addConsultant',
					data: {
						accountId: this.accountId,
						crowdId: this.details.id,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					flag: true,
				}).then(res => {
					if(res.success == 1) {
						this.queryDetails();
						this.$message('添加成功');
					}
				})
			},
			deletedLinkConsultant() {
				var id = this.$route.params.id;
				Request({
					url: 'deletedConsultant',
					data: {
						accountId: this.accountId,
						crowdId: this.details.id,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					type: 'DELETE',
					flag: true,
				}).then(res => {
					if(res.success) {
						this.queryDetails();
						this.$message('删除成功');
					}
				})
			},
			saveLinkConsultant() {
				var id = this.$route.params.id;
				Request({
					url: 'ChangeConsultant',
					data: {
						id: this.multipleSelection[0].id,
						accountId: this.accountId,
						crowdId: this.multipleSelection[0].crowdId,
						desc: this.multipleSelection[0].desc,
						name: this.multipleSelection[0].name,
						title: this.multipleSelection[0].title
					},
					type: 'put',
					flag: true,
				}).then(res => {
					if(res.success) {
						this.queryDetails();
						this.$message('修改成功');
					}
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val)
			},
			handleAvatarSuccess(res, file) {
//				this.details.logo = file.url;
				console.log(file);
			},
			beforeAvatarUpload(file){
				console.log(file);
			},
			getFile(file) {
				this.details.license = file.url;
			},
			conceptFun() { //概念弹出窗
				this.concept = !this.concept;
			},
			technologyFun() {
				this.technology = !this.technology;
				var technologyArr = [];
				if(this.details.technology1) {
					technologyArr.push(this.details.technology1);
				}
				if(this.details.technology2) {
					technologyArr.push(this.details.technology2);
				}
				this.technologyDatas = technologyArr.join('-');
			},
			listenCondept(checkedData) {
				var newCheckedData = [];
				checkedData.forEach(function(item, index) {
					newCheckedData.push(item.name);
				})
				this.conceptDatas = newCheckedData.join('-');
				this.checkeData = checkedData;
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../assets/css/global.scss';
	@import '../../../assets/css/variable.scss';
	@import '../../../assets/css/newProjectDetails.scss';
	@import '../../../assets/css/withdraw.scss';
	.project_review_details_team {
		padding: 20px;
		margin-bottom: 10px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
		border: 1px solid rgba(228, 231, 237, 1);
	}
	
	.project_review_details_item_li {
		display: flex;
		font-size: 14px;
		color: rgba(16, 16, 16, 1);
		min-height: 20px;
		line-height: 20px;
		margin: 10px 0;
		&_label {
			width: 150px;
		}
		&_intro {
			flex: 1;
		}
		&_info {
			margin: 10px 0;
		}
	}
	
	.check {
		border-radius: 4px;
		color: rgba(16, 16, 16, 1);
		font-size: 14px;
		text-align: center;
		border: 1px solid rgba(187, 187, 187, 1);
		padding: 5px 10px;
		background: #ffffff;
	}
	
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
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>