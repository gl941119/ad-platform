<template>
	<div class="newCrowdfunding">
		<ul class="newCrowdfunding_item">
			<h5>{{$t('team.teamInfo')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamName')}}</label>
				<input :disabled="disabled" v-model="details.teamName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamPhone')}}</label>
				<input :disabled="disabled" v-model="details.teamContact" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamAddress')}}</label>
				<input :disabled="disabled" v-model="details.teamLocation" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.coreMember')}}</label>
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
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.consultant')}}</label>
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
		<ul class="newCrowdfunding_item">
			<h5 >{{$t('projectInfo.info')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('projectInfo.projectName')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.proName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('projectInfo.projectDesc')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.proDesc" />
			</li>
			<li class="newCrowdfunding_item_li exec">
				<label >{{$t('projectInfo.concept')}}</label>
				<input class="langer" v-model="conceptDatas" :disabled="disabled" />
				<i class="custom-element-icon-jia-copy example" @click="conceptFun"></i>
			</li>
			<li class="newCrowdfunding_item_li exec">
				<label >{{$t('projectInfo.technology')}}</label>
				<input class="langer" v-model="technologyDatas" :disabled="disabled" />
				<i class="custom-element-icon-jia-copy example" @click="technologyFun"></i>
			</li>
			<li class="newCrowdfunding_item_li">
				<label >{{$t('aboutLink.website')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.website" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label >{{$t('aboutLink.whitePaper')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.whitePaper" />
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
				<div class="technology">
					<el-input :placeholder="$t('projectInfo.enterTechnology1')" v-model="details.technology1">
					</el-input>
				</div>
				<div class="technology">
					<el-input :placeholder="$t('projectInfo.enterTechnology2')" v-model="details.technology2">
					</el-input>
				</div>
				<button class="confirm" @click="technologyFun">{{$t('buttonAll.confirm')}}</button>
			</div>
		</div>
		<ul class="newCrowdfunding_item">
			<h5 >{{$t('tokenInfo.token')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.english')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.shotEnName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.chinese')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.shotCnName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.englishName')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.fullEnName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>logo</label>
				<el-upload class="avatar-uploader" 
					:show-file-list="false" 
					 :action="uploadImg"
					 :headers="requestToken"
					 :on-error="imgError"
					 accept=".jpg,.png"
					 :limit="1"
					:on-success="handleAvatarSuccess">
					<img v-if="details.logo" :src="details.logo" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('tokenInfo.title')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.issueTotal')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.circulation" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.total')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.totalCrowdfund" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label >{{$t('tokenInfo.thisIssue')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.currCirculation" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.price')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.price" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.limit')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.mostNumber" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.money')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.targetCurrency" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.topLimit')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.topLimit" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.lowLimit')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.lowLimit" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.dataTime')}}</label>
				<div v-if="disabled">
					<span>{{details.startTime}}</span> ~ <span>{{details.endTime}}</span>
				</div>
				<div v-if="!disabled" >
					<el-date-picker v-model="timeInterval" type="datetimerange" :range-separator="$t('tokenInfo.to')" :start-placeholder="$t('tokenInfo.startTime')" :end-placeholder="$t('tokenInfo.endTime')">
					</el-date-picker>
				</div>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('tokenInfo.files')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.about')}}</label>
				<a v-if="disabled && details.license" :href="details.license" download>{{$t('tokenInfo.download')}}</a>
				<div v-if="!disabled">
					<el-upload class="upload-demo" 
						:action="uploadImg" 
						:on-success="getFile" 
						:on-error="imgError"
						:data="params"
						:headers="requestToken"
						:limit="1"
						accept=".jpg,.jpeg,.png,,.pdf"
						:on-remove="handleRemove" multiple>
						<el-button size="small">{{$t('tokenInfo.upload')}}</el-button>
					</el-upload>
				</div>
			</li>
		</ul>
		<div class="submit_box" v-if="!disabled">
			<button class="submit" @click="changeDetails">{{$t('buttonAll.saveChange')}}</button>
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
				isCheck:'',
				uploadImg: Config.UploadImg,
				requestToken: {
					token:
                        this.$store.state.token ||
                        Cache.getSession('bier_token')
				},
				params:{
					fileType:'2'
				}
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
					this.details = res.data;
					this.isCheck = res.data.isCheck;
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
					this.$router.push({ name: 'project'});
					this.$message({
						message:this.$t('messageNotice.changeSuccess'),
						type:'success'
					});
				})
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
					this.$message({
						message:this.$t('messageNotice.noDelete'),
						type:'warning'
					});
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
					this.$message({
						message:this.$t('messageNotice.changeSuccess'),
						type:'warning'
					});
					this.centerDialogVisible = false;
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
					this.$message({
						message:this.$t('messageNotice.addSuccess'),
						type:'success'
					});
					this.centerDialogVisible = false;
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
					this.$message({
						message:this.$t('messageNotice.deleteSuccess'),
						type:'success'
					});
					this.centerDialogVisible = false;
				})
			},
			addConsultant() { //顾问团队
				var tmpPersions = this.consultantTeam;
				tmpPersions.push(this.newConsultant);
				this.newConsultant = {};
				this.consultantTeam = tmpPersions;
			},
			deletedConsultant(value) { //顾问团队
				var length = this.consultantTeam.length;
				if(length <= 1) {
					this.$message({
						message:this.$t('messageNotice.noDelete'),
						type:'warning'
					});
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
						this.CrowdTeamDialogVisible = false;
						this.$message({
							message:this.$t('messageNotice.addSuccess'),
							type:'success'
						});
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
						this.CrowdTeamDialogVisible = false;
						this.$message({
							message:this.$t('messageNotice.deleteSuccess'),
							type:'success'
						});
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
					this.CrowdTeamDialogVisible = false;
					this.$message({
						message:this.$t('messageNotice.changeSuccess'),
						type:'success'
					});
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleAvatarSuccess(res) {
				this.details.logo = res.data;
			},
			imgError(){
				this.$message('上传失败');
			},
			getFile(res) {
				this.details.license = res.data;
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
	@import '../../../assets/css/upload.css';
</style>