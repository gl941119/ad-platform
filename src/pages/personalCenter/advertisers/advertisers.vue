<template>
	<div class="newCrowdfunding">
		<span class="title">{{$t('projectNotic.title')}}</span>
		<span class="title_info">{{$t('projectNotic.notic')}}</span>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('team.teamInfo')}}</h5>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('team.teamName')}}</label>
				<input :class="[errors.has('teamName')?'llo':'']" :data-vv-as="$t('team.emptyTeamName')" v-validate data-vv-rules="required|max:80" name="teamName" :placeholder="$t('team.enterTeamName')" :disabled="disabled"  v-model="newCrowdfunding.teamName" />
				<span class="is-danger" v-show="errors.has('teamName')">{{ errors.first('teamName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('team.teamPhone')}}</label>
				<input :class="[errors.has('teamContact')?'llo':'']" :data-vv-as="$t('team.emptyTeamPhone')" v-validate data-vv-rules="required|max:36" name="teamContact" :placeholder="$t('team.enterTeamPhone')" :disabled="disabled" v-model="newCrowdfunding.teamContact" />
				<span class="is-danger" v-show="errors.has('teamContact')">{{ errors.first('teamContact') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('team.teamAddress')}}</label>
				<input :class="[errors.has('teamLocation')?'llo':'']" :data-vv-as="$t('team.emptyTeamAddress')" v-validate data-vv-rules="required|max:100" name="teamLocation" :placeholder="$t('team.enterTeamAddress')" :disabled="disabled" v-model="newCrowdfunding.teamLocation" />
				<span class="is-danger" v-show="errors.has('teamLocation')">{{ errors.first('teamLocation') }}</span>
			</li>
			<li class="newCrowdfunding_item_li coreMembers">
				<span class="require">*</span><label>{{$t('team.coreMember')}}</label>
				<el-button type="text" @click="queryCore">{{$t('team.openCoreMember')}}</el-button>
				<span class="is-danger" v-if="coreTeams">{{$t('team.emptyCore')}}</span>
			</li>
			<div class="newCrowdfunding_item_li">
				<el-dialog :title="$t('team.coreMember')" :visible.sync="centerDialogVisible" size="small">
					<el-table :data="coreTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column property="year" align="center" :label="$t('team.name')">
							<template slot-scope="scope">
								<input class="team" :class="[errors.has('coreName')?'llo':'']" :data-vv-as="$t('team.emptyName')" v-validate data-vv-rules="required|max:32" name="coreName" :placeholder="$t('team.enterName')" v-model="scope.row.name" />
							</template>
						</el-table-column>
						<el-table-column property="name" align="center" :label="$t('team.title')" width="200">
							<template slot-scope="scope">
								<input class="team" :class="[errors.has('coreTitle')?'llo':'']" :data-vv-as="$t('team.emptyTitle')" v-validate data-vv-rules="required|max:16" name="coreTitle" :placeholder="$t('team.enterTitle')" v-model="scope.row.title" />
							</template>
						</el-table-column>
						<el-table-column property="address" align="center" :label="$t('team.desc')">
							<template slot-scope="scope">
								<input class="team" :class="[errors.has('coreDesc')?'llo':'']" :data-vv-as="$t('team.emptyDesc')" v-validate data-vv-rules="required|max:512" name="coreDesc" :placeholder="$t('team.enterDesc')" v-model="scope.row.desc" />
							</template>
						</el-table-column>
						<el-table-column v-if="isCheck != 1 && isCheck != 3" property="address" align="center" :label="$t('team.operating')">
							<template slot-scope="scope">
								<i @click="addCore" class="custom-element-icon-jia-copy"></i>
								<i @click="deletedCore(scope.$index)" class="custom-element-icon-jian1"></i>
							</template>
						</el-table-column>
					</el-table>
					<div style="display: inline-block;float: left;">
						<span class="is-danger teamDanger" v-show="errors.has('coreName')">{{ errors.first('coreName') }}</span>
						<span class="is-danger teamDanger" v-show="errors.has('coreTitle')">{{ errors.first('coreTitle') }}</span>
						<span class="is-danger teamDanger" v-show="errors.has('coreDesc')">{{ errors.first('coreDesc') }}</span>
					</div>
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
				<span class="require">*</span><label>{{$t('team.consultant')}}</label>
				<el-button type="text" @click="queryConsultant">{{$t('team.openConsultant')}}</el-button>
				<span class="is-danger" v-if="consultantTeams">{{$t('team.emptyConsultant')}}</span>
			</li>
			<div class="newCrowdfunding_item_li">
				<el-dialog :title="$t('team.consultant')" :visible.sync="CrowdTeamDialogVisible" size="small">
					<el-table :data="consultantTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column property="year" align="center" :label="$t('team.name')">
							<template slot-scope="scope">
								<input class="team" :disabled="disabled" :class="[errors.has('consultantName')?'llo':'']" :data-vv-as="$t('team.enterName')" v-validate data-vv-rules="required|max:32" name="consultantName" :placeholder="$t('team.enterName')" v-model="scope.row.name">
							</template>
						</el-table-column>
						<el-table-column property="name" align="center" :label="$t('team.title')" width="200">
							<template slot-scope="scope">
								<input class="team" :disabled="disabled" :class="[errors.has('consultantTitle')?'llo':'']" :data-vv-as="$t('team.enterTitle')" v-validate data-vv-rules="required|max:16" name="consultantTitle" :placeholder="$t('team.enterTitle')" v-model="scope.row.title">
							</template>
						</el-table-column>
						<el-table-column property="address" align="center" :label="$t('team.desc')">
							<template slot-scope="scope">
								<input class="team" :disabled="disabled" :class="[errors.has('consultantDesc')?'llo':'']" :data-vv-as="$t('team.enterDesc')" v-validate data-vv-rules="required|max:512" name="consultantDesc" :placeholder="$t('team.enterDesc')" v-model="scope.row.desc">
							</template>
						</el-table-column>
						<el-table-column v-if="isCheck != 1 && isCheck != 3" property="address" align="center" :label="$t('team.operating')">
							<template slot-scope="scope">
								<i @click="addConsultant" class="custom-element-icon-jia-copy"></i>
								<i @click="deletedConsultant(scope.$index)" class="custom-element-icon-jian1"></i>
							</template>
						</el-table-column>
					</el-table>
					<div style="display: inline-block;float: left;">
						<span class="is-danger teamDanger" v-show="errors.has('consultantName')">{{ errors.first('consultantName') }}</span>
						<span class="is-danger teamDanger" v-show="errors.has('consultantTitle')">{{ errors.first('consultantTitle') }}</span>
						<span class="is-danger teamDanger" v-show="errors.has('consultantDesc')">{{ errors.first('consultantDesc') }}</span>
					</div>
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
				<span class="require">*</span><label>{{$t('projectInfo.projectName')}}</label>
				<input class="langer" :class="[errors.has('proName')?'llo':'']" :data-vv-as="$t('projectInfo.emptyProjectName')" v-validate data-vv-rules="required|max:18" name="proName" :placeholder="$t('projectInfo.enterProjectName')" :disabled="disabled" v-model="newCrowdfunding.proName" />
				<span class="is-danger" v-show="errors.has('proName')">{{ errors.first('proName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('projectInfo.projectDesc')}}</label>
				<div class="textarea">
					<el-input @blur="desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="$t('projectInfo.enterProjectDesc')" :disabled="disabled" v-model="newCrowdfunding.proDesc" >
					</el-input>
				</div>
				<span class="is-danger" v-if="proDescr">{{$t('projectInfo.emptyProjectDesc')}}</span>
			</li>
			<li class="newCrowdfunding_item_li exec">
				<span class="require" style="color: #FFFFFF;">*</span><label>{{$t('projectInfo.concept')}}</label>
				<input class="langer" v-model="conceptDatas" :disabled="disabled" />
				<i v-if="isCheck != 1 && isCheck != 3" class="custom-element-icon-jia-copy example" @click="conceptFun"></i>
			</li>
			<li class="newCrowdfunding_item_li exec">
				<span class="require" style="color: #FFFFFF;">*</span><label>{{$t('projectInfo.technology')}}</label>
				<input class="langer" v-model="technologyDatas" :disabled="disabled" />
				<i v-if="isCheck != 1 && isCheck != 3" class="custom-element-icon-jia-copy example" @click="technologyFun"></i>
			</li>
		</ul>
		<!--概念-->
		<div v-if="concept" class="withdraw">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="conceptFun"><i class="el-icon-close"></i></span>
				<div>
					<conceptCom :id = "conceptId" @listenCondept="listenCondept"></conceptCom>
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
				<div class="button-box">
					<button class="confirm" @click="technologyFun">{{$t('buttonAll.confirm')}}</button>
				</div>
			</div>
		</div>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('tokenInfo.tokenIntro')}}</h5>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.english')}}</label>
				<input class="langer" :class="[errors.has('shotEnName')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyEnglish')" v-validate data-vv-rules="required|max:8" name="shotEnName" :placeholder="$t('tokenInfo.enterEnglish')" :disabled="disabled" v-model="newCrowdfunding.shotEnName" />
				<span class="is-danger" v-show="errors.has('shotEnName')">{{ errors.first('shotEnName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require" style="color: #FFFFFF;">*</span><label>{{$t('tokenInfo.chinese')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterChinese')" :disabled="disabled" v-model="newCrowdfunding.shotCnName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.englishName')}}</label>
				<input class="langer" :class="[errors.has('fullEnName')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyFullEnglish')" v-validate data-vv-rules="required|max:18" name="fullEnName" :placeholder="$t('tokenInfo.enterFullEnglish')" :disabled="disabled" v-model="newCrowdfunding.fullEnName" />
				<span class="is-danger" v-show="errors.has('fullEnName')">{{ errors.first('fullEnName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.logo')}}</label>
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
				<span class="is-danger" v-if="img">{{$t('tokenInfo.emptyLogo')}}</span>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('aboutLink.linkInfo')}}</h5>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('aboutLink.website')}}</label>
				<input class="langer" :class="[errors.has('website')?'llo':'']" :data-vv-as="$t('aboutLink.emptyWebsite')" v-validate="{ required: true, regex: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/}" name="website" :placeholder="$t('aboutLink.enterWebsite')" :disabled="disabled" v-model="newCrowdfunding.website" />
				<span class="is-danger" v-show="errors.has('website')">{{ errors.first('website') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('aboutLink.whitePaper')}}</label>
				<input class="langer" :class="[errors.has('whitePaper')?'llo':'']" :data-vv-as="$t('aboutLink.emptyWhitePaper')" v-validate="{ required: true, regex: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/}" name="whitePaper" :placeholder="$t('aboutLink.enterWhitePaper')" :disabled="disabled" v-model="newCrowdfunding.whitePaper" />
				<span class="is-danger" v-show="errors.has('whitePaper')">{{ errors.first('whitePaper') }}</span>
			</li>
			<li style="position: relative;">
				<div class="newCrowdfunding_item_li" v-for="(item, index) in websites" :key="index">
					<span class="require" style="color: #FFFFFF;">*</span><label class="label">
						<input :placeholder="$t('aboutLink.enterWebsiteName')" :disabled="disabled" v-model="websites[index].websiteName" >
					</label>
					<input class="langer" :class="[errors.has('websiteAddress')?'llo':'']" :data-vv-as="$t('aboutLink.emptyWhitePaper')" v-validate.continues="{ required: false, regex: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/}" name="websiteAddress"  :placeholder="$t('aboutLink.enterWebsiteAddress')" :disabled="disabled" v-model="websites[index].websiteAddress" />
				</div>
				<span class="is-danger" v-show="errors.has('websiteAddress')">{{ errors.first('websiteAddress') }}</span>
			</li>
		</ul>
		<div v-if="value == -1" >
			<input class="checkbox" :class="[errors.has('statement')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyStatement')" v-validate data-vv-rules="required" name="statement" type='checkbox'><span class="statement">
			<span class="disclaimer" @click="disclaimer">{{$t('crowdFunding.disclaimer')}}</span></span>
			<span class="is-danger" v-show="errors.has('statement')">{{ errors.first('statement') }}</span>
		</div>
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
				conceptId:[],
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
				proDescr:false,//项目简介提示
				img:false,//logo提示
				coreTeams:false,//核心团队是否为空
				consultantTeams:false,//顾问团队是否为空
				isAddress:false,
				isAddressOne:false,
				isAddressTwo:false,
				isAddressThree:false,
				isAddressFour:false,
				isAddressFive:false,
				isAddressSix:false,
				isAddressSeven:false,
			}
		},
		components: {
			conceptCom,
		},
		mounted(){
			this.isDetails();
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
		watch: {
			slangChange(val, oldval) {
				this.isDetails();
			}
		},
		methods: {
			disclaimer(){//免责声明
				this.$router.push({
					name:'advertisersDisclaimer',
				})
			},
			isDetails(){
				var value = this.$route.params.value;
				this.isCheck = value;
				switch(value){
					case '0':
						this.queryDetails();
						break;
					case '1':
						this.queryDetails();
						this.disabled = true;//不允许修改
						break;
					case '2':
						this.queryDetails();
						break;
					case '3':
						this.queryDetails();
						this.disabled = true;//不允许修改
						break;
				}
			},
			desc(){//项目简介
				if(!this.newCrowdfunding.proDesc || this.newCrowdfunding.proDesc.length>512){
					this.proDescr = true;
				}else{
					this.proDescr = false;
				}
			},
			submit() {
				this.$validator.validateAll().then((result) => {
					this.desc();
					if(!this.imageUrl){
						this.img = true;
					}
					var that = this;
					this.coreTeam.forEach(function(item, index){
						var arr = Object.keys(item);
						if(arr.length <= 0){
							that.coreTeams = true;
						}else{
							that.coreTeams = false;
						}
					})
					this.consultantTeam.forEach(function(item, index){
						var arr = Object.keys(item);
						if(arr.length <= 0){
							that.consultantTeams = true;
						}else{
							that.consultantTeams = false;
						}
					})
					if(result){
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
							this.$router.push({
								name: 'adserving',
							});
						})
					}
				});
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
				this.$validator.validateAll().then((result) => {
					this.desc();
					if(result){
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
							this.$router.push({
								name: 'adserving',
							});
							this.$message({
								message:this.$t('messageNotice.changeSuccess'),
								type:'success'
							});
						})
					}
				});
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
					var concept = [];
					if(res.data.conceptResultList){
						res.data.conceptResultList.forEach(function(item,index){
							arr.push(item.name);
							concept.push(item.conceptId);
						})
					}
					this.conceptResultList = res.data.conceptResultList;
					this.conceptDatas = arr.join('-');
					this.conceptId = concept;
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
				this.$validator.validateAll().then((result) => {
					if(result){
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
					}
				});
			},
			addLink() {
				this.$validator.validateAll().then((result) => {
					if(result){
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
					}
				});
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
				this.$validator.validateAll().then((result) => {
					if(result){
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
					}
				});
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
				this.$validator.validateAll().then((result) => {
					if(result){
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
					}
				});
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
				this.img = false;
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