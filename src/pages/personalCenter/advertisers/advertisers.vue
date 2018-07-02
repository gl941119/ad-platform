<template>
	<div class="newCrowdfunding">
		<h3>众筹申请</h3>
		<p>请尽可能详细得填写相关资料，以便投资委员会合理地评估贵项目（评估期间双方都应严格遵守保密义务）</p>
		<ul class="newCrowdfunding_item">
			<h5>团队</h5>
			<li class="newCrowdfunding_item_li">
				<label>团队名称</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>团队联系方式</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>主要成员所在地</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li coreMembers">
				<label>核心团队成员</label>
				<div class="newCrowdfunding_item_li_coreTeamMembers">
					<div v-for="(person,index) in coreTeam" class="newCrowdfunding_item_li_coreTeamMembers_member">
						<el-aside style="width:35px;height:138px;line-height:138px;text-align:center;background:rgba(245,245,245,1);border-radius:4px 0px 0px 4px;">
							1
						</el-aside>
						<div class="newCrowdfunding_item_li_coreTeamMembers_member_info">
							<ol class="newCrowdfunding_item_li_coreTeamMembers_member_info_item">
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>全名</label>
									<el-input placeholder="请输入内容" v-model="coreTeam[index].name" clearable>
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>头衔</label>
									<el-input placeholder="请输入内容" v-model="coreTeam[index].dept" clearable>
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>简介</label>
									<el-input placeholder="请输入内容" v-model="coreTeam[index].intro" clearable>
									</el-input>
								</li>
								<div style="display: flex;flex-direction: column;">
									<button style="margin: 10px 0;" @click="addCore">添加</button>
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
					<div v-for="(person,index) in consultantTeam" class="newCrowdfunding_item_li_coreTeamMembers_member">
						<el-aside style="width:35px;height:138px;line-height:138px;text-align:center;background:rgba(245,245,245,1);border-radius:4px 0px 0px 4px;">
							1
						</el-aside>
						<div class="newCrowdfunding_item_li_coreTeamMembers_member_info">
							<ol class="newCrowdfunding_item_li_coreTeamMembers_member_info_item">
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>全名</label>
									<el-input placeholder="请输入内容" v-model="consultantTeam[index].name" clearable>
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>头衔</label>
									<el-input placeholder="请输入内容" v-model="consultantTeam[index].dept" clearable>
									</el-input>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>简介</label>
									<el-input placeholder="请输入内容" v-model="consultantTeam[index].intro" clearable>
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
		<ul class="newCrowdfunding_item">
			<h5>项目情况</h5>
			<li class="newCrowdfunding_item_li">
				<label>项目名称</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>项目简介</label>
				<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3">
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>概念</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
				<i class="el-icon-circle-plus" @click="conceptFun"></i>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>技术</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
				<i class="el-icon-circle-plus" @click="technologyFun"></i>
			</li>
		</ul>
		<!--概念-->
		<div v-if="concept" class="withdraw">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="conceptFun"><i class="el-icon-close"></i></span>
				<div>
					<conceptCom></conceptCom>
				</div>
			</div>
		</div>
		<!--技术-->
		<div v-if="technology" class="withdraw">
			<div class="withdraw_box">
				<span class="withdraw_box_back" @click="technologyFun"><i class="el-icon-close"></i></span>
				<el-input placeholder="请输入技术" v-model="input10" clearable>
				</el-input>
				<el-input placeholder="请输入技术" v-model="input10" clearable>
				</el-input>
				<button class="right_now" style=";position:absolute;top: 278px;">好的</button>
			</div>
		</div>
		<ul class="newCrowdfunding_item">
			<h5>代币信息</h5>
			<li class="newCrowdfunding_item_li">
				<label>英文简写</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>中文简写</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>英文全名</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>logo</label>
				<div class="">
					<!--<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>-->
					<el-upload class="avatar-uploader" list-type="picture-card" name="file" :show-file-list="false" action="#" :on-change="getLogo" :auto-upload="false" :on-preview="handlePictureCardPreview" :on-remove="handleRemoveLogo" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-if="!imageUrl" class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<!--:src="dialogImageUrl"-->
						<img width="50%" alt="">
					</el-dialog>
				</div>
			</li>
		</ul>
		<ul class="newCrowdfunding_item">
			<h5>相关链接</h5>
			<li class="newCrowdfunding_item_li">
				<label>官网</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label>白皮书地址</label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
			<li class="newCrowdfunding_item_li">
				<label><el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input></label>
				<el-input placeholder="请输入内容" v-model="input10" clearable>
				</el-input>
			</li>
		</ul>
	</div>
</template>

<script>
	import conceptCom from '@/components/personal-com/concept';
	export default {
		data() {
			return {
				coreTeam: [{}],
				consultantTeam: [{}],
				newCore: {
					name: '',
					dept: '',
					intro: '',
				},
				newConsultant: {
					name: '',
					dept: '',
					intro: '',
				},
				imageUrl: '',
				input10: '',
				textarea3: '',
				concept: false,
				technology: false,
				elements: ["111", "2222", "3333", '444444444', '4444444444', '33333333333333'],
				checked: ['111'],
				dialogVisible: false,
			}
		},
		components: {
            conceptCom,
        },
		methods: {
			addCore() { //核心团队
				var tmpPersions = this.coreTeam;
				tmpPersions.push(this.newCore);
				this.newCore = {};
				this.coreTeam = tmpPersions;
			},
			deletedCore(value) { //核心团队
				console.log(value)
				var length = this.coreTeam.length;
				if(length<=1){
					alert("不要删了o，再删就没有了")
				}else{
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
				if(length<=1){
					alert("不要删了o，再删就没有了")
				}else{
					this.consultantTeam.splice(value, 1);
				}
			},
			handleRemoveLogo(file, fileList) { //头像
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) { //头像
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			getLogo() {

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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../assets/css/global.scss';
	@import '../../../assets/css/variable.scss';
	@import '../../../assets/css/withdraw.scss';
	@import '../../../assets/css/newProjectDetails.scss';
</style>