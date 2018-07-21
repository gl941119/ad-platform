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
					<div slot="footer" v-if="isCheck!=-1" class="dialog-footer">
						<el-button :disabled="disabled" @click="saveLink">{{$t('buttonAll.save')}}</el-button>
						<el-button :disabled="disabled" @click="addLink">{{$t('buttonAll.add')}}</el-button>
						<el-button :disabled="disabled" @click="deletedLink">{{$t('buttonAll.delete')}}</el-button>
					</div>
					<div slot="footer" v-if="isCheck == '-1'" class="dialog-footer">
						<el-button @click="centerDialogVisible = false">{{$t('buttonAll.confirm')}}</el-button>
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
					<div slot="footer" v-if="isCheck != '-1'" class="dialog-footer">
						<el-button :disabled="disabled" @click="saveLinkConsultant">{{$t('buttonAll.save')}}</el-button>
						<el-button :disabled="disabled" @click="addLinkConsultant">{{$t('buttonAll.add')}}</el-button>
						<el-button :disabled="disabled" @click="deletedLinkConsultant">{{$t('buttonAll.delete')}}</el-button>
					</div>
					<div slot="footer" v-if="isCheck == '-1'" class="dialog-footer">
						<el-button @click="CrowdTeamDialogVisible = false">{{$t('buttonAll.confirm')}}</el-button>
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
					<el-upload class="avatar-uploader" 
						:show-file-list="false" 
						 :action="uploadImg"
						 :headers="requestToken"
						 :on-error="imgError"
						 accept=".jpg,.png"
						 :limit="1"
						 :on-success="getImg">
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
		<div class="submit_box">
			<button v-if="value == -1" @click="submit" class="submit">{{$t('buttonAll.submits')}}</button>
			<button v-if="value == 2" @click="saveSubmit" class="submit">{{$t('buttonAll.saveChange')}}</button>
		</div>
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
				website:[{},{},{},{},{},{},{},{}],
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
				isCheck:'',
				uploadImg: Config.UploadImg,
				requestToken: {
					token:
                        this.$store.state.token ||
                        Cache.getSession('bier_token')
				},
			}
		},
		components: {
			conceptCom,
		},
		mounted(){
			var value = this.$route.params.value;
			this.isCheck = value;
			switch(value){
				case -1:
					this.disabled = false;
					break;
				case 0:
					this.queryDetails();
					this.disabled = false;
					break;
				case 1:
					this.queryDetails();
					this.disabled = true;
					break;
				case 2:
					this.disabled = false;
					this.queryDetails();
					break;
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
					this.$message({
						message:this.$t('messageNotice.addSuccess'),
						type:'success'
					});
					this.clear();
				})
			},
			clear(){
				this.newCrowdfunding.accountId = '';
				this.newCrowdfunding.teamName = '';
				this.newCrowdfunding.teamContact = '';
				this.newCrowdfunding.teamLocation = '';
				this.newCrowdfunding.proName = '';
				this.newCrowdfunding.proDesc = '';
				this.checkedData  = '';
				this.conceptResultList = '';
				this.newCrowdfunding.technology1 = '';
				this.newCrowdfunding.technology2 = '';
				this.newCrowdfunding.website = '';
				this.newCrowdfunding.whitePaper = '';
				this.newCrowdfunding.shotEnName = '';
				this.newCrowdfunding.shotCnName = '';
				this.newCrowdfunding.fullEnName = '';
				this.newCrowdfunding.title = '';
				this.imageUrl = '';
				this.coreTeam = '';
				this.consultantTeam = '';
				this.websites = '';
			},
			saveSubmit() {
				var concept = [];
				if(this.checkedData.length>0){
					concept = this.checkedData;
				}else{
					concept = this.conceptResultList;
				}
				var value = this.newCrowdfunding.id;
				var arr = [];
				if(this.websites.length>0){
					this.websites.forEach(function(item, index){
						item.advertProjId = value;
						if(item.websiteName){
							arr.push(item);
						}
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
						websites:arr,
					},
					type: 'post',
					flag: true,
				}).then(res => {
					this.queryDetails();
					this.$message({
						message:this.$t('messageNotice.changeSuccess'),
						type:'success'
					});
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
					this.newCrowdfunding = res.data;
					this.imageUrl = res.data.logo;
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
					var that = this;
					if(res.data.websiteResultList.length>0){
						let number = -1;
						res.data.websiteResultList.forEach(function(item, index){
							number++;
							that.websites.splice(number,1,item);
						})
					}
				})
			},
			queryCore() {
				var value = this.$route.params.value;
				this.centerDialogVisible = true;
				if(value == 1 || value == 2){
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
					this.centerDialogVisible = false;
					this.$message({
						message:this.$t('messageNotice.changeSuccess'),
						type:'success'
					});
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
					this.centerDialogVisible = false;
					this.$message({
						message:this.$t('messageNotice.addSuccess'),
						type:'success'
					});
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
					this.$message({
						message:this.$t('messageNotice.deleteSuccess'),
						type:'success'
					});
						this.centerDialogVisible = false;
						this.queryDetails();
				})
			},
			queryConsultant() {
				var value = this.$route.params.value;
				if(value == 1 || value == 2){
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
					url: 'DeletedAdConsultant',
					data: {
						advertId: this.multipleSelection[0].advertId,
						id: this.multipleSelection[0].id,
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
					this.$message({
						message:this.$t('messageNotice.noDelete'),
						type:'warning'
					});
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
					this.$message({
						message:this.$t('messageNotice.noDelete'),
						type:'warning'
					});;
				} else {
					this.consultantTeam.splice(value, 1);
				}
			},
			getImg(res) {
				this.imageUrl = res.data;
			},
			imgError(){
				this.$message('上传错误')
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