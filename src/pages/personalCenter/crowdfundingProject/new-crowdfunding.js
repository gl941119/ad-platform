import conceptCom from '@/components/personal-com/concept';
import Request from '../../../utils/require.js';
import Utils from '../../../utils/util.js';
import Cache from '../../../utils/cache';
import Config from '../../../utils/config';
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
                companyName: '',
                companyCode: '',
            },
            checkedData: [], // 概念ID
            concept: false,
            technology: false,
            companyFileList: [], // 牌照存放
            fileUrl: '', //相关牌照地址
            imageUrl: '', //logo地址
            timeInterval: [], // 日期
            fileList: [],
            util: new Utils(),
            conceptDatas: '', // 概念拼接后的绑定
            technologyDatas: '', // 技术拼接绑定
            uploadImg: Config.UploadImg,
            pickerTime: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            requestToken: {
                token: this.$store.state.token ||
                    Cache.getSession('bier_token')
            },
            params: {
                fileType: '2'
            },
            proDescr: false, //项目简介提示
            img: false, //logo提示
            isData: false, //众筹时间提示
            fileEmpty: false, //相关牌照提示
        }
    },
    components: {
        conceptCom,
    },
    mounted() {
        this.displayCache();
    },
    methods: {
        disclaimer() { //免责声明
            this.$router.push({
                name: 'disclaimer',
            })
        },
        data() { //时间
            if (this.timeInterval.length <= 0) {
                this.isData = true;
            } else {
                this.isData = false;
            }
            let [start, end] = this.timeInterval;
            console.log('this.timeInterval_>', start);
            Cache.setSession('timeInterval', [new Date(start).getTime(), new Date(end).getTime()]);
        },
        proDesc() { //项目简介
            if (!this.newCrowdfunding.proDesc || this.newCrowdfunding.proDesc.length > 512) {
                this.proDescr = true;
            } else {
                this.proDescr = false;
            }
        },
        submit() {
            console.log('this.timeInterval_>', this.timeInterval);
            var startTime = this.util.dateFormat(this.timeInterval[0], "time");
            var endTime = this.util.dateFormat(this.timeInterval[1], 'time');
            if (this.checkedData[0]) {
                var concept1Id = this.checkedData[0].conceptId;
            }
            if (this.checkedData[1]) {
                var concept2Id = this.checkedData[1].conceptId;
            }
            if (this.checkedData[2]) {
                var concept3Id = this.checkedData[2].conceptId;
            }
            if (this.checkedData[3]) {
                var concept4Id = this.checkedData[3].conceptId;
            }
            this.$validator.validateAll().then((result) => {
                this.data();
                this.proDesc();
                if (!this.imageUrl) {
                    this.img = true;
                }
                if (!this.fileUrl) {
                    this.fileEmpty = true;
                }
                if (result) {
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
                            startTime: startTime,
                            endTime: endTime,
                            license: this.fileUrl,
                            crowdTeamMembers: this.coreTeam,
                            crowdTeamConsultants: this.consultantTeam,
                            companyName: this.newCrowdfunding.companyName,
                            companyCode: this.newCrowdfunding.companyCode,
                        },
                        type: 'post',
                        flag: true
                    }).then(res => {
                        this.$message({
                            message: this.$t('messageNotice.addSuccess'),
                            type: 'success'
                        });
                        this.clearCache();
                        this.$router.push({
                            name: 'project'
                        });
                    })
                }
            });
        },
        listenCondept(checkedData) {
            var newCheckedData = [];
            checkedData.forEach(function(item, index) {
                newCheckedData.push(item.name);
            })
            this.conceptDatas = newCheckedData.join('-');
            this.checkedData = checkedData;
            Cache.setSession('conceptArr', checkedData);
        },
        addCore() { //核心团队
            var tmpPersions = this.coreTeam;
            tmpPersions.push(this.newCore);
            this.newCore = {};
            this.coreTeam = tmpPersions;
        },
        deletedCore(value) { //核心团队
            var length = this.coreTeam.length;
            if (length <= 1) {
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
            if (length <= 1) {
                this.$message({
                    message: this.$t('messageNotice.noDelete'),
                    type: 'warning'
                });
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
            if (this.newCrowdfunding.technology1) {
                technologyArr.push(this.newCrowdfunding.technology1);
            }
            if (this.newCrowdfunding.technology2) {
                technologyArr.push(this.newCrowdfunding.technology2);
            }
            this.technologyDatas = technologyArr.join('-');
        },
        getImg(res, file) {
            this.imageUrl = res.data;
            this.img = false;
            Cache.setSession('imageUrl', this.imageUrl);
        },
        imgError() {
            this.$message.error({ message: this.$t('tokenInfo.uploadError') });
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        getFile(res, file) {
            console.log('success_>', res, file);
            this.fileUrl = res.data;
            this.fileEmpty = false;
            this.companyFileList.push({ name: file.name, url: this.fileUrl });
            Cache.setSession('companyFileList', this.companyFileList);
        },
        // 增加缓存
        addCache() {
            console.log('coreTeam>', this.newCrowdfunding);
            // console.log('consultantTeam>', this.consultantTeam);
            Cache.setSession('coreTeam', this.coreTeam);
            Cache.setSession('consultantTeam', this.consultantTeam);
            Cache.setSession('newCrowdfunding', this.newCrowdfunding);
        },
        displayCache() {
            let newCrowdfunding = Cache.getSession('newCrowdfunding');
            this.newCrowdfunding = newCrowdfunding && JSON.parse(newCrowdfunding) || {};
            this.newCrowdfunding.accountId = this.$store.state.id;
            console.log('newCrowdfunding_>', this.newCrowdfunding);
            // 技术
            let { technology1, technology2 } = this.newCrowdfunding;
            let technologyArr = [];
            technology1 && technologyArr.push(technology1);
            technology2 && technologyArr.push(technology2);
            this.technologyDatas = technologyArr.join('-');
            // concept
            let concept = Cache.getSession('conceptArr');
            this.checkedData = concept && JSON.parse(concept) || [];
            this.conceptDatas = this.checkedData.map(item => item.name).join('-');
            // console.log('concept_>', this.checkedData, this.conceptDatas);
            // 日期
            let timeInterval = Cache.getSession('timeInterval');
            this.timeInterval = timeInterval && JSON.parse(timeInterval);
            // console.log('timeInterval_>', this.timeInterval);
            // consultantTeam && coreTeam
            let consultantTeam = Cache.getSession('consultantTeam');
            this.consultantTeam = consultantTeam && JSON.parse(consultantTeam) || [{
                accountId: this.$store.state.id,
                name: '',
                title: '',
                desc: '',
            }];
            let coreTeam = Cache.getSession('coreTeam');
            this.coreTeam = coreTeam && JSON.parse(coreTeam) || [{
                accountId: this.$store.state.id,
                name: '',
                title: '',
                desc: '',
            }];
            // console.log('consultantTeam && coreTeam _>', this.consultantTeam, this.coreTeam);
            // imageUrl
            this.imageUrl = Cache.getSession('imageUrl');
            // companyFileList
            let companyFileList = Cache.getSession('companyFileList');
            if (companyFileList) {
                this.companyFileList = companyFileList && JSON.parse(companyFileList) || [];
                this.fileUrl = this.companyFileList[0].url;
            }
        },
        clearCache() {
            Cache.removeSession('timeInterval');
            Cache.removeSession('conceptArr');
            Cache.removeSession('imageUrl');
            Cache.removeSession('companyFileList');
            Cache.removeSession('coreTeam');
            Cache.removeSession('consultantTeam');
            Cache.removeSession('newCrowdfunding');
        },
    }
}