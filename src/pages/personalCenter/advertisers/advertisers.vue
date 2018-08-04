<template>
	<div class="newCrowdfunding" @keyup="addCache">
		<span class="title">{{$t('projectNotic.title')}}</span>
		<span class="title_info">{{$t('projectNotic.notic')}}</span>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('team.teamInfo')}}</h5>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('team.teamName')}}</label>
				<input :class="[errors.has('teamName')?'llo':'']" :data-vv-as="$t('team.emptyTeamName')" v-validate data-vv-rules="required|max:80" name="teamName" :placeholder="$t('team.enterTeamName')" :disabled="disabled" v-model="newCrowdfunding.teamName" />
				<span class="is-danger" v-show="errors.has('teamName')">{{ errors.first('teamName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('team.teamPhone')}}</label>
				<input :class="[errors.has('teamContact')?'llo':'']" :data-vv-as="$t('team.emptyTeamPhone')" v-validate data-vv-rules="required|max:64" name="teamContact" :placeholder="$t('team.enterTeamPhone')" :disabled="disabled" v-model="newCrowdfunding.teamContact" />
				<span class="is-danger" v-show="errors.has('teamContact')">{{ errors.first('teamContact') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('team.teamAddress')}}</label>
				<input :class="[errors.has('teamLocation')?'llo':'']" :data-vv-as="$t('team.emptyTeamAddress')" v-validate data-vv-rules="required|max:128" name="teamLocation" :placeholder="$t('team.enterTeamAddress')" :disabled="disabled" v-model="newCrowdfunding.teamLocation" />
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
								<input class="team" :class="[errors.has('coreName')?'llo':'']" :data-vv-as="$t('team.emptyName')" v-validate data-vv-rules="required|max:64" name="coreName" :placeholder="$t('team.enterName')" v-model="scope.row.name" />
							</template>
						</el-table-column>
						<el-table-column property="name" align="center" :label="$t('team.title')">
							<template slot-scope="scope">
								<input class="team" :class="[errors.has('coreTitle')?'llo':'']" :data-vv-as="$t('team.emptyTitle')" v-validate data-vv-rules="required|max:64" name="coreTitle" :placeholder="$t('team.enterTitle')" v-model="scope.row.title" />
							</template>
						</el-table-column>
						<el-table-column property="address" align="center" :label="$t('team.desc')">
							<template slot-scope="scope">
								<input class="team" :class="[errors.has('coreDesc')?'llo':'']" :data-vv-as="$t('team.emptyDesc')" v-validate data-vv-rules="required|max:200" name="coreDesc" :placeholder="$t('team.enterDesc')" v-model="scope.row.desc" />
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
								<input class="team" :disabled="disabled" :class="[errors.has('consultantName')?'llo':'']" :data-vv-as="$t('team.enterName')" v-validate data-vv-rules="required|max:64" name="consultantName" :placeholder="$t('team.enterName')" v-model="scope.row.name">
							</template>
						</el-table-column>
						<el-table-column property="name" align="center" :label="$t('team.title')">
							<template slot-scope="scope">
								<input class="team" :disabled="disabled" :class="[errors.has('consultantTitle')?'llo':'']" :data-vv-as="$t('team.enterTitle')" v-validate data-vv-rules="required|max:64" name="consultantTitle" :placeholder="$t('team.enterTitle')" v-model="scope.row.title">
							</template>
						</el-table-column>
						<el-table-column property="address" align="center" :label="$t('team.desc')">
							<template slot-scope="scope">
								<input class="team" :disabled="disabled" :class="[errors.has('consultantDesc')?'llo':'']" :data-vv-as="$t('team.enterDesc')" v-validate data-vv-rules="required|max:200" name="consultantDesc" :placeholder="$t('team.enterDesc')" v-model="scope.row.desc">
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
				<input class="langer" :class="[errors.has('proName')?'llo':'']" :data-vv-as="$t('projectInfo.emptyProjectName')" v-validate data-vv-rules="required|max:64" name="proName" :placeholder="$t('projectInfo.enterProjectName')" :disabled="disabled" v-model="newCrowdfunding.proName" />
				<span class="is-danger" v-show="errors.has('proName')">{{ errors.first('proName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('projectInfo.projectDesc')}}</label>
				<div class="textarea">
					<el-input @blur="desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="$t('projectInfo.enterProjectDesc')" :disabled="disabled" v-model="newCrowdfunding.proDesc">
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
					<conceptCom :id="conceptId" @listenCondept="listenCondept"></conceptCom>
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
				<input class="langer" :class="[errors.has('fullEnName')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyFullEnglish')" v-validate data-vv-rules="required|max:64" name="fullEnName" :placeholder="$t('tokenInfo.enterFullEnglish')" :disabled="disabled" v-model="newCrowdfunding.fullEnName" />
				<span class="is-danger" v-show="errors.has('fullEnName')">{{ errors.first('fullEnName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.logo')}}</label>
				<div v-if="isCheck == 0 || isCheck == 1 || isCheck == 3">
					<img :src="imageUrl" class="avatar">
				</div>
				<div v-else>
					<el-upload class="avatar-uploader" :show-file-list="false" :action="uploadImg" :headers="requestToken" :on-error="imgError" accept=".jpg,.png" :limit="1" :on-success="getImg">
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
						<input :class="[errors.has('websiteName')?'llo':'']" :data-vv-as="$t('aboutLink.chineseLimit')" v-validate.continues="{ required: false, regex: /^[0-9\u4e00-\u9fa5]+$/}" name="websiteName"  :placeholder="$t('aboutLink.enterWebsiteNameZh')" :disabled="disabled" v-model="websites[index].websiteName" >
					</label>
					<label class="label">
						<input :class="[errors.has('websiteEnName')?'llo':'']" :data-vv-as="$t('aboutLink.englishLimit')" v-validate.continues="{ required: false, regex: /^[A-Za-z0-9]+$/}" name="websiteEnName" :placeholder="$t('aboutLink.enterWebsiteNameEn')" :disabled="disabled" v-model="websites[index].websiteEnName" >
					</label>
					<input class="langer" :class="[errors.has('websiteAddress')?'llo':'']" :data-vv-as="$t('aboutLink.emptyAddress')" v-validate.continues="{ required: false, regex: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/}" name="websiteAddress" :placeholder="$t('aboutLink.enterWebsiteAddress')" :disabled="disabled" v-model="websites[index].websiteAddress" />
				</div>
				<span class="is-danger" v-show="errors.has('websiteName')">{{ errors.first('websiteName') }}</span>
				<span class="is-danger" v-show="errors.has('websiteEnName')">{{ errors.first('websiteEnName') }}</span>
				<span class="is-danger" v-show="errors.has('websiteAddress')">{{ errors.first('websiteAddress') }}</span>
				<span class="is-danger" v-if="isWebsiteName">{{$t('aboutLink.enterChineseName')}}</span>
				<span class="is-danger" v-if="isWebsiteEnName">{{$t('aboutLink.enterEnglishName')}}</span>
				<span class="is-danger" v-if="isWebsiteAddress">{{$t('aboutLink.enterAddress')}}</span>
			</li>
		</ul>
		<div v-if="isCheck == -1">
			<input class="checkbox" :class="[errors.has('statement')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyStatement')" v-validate data-vv-rules="required" name="statement" type='checkbox'><span class="statement">
			<span class="disclaimer" @click="disclaimer">{{$t('crowdFunding.publishingProtocol')}}</span></span>
			<span class="is-danger" v-show="errors.has('statement')">{{ errors.first('statement') }}</span>
		</div>
		<div class="submit_box">
			<button v-if="isCheck == -1" @click="submit" class="submit">{{$t('buttonAll.submits')}}</button>
			<button v-if="isCheck == 2" @click="saveSubmit" class="submit">{{$t('buttonAll.saveChange')}}</button>
		</div>
	</div>
</template>

<script src="./new-advertisers.js"></script>

<style lang="scss" scoped>
	@import '../../../assets/css/global.scss';
	@import '../../../assets/css/variable.scss';
	@import '../../../assets/css/withdraw.scss';
	@import '../../../assets/css/newProjectDetails.scss';
	@import '../../../assets/css/upload.css';
</style>