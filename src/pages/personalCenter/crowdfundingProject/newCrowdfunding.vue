<template>
	<div class="newCrowdfunding" @keyup="addCache">
		<span class="title">{{$t('projectNotic.newApplication')}}</span>
		<span class="title_info">{{$t('projectNotic.notic')}}</span>
		<ul class="newCrowdfunding_item">
			<h5>{{$t('team.teamInfo')}}</h5>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('team.teamName')}}</label>
				<input :placeholder="$t('team.enterTeamName')" :class="[errors.has('teamName')?'llo':'']" :data-vv-as="$t('team.emptyTeamName')" v-validate data-vv-rules="required|max:80" name="teamName" v-model="newCrowdfunding.teamName" />
				<span class="is-danger" v-show="errors.has('teamName')">{{ errors.first('teamName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('team.teamPhone')}}</label>
				<input :placeholder="$t('team.enterTeamPhone')" :class="[errors.has('teamContact')?'llo':'']" :data-vv-as="$t('team.emptyTeamPhone')" v-validate data-vv-rules="required|max:64" name="teamContact" v-model="newCrowdfunding.teamContact" />
				<span class="is-danger" v-show="errors.has('teamContact')">{{ errors.first('teamContact') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('team.teamAddress')}}</label>
				<input :placeholder="$t('team.enterTeamAddress')" :class="[errors.has('teamLocation')?'llo':'']" :data-vv-as="$t('team.emptyTeamAddress')" v-validate data-vv-rules="required|max:128" name="teamLocation" v-model="newCrowdfunding.teamLocation" />
				<span class="is-danger" v-show="errors.has('teamLocation')">{{ errors.first('teamLocation') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('team.coreMember')}}</label>
				<div class="newCrowdfunding_item_li_coreTeamMembers">
					<div v-for="(person,index) in coreTeam" :key="index" class="newCrowdfunding_item_li_coreTeamMembers_member">
						<el-aside style="width:35px;height:150px;line-height:150px;text-align:center;background:rgba(245,245,245,1);border-radius:4px 0px 0px 4px;">
							{{index+1}}
						</el-aside>
						<div class="newCrowdfunding_item_li_coreTeamMembers_member_info">
							<ol class="newCrowdfunding_item_li_coreTeamMembers_member_info_item">
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>{{$t('team.name')}}</label>
									<input class="mini" :class="[errors.has('coreName')?'llo':'']" :data-vv-as="$t('team.emptyName')" v-validate data-vv-rules="required|max:64" name="coreName" :placeholder="$t('team.enterName')" v-model="coreTeam[index].name"/>
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>{{$t('team.title')}}</label>
									<input class="mini" :class="[errors.has('coreTitle')?'llo':'']" :data-vv-as="$t('team.emptyTitle')" v-validate data-vv-rules="required|max:64" name="coreTitle" :placeholder="$t('team.enterTitle')" v-model="coreTeam[index].title" />
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li last">
									<label>{{$t('team.desc')}}</label>
									<input class="desc" :class="[errors.has('coreDesc')?'llo':'']" :data-vv-as="$t('team.emptyDesc')" v-validate data-vv-rules="required|max:200" name="coreDesc" :placeholder="$t('team.enterDesc')" v-model="coreTeam[index].desc" />
								</li>
								<div style="display: flex;flex-direction: column;">
									<i @click="addCore" style="margin: 10px 0;" class="custom-element-icon-jia-copy"></i>
									<i @click="deletedCore(index)" class="custom-element-icon-jian1"></i>
								</div>
							</ol>
						</div>
					</div>
				</div>
				<div style="display: inline-block;float: left;">
					<span class="is-danger" v-show="errors.has('coreName')">{{ errors.first('coreName') }}</span>
					<span class="is-danger" v-show="errors.has('coreTitle')">{{ errors.first('coreTitle') }}</span>
					<span class="is-danger" v-show="errors.has('coreDesc')">{{ errors.first('coreDesc') }}</span>
				</div>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('team.consultant')}}</label>
				<div class="newCrowdfunding_item_li_coreTeamMembers">
					<div v-for="(person,index) in consultantTeam" :key="index" class="newCrowdfunding_item_li_coreTeamMembers_member">
						<el-aside style="width:35px;height:150px;line-height:150px;text-align:center;background:rgba(245,245,245,1);border-radius:4px 0px 0px 4px;">
							{{index+1}}
						</el-aside>
						<div class="newCrowdfunding_item_li_coreTeamMembers_member_info">
							<ol class="newCrowdfunding_item_li_coreTeamMembers_member_info_item">
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>{{$t('team.name')}}</label>
									<input class="mini" :class="[errors.has('consultantName')?'llo':'']" :data-vv-as="$t('team.emptyName')" v-validate data-vv-rules="required|max:64" name="consultantName" :placeholder="$t('team.enterName')" v-model="consultantTeam[index].name" />
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li">
									<label>{{$t('team.title')}}</label>
									<input class="mini" :class="[errors.has('consultantTitle')?'llo':'']" :data-vv-as="$t('team.emptyTitle')" v-validate data-vv-rules="required|max:64" name="consultantTitle" :placeholder="$t('team.enterTitle')" v-model="consultantTeam[index].title" />
								</li>
								<li class="newCrowdfunding_item_li_coreTeamMembers_member_info_item_li last">
									<label>{{$t('team.desc')}}</label>
									<input class="desc" :class="[errors.has('consultantDesc')?'llo':'']" :data-vv-as="$t('team.emptyDesc')" v-validate data-vv-rules="required|max:200" name="consultantDesc" :placeholder="$t('team.enterDesc')" v-model="consultantTeam[index].desc" />
								</li>
								<div style="display: flex;flex-direction: column;">
									<i @click="addConsultant" style="margin: 10px 0;" class="custom-element-icon-jia-copy"></i>
									<i @click="deletedConsultant(index)" class="custom-element-icon-jian1"></i>
								</div>
							</ol>
						</div>
					</div>
				</div>
				<div style="display: inline-block;float: left;">
					<span class="is-danger" v-show="errors.has('consultantName')">{{ errors.first('consultantName') }}</span>
					<span class="is-danger" v-show="errors.has('consultantTitle')">{{ errors.first('consultantTitle') }}</span>
					<span class="is-danger" v-show="errors.has('consultantDesc')">{{ errors.first('consultantDesc') }}</span>
				</div>
			</li>
		</ul>
        <!-- 项目情况 -->
		<ul class="newCrowdfunding_item">
			<h5>{{$t('projectInfo.info')}}</h5>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('projectInfo.projectName')}}</label>
				<input class="langer" :class="[errors.has('proName')?'llo':'']" :data-vv-as="$t('projectInfo.emptyProjectName')" v-validate data-vv-rules="required|max:64" name="proName" :placeholder="$t('projectInfo.enterProjectName')" v-model="newCrowdfunding.proName" />
				<span class="is-danger" v-show="errors.has('proName')">{{ errors.first('proName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('projectInfo.projectDesc')}}</label>
				<div class="textarea">
					<el-input :placeholder="$t('projectInfo.enterProjectDesc')" @blur="proDesc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="newCrowdfunding.proDesc">
					</el-input>
					<!--<textarea :placeholder="$t('projectInfo.enterProjectDesc')" rows="2" cols="50" type="textarea" v-model="newCrowdfunding.proDesc">
					</textarea>-->
				</div>
				<span class="is-danger" v-if="proDescr">{{$t('projectInfo.emptyProjectDesc')}}</span>
			</li>
			<li class="newCrowdfunding_item_li exec">
				<span class="require" style="color: #FFFFFF;">*</span><label>{{$t('projectInfo.concept')}}</label>
				<input class="langer" v-model="conceptDatas" />
				<i class="custom-element-icon-jia-copy example" @click="conceptFun"></i>
			</li>
			<li class="newCrowdfunding_item_li exec" >
				<span class="require" style="color: #FFFFFF;">*</span><label>{{$t('projectInfo.technology')}}</label>
				<input class="langer" v-model="technologyDatas" />
				<i class="custom-element-icon-jia-copy example" @click="technologyFun"></i>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('aboutLink.website')}}</label>
				<input class="langer" :class="[errors.has('website')?'llo':'']" :data-vv-as="$t('aboutLink.emptyWebsite')" v-validate="{ required: true, regex: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/}" name="website" :placeholder="$t('aboutLink.enterWebsite')" v-model="newCrowdfunding.website" />
				<span class="is-danger" v-show="errors.has('website')">{{ errors.first('website') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('aboutLink.whitePaper')}}</label>
				<input class="langer" :class="[errors.has('whitePaper')?'llo':'']" :data-vv-as="$t('aboutLink.emptyWhitePaper')" v-validate="{ required: true, regex: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/}" name="whitePaper" :placeholder="$t('aboutLink.enterWhitePaper')" v-model="newCrowdfunding.whitePaper" />
				<span class="is-danger" v-show="errors.has('whitePaper')">{{ errors.first('whitePaper') }}</span>
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
				<div class="button-box">
					<button class="confirm" @click="technologyFun">{{$t('buttonAll.confirm')}}</button>
				</div>
			</div>
		</div>
        <!-- 代币发行 -->
		<ul class="newCrowdfunding_item">
			<h5>{{$t('tokenInfo.token')}}</h5>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.english')}}</label>
				<input class="langer" :class="[errors.has('shotEnName')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyEnglish')" v-validate data-vv-rules="required|max:8" name="shotEnName" :placeholder="$t('tokenInfo.enterEnglish')" v-model="newCrowdfunding.shotEnName" />
				<span class="is-danger" v-show="errors.has('shotEnName')">{{ errors.first('shotEnName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require" style="color: #FFFFFF;">*</span><label>{{$t('tokenInfo.chinese')}}</label>
				<input class="langer" :placeholder="$t('tokenInfo.enterChinese')" v-model="newCrowdfunding.shotCnName" />
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.englishName')}}</label>
				<input class="langer" :class="[errors.has('fullEnName')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyFullEnglish')" v-validate data-vv-rules="required|max:64" name="fullEnName" :placeholder="$t('tokenInfo.enterFullEnglish')" v-model="newCrowdfunding.fullEnName" />
				<span class="is-danger" v-show="errors.has('fullEnName')">{{ errors.first('fullEnName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.logo')}}</label>
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
				<span class="is-danger" v-if="img">{{$t('tokenInfo.emptyLogo')}}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.title')}}</label>
				<input class="langer" :class="[errors.has('title')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyTitle')" v-validate data-vv-rules="required|max:18" name="title" :placeholder="$t('tokenInfo.enterTitle')" v-model="newCrowdfunding.title" />
				<span class="is-danger" v-show="errors.has('title')">{{ errors.first('title') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.issueTotal')}}</label>
				<input class="langer" :class="[errors.has('circulation')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyIssueTotal')" v-validate data-vv-rules="required|numeric|max:10" name="circulation" :placeholder="$t('tokenInfo.enterIssueTotal')" v-model="newCrowdfunding.circulation" />
				<span class="is-danger" v-show="errors.has('circulation')">{{ errors.first('circulation') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.total')}}</label>
				<input class="langer" :class="[errors.has('totalCrowdfund')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyTotal')" v-validate data-vv-rules="required|numeric|max:10" name="totalCrowdfund" :placeholder="$t('tokenInfo.enterTotal')" v-model="newCrowdfunding.totalCrowdfund" />
				<span class="is-danger" v-show="errors.has('totalCrowdfund')">{{ errors.first('totalCrowdfund') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.thisIssue')}}</label>
				<input class="langer" :class="[errors.has('currCirculation')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyThisIssue')" v-validate data-vv-rules="required|numeric|max:10" name="currCirculation" :placeholder="$t('tokenInfo.enterThisIssue')" v-model="newCrowdfunding.currCirculation" />
				<span class="is-danger" v-show="errors.has('currCirculation')">{{ errors.first('currCirculation') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.price')}}</label>
				<input class="langer" :class="[errors.has('price')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyPrice')" v-validate data-vv-rules="required|numeric|max:10" name="price" :placeholder="$t('tokenInfo.enterPrice')" v-model="newCrowdfunding.price" />
				<span class="is-danger" v-show="errors.has('price')">{{ errors.first('price') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.limit')}}</label>
				<input class="langer" :class="[errors.has('mostNumber')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyLimit')" v-validate data-vv-rules="required|numeric|max:10" name="mostNumber" :placeholder="$t('tokenInfo.enterLimit')" v-model="newCrowdfunding.mostNumber" />
				<span class="is-danger" v-show="errors.has('mostNumber')">{{ errors.first('mostNumber') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.money')}}</label>
				<input class="langer" :class="[errors.has('targetCurrency')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyMoney')" v-validate data-vv-rules="required|max:20" name="targetCurrency" :placeholder="$t('tokenInfo.enterMoney')" v-model="newCrowdfunding.targetCurrency" />
				<span class="is-danger" v-show="errors.has('targetCurrency')">{{ errors.first('targetCurrency') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.topLimit')}}</label>
				<input class="langer" :class="[errors.has('topLimit')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyTopLimit')" v-validate data-vv-rules="required|numeric|max:10" name="topLimit" :placeholder="$t('tokenInfo.enterTopLimit')" v-model="newCrowdfunding.topLimit" />
				<span class="is-danger" v-show="errors.has('topLimit')">{{ errors.first('topLimit') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.dataTime')}}</label>
				<div>
					<el-date-picker v-model="timeInterval" 
						type="datetimerange" 
						@blur="data"
						:picker-options="pickerTime"
						:range-separator="$t('tokenInfo.to')" 
						:start-placeholder="$t('tokenInfo.startTime')" 
						:end-placeholder="$t('tokenInfo.endTime')">
					</el-date-picker>
				</div>
				<span class="is-danger" v-if="isData">{{$t('tokenInfo.emptyDadataTime')}}</span>
			</li>
		</ul>
        <!-- 合规性文件 -->
		<ul class="newCrowdfunding_item">
			<h5>{{$t('tokenInfo.files')}}</h5>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.companyName')}}</label>
				<input class="langer" :class="[errors.has('companyName')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyCompanyName')" v-validate data-vv-rules="required|max:64" name="companyName" :placeholder="$t('tokenInfo.enterCompanyName')" v-model="newCrowdfunding.companyName" />
				<span class="is-danger" v-show="errors.has('companyName')">{{ errors.first('companyName') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.companycode')}}</label>
				<input class="langer" :class="[errors.has('companyCode')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyCompanycode')" v-validate data-vv-rules="required|max:20" name="companyCode" :placeholder="$t('tokenInfo.enterCompanycode')" v-model="newCrowdfunding.companyCode" />
				<span class="is-danger" v-show="errors.has('companyCode')">{{ errors.first('companyCode') }}</span>
			</li>
			<li class="newCrowdfunding_item_li">
				<span class="require">*</span><label>{{$t('tokenInfo.about')}}</label>
				<div>
					<el-upload class="upload-demo" 
						:action="uploadImg" 
						:on-success="getFile" 
						:on-error="imgError"
						:data="params"
						:headers="requestToken"
						:limit="1"
						accept=".jpg,.png,.pdf"
                        :file-list="companyFileList"
						:on-remove="handleRemove" multiple>
						<el-button size="small" type="primary">{{$t('tokenInfo.upload')}}</el-button>
					</el-upload>
				</div>
				<span class="is-danger" v-if="fileEmpty">{{$t('tokenInfo.emptyAbout')}}</span>
			</li>
		</ul>
		<input class="checkbox" :class="[errors.has('statement')?'llo':'']" :data-vv-as="$t('tokenInfo.emptyStatement')" v-validate data-vv-rules="required" name="statement" type='checkbox'><span class="statement"><span class="disclaimer" @click="disclaimer">{{$t('crowdFunding.financing')}}</span></span>
		<span class="is-danger" v-show="errors.has('statement')">{{ errors.first('statement') }}</span>
		<div class="submit_box">
			<button class="submit" @click="submit">{{$t('buttonAll.submits')}}</button>
		</div>
	</div>
</template>

<script src="./new-crowdfunding.js"></script>

<style lang="scss" scoped>
	@import '../../../assets/css/global.scss';
	@import '../../../assets/css/variable.scss';
	@import '../../../assets/css/withdraw.scss';
	@import '../../../assets/css/newProjectDetails.scss';
	@import '../../../assets/css/upload.css';
	.last{
		width: 350px;
	}
</style>