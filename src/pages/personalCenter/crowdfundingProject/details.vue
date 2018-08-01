<template>
	<div class="newCrowdfunding">
		<ul class="newCrowdfunding_item">
			<h5>{{$t('team.teamInfo')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamName')}}</label>
				<input :disabled="disabled" :class="[errors.has('contactsName')?'llo':'']" :data-vv-as="$t('team.emptyTeamName')" v-validate data-vv-rules="required|max:80" name="teamName" v-model="details.teamName" />
				<span class="is-danger" v-show="errors.has('teamName')">{{ errors.first('teamName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamPhone')}}</label>
				<input :disabled="disabled" :class="[errors.has('teamContact')?'llo':'']" :data-vv-as="$t('team.emptyTeamPhone')" v-validate data-vv-rules="required|max:36" name="teamContact" v-model="details.teamContact" />
				<span class="is-danger" v-show="errors.has('teamContact')">{{ errors.first('teamContact') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamAddress')}}</label>
				<input :disabled="disabled" :class="[errors.has('teamLocation')?'llo':'']" :data-vv-as="$t('team.emptyTeamAddress')" v-validate data-vv-rules="required|max:512" name="teamLocation" v-model="details.teamLocation" />
				<span class="is-danger" v-show="errors.has('teamLocation')">{{ errors.first('teamLocation') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.coreMember')}}</label>
				<el-button type="text" @click="queryCore">{{$t('team.openCoreMember')}}</el-button>
			</li>
			<div class="newCrowdfunding_item_li">
				<el-dialog :title="$t('team.coreMember')" :visible.sync="centerDialogVisible" size="small">
					<el-table :data="coreTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column property="year" align="center" :label="$t('team.name')">
							<template slot-scope="scope">
								<input class="team" :disabled="disabled" :class="[errors.has('coreName')?'llo':'']" :data-vv-as="$t('team.enterName')" v-validate data-vv-rules="required|max:32" name="coreName" v-model="scope.row.name" />
							</template>
						</el-table-column>
						<el-table-column property="name" align="center" :label="$t('team.title')" width="200">
							<template slot-scope="scope">
								<input class="team" :disabled="disabled" :class="[errors.has('coreTitle')?'llo':'']" :data-vv-as="$t('team.enterTitle')" v-validate data-vv-rules="required|max:16" name="coreTitle" v-model="scope.row.title" />
							</template>
						</el-table-column>
						<el-table-column property="address" align="center" :label="$t('team.desc')">
							<template slot-scope="scope">
								<input class="team" :disabled="disabled" :class="[errors.has('coreDesc')?'llo':'']" :data-vv-as="$t('team.enterDesc')" v-validate data-vv-rules="required|max:512" name="coreDesc" v-model="scope.row.desc" />
							</template>
						</el-table-column>
						<el-table-column v-if="!disabled" property="address" align="center" :label="$t('team.operating')">
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
					<div slot="footer" v-if="!disabled" class="dialog-footer">
						<el-button @click="saveLink">{{$t('buttonAll.save')}}</el-button>
						<el-button @click="addLink">{{$t('buttonAll.add')}}</el-button>
						<el-button @click="deletedLink">{{$t('buttonAll.delete')}}</el-button>
					</div>
					<div slot="footer" v-if="disabled" class="dialog-footer">
						<el-button @click="centerDialogVisible = false">{{$t('buttonAll.confirm')}}</el-button>
					</div>
				</el-dialog>
			</div>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.consultant')}}</label>
				<el-button type="text" @click="queryConsultant">{{$t('team.openConsultant')}}</el-button>
			</li>
			<div class="newCrowdfunding_item_li">
				<el-dialog :title="$t('team.consultant')" :visible.sync="CrowdTeamDialogVisible" size="small">
					<el-table :data="consultantTeam" border class="tForm" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column property="year" align="center" :label="$t('team.name')">
							<template slot-scope="scope">
								<input class="team" :disabled="disabled" :class="[errors.has('consultantName')?'llo':'']" :data-vv-as="$t('team.enterName')" v-validate data-vv-rules="required|max:32" name="consultantName" v-model="scope.row.name" />
							</template>
						</el-table-column>
						<el-table-column property="name" align="center" :label="$t('team.title')" width="200">
							<template slot-scope="scope">
								<input  class="team" :disabled="disabled" :class="[errors.has('consultantTitle')?'llo':'']" :data-vv-as="$t('team.enterTitle')" v-validate data-vv-rules="required|max:16" name="consultantTitle" v-model="scope.row.title" />
							</template>
						</el-table-column>
						<el-table-column property="address" align="center" :label="$t('team.desc')">
							<template slot-scope="scope">
								<input  class="team" :disabled="disabled" :class="[errors.has('consultantDesc')?'llo':'']" :data-vv-as="$t('team.enterDesc')" v-validate data-vv-rules="required|max:100" name="consultantDesc" v-model="scope.row.desc" />
							</template>
						</el-table-column>
						<el-table-column v-if="!disabled" property="address" align="center" :label="$t('team.operating')">
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
					<div slot="footer" v-if="!disabled" class="dialog-footer">
						<el-button @click="saveLinkConsultant">{{$t('buttonAll.save')}}</el-button>
						<el-button @click="addLinkConsultant">{{$t('buttonAll.add')}}</el-button>
						<el-button @click="deletedLinkConsultant">{{$t('buttonAll.delete')}}</el-button>
					</div>
					<div slot="footer" v-if="disabled" class="dialog-footer">
						<el-button @click="CrowdTeamDialogVisible = false">{{$t('buttonAll.confirm')}}</el-button>
					</div>
				</el-dialog>
			</div>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5 >{{$t('projectInfo.info')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('projectInfo.projectName')}}</label>
				<input class="langer" :class="[errors.has('proName')?'llo':'']" :data-vv-as="$t('projectInfo.emptyProjectName')" v-validate data-vv-rules="required|max:32" name="proName" :disabled="disabled" v-model="details.proName" />
				<span class="is-danger" v-show="errors.has('proName')">{{ errors.first('proName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('projectInfo.projectDesc')}}</label>
				<div class="textarea">
					<el-input @blur="desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :disabled="disabled" v-model="details.proDesc" >
					</el-input>
				</div>
				<span class="is-danger" v-if="proDescr">{{$t('projectInfo.emptyProjectDesc')}}</span>
			</li>
			<li class="newCrowdfunding_item_li exec">
				<label >{{$t('projectInfo.concept')}}</label>
				<input class="langer" v-model="conceptDatas" :disabled="disabled" />
				<i v-if="!disabled" class="custom-element-icon-jia-copy example" @click="conceptFun"></i>
			</li>
			<li class="newCrowdfunding_item_li exec">
				<label >{{$t('projectInfo.technology')}}</label>
				<input class="langer" v-model="technologyDatas" :disabled="disabled" />
				<i v-if="!disabled" class="custom-element-icon-jia-copy example" @click="technologyFun"></i>
			</li>
			<li class="newCrowdfunding_item_li">
				<label >{{$t('aboutLink.website')}}</label>
				<input class="langer" :class="[errors.has('website')?'llo':'']" :data-vv-as="$t('aboutLink.emptyWebsite')" v-validate="{ required: true, regex: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/}" name="website" :disabled="disabled" v-model="details.website" />
				<span class="is-danger" v-show="errors.has('website')">{{ errors.first('website') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label >{{$t('aboutLink.whitePaper')}}</label>
				<input class="langer" :class="[errors.has('whitePaper')?'llo':'']" :data-vv-as="$t('aboutLink.emptyWhitePaper')" v-validate="{ required: true, regex: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/}" name="whitePaper" :disabled="disabled" v-model="details.whitePaper" />
				<span class="is-danger" v-show="errors.has('whitePaper')">{{ errors.first('whitePaper') }}</span>
			</li>
		</ul>
		<!--概念-->
		<div v-if="concept" class="withdraw">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="conceptFun"><i class="el-icon-close"></i></span>
				<div>
					<conceptCom :id="conceptId" @listenCondept="listenCondept"></conceptCom>
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
				<div class="button-box">
					<button class="confirm" @click="technologyFun">{{$t('buttonAll.confirm')}}</button>
				</div>
			</div>
		</div>
		<ul class="newCrowdfunding_item">
			<h5 >{{$t('tokenInfo.token')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.english')}}</label>
				<input class="langer" :class="[errors.has('shotEnName')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyEnglish')" v-validate data-vv-rules="required|max:8" name="shotEnName" :disabled="disabled" v-model="details.shotEnName" />
				<span class="is-danger" v-show="errors.has('shotEnName')">{{ errors.first('shotEnName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.chinese')}}</label>
				<input class="langer" :disabled="disabled" v-model="details.shotCnName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.englishName')}}</label>
				<input class="langer" :class="[errors.has('fullEnName')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyFullEnglish')" v-validate data-vv-rules="required|max:18" name="fullEnName" :disabled="disabled" v-model="details.fullEnName" />
				<span class="is-danger" v-show="errors.has('fullEnName')">{{ errors.first('fullEnName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.logo')}}</label>
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
				<label>{{$t('tokenInfo.title')}}</label>
				<input class="langer" :class="[errors.has('title')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyTitle')" v-validate data-vv-rules="required|max:18" name="title" :disabled="disabled" v-model="details.title" />
				<span class="is-danger" v-show="errors.has('title')">{{ errors.first('title') }}</span>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.issueTotal')}}</label>
				<input class="langer" :class="[errors.has('circulation')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyIssueTotal')" v-validate data-vv-rules="required|numeric|max:10" name="circulation" :disabled="disabled" v-model="details.circulation" />
				<span class="is-danger" v-show="errors.has('circulation')">{{ errors.first('circulation') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.total')}}</label>
				<input class="langer" :class="[errors.has('totalCrowdfund')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyTotal')" v-validate data-vv-rules="required|numeric|max:10" name="totalCrowdfund" :disabled="disabled" v-model="details.totalCrowdfund" />
				<span class="is-danger" v-show="errors.has('totalCrowdfund')">{{ errors.first('totalCrowdfund') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label >{{$t('tokenInfo.thisIssue')}}</label>
				<input class="langer" :class="[errors.has('currCirculation')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyThisIssue')" v-validate data-vv-rules="required|numeric|max:10" name="currCirculation" :disabled="disabled" v-model="details.currCirculation" />
				<span class="is-danger" v-show="errors.has('currCirculation')">{{ errors.first('currCirculation') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.price')}}</label>
				<input class="langer" :class="[errors.has('price')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyPrice')" v-validate data-vv-rules="required|numeric|max:10" name="price" :disabled="disabled" v-model="details.price" />
				<span class="is-danger" v-show="errors.has('price')">{{ errors.first('price') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.limit')}}</label>
				<input class="langer" :class="[errors.has('mostNumber')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyLimit')" v-validate data-vv-rules="required|numeric|max:10" name="mostNumber" :disabled="disabled" v-model="details.mostNumber" />
				<span class="is-danger" v-show="errors.has('mostNumber')">{{ errors.first('mostNumber') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.money')}}</label>
				<input class="langer" :class="[errors.has('targetCurrency')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyMoney')" v-validate data-vv-rules="required|max:20" name="targetCurrency" :disabled="disabled" v-model="details.targetCurrency" />
				<span class="is-danger" v-show="errors.has('targetCurrency')">{{ errors.first('targetCurrency') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.topLimit')}}</label>
				<input class="langer" :class="[errors.has('topLimit')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyTopLimit')" v-validate data-vv-rules="required|numeric|max:10" name="topLimit" :disabled="disabled" v-model="details.topLimit" />
				<span class="is-danger" v-show="errors.has('topLimit')">{{ errors.first('topLimit') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.lowLimit')}}</label>
				<input class="langer" :class="[errors.has('lowLimit')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyLowLimit')" v-validate data-vv-rules="required|numeric|max:10" name="lowLimit" :disabled="disabled" v-model="details.lowLimit" />
				<span class="is-danger" v-show="errors.has('lowLimit')">{{ errors.first('lowLimit') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.dataTime')}}</label>
				<div v-if="disabled">
					<span>{{details.startTime | cal}}</span> ~ <span>{{details.endTime |cal }}</span>
				</div>
				<div v-if="!disabled" >
					<el-date-picker v-model="timeInterval" 
						type="datetimerange" 
						:picker-options="pickerTime"
						:range-separator="$t('tokenInfo.to')" 
						:start-placeholder="$t('tokenInfo.startTime')" 
						:end-placeholder="$t('tokenInfo.endTime')">
					</el-date-picker>
				</div>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('tokenInfo.files')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.companyName')}}</label>
				<input class="langer" :disabled="disabled" :class="[errors.has('companyName')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyCompanyName')" v-validate data-vv-rules="required|max:20" name="companyName" :placeholder="$t('tokenInfo.enterCompanyName')" v-model="details.companyName" />
				<span class="is-danger" v-show="errors.has('companyName')">{{ errors.first('companyName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.companycode')}}</label>
				<input class="langer" :disabled="disabled" :class="[errors.has('companyCode')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyCompanycode')" v-validate data-vv-rules="required|max:20" name="companyCode" :placeholder="$t('tokenInfo.enterCompanycode')" v-model="details.companyCode" />
				<span class="is-danger" v-show="errors.has('companyCode')">{{ errors.first('companyCode') }}</span>
			</li>
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
						 multiple>
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
				conceptData:[],
				technology: false,
				conceptDatas: '',
				conceptId:[],
				technologyDatas: '',
				checkeData: [],
				util: new Utils(),
				isCheck:'',
				pickerTime: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				uploadImg: Config.UploadImg,
				requestToken: {
					token:
                        this.$store.state.token ||
                        Cache.getSession('bier_token')
				},
				params:{
					fileType:'2'
				},
				proDescr:false,//项目简介提示
			};
		},
		components: {
			conceptCom,
		},
		mounted() {
			this.queryDetails();
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
				this.queryDetails();
			}
		},
		methods: {
			concepts() {
				Request({
					url: 'QueryConcept',
					type: 'get'
				}).then(res => {
					this.lightConcept(res.data);
				})
			},
			lightConcept(data){
				var concept = [];
				data.forEach((item, index) => {
					item.isSelected = false;
					let flag = this.conceptId.find(id => item.id == id);
					if(flag){
						concept.push(item.name);
					}
				});
				this.conceptDatas = concept.join('-');
			},
			queryDetails() {
				var id = this.$route.params.id;
				var value = this.$route.params.value;
				this.isCheck = value;
				switch(value){
					case '0':
						this.disabled = true;//不允许修改
						break;
					case '1':
						this.disabled = true;
						break;
					case '2':
						this.disabled = false;
						break;
				}
				Request({
					url: 'QueryCrowdfundingDetails',
					data: {
						id: id
					},
					type: 'get',
				}).then(res => {
					this.details = res.data;
					var concept = [];
					if(res.data.concept1Id){
						concept.push(res.data.concept1Id);
					}
					if(res.data.concept2Id){
						concept.push(res.data.concept2Id);
					}
					if(res.data.concept3Id){
						concept.push(res.data.concept3Id);
					}
					if(res.data.concept4Id){
						concept.push(res.data.concept4Id);
					}
					this.conceptId = concept;
					this.concepts();
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
			desc(){//项目简介
				if(!this.details.proDesc || this.details.proDesc.length>512){
					this.proDescr = true;
				}else{
					this.proDescr = false;
				}
			},
			changeDetails() {
				if(this.checkeData.length>0){
					if(this.checkeData[0]){
						var concept1Id = this.checkeData[0].conceptId || this.checkeData[0].id;
					}
					if(this.checkeData[1]){
						var concept2Id = this.checkeData[1].conceptId || this.checkeData[1].id;
					}
					if(this.checkeData[2]){
						var concept3Id = this.checkeData[2].conceptId || this.checkeData[2].id;
					}
					if(this.checkeData[3]){
						var concept4Id = this.checkeData[3].conceptId || this.checkeData[3].id;
					}
				}else{
					var concept1Id = this.conceptId[0];
					var concept2Id = this.conceptId[1];
					var concept3Id = this.conceptId[2];
					var concept4Id = this.conceptId[3];
				}
				var startTime = this.util.dateFormat(this.timeInterval[0], 'time');
				var endTime = this.util.dateFormat(this.timeInterval[1], 'time');
				this.$validator.validateAll().then((result) => {
					if(result){
						this.desc();
						Request({
							url: 'ChangeCrowdfundingDetails',
							data: {
								accountId: this.details.accountId,
								circulation: this.details.circulation,
								concept1Id: concept1Id,
								concept2Id: concept2Id,
								concept3Id: concept3Id,
								concept4Id: concept4Id,
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
								whitePaper: this.details.whitePaper,
								companyCode:this.details.companyCode,
								companyName:this.details.companyName,
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
					}
				});
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
				this.$validator.validateAll().then((result) => {
					if(result){
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
					}
				});
			},
			addLink() {
				var id = this.$route.params.id;
				this.$validator.validateAll().then((result) => {
					if(result){
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
					}
				});
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
				this.$validator.validateAll().then((result) => {
					if(result){
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
					}
				});
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
				this.$validator.validateAll().then((result) => {
					if(result){
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
					}
				});
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