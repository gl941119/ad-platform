<template>
	<div class="newCrowdfunding">
		<span class="title">{{$t('projectNotic.title')}}</span>
		<span class="title_info">{{$t('projectNotic.notic')}}</span>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('team.teamInfo')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamName')}}</label>
				<input :placeholder="$t('team.enterTeamName')" :disabled="disabled"  v-model="newCrowdfunding.teamName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamPhone')}}</label>
				<input :placeholder="$t('team.enterTeamPhone')" :disabled="disabled" v-model="newCrowdfunding.teamContact" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamAddress')}}</label>
				<input :placeholder="$t('team.enterTeamAddress')" :disabled="disabled" v-model="newCrowdfunding.teamLocation" />
			</li>
			<li class="newCrowdfunding_item_li coreMembers">
				<label>{{$t('team.coreMember')}}</label>
				<el-button type="text" @click="queryCore">{{$t('team.openCoreMember')}}</el-button>
			</li>
			<div>
				<el-dialog :title="$t('team.coreMember')" :visible.sync="centerDialogVisible" size="small">
					<el-table :data="coreTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column property="year" align="center" :label="$t('team.name')">
							<template slot-scope="scope">
								<el-input :placeholder="$t('team.enterName')" v-model="scope.row.name"></el-input>
							</template>
						</el-table-column>
						<el-table-column property="name" align="center" :label="$t('team.title')" width="200">
							<template slot-scope="scope">
								<el-input :placeholder="$t('team.enterTitle')" v-model="scope.row.title"></el-input>
							</template>
						</el-table-column>
						<el-table-column property="address" align="center" :label="$t('team.desc')">
							<template slot-scope="scope">
								<el-input :placeholder="$t('team.enterDesc')" v-model="scope.row.desc"></el-input>
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
			<div>
				<el-dialog :title="$t('team.consultant')" :visible.sync="CrowdTeamDialogVisible" size="small">
					<el-table :data="consultantTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column property="year" align="center" :label="$t('team.name')">
							<template slot-scope="scope">
								<el-input :placeholder="$t('team.enterName')" v-model="scope.row.name"></el-input>
							</template>
						</el-table-column>
						<el-table-column property="name" align="center" :label="$t('team.title')" width="200">
							<template slot-scope="scope">
								<el-input :placeholder="$t('team.enterTitle')" v-model="scope.row.title"></el-input>
							</template>
						</el-table-column>
						<el-table-column property="address" align="center" :label="$t('team.desc')">
							<template slot-scope="scope">
								<el-input :placeholder="$t('team.enterDesc')" v-model="scope.row.desc"></el-input>
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
			<h5>{{$t('projectInfo.info')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('projectInfo.projectName')}}</label>
				<input class="langer" :placeholder="$t('projectInfo.enterProjectName')" :disabled="disabled" v-model="newCrowdfunding.proName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('projectInfo.projectDesc')}}</label>
				<input class="langer" :placeholder="$t('projectInfo.enterProjectDesc')" type="textarea" :disabled="disabled" :autosize="{ minRows: 2, maxRows: 4}" v-model="newCrowdfunding.proDesc" />
			</li>
			<li class="newCrowdfunding_item_li exec">
				<label>{{$t('projectInfo.concept')}}</label>
				<input class="langer" v-model="conceptDatas" :disabled="disabled" />
				<i class="custom-element-icon-jia-copy example" @click="conceptFun"></i>
			</li>
			<li class="newCrowdfunding_item_li exec">
				<label>{{$t('projectInfo.technology')}}</label>
				<input class="langer" v-model="technologyDatas" :disabled="disabled" />
				<i class="custom-element-icon-jia-copy example" @click="technologyFun"></i>
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
					<el-input :placeholder="$t('projectInfo.enterTechnology1')" :disabled="disabled" v-model="newCrowdfunding.technology1">
					</el-input>
				</div>
				<div class="technology">
					<el-input :placeholder="$t('projectInfo.enterTechnology2')" :disabled="disabled" v-model="newCrowdfunding.technology2">
					</el-input>
				</div>
				<button class="confirm" @click="technologyFun">{{$t('buttonAll.confirm')}}</button>
			</div>
		</div>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('tokenInfo.tokenIntro')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.english')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterEnglish')" :disabled="disabled" v-model="newCrowdfunding.shotEnName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.chinese')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterChinese')" :disabled="disabled" v-model="newCrowdfunding.shotCnName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.englishName')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterFullEnglish')" :disabled="disabled" v-model="newCrowdfunding.fullEnName" />
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
			<h5>{{$t('aboutLink.linkInfo')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('aboutLink.website')}}</label>
				<input class="langer" :placeholder="$t('aboutLink.enterWebsite')" :disabled="disabled" v-model="newCrowdfunding.website" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('aboutLink.whitePaper')}}</label>
				<input class="langer" :placeholder="$t('aboutLink.enterWhitePaper')" :disabled="disabled" v-model="newCrowdfunding.whitePaper" />
			</li>
			<li class="newCrowdfunding_item_li" v-for="(item, index) in websites" :key="index">
				<label class="label">
					<input :placeholder="$t('aboutLink.enterWebsiteName')" v-model="websites[index].websiteName" >
				</label>
				<input class="langer" :placeholder="$t('aboutLink.enterWebsiteAddress')" v-model="websites[index].websiteAddress" />
			</li>
		</ul>
		<button v-if="value == -1" @click="submit">{{$t('buttonAll.submits')}}</button>
		<button v-if="value == 2" @click="saveSubmit">{{$t('buttonAll.saveChange')}}</button>
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
				conceptResultList:[],
				value:this.$route.params.value,
				disabled:false,
			}
		},
		components: {
			conceptCom,
		},
		mounted(){
			var value = this.$route.params.value;
			if(value == 1){
				this.queryDetails();
				this.disabled = false;
			}else if(value == 2){
				this.disabled = true;
				this.queryDetails();
			}else if(value == 0){
				this.disabled = false;
			}
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
						listConceptManage:this.checkedData || this.conceptResultList,
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
					if(res.success == 1) {
						this.$message(this.$t('messageNotice.addSuccess'));
					} 
				})
			},
			saveSubmit() {
				var concept = [];
				if(this.checkedData){
					concept = this.checkedData;
				}else{
					concept = this.conceptResultList;
				}
				var value = this.newCrowdfunding.id;
				if(this.websites){
					this.websites.forEach(function(item, index){
						item.advertProjId = value;
					})
				}
				Request({
					url: 'ChangeProject',
					data: {
						id: this.newCrowdfunding.id,
						accountId: this.newCrowdfunding.accountId,
						teamName: this.newCrowdfunding.teamName,
						teamContact: this.newCrowdfunding.teamContact,
						teamLocation: this.newCrowdfunding.teamLocation,
						proName: this.newCrowdfunding.proName,
						proDesc: this.newCrowdfunding.proDesc,
						conceptManageList:concept,
						technology1: this.newCrowdfunding.technology1,
						technology2: this.newCrowdfunding.technology2,
						website: this.newCrowdfunding.website,
						whitePaper: this.newCrowdfunding.whitePaper,
						shotEnName: this.newCrowdfunding.shotEnName,
						shotCnName: this.newCrowdfunding.shotCnName,
						fullEnName: this.newCrowdfunding.fullEnName,
						title: this.newCrowdfunding.title,
						logo: this.imageUrl,
						websites:this.websites,
					},
					type: 'post',
					flag: true,
				}).then(res => {
					if(res.success) {
						this.queryDetails();
						this.$message(this.$t('messageNotice.changeSuccess'));
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
					this.conceptResultList = res.data.conceptResultList;
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
				var value = this.$route.params.value;
				this.centerDialogVisible = true;
				if(value == 1){
					Request({
						url: 'QueryAdCoreMember',
						data: {
							advertId: this.newCrowdfunding.id
						},
						type: 'get',
						flag:true,
					}).then(res => {
						this.coreTeam = res.data;
					})
				}
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
						this.$message(this.$t('messageNotice.changeSuccess'));
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
						this.$message(this.$t('messageNotice.addSuccess'));
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
						this.$message(this.$t('messageNotice.deleteSuccess'));
						this.centerDialogVisible = false;
						this.queryDetails();
					}
				})
			},
			queryConsultant() {
				var value = this.$route.params.value;
				if(value == 1){
					Request({
						url: 'QueryAdConsultant',
						data: {
							advertId: this.newCrowdfunding.id,
						},
						type: 'get',
						flag:true,
					}).then(res => {
						this.consultantTeam = res.data;
					})
				}
				this.CrowdTeamDialogVisible = true;
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
						this.$message(this.$t('messageNotice.addSuccess'));
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
						this.$message(this.$t('messageNotice.deleteSuccess'));
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
						this.$message(this.$t('messageNotice.changeSuccess'));
					}
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			listenCondept(checkedData) {
				var newCheckedData = [];
				checkedData.forEach(function(item, index) {
					newCheckedData.push(item.name);
				})
				this.conceptDatas = newCheckedData.join('-');
				this.checkedData = checkedData;
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
					this.$message(this.$t('messageNotice.noDelete'));
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
				var length = this.consultantTeam.length;
				if(length <= 1) {
					this.$message(this.$t('messageNotice.noDelete'));
				} else {
					this.consultantTeam.splice(value, 1);
				}
			},
			getImg(file) {
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
	@import '../../../assets/css/upload.css';
</style>