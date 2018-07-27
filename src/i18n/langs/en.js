﻿import enLocale from './enE'
const en = {
	header: {
		home: 'Home',
		daico:'DAICO',
		project: 'Project',
		medium:'Media',
		sunday:'GalaNight',
		bierTalk:'BierTalk', 
		login:'Login',
		register:'Register',
		help:'帮助', 
	},
	login:{
		login:'Login',
		userLogin:'Login',
		account:'Account',
		password:'Password',
		verifyCode:'SecurityCode',
		enterAccount:'account',
		enterPassword:'password',
        enterCode:'securitycode',
        modelWidth: '410px',
        pleaseLogin: '请先登录',
	},
	register:{
		register:'Register',
		userRegister:' Register',
		registerEmail:'Email',
		registerCode:'SecurityCode',
		sendCode:'securitycode',
		again:'Try again later', 
		registerPassword:'Password',
		registerOncePassword:'ConfirmPassword',
		registerVerifyCode:'InviteCode',
		enterRegisterEmial:'Email',
		enterRegisterPassword:'Password',
		enterRegisterCode:'SecurityCode',
		enterOncePassword:'ConfirmPassword',
		registerInviteCode:'InviteCode',
	},
	passwordNotic:{
		one:'1. Password length must be between 8 and 16 characters.',
		two:'2. Passwords can only contain English letters (a-z), numeric characters (0-9) and punctuation marks.',
		three:'3. The password contains at least one English letter and one numeric character.',
		four:'4. The password cannot be the same as the account number.',
	},
	messageNotice:{
		emailEmpty:' Email cannot be empty',
		emailFormat:' The Email format is incorrect',
		oncePasswordEmpty:'Confirm password cannot be empty',
		oncePasswordEqual:'The ‘Confirm password’ does not match',
		passwordEmpty:'Password cannot be EMPTY',
		passwordFormat:'Password format ERROR',
		codeEmpty:'SecurityCode cannot be EMPTY',
		formatMatch:' Content format error ',
		notEmpty:' Account/Password cannot be empty ',
		setSuccess:'Success！',
		setTradePassword:'Success！',
		emptyTradePassword:' The transaction password cannot be empty',
		changeSuccess:'Success！',
		getSuccess:'SecurityCode has been sent' ,
		certificationSuccess:' SecurityCode has beenconfirm',
		nicknameEmpty:'Nickname cannot be empty',
		nicknameLength:'昵称不能多于8个字符',
		bindSuccess:'Success！',
		addSuccess:'Success！',
		deleteSuccess:'Success！',
		noDelete:' It has been all cleared',
		walltLimit:'请输入以0x开头的42位字符串',
		giveyou:'提示',
		nomore:'最多选择四个',
		copy:'复制成功',
		noAuth:'您还未进行身份验证，请先前往账号设置中进行身份验证',
		onAuth:'您的身份认证还在审核中，暂时无法执行此此操作',
		refuseAuth:'您身份验证未通过，身份验证通过后方可执行此操作',
	},
	home:{
		broadcast:'Market',
		begin:'Coming',
		time:'Remaining',
		number:' ',
		immediately:'Buy now!',
		over:'End',
		buy:'Trade',
		whitePaper:'Whitepaper',
		chName:'中文名',
		readMore:'More',
		learnMore:'More',
		projectNum:'No.',
		advertising:'AD',
		thisIssuance:'This round',
		noData:'没有更多数据了',
		instant:'The smart contract failed to respond in time, please try again later...',
	},
	share:{
		shareTiltle:'Share',
		shareOne:'点击挖矿，分享成为矿场主！',
		shareCopy:'copy',
	},
	crowdFunding:{
		all:' All stages',
		allConcept:' All concept',
		start:'Coming',
		underway:'Running',
		readWhitePaper:'Whitepaper',
		website:'OfficialSite',
		volume:'总量',
		totalPrice:'众筹' ,
		crowdfunding:'DAICO',
		calculate:'million ',
		concept:'Notion',
		technology:'Tech',
		issuance:'Offering',
		issueNumber:' Circulation',
		crowdPrice:'Price',
		startTime:'StartTime',
		endTime:'EndTime',
		laterStart:'Starts in ',
		order:'Subscribe',
		residue:'The rest',
		limit:' Scope of change ',
		walletAddress:'Wallet',
		qrCode:'QR Code',
		buySuccess:'Success！',
		warn:' Risk warning: AFD  has fulfilled its obligation to review compliance with crowdfunding projects. Investors are expected to be aware of and be cautious about the risk nature of their investments ',
		timeLeft:'本轮众筹剩余时间',
		sorry:'抱歉，该分类暂无，试试搜索其他内容',
	},
	projectList:{
		tokenName:'Token Name',
		desc:'Intro',
		price:'Price',
		status:'Condition',
		updateTime:'turnover time',
		notic :' After successful crowdfunding, the corresponding Token will be directly recharged into your wallet, and the relevant unsuccessful funds will be returned the same way ',
		currency:'打币成功1',
		coin:'退币成功1',
		currencyIn:'打币中1',
		coinIn:'退币中1',
		currencyFailed:'打币失败1',
		coinFailed:'退币失败1',
	},
	invite:{
		inviteUser:'Invite',
		info :' Invited users will be rewarded with AFDT tokens for the value created by clicking ads in the future',
		code:'Invitecode',
		copy:'Copy',
		timer:'InvitationTime',
		userAccout:'Users',
		recently:' Last login time',
		divided:'Earnings for me',
	},
	setting:{//账号设置
		setInfo:'Set',
		headUrl:'Profile Pic.',
		nickname:'Nickname',
		enterNickname:'Please enter your Nickname',
		changeNickname:'New NIckname',
		email:'Email',
		bindEmail:'Bind your Email',
		enterBindEmail:'Enter your Email',
		once:'Try again later',
		telegram:'绑定Telegram',
		limit:'身份文件号码限制在32位以内',
		limitName:'请输入64位以内的姓名',
		getEmailCode:' Get the email verification code ',
		enterEmailCode:' Please enter the email verification code ',
		binded:' Binded',
		goBind:' Go bind',
		authentication:'Authentication ',
		fillInformation:'Fill in the information ',
		country:'Your country',
		pleaseSelect:'Please select ',
		identityFileType:'Identity file type ',
		identityFileNumber:'Id number ',
		name:'Name',
		identityFile:'Profile page ',
		notic:'Notice',
		noticOne:'1.Please make sure the documents you use are authentic ',
		noticTwo:'2.You should hold your id card 7 centimeters from your face ',
		noticThree:'3.Take photos of your hand held identification above your shoulders ',
		noticFour:'4.The document you are using is within the validity period ',
		tips:'提示',
		review:'身份认证已提交申请，正在审核',
		nopass:'身份认证未通过审核，请知悉',
		pass:'身份认证提交资料已成功通过审核',
	},
	passwordInfo:{//更改密码、交易密码
		passwords:'password',
		oldPassword:'The original password ',
		newPassword:'The new password ',
		oncePassword:'Confirm new password ',
		enterOPassword:'Please enter the original password ',
		enNewPassword:'Please enter the new password ',
		oldPasswordEmpty:'The original password cannot be empty ',
		newPasswordEmpty:'The new password cannot be empty ',
		tradePassword:'Trade password ',
		oldTradePassword:'The old trade password ',
		newTradePassword:'The new trade password ',
		onceTradePassword:'Confirm transaction password ',
		enterTPassword:'Please enter the original transaction password ',
		enterNTPassword:'Please enter the new transaction password ',
		enterOTPassword:'Please enter your confirmation password ',
		setPassword:'Set the password ',
		changePassword:'Change the password ',
		setTradePassword:'Set the transaction password ',
		changeTradePassword:'Change transaction password ',
		enterTradePassword:'Please enter your transaction password ',
	},
	personal:{//个人中心
		purse:'Wallet',
		revenue:'Advertising revenue account ',
		main:"Advertiser's account ",
		crowdfunding:' My crowdfunding ',
		myCrowdfunding:'My participation',
		vote:'My vote ',
		invite:'Invite',
		settings:'Settings',
		adserving:'Advertising',
		project:'Crowdfunding project parties',
		Investors:'Investors ',
		partner:'Partner',
		exchange:'Exchange ',
		medium:'Media ',
		loginOut:'Log out ',
	},
	purse:{
		balance:'Balance ',
		bindWalletAddress:"Bind your wallet address to withdrawal advertising revenue from platform, check your advertiser's recharge records, and check your account balance ",
		main:'This means that: ',
		one:'1、The ETH wallet address will be used to receive the platform token AFDT based on the ERC20 protocol ',
		two:'2、If you need to advertise, you need to deposit from this address for verification',
		eth:'ETH wallet address ',
		wallet:'钱包',
	},
	buttonAll:{
		confirm:'Confirm',
		affirm:'确认',
		cancle:'Cancel',
		submitVerification:'Submit verification ',
		bind:'Bind',
		change:'Change',
		revise:'Revise',
		save:'Save',
		add:'Add',
		delete:'Delete',
		submits:'Submit',
		saveChange:'Save changes',
		finish:'完成',
		ok:'好的',
	},
	initiated:{
		iInitiated:'The crowdfunding I initiated',
		token:'Token name',
		desc:'Description ',
		lowTop:'Hard/Soft cap',
		degree:'Degree',
		status:'Status',
		newCrowd:'Apply for new crowdfunding',
		review:'Pending review',
		over:'Already on the shelves',
		refuse:'Review failed',
		statusUpdate:'Status update time',
	},
	project:{//广告收益账户以及主账户
		balance:'Balance',
		ethWalletAddress:'ETH wallet address',
		withdraw:'Withdrawal',
		recharge:'Recharge',
		moneyAccount:'Receiving account',
		enterMoneyAccount:'Please enter your account ',
		useBalance:'Available Balance ',
		freeze:'Freeze',
		handlingFee:' Fee',
		revenue :' Advertising revenue account ',
		myWallet:' My wallet',
		withdrawal:'Withdrawal',
		enterMoney:'请输入提现金额',
		emptyMoney:'提现金额至少为100，且必须是100的倍数',
		notic:'After the recharge amount is received, the corresponding amount will automatically appear in the advertiser\'s account. ',
		requireWithdraw:'已提交提现申请',
	},
	accountFlow:{
		accountStatement:'Account statement',
		startTime:'Start date',
		endTime:'End date ',
		search:'Search',
		dataTime:'Date',
		desc:'Description ',
		flowDirection:'Flow direction ',
		amountOfMoney:'Amount(AFDT)',
		withdrawals:'提现记录',
		income:'收益记录',
		revenue:'广告收益',
		rechargeRecord:'充值记录',
		expenses:'消费记录',
		transfer:'划转至钱包',
		deduction:'广告扣费',
		insufficient:'余额不足',
	},
	adServing:{
		adSer:'Ad serving',
		trafficking:'Serving content management ',
		averagePrice:'Current average price',
		adjustment:'Adjustment ',
		strategy:'Bidding strategy ',
		all:'Home',
		prompt:'The bidding strategy adjustment will take effect from 00:00:00 the next day in Singapore time, only once a day. ',
		currentPosition:'当前位置（位）',
		banner:'上传banner',
		totalnumber:'累计点击（次）',
		stop:'数据截止到',
		yestoday:'昨日点击（次）',
		accountMoney:'广告账户余额',
	},
	projectNotic:{
		title:'Project Description ',
		notic:'Please fill in the information as much as possible so that the investment committee can reasonably evaluate your project (both parties should strictly abide by the confidentiality obligations during the evaluation period)',
		newApplication:'Crowdfunding application ',
	},
	team:{
		emptyCore:'核心团队成员不能为空',
		emptyConsultant:'顾问团队成员不能为空',
		teamInfo:'Team',
		teamName:'* Team Name',
		teamPhone:'* Team contact',
		teamAddress:'* Main member location',
		coreMember:'* Core team members ',
		consultant:'* Consultant team member ',
		openCoreMember:'Click to open the core team member ',
		openConsultant:'Click to open the consultant team member ',
		name:'Full name ',
		title:'Title',
		desc:'Introduction ',
		operating:'Operating ',
		enterTeamName:'Please enter the team name ',
		enterTeamPhone:'Please enter the team contact method',
		enterTeamAddress:'Please enter the location of the main member ',
		enterName:'Please enter the full name ',
		enterTitle:'Please enter the title',
		enterDesc:'Please enter an introduction',
		emptyTeamName:'Team name cannot be empty ',
		emptyTeamPhone:'Team contact cannot be empty ',
		emptyTeamAddress:'The main member location cannot be empty ',
		emptyName:'Full name cannot be empty ',
		emptyTitle:'Title cannot be empty ',
		emptyDesc:'Introduction cannot be empty ',
	},
	projectInfo:{
		info:'Project Status ',
		projectName:'Project name',
		projectDesc:'Project description',
		concept:'Concept ',
		technology:'Technology ',
		enterProjectName:'Please enter the project name',
		enterProjectDesc:'Please enter a project description ',
		enterTechnology1:'Please enter technology 1',
		enterTechnology2:'Please enter technology 2',
		emptyProjectName:'Project name cannot be empty',
		emptyProjectDesc:'Project description cannot be empty (limited to 100 characters)',
	},
	tokenInfo:{
		token:'Token issue',
		tokenIntro:'Token information',
		english:'* English shorthand',
		chinese:'Chinese shorthand',
		englishName:'* Full name in English',
		logo:'* logo',
		enterEnglish:'Please enter English shorthand ',
		enterChinese:'Please enter Chinese shorthand ',
		enterFullEnglish:'Please enter your full English name',
		emptyEnglish:'English shorthand can not be empty (limited to 5 characters)',
		emptyFullEnglish:'English full name cannot be empty',
		emptyLogo:'Logo cannot be empty',
		title:'* Current round of crowdfunding title',
		issueTotal:'* Total supply',
		total:'* Total crowdfunding',
		thisIssue:'This round of circulation',
		price:'* Crowdfunding price',
		limit:'* Exchange limit for single account',
		money:'* Target currency',
		topLimit:'* Hard cap',
		lowLimit:'* Soft cap',
		dataTime:'* This round of crowdfunding time',
		files:'Compliance document',
		companyName:'*公司名称',
		companycode:'*企业代码',
		about:'* Related license ',
		upload:'Upload',
		download:'Dowmload',
		startTime:'Start date ',
		to:'To',
		endTime:'End date ',
		enterTitle:'Please enter this round of crowdfunding title',
		enterIssueTotal:'Please enter the total supply of the issue',
		enterTotal:'Please enter the total amount of crowdfunding',
		enterThisIssue:'Please enter this round of circulation',
		enterPrice:'Please enter the crowdfunding price',
		enterLimit:'Please enter the exchange restriction for single account',
		enterMoney:'Please enter the target currency',
		enterTopLimit:'Please enter the release hard cap',
		enterLowLimit:'Please enter the release soft cap ',
		enterCompanyName:'请输入公司名称',
		enterCompanycode:'请输入企业代码',
		emptyTitle:'Please enter the round of crowdfunding title (limit)',
		emptyIssueTotal:'Please enter the total supply of the issue (limit)',
		emptyTotal:'Please enter the total amount of crowdfunding (limit)',
		emptyThisIssue:'Please enter the current circulation (limit)',
		emptyPrice:' Please enter the crowdfunding price (limit)',
		emptyLimit:'Please enter the exchange restriction for single account（limit）',
		emptyMoney:'Please enter the target currency（limit）',
		emptyTopLimit:'Please enter the release hard cap（limit）',
		emptyLowLimit:' Please enter the release soft cap（limit）',
		emptyDadataTime:' Please enter this round of crowdfunding time ',
		emptyFiles:' Compliance documents can not be empty',
		emptyCompanyName:'公司名称不能为空',
		emptyCompanycode:'企业代码不能为空',
		emptyAbout:' The relevant licence cannot be empty',
		emptyStatement:'请先选择免责声明',
	},
	aboutLink:{
		linkInfo:'* Related Links',
		website:' Official website',
		whitePaper:'* Whitepaper address ',
		websiteName:'Website name',
		websiteAddress:' Website address',
		enterWebsite:' Please enter the official website',
		enterWhitePaper:' Please enter the whitepaper address ',
		enterWebsiteName:' Please enter the website name',
		enterWebsiteAddress:' Please enter the website address',
		emptyWebsite:' The official website can not be empty (qualified website address)',
		emptyWhitePaper:' Whitepaper address cannot be empty（qualified website address）',
		emptyAddress:'自定义站点地址需符合网站地址',
	},
	messageCode:{
		exceptions:' System exception',
		success:'Successful operation',
		failure:'Operation failed ',
		registered:'Registered successfully ',
		userNotExist:' User does not exist, can not log in ',
		notRegister:' User already exists and cannot register',
		tooManyUsers:' There are too many users to log in',
		disabled:' The user is disabled and cannot log in',
		alreadyBound:' The user has been bound to the mailbox and cannot be re-bound',
		wrongPassword:' Password error, unable to log in ',
		originalPassword:' The original password is incorrect, please re-enter',
		transactionPassword:' The original transaction password is incorrect, please re-enter',
		verificationCode:' Verification code error',
		codeSendSuccess:' The verification code was sent successfully',
		codeSendFaild:' Verification code sending failed ',
		codeSentTooFrequently:' The verification code is sent too frequently. Please try again later',
		codeNotExist:' Invitation code does not exist ',
		bindedTelegram:' The telegram account has already registered the platform account and cannot be bound',
		onShelves:' Crowdfunding information is on the shelves and cannot be modified',
		underReview:' Cannot be modified in crowdfunding information review ',
		notApplyAgain:' Your ad already exists and can not re-apply',
		loginInvalid:' Login failed, please login again ',
		noBindEmail:'该账户未绑定邮箱',
		illegal:'广告非法',
		remove:'广告已下架',
		invalid:'点击挖矿无效',
		exist:'众筹不存在',
		existed:'交易密码已经存在',
		passwordExisted:'密码已经存在',
		unableBind:'钱包地址已经被使用，无法继续绑定',
		itemNoExist:'广告项目不存在',
		noSetConcept:'广告项目还未设置概念',
	},
	...enLocale
};
export default en
