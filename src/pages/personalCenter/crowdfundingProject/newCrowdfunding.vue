<template>
	<div class="newCrowdfunding">
		<h3>{{$t('projectNotic.newApplication')}}</h3>
		<p>{{$t('projectNotic.notic')}}</p>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('team.teamInfo')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamName')}}</label>
				<el-input :placeholder="$t('team.enterTeamName')" v-model="newCrowdfunding.teamName">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamPhone')}}</label>
				<el-input :placeholder="$t('team.enterTeamPhone')" v-model="newCrowdfunding.teamContact">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('team.teamAddress')}}</label>
				<el-input :placeholder="$t('team.enterTeamAddress')" v-model="newCrowdfunding.teamLocation">
				</el-input>
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
				<el-input :placeholder="$t('projectInfo.enterProjectName')" v-model="newCrowdfunding.proName">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('projectInfo.projectDesc')}}</label>
				<el-input :placeholder="$t('projectInfo.enterProjectDesc')" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="newCrowdfunding.proDesc">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li exec">
				<label>{{$t('projectInfo.concept')}}</label>
				<el-input v-model="conceptDatas">
				</el-input>
				<i class="el-icon-circle-plus example" @click="conceptFun"></i>
			</li>
			<li class="newCrowdfunding_item_li exec" >
				<label>{{$t('projectInfo.technology')}}</label>
				<el-input v-model="technologyDatas">
				</el-input>
				<i class="el-icon-circle-plus example" @click="technologyFun"></i>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('aboutLink.website')}}</label>
				<el-input :placeholder="$t('aboutLink.enterWebsite')" v-model="newCrowdfunding.website">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('aboutLink.whitePaper')}}</label>
				<el-input :placeholder="$t('aboutLink.enterWhitePaper')" v-model="newCrowdfunding.whitePaper">
				</el-input>
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
				<el-input :placeholder="$t('projectInfo.enterTechnology1')" v-model="newCrowdfunding.technology1">
				</el-input>
				<el-input :placeholder="$t('projectInfo.enterTechnology2')" v-model="newCrowdfunding.technology2">
				</el-input>
				<button class="right_now" style=";position:absolute;top: 278px;" @click="technologyFun">{{$t('buttonAll.confirm')}}</button>
			</div>
		</div>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('tokenInfo.token')}}</h5>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.english')}}</label>
				<el-input :placeholder="$t('tokenInfo.enterEnglish')" v-model="newCrowdfunding.shotEnName">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.chinese')}}</label>
				<el-input :placeholder="$t('tokenInfo.enterChinese')" v-model="newCrowdfunding.shotCnName">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>{{$t('tokenInfo.englishName')}}</label>
				<el-input :placeholder="$t('tokenInfo.enterFullEnglish')" v-model="newCrowdfunding.fullEnName">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>logo</label>
				<el-upload class="avatar-uploader" :show-file-list="false" action="" :on-change="getImg"  :auto-upload="false">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>本轮众筹标题</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.title">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>发行总量</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.circulation">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>众筹总量</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.totalCrowdfund">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>本轮次发行量</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.currCirculation">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>众筹价格</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.price">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>单账号兑换限制</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.mostNumber">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>目标货币</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.targetCurrency">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>发行硬顶</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.topLimit">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>发行软顶</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.lowLimit">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>本轮众筹时间</label>
				<div>
					<el-date-picker v-model="timeInterval" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>合规性文件</h5>
			<li class="newCrowdfunding_item_li">
				<label>相关牌照</label>
				<div>
					<el-upload class="upload-demo" action="" :on-change="getFile" :auto-upload="false" :on-remove="handleRemove" multiple>
						<el-button size="small" type="primary">上传</el-button>
					</el-upload>
				</div>
			</li>
		</ul>
		<button @click="submit">提交</button>
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
				console.log(this.checkedData);
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
					console.log(res);
					if(res.success == 1) {
						this.$message('添加成功');
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
				console.log(value)
				var length = this.coreTeam.length;
				if(length <= 1) {
					alert("不要删了o，再删就没有了")
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
					alert("不要删了o，再删就没有了")
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
				console.log(file)
				this.imageUrl = file.url;
			},
			beforeAvatarUpload(file) { //头像文件限制
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				console.log("beforeAvatarUpload:", file, isJPG, isLt2M)
				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
					return false;
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
					return false;
				}
				return isJPG && isLt2M;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			getFile(file) {
				console.log(file);
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