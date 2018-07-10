<template>
	<div class="newCrowdfunding">
		<h3>项目内容</h3>
		<p>请尽可能详细得填写相关资料，以便投资委员会合理地评估贵项目（评估期间双方都应严格遵守保密义务）</p>
		<ul class="newCrowdfunding_item">
			<h5>团队</h5>
			<li class="newCrowdfunding_item_li">
				<label>团队名称</label>
				<el-input placeholder="请输入内容" v-model="newCrowdfunding.teamName">
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
				<div class="newCrowdfunding_item_li_coreTeamMembers">
					<div v-for="(person,index) in coreTeam" :key="index" class="newCrowdfunding_item_li_coreTeamMembers_member">
						<el-aside style="width:35px;height:138px;line-height:138px;text-align:center;background:rgba(245,245,245,1);border-radius:4px 0px 0px 4px;">
							1
						</el-aside>
						<div class="newCrowdfunding_item_li_coreTeamMembers_member_info">
							<ol class="newCrowdfunding_item_li_coreTeamMembers_member_info_item">
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>全名</label>
									<el-input placeholder="请输入内容" v-model="coreTeam[index].name">
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>头衔</label>
									<el-input placeholder="请输入内容" v-model="coreTeam[index].title">
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>简介</label>
									<el-input placeholder="请输入内容" v-model="coreTeam[index].desc">
									</el-input>
								</li>
								<div style="display: flex;flex-direction: column;">
									<button style="margin: 10px 0;border-radius: 5px;" @click="addCore">添加</button>
									<button @click="deletedCore(index)">删除</button>
								</div>
							</ol>
						</div>
					</div>
				</div>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>顾问团队</label>
				<div class="newCrowdfunding_item_li_coreTeamMembers">
					<div v-for="(person,index) in consultantTeam" :key="index" class="newCrowdfunding_item_li_coreTeamMembers_member">
						<el-aside style="width:35px;height:138px;line-height:138px;text-align:center;background:rgba(245,245,245,1);border-radius:4px 0px 0px 4px;">
							1
						</el-aside>
						<div class="newCrowdfunding_item_li_coreTeamMembers_member_info">
							<ol class="newCrowdfunding_item_li_coreTeamMembers_member_info_item">
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>全名</label>
									<el-input placeholder="请输入内容" v-model="consultantTeam[index].name">
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>头衔</label>
									<el-input placeholder="请输入内容" v-model="consultantTeam[index].title">
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>简介</label>
									<el-input placeholder="请输入内容" v-model="consultantTeam[index].desc">
									</el-input>
								</li>
								<div style="display: flex;flex-direction: column;">
									<button style="margin: 10px 0;" @click="addConsultant">添加</button>
									<button @click="deletedConsultant(index)">删除</button>
								</div>
							</ol>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<!--<el-dialog :title="项目情况" :close-on-click-modal="false" :visible.sync="registerModel.registerVisible" width="360px">
            <el-form class="register"  ref="registerModelForm" :rules="registerModel.rule">
                <el-form-item label="项目名称"
                              prop="email"
                              :label-width="registerModel.formLabelWidth">
                </el-form-item>
                <el-form-item label="项目简介"
                              prop="verifyCode"
                              class="register-verify"
                              :label-width="registerModel.formLabelWidth">
                </el-form-item>
                <el-form-item label="概念"
                              prop="password"
                              :label-width="registerModel.formLabelWidth">
                </el-form-item>
                <el-form-item label="技术"
                              prop="passwordAgain"
                              :label-width="registerModel.formLabelWidth">
                </el-form-item>
                <div class="register-foot">
                    <el-button type="default"
                            size="small"
                            class="register-foot-btn"
                            round
                            @click="registerSubmit">注 册</el-button>
                </div>
            </el-form>
        </el-dialog>-->
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
			<li class="newCrowdfunding_item_li">
				<label><el-input placeholder="自定义站点名" v-model="newCrowdfunding.siteName1" >
				</el-input></label>
				<el-input placeholder="自定义站点地址" v-model="newCrowdfunding.siteAddress1">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label><el-input placeholder="自定义站点名" v-model="newCrowdfunding.siteName2" >
				</el-input></label>
				<el-input placeholder="自定义站点地址" v-model="newCrowdfunding.siteAddress2">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label><el-input placeholder="自定义站点名" v-model="newCrowdfunding.siteName3" >
				</el-input></label>
				<el-input placeholder="自定义站点地址" v-model="newCrowdfunding.siteAddress3">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label><el-input placeholder="自定义站点名" v-model="newCrowdfunding.siteName4" >
				</el-input></label>
				<el-input placeholder="自定义站点地址" v-model="newCrowdfunding.siteAddress4">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label><el-input placeholder="自定义站点名" v-model="newCrowdfunding.siteName5" >
				</el-input></label>
				<el-input placeholder="自定义站点地址" v-model="newCrowdfunding.siteAddress5">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label><el-input placeholder="自定义站点名" v-model="newCrowdfunding.siteName6" >
				</el-input></label>
				<el-input placeholder="自定义站点地址" v-model="newCrowdfunding.siteAddress6">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label><el-input placeholder="自定义站点名" v-model="newCrowdfunding.siteName7" >
				</el-input></label>
				<el-input placeholder="自定义站点地址" v-model="newCrowdfunding.siteAddress7">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label><el-input placeholder="自定义站点名" v-model="newCrowdfunding.siteName8" >
				</el-input></label>
				<el-input placeholder="自定义站点地址" v-model="newCrowdfunding.siteAddress8">
				</el-input>
			</li>
		</ul>
		<button @click="submit">提交</button>
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
					siteName1: '', //自定义站点名
					siteAddress1: '', //自定义站点地址
					siteName2: '',
					siteAddress2: '',
					siteName3: '', //自定义站点名
					siteAddress3: '',
					siteName4: '', //自定义站点名
					siteAddress4: '',
					siteName5: '', //自定义站点名
					siteAddress5: '',
					siteName6: '', //自定义站点名
					siteAddress6: '',
					siteName7: '', //自定义站点名
					siteAddress7: '',
					siteName8: '', //自定义站点名
					siteAddress8: '',
				},
				checkedData: [],
				concept: false,
				technology: false,
				imageUrl: '', //logo地址
				conceptDatas: '',
				technologyDatas: '',
			}
		},
		components: {
			conceptCom,
		},
		methods: {
			submit() {
				if(this.checkedData[0]){
					var concept1Id = this.checkedData[0].id;
				}
				if(this.checkedData[1]){
					var concept2Id = this.checkedData[1].id;
				}
				if(this.checkedData[2]){
					var concept3Id = this.checkedData[2].id;
				}
				if(this.checkedData[3]){
					var concept4Id = this.checkedData[3].id;
				}
				Request({
					url: 'QueryNewProject',
					data: {
						accountId: this.accountId,
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
						listMermber: this.coreTeam,
						listConsultants: this.consultantTeam,
						customAddress1: this.newCrowdfunding.siteName1,
						customWebsite1: this.newCrowdfunding.siteAddress1,
						customAddress2: this.newCrowdfunding.siteName2,
						customWebsite2: this.newCrowdfunding.siteAddress2,
						customAddress3: this.newCrowdfunding.siteName3,
						customWebsite3: this.newCrowdfunding.siteAddress3,
						customAddress4: this.newCrowdfunding.siteName4,
						customWebsite4: this.newCrowdfunding.siteAddress4,
						customAddress5: this.newCrowdfunding.siteName5,
						customWebsite5: this.newCrowdfunding.siteAddress5,
						customAddress6: this.newCrowdfunding.siteName6,
						customWebsite6: this.newCrowdfunding.siteAddress6,
						customAddress7: this.newCrowdfunding.siteName7,
						customWebsite7: this.newCrowdfunding.siteAddress7,
						customAddress8: this.newCrowdfunding.siteName8,
						customWebsite8: this.newCrowdfunding.siteAddress8,
					},
					type: 'post',
					flag: true,
				}).then(res => {
					console.log(res);
					if(res.success == 1) {
						this.$message('添加成功');
					} else if(res.data.success == 0) {
						this.$message('您已经存在广告，无法再次申请');
					}
				})
			},
			listenCondept(checkedData) {
				var newCheckedData = [];
				checkedData.forEach(function(item, index) {
					newCheckedData.push(item.value);
				})
				this.conceptDatas = newCheckedData.join('-');
				this.checkeData = checkedData;
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
			getImg(file) {
				console.log(file)
				this.imageUrl = file.url;
			},
			beforeAvatarUpload(file) { //头像文件限制
				//console.log("beforeAvatarUpload file:",file)
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