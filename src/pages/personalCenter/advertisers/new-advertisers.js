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
				id: '',
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
			websites: [{}, {}, {}, {}, {}, {}, {}, {}],
			checkedData: [],
			concept: false,
			conceptId: [],
			technology: false,
			imageUrl: '', //logo地址
			conceptDatas: '',
			technologyDatas: '',
			centerDialogVisible: false,
			CrowdTeamDialogVisible: false,
			multipleSelection: [],
			conceptResultList: [],
			disabled: false,
			isCheck: '',
			uploadImg: Config.UploadImg,
			requestToken: {
				token: this.$store.state.token ||
					Cache.getSession('bier_token')
			},
			proDescr: false, //项目简介提示
			img: false, //logo提示
			coreTeams: false, //核心团队是否为空
			consultantTeams: false, //顾问团队是否为空
			isWebsiteName:false,
			isWebsiteEnName:false,
			isWebsiteAddress:false,
		}
	},
	components: {
		conceptCom,
	},
	mounted() {
		this.isDetails();
		this.displayCache();
	},
	computed: {
		slangChange() {
			var lang = this.$store.state.slangChange || this.$i18n.locale;
			if(lang == 'en') {
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
		// 增加缓存
        addCache() {
        	if(this.isCheck == -1){
        		// console.log('consultantTeam>', this.consultantTeam);
        		Cache.setSession('adCoreTeam', this.coreTeam);
        		Cache.setSession('adConsultantTeam', this.consultantTeam);
        		Cache.setSession('newAdvertisers', this.newCrowdfunding);
        		Cache.setSession('websitesData', this.websites);
        	}
        },
		disclaimer() { //免责声明
			this.$router.push({
				name: 'advertisersDisclaimer',
			})
		},
		isDetails() {
			var value = this.$route.params.value;
			this.isCheck = value;
			switch(value) {
				case '0':
					this.queryDetails();
					break;
				case '1':
					this.queryDetails();
					this.disabled = true; //不允许修改
					break;
				case '2':
					this.queryDetails();
					break;
				case '3':
					this.queryDetails();
					this.disabled = true; //不允许修改
					break;
			}
		},
		desc() { //项目简介
			if(!this.newCrowdfunding.proDesc || this.newCrowdfunding.proDesc.length > 512) {
				this.proDescr = true;
			} else {
				this.proDescr = false;
			}
		},
		submit() {
			this.$validator.validateAll().then((result) => {
				this.desc();
				if(!this.imageUrl) {
					this.img = true;
				}
				var that = this;
				this.coreTeam.forEach(function(item, index) {
					var arr = Object.keys(item);
					if(arr.length <= 0) {
						that.coreTeams = true;
					} else {
						that.coreTeams = false;
					}
				})
				this.consultantTeam.forEach(function(item, index) {
					var arr = Object.keys(item);
					if(arr.length <= 0) {
						that.consultantTeams = true;
					} else {
						that.consultantTeams = false;
					}
				})
				this.isWebsiteName = false;
				this.isWebsiteEnName = false;
				this.isWebsiteAddress = false;
				let web = this.websites;
				let arr=[];
				let num=[];
				for(let i=0,len=web.length;i<len;i++){
					if(web[i].websiteAddress&&web[i].websiteName&&web[i].websiteEnName){
						arr.push(web[i]);
						continue;
					}
					if(!(web[i].websiteAddress)&&!(web[i].websiteName)&&!(web[i].websiteEnName)){
						num.push(i);
						continue;
					}
					if(!(web[i].websiteName)){
						that.isWebsiteName = true;
					}
					if(!web[i].websiteEnName){
						that.isWebsiteEnName = true;
					}
					if(!web[i].websiteAddress){
						that.isWebsiteAddress = true;
					}
				}
				if(that.isWebsiteName || that.isWebsiteEnName || that.isWebsiteAddress){
					return;
				}
				if(result) {
					Request({
						url: 'QueryNewProject',
						data: {
							accountId: this.newCrowdfunding.accountId,
							teamName: this.newCrowdfunding.teamName,
							teamContact: this.newCrowdfunding.teamContact,
							teamLocation: this.newCrowdfunding.teamLocation,
							proName: this.newCrowdfunding.proName,
							proDesc: this.newCrowdfunding.proDesc,
							listConceptManage: this.checkedData || this.conceptResultList,
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
							websites: arr,
						},
						type: 'post',
						flag: true,
					}).then(res => {
						this.$message({
							message: this.$t('messageNotice.addSuccess'),
							type: 'success'
						});
						this.clearCache();
						this.$router.push({
							name: 'adserving',
						});
					})
				}
			});
		},
		saveSubmit() { //点击提交
			var concept = [];
			if(this.checkedData.length > 0) {
				concept = this.checkedData;
			} else {
				concept = this.conceptResultList;
			}
			var value = this.newCrowdfunding.id;
			this.isWebsiteName = false;
			this.isWebsiteEnName = false;
			this.isWebsiteAddress = false;
			let web = this.websites;
			var that = this;
			let arr=[];
			let num=[];
			for(let i=0,len=web.length;i<len;i++){
				if(web[i].websiteAddress&&web[i].websiteName&&web[i].websiteEnName){
					arr.push(web[i]);
					continue;
				}
				if(!(web[i].websiteAddress)&&!(web[i].websiteName)&&!(web[i].websiteEnName)){
					num.push(i);
					continue;
				}
				if(!(web[i].websiteName)){
					that.isWebsiteName = true;
				}
				if(!web[i].websiteEnName){
					that.isWebsiteEnName = true;
				}
				if(!web[i].websiteAddress){
					that.isWebsiteAddress = true;
				}
			}
			if(that.isWebsiteName || that.isWebsiteEnName || that.isWebsiteAddress){
				return;
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
		queryDetails() {
			Request({
				url: 'QueryProject',
				data: {
					accountId: this.newCrowdfunding.accountId,
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
				if(res.data.conceptResultList) {
					res.data.conceptResultList.forEach(function(item, index) {
						arr.push(item.name);
						concept.push(item.conceptId);
					})
				}
				this.conceptResultList = res.data.conceptResultList;
				this.conceptDatas = arr.join('-');
				this.conceptId = concept;
				this.technologyDatas = technologyArr.join('-');
				var that = this;
				if(res.data.websiteResultList.length > 0) {
					let number = -1;
					res.data.websiteResultList.forEach(function(item, index) {
						number++;
						that.websites.splice(number, 1, item);
					})
				}
			})
		},
		queryCore() {
			var value = this.$route.params.value;
			this.centerDialogVisible = true;
			if(value == 1 || value == 2) {
				Request({
					url: 'QueryAdCoreMember',
					data: {
						advertId: this.newCrowdfunding.id
					},
					type: 'get',
					flag: true,
				}).then(res => {
					this.coreTeam = res.data;
				})
			}
		},
		saveLink() {
			var id = this.$route.params.id;
			this.$validator.validateAll().then((result) => {
				if(result) {
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
							message: this.$t('messageNotice.changeSuccess'),
							type: 'success'
						});
					})
				}
			});
		},
		addLink() {
			this.$validator.validateAll().then((result) => {
				if(result) {
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
							message: this.$t('messageNotice.addSuccess'),
							type: 'success'
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
					message: this.$t('messageNotice.deleteSuccess'),
					type: 'success'
				});
				this.centerDialogVisible = false;
				this.queryDetails();
			})
		},
		queryConsultant() {
			var value = this.$route.params.value;
			if(value == 1 || value == 2) {
				Request({
					url: 'QueryAdConsultant',
					data: {
						advertId: this.newCrowdfunding.id,
					},
					type: 'get',
					flag: true,
				}).then(res => {
					this.consultantTeam = res.data;
				})
			}
			this.CrowdTeamDialogVisible = true;
		},
		addLinkConsultant() {
			var id = this.$route.params.id;
			this.$validator.validateAll().then((result) => {
				if(result) {
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
							message: this.$t('messageNotice.addSuccess'),
							type: 'success'
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
					message: this.$t('messageNotice.deleteSuccess'),
					type: 'success'
				});
			})
		},
		saveLinkConsultant() {
			var id = this.$route.params.id;
			this.$validator.validateAll().then((result) => {
				if(result) {
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
							message: this.$t('messageNotice.changeSuccess'),
							type: 'success'
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
			Cache.setSession('adConceptArr', checkedData);
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
					message: this.$t('messageNotice.noDelete'),
					type: 'warning'
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
					message: this.$t('messageNotice.noDelete'),
					type: 'warning'
				});;
			} else {
				this.consultantTeam.splice(value, 1);
			}
		},
		getImg(res) {
			this.imageUrl = res.data;
			this.img = false;
			Cache.setSession('adImageUrl', this.imageUrl);
		},
		imgError(){
			this.$message({
				message:this.$t('tokenInfo.uploadError'),
				type:'warning'  
			});
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
		displayCache() {
            let newCrowdfunding = Cache.getSession('newAdvertisers');
            this.newCrowdfunding = newCrowdfunding && JSON.parse(newCrowdfunding) || {};
            this.newCrowdfunding.accountId = this.$store.state.id;
            // 技术
            let { technology1, technology2 } = this.newCrowdfunding;
            let technologyArr = [];
            technology1 && technologyArr.push(technology1);
            technology2 && technologyArr.push(technology2);
            this.technologyDatas = technologyArr.join('-');
            // concept
            let concept = Cache.getSession('adConceptArr');
            this.checkedData = concept && JSON.parse(concept) || [];
            this.conceptDatas = this.checkedData.map(item => item.name).join('-');
            // console.log('concept_>', this.checkedData, this.conceptDatas);
            // console.log('timeInterval_>', this.timeInterval);
            // consultantTeam && coreTeam
            let consultantTeam = Cache.getSession('adConsultantTeam');
            this.consultantTeam = consultantTeam && JSON.parse(consultantTeam) || [{
                accountId: this.$store.state.id,
                name: '',
                title: '',
                desc: '',
            }];
            let coreTeam = Cache.getSession('adCoreTeam');
            this.coreTeam = coreTeam && JSON.parse(coreTeam) || [{
                accountId: this.$store.state.id,
                name: '',
                title: '',
                desc: '',
            }];
            // console.log('consultantTeam && coreTeam _>', this.consultantTeam, this.coreTeam);
            // imageUrl
            this.imageUrl = Cache.getSession('adImageUrl');
            //websites
            let website =  Cache.getSession('websitesData')
            this.websites = website && JSON.parse(website) || [{}, {}, {}, {}, {}, {}, {}, {}];
        },
        clearCache() {
            Cache.removeSession('adConceptArr');
            Cache.removeSession('adImageUrl');
            Cache.removeSession('adCoreTeam');
            Cache.removeSession('adConsultantTeam');
            Cache.removeSession('newAdvertisers');
            Cache.removeSession('websitesData');
        },
	}
}