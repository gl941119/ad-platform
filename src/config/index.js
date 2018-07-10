export default {
    GetSystemTime: 'blockchainadvert/common/now-date',
    QueryCrowdSale: 'blockchainadvert/crowd-funding/home-page',
    QueryAdvertInfo: 'blockchainadvert/advertservice/home-page',
    QueryCrowdSaleDetailInfo: 'blockchainadvert/crowd-funding/secondary',
    QueryAllConcept: 'blockchainadvert/common/concept',
    QueryAdvertDetailInfo: 'blockchainadvert/advertservice/secondary',
    // Login and Register
    Register:'blockchainadvert/account/registered',
    Login: 'blockchainadvert/account/accountLogin',
    SendVerifyCode: 'blockchainadvert/account/sendRegistCode',
    TelegramAuthorizeCB: 'blockchainadvert/authorize/telegram',
    SignOut: 'blockchainadvert/account/signout',
    QueryRevenueBasicInformation: 'blockchainadvert/advert-income/account-id',//收益账户
    QueryRevenueAccountFlow: 'blockchainadvert/income-flow/income-id',//收益账户流水
    QueryMainBasicInformation: 'blockchainadvert/advert-main/account-id',//主账户
    QueryMainAccountFlow: 'blockchainadvert/main-flow/main-id',//账户流水
    /*我发起的众筹*/
    QueryMyNewCrowdfunding: 'blockchainadvert/crowd-funding/initiate',
    /*我参与的众筹*/
    QueryMyCrowdfunding: 'blockchainadvert/join-crowd-funding/account-id',
    /*获取所有概念*/
    QueryConcept: 'blockchainadvert/common/concept',
    /*众筹项目方-申请新众筹*/
    QueryNewCrowdfunding: 'blockchainadvert/crowd-funding',
    QueryCrowdfundingDetails: 'blockchainadvert/crowd-funding/id',//众筹详情
    ChangeCrowdfundingDetails: 'blockchainadvert/crowd-funding/put',//修改众筹申请
    /*广告方-添加新项目*/
    QueryNewProject: 'blockchainadvert/advertservice/advert',
    /*邀请用户*/
    QueryInviteCode: 'blockchainadvert/account/getInviteCode',//获取验证码
    QueryInviteData: 'blockchainadvert/account/getInvitePerson',//获取邀请用户
    /*账号设置*/
    QueryAccountSettings: 'blockchainadvert/account/modifyAccountMessage',//账号设置
    QueryCode: 'blockchainadvert/account/sendBindEmailCode',//获取验证码
    QueryPasswordCode: 'blockchainadvert/account/sendUpdateAccountCode',//获取验证码
    QueryAuthentication: 'blockchainadvert/account/idAuthentication',//身份验证
    /*核心团队*/
    AddCoreMember: 'blockchainadvert/crowd-team-member',
    DeletedCoreMember: 'blockchainadvert/crowd-team-member/delete/crowd-id/id',
    ChangeCoreMember: 'blockchainadvert/crowd-team-member/put',
    QueryCoreMember: 'blockchainadvert/crowd-team-member/getAll/crowd-id',
    /*顾问团队团队*/
    addConsultant: 'blockchainadvert/crowd-team-consultants',
    deletedConsultant: 'blockchainadvert/crowd-team-consultants/delete/crowd-id/id',
    ChangeConsultant: 'blockchainadvert/crowd-team-member/put',
    QueryConsultant: 'blockchainadvert/crowd-team-consultants/getAll/crowd-id/',
}