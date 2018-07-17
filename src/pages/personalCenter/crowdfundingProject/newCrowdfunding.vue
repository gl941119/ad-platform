<template>
	<div class="newCrowdfunding">
		<span class="title">{{$t('projectNotic.newApplication')}}</span>
		<span class="title_info">{{$t('projectNotic.notic')}}</span>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('team.teamInfo')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamName')}}</label>
				<input :placeholder="$t('team.enterTeamName')" v-model="newCrowdfunding.teamName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamPhone')}}</label>
				<input :placeholder="$t('team.enterTeamPhone')" v-model="newCrowdfunding.teamContact" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamAddress')}}</label>
				<input :placeholder="$t('team.enterTeamAddress')" v-model="newCrowdfunding.teamLocation" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.coreMember')}}</label>
				<div class="newCrowdfunding_item_li_coreTeamMembers">
					<div v-for="(person,index) in coreTeam" :key="index" class="newCrowdfunding_item_li_coreTeamMembers_member">
						<el-aside style="width:35px;height:138px;line-height:138px;text-align:center;background:rgba(245,245,245,1);border-radius:4px 0px 0px 4px;">
							1
						</el-aside>
						<div class="newCrowdfunding_item_li_coreTeamMembers_member_info">
							<ol class="newCrowdfunding_item_li_coreTeamMembers_member_info_item">
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>{{$t('team.name')}}</label>
									<el-input :placeholder="$t('team.enterName')" v-model="coreTeam[index].name">
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>{{$t('team.title')}}</label>
									<el-input :placeholder="$t('team.enterTitle')" v-model="coreTeam[index].title">
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>{{$t('team.desc')}}</label>
									<el-input :placeholder="$t('team.enterDesc')" v-model="coreTeam[index].desc">
									</el-input>
								</li>
								<div style="display: flex;flex-direction: column;">
									<i @click="addCore" style="margin: 10px 0;" class="custom-element-icon-jia-copy"></i>
									<i @click="deletedCore(index)" class="custom-element-icon-jian1"></i>
								</div>
							</ol>
						</div>
					</div>
				</div>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.coreMember')}}</label>
				<div class="newCrowdfunding_item_li_coreTeamMembers">
					<div v-for="(person,index) in consultantTeam" :key="index" class="newCrowdfunding_item_li_coreTeamMembers_member">
						<el-aside style="width:35px;height:138px;line-height:138px;text-align:center;background:rgba(245,245,245,1);border-radius:4px 0px 0px 4px;">
							1
						</el-aside>
						<div class="newCrowdfunding_item_li_coreTeamMembers_member_info">
							<ol class="newCrowdfunding_item_li_coreTeamMembers_member_info_item">
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>{{$t('team.name')}}</label>
									<el-input :placeholder="$t('team.enterName')" v-model="consultantTeam[index].name">
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>{{$t('team.title')}}</label>
									<el-input :placeholder="$t('team.enterTitle')" v-model="consultantTeam[index].title">
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>{{$t('team.desc')}}</label>
									<el-input :placeholder="$t('team.enterDesc')" v-model="consultantTeam[index].desc">
									</el-input>
								</li>
								<div style="display: flex;flex-direction: column;">
									<i @click="addConsultant" style="margin: 10px 0;" class="custom-element-icon-jia-copy"></i>
									<i @click="deletedConsultant(index)" class="custom-element-icon-jian1"></i>
								</div>
							</ol>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('projectInfo.info')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('projectInfo.projectName')}}</label>
				<input class="langer" :placeholder="$t('projectInfo.enterProjectName')" v-model="newCrowdfunding.proName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('projectInfo.projectDesc')}}</label>
				<div class="textarea">
					<el-input :placeholder="$t('projectInfo.enterProjectDesc')" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="newCrowdfunding.proDesc">
					</el-input>
				</div>
			</li>
			<li class="newCrowdfunding_item_li exec">
				<label>{{$t('projectInfo.concept')}}</label>
				<input class="langer" v-model="conceptDatas" />
				<i class="custom-element-icon-jia-copy example" @click="conceptFun"></i>
			</li>
			<li class="newCrowdfunding_item_li exec" >
				<label>{{$t('projectInfo.technology')}}</label>
				<input class="langer" v-model="technologyDatas" />
				<i class="custom-element-icon-jia-copy example" @click="technologyFun"></i>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('aboutLink.website')}}</label>
				<input class="langer" :placeholder="$t('aboutLink.enterWebsite')" v-model="newCrowdfunding.website" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('aboutLink.whitePaper')}}</label>
				<input class="langer" :placeholder="$t('aboutLink.enterWhitePaper')" v-model="newCrowdfunding.whitePaper" />
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
					<el-input :placeholder="$t('projectInfo.enterTechnology1')" v-model="newCrowdfunding.technology1">
					</el-input>
				</div>
				<div class="technology">
					<el-input :placeholder="$t('projectInfo.enterTechnology2')" v-model="newCrowdfunding.technology2">
					</el-input>
				</div>
				<button class="confirm" @click="technologyFun">{{$t('buttonAll.confirm')}}</button>
			</div>
		</div>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('tokenInfo.token')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.english')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterEnglish')" v-model="newCrowdfunding.shotEnName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.chinese')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterChinese')" v-model="newCrowdfunding.shotCnName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.englishName')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterFullEnglish')" v-model="newCrowdfunding.fullEnName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>logo</label>
				<el-upload class="avatar-uploader" :show-file-list="false" action="" :on-change="getImg"  :auto-upload="false">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.title')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterTitle')" v-model="newCrowdfunding.title" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.issueTotal')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterIssueTotal')" v-model="newCrowdfunding.circulation" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.total')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterTotal')" v-model="newCrowdfunding.totalCrowdfund" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.thisIssue')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterThisIssue')" v-model="newCrowdfunding.currCirculation" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.price')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterPrice')" v-model="newCrowdfunding.price" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.limit')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterLimit')" v-model="newCrowdfunding.mostNumber" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.money')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterMoney')" v-model="newCrowdfunding.targetCurrency" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.topLimit')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterTopLimit')" v-model="newCrowdfunding.topLimit" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.lowLimit')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterLowLimit')" v-model="newCrowdfunding.lowLimit" />
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.dataTime')}}</label>
				<div>
					<el-date-picker v-model="timeInterval" type="datetimerange" :range-separator="$t('tokenInfo.to')" :start-placeholder="$t('tokenInfo.startTime')" :end-placeholder="$t('tokenInfo.endTime')">
					</el-date-picker>
				</div>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('tokenInfo.files')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.about')}}</label>
				<div>
					<el-upload class="upload-demo" action="" :on-change="getFile" :auto-upload="false" :on-remove="handleRemove" multiple>
						<el-button size="small" type="primary">{{$t('tokenInfo.upload')}}</el-button>
					</el-upload>
				</div>
			</li>
		</ul>
		<div class="submit_box">
			<button class="submit" @click="submit">{{$t('buttonAll.submits')}}</button>
		</div>
	</div>
</template>

<script>
	import conceptCom from '@/components/personal-com/concept';
	import Request from '../../../utils/require.js';
	import Utils from '../../../utils/util.js';
	import Cache from '../../../utils/cache';
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
				newCrowdfunding: {
					accountId: this.$store.state.id || Cache.getSession('bier_userid'), //用户id
					teamName: "", //团队名称
					teamContact: "", //团队联系方式
					teamLocation: "", //团队所在地
					proName: "", //项目名称
					proDesc: "", //项目简介
					concept1Id: '', //概念1 id
					concept2Id: '', //概念2 id
					concept3Id: '', //概念3 id
					concept4Id: '', //概念4 id
					technology1: "", //技术1
					technology2: "", //技术2
					website: "", //官网
					whitePaper: "", //白皮书地址
					shotEnName: "", //英文简写
					shotCnName: "", //中文简写
					fullEnName: "", //英文全名
					title: "", //众筹标题
					circulation: '', //发行总量
					totalCrowdfund: '', //众筹总量
					currCirculation: '', //本轮发行量
					mostNumber: '', //单账号 最大购买数量
					price: "", //众筹价格
					targetCurrency: "", //目标货币
					topLimit: '', //发行上限
					lowLimit: '', //发行下限
					license: "", //相关牌照
				},
				checkedData: [],
				concept: false,
				technology: false,
				fileUrl: '', //相关牌照地址
				imageUrl: '', //logo地址
				timeInterval: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
				fileList: [],
				util: new Utils(),
				conceptDatas: '',
				technologyDatas: '',
			}
		},
		components: {
			conceptCom,
		},
		methods: {
			submit() {
				var startTime = this.util.format(this.timeInterval[0], 'yyyy-MM-dd HH:mm:ss');
				var endTime = this.util.format(this.timeInterval[1], 'yyyy-MM-dd HH:mm:ss');
				if(this.checkedData[0]){
					var concept1Id = this.checkedData[0].conceptId;
				}
				if(this.checkedData[1]){
					var concept2Id = this.checkedData[1].conceptId;
				}
				if(this.checkedData[2]){
					var concept3Id = this.checkedData[2].conceptId;
				}
				if(this.checkedData[3]){
					var concept4Id = this.checkedData[3].conceptId;
				}
				Request({
					url: 'QueryNewCrowdfunding',
					data: {
						accountId: this.newCrowdfunding.accountId,
						teamName: this.newCrowdfunding.teamName,
						teamContact: this.newCrowdfunding.teamContact,
						teamLocation: this.newCrowdfunding.teamLocation,
						proName: this.newCrowdfunding.proName,
						proDesc: this.newCrowdfunding.proDesc,
						concept1Id: concept1Id,
						concept2Id: concept2Id,
						concept3Id: concept3Id,
						concept4Id: concept4Id,
						technology1: this.newCrowdfunding.technology1,
						technology2: this.newCrowdfunding.technology2,
						website: this.newCrowdfunding.website,
						whitePaper: this.newCrowdfunding.whitePaper,
						shotEnName: this.newCrowdfunding.shotEnName,
						shotCnName: this.newCrowdfunding.shotCnName,
						fullEnName: this.newCrowdfunding.fullEnName,
						title: this.newCrowdfunding.title,
						logo: this.imageUrl,
						circulation: this.newCrowdfunding.circulation,
						totalCrowdfund: this.newCrowdfunding.totalCrowdfund,
						currCirculation: this.newCrowdfunding.currCirculation,
						mostNumber: this.newCrowdfunding.mostNumber,
						price: this.newCrowdfunding.price,
						mostNumber: this.newCrowdfunding.mostNumber,
						targetCurrency: this.newCrowdfunding.targetCurrency,
						topLimit: this.newCrowdfunding.topLimit,
						lowLimit: this.newCrowdfunding.lowLimit,
						startTime: startTime,
						endTime: endTime,
						license: this.fileUrl,
						crowdTeamMembers: this.coreTeam,
						crowdTeamConsultants: this.consultantTeam
					},
					type: 'post',
					flag: true
				}).then(res => {
					if(res.success == 1) {
						this.$message(this.$t('messageNotice.addSuccess'));
					}
				})
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
			},
			getImg(file) {
				this.imageUrl = file.url;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			getFile(file) {
				this.fileUrl = file.url;
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