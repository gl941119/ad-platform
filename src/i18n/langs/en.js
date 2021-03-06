﻿import enLocale from './enE';
const en = {
    header: {
        home: 'Home',
        daico: 'DAICO',
        project: 'Project',
        medium: 'Media',
        sunday: 'GalaNight',
        bierTalk: 'BierTalk',
        login: 'Login',
        register: 'Register',
        tips: 'Tips',
        tipMsg: 'Telegram need VPN',
        got: 'I got it',
        info: 'system maintenance，suspended withdrawals',
        more: 'more',
    },
    login: {
        login: 'Login',
        userLogin: 'Login',
        account: 'Account',
        password: 'Password',
        verifyCode: 'SecurityCode',
        enterAccount: 'account',
        enterPassword: 'password',
        enterCode: 'securitycode',
        modelWidth: '410px',
        pleaseLogin: 'please login first',
        quicklyLogin: 'Quick Login',
    },
    forgetPassword: {
        forget: 'Forgot Password',
        passwordReset: 'Reset login password',
        enterEmail: 'Email or Phone',
        resetPassword: 'Reset login password',
        finish: 'Finish',
        success: 'Password reset successful',
        againLogin: 'will automatically go to the login',
        pleaseEnterEmail: 'Email or Phone',
        enterCode: 'Verification code',
        setPassword: 'Set login password, 8-16 characters, letters and numbers',
        next: 'Next',
    },
    register: {
        register: 'Register',
        userRegister: ' Register',
        registerEmail: 'Email',
        registerCode: 'SecurityCode',
        sendCode: 'securitycode',
        again: 'Try again later',
        registerPassword: 'Password',
        registerOncePassword: 'ConfirmPassword',
        registerVerifyCode: 'InviteCode',
        enterRegisterEmial: 'Email',
        enterRegisterPassword: 'Password',
        enterRegisterCode: 'SecurityCode',
        enterOncePassword: 'ConfirmPassword',
        registerInviteCode: 'InviteCode',
        disclaimer: 'AFDCHAIN Terms of User',
        agree: 'Agree & Register',
    },
    passwordNotic: {
        one: '1. Password length must be between 8 and 16 characters.',
        two: '2. Passwords can only contain English letters (a-z), numeric characters (0-9) and punctuation marks.',
        three: '3. The password contains at least one English letter and one numeric character.',
        four: '4. The password cannot be the same as the account number.',
    },
    messageNotice: {
        emailEmpty: ' Email or Phone cannot be empty',
        emailFormat: ' The Email or Phone format is incorrect',
        oncePasswordEmpty: 'Confirm password cannot be empty',
        oncePasswordEqual: 'The ‘Confirm password’ does not match',
        passwordEmpty: 'Password cannot be EMPTY',
        passwordFormat: 'Password format ERROR',
        codeEmpty: 'SecurityCode cannot be EMPTY',
        formatMatch: ' Content format error ',
        notEmpty: ' Account/Password cannot be empty ',
        setSuccess: 'Success！',
        setTradePassword: 'Success！',
        emptyTradePassword: ' The transaction password cannot be empty',
        changeSuccess: 'Success！',
        getSuccess: 'SecurityCode has been sent',
        certificationSuccess: ' SecurityCode has beenconfirm',
        nicknameEmpty: 'Nickname cannot be empty',
        nicknameLength: 'less than 8 characters for nickname',
        bindSuccess: 'Success！',
        addSuccess: 'Success！',
        deleteSuccess: 'Success！',
        noDelete: ' It has been all cleared',
        walltLimit: 'please input the 42character string Start with0x',
        giveyou: 'Hints',
        nomore: 'maximum is 4',
        copy: 'Copy successfully',
        defaultCopy: 'The browser does not support point copying',
        noAuth: 'You have not done the authentication，please go to you ID setting to do the authentication',
        onAuth: 'Your authentication is being audited ，cannot do the operation temporary',
        refuseAuth: 'your authentication have not been passed，the operation will be launch after the pass of your authentication',
    },
    home: {
        broadcast: 'Market',
        begin: 'Coming',
        time: 'Remaining',
        number: ' ',
        immediately: 'Buy now!',
        over: 'End',
        buy: 'Exchange',
        whitePaper: 'Whitepaper',
        chName: 'Chinese name',
        readMore: 'More',
        learnMore: 'More',
        projectNum: 'No.',
        advertising: 'AD',
        thisIssuance: 'This round',
        noData: 'No more data',
        instant: 'The smart contract failed to respond in time, please try again later...',
    },
    share: {
        shareTiltle: 'Share',
        shareOne: 'Hey investor,have you suffered a loss?Come to AFD Chain ,I will feed you!Send a bear market strategy to you，invite you to register and divide 99999 AFDT.Registration with invitation code can get 66AFDT ，and 33AFDT for each invitation.Mining every day and enjoy bonuses!',
        shareCopy: 'copy',
        warning: 'You have not logged in AFD Planet yet. To ensure that you can get more revenue, please log in and share later.',
    },
    crowdFunding: {
        all: ' All stages',
        allConcept: 'Category',
        start: 'Coming',
        underway: 'Running',
        readWhitePaper: 'Whitepaper',
        website: 'OfficialSite',
        volume: 'Volume',
        totalPrice: 'crowdfunding',
        crowdfunding: 'DAICO',
        calculate: 'million ',
        concept: 'Notion',
        technology: 'Tech',
        issuance: 'Offering',
        issueNumber: ' Circulation',
        crowdPrice: 'Price',
        startTime: 'StartTime',
        endTime: 'EndTime',
        laterStart: 'Starts in ',
        order: 'Subscribe',
        residue: 'The rest',
        limit: ' Scope of change ',
        walletAddress: 'Contract address',
        qrCode: 'QR Code',
        buySuccess: 'Success！',
        warn: ' Risk warning: AFD  has fulfilled its obligation to review compliance with crowdfunding projects. Investors are expected to be aware of and be cautious about the risk nature of their investments ',
        timeLeft: 'the rest time of this crowdfunding',
        sorry: 'Sorry，nothing with this category，Try other content',
        day: 'Day',
        disclaimer: 'Disclaimer',
        more: 'More',
        remain: 'Time left',
        later: 'Later',
        instantStart: 'Start soon',
        hour: 'Hour',
        minute: 'Min',
        second: 'Sec',
        afdAccount: 'You must use the ETH wallet address bound by AFD account ',
        purchaseRoute: 'OTC platform for buying ETH',
        fireIcon: 'Huobi’s official website',
        financing: 'Financing service agency agreement',
        publishingProtocol: 'Advertising agreement',
    },
    projectList: {
        tokenName: 'Token Name',
        desc: 'Intro',
        price: 'Price',
        status: 'Condition',
        updateTime: 'turnover time',
        notic: 'After successful crowdfunding, the corresponding token will be directly recharged into your wallet. If failed, ETH will return the original route to your wallet address',
        currency: 'successful transaction',
        coin: 'successful return',
        currencyIn: 'transaction in process',
        coinIn: 'returning in process',
        currencyFailed: 'failed transaction',
        coinFailed: 'failed return',
    },
    invite: {
        inviteUser: 'Invite',
        info: 'The revenue of the invited users to continue to click on the ads in the future will be distributed to you in the form of AFDT',
        inviteImg: 'Invitation picture',
        inviteLink: 'Invite link',
        copyLink: 'Click me to copy the link',
        copyImg: 'Or copy the invitation below',
        num: 'No.',
        timer: 'Date of joining',
        userAccout: 'Invited users',
        getAfd: 'Get AFD',
        inviteInfo: 'Hey investor,have you suffered a loss?Come to AFD Chain ,I will feed you!Send a bear market strategy to you，invite you to register and divide 99999 AFDT.Registration with invitation code can get 66AFDT ，and 33AFDT for each invitation.Mining every day and enjoy bonuses!',
    },
    setting: { // 账号设置
        setInfo: 'Set',
        headUrl: 'Profile Pic.',
        nickname: 'Nickname',
        enterNickname: 'Please enter your Nickname',
        changeNickname: 'New NIckname',
        email: 'Email',
        bindEmail: 'Bind your Email',
        enterBindEmail: 'Enter your Email',
        once: 'Try again later',
        telegram: 'binding Telegram',
        limit: 'the limit of the ID is 32 characters',
        limitName: 'please input the name within 64 characters',
        getEmailCode: ' Get the email verification code ',
        enterEmailCode: ' Please enter the email verification code ',
        binded: ' Binded',
        goBind: ' Go bind',
        authentication: 'Authentication ',
        auth: 'ID card',
        passport: 'Passport',
        fillInformation: 'Fill in the information ',
        country: 'Your country',
        pleaseSelect: 'Please select ',
        identityFileType: 'Id type',
        identityFileNumber: 'Id number',
        name: 'Name',
        limit: 'Please enter the correct ID number',
        limitIdType: 'Please select the ID type',
        pleaseIdType: 'Please select the ID type first',
        limitName: 'English letters or Chinese characters only',
        limitCountry: 'Country',
        identityFile: 'Hand-held ID portrait page',
        imgFile: 'Upload three different ID photos',
        notic: 'Notice',
        noticOne: '1.Photos must be in PNG or JPEG (.jpg .jpeg .jpe .jfif .jif) format',
        noticTwo: '2.Photos must be clear and high-resolution, with all information clearly visible',
        noticThree: '3. Photos and documents must not be edited or manipulated',
        noticFour: '4.Documents presented must be original (not copies),and color photos only',
        noticFive: '5.ID must be valid (for example, passports that have expired will not be accepted)',
        noticSix: '6. Only one person per photo and your face must be clearly visible ',
        noticSeven: '7.The handwritten note must say “AFDchain” and the exact date',
        tips: 'Tips',
        review: 'The authentication application was submitted, Checking',
        nopass: 'The authentication application was not passed，please be noted',
        pass: 'The authentication was passed successfully',
    },
    passwordInfo: { // 更改密码、交易密码
        passwords: 'password',
        oldPassword: 'The original password ',
        newPassword: 'The new password ',
        oncePassword: 'Confirm new password ',
        enterOPassword: 'Please enter the original password ',
        enNewPassword: 'Please enter the new password ',
        oldPasswordEmpty: 'The original password cannot be empty ',
        newPasswordEmpty: 'The new password cannot be empty ',
        tradePassword: 'Trade password ',
        oldTradePassword: 'The old trade password ',
        newTradePassword: 'The new trade password ',
        onceTradePassword: 'Confirm transaction password ',
        enterTPassword: 'Please enter the original transaction password ',
        enterNTPassword: 'Please enter the new transaction password ',
        enterOTPassword: 'Please enter your confirmation password ',
        setPassword: 'Set the password ',
        changePassword: 'Change the password ',
        setTradePassword: 'Set the transaction password ',
        changeTradePassword: 'Change transaction password ',
        enterTradePassword: 'Please enter your transaction password ',
    },
    personal: { // 个人中心
        purse: 'Wallet',
        revenue: 'Advertising revenue account ',
        main: "Advertiser's account ",
        crowdfunding: ' My crowdfunding ',
        myCrowdfunding: 'My participation',
        vote: 'My vote ',
        invite: 'Invite',
        settings: 'Settings',
        adserving: 'Advertising',
        project: 'Crowdfunding project parties',
        Investors: 'Investors ',
        partner: 'Partner',
        exchange: 'Exchange ',
        medium: 'Media ',
        loginOut: 'Log out ',
    },
    purse: {
        balance: 'Balance ',
        bindWalletAddress: "Bind your wallet address to withdrawal advertising revenue from platform, check your advertiser's recharge records, and check your account balance ",
        main: 'This means that: ',
        one: '1、The ETH wallet address will be used to receive the platform token AFDT based on the ERC20 protocol ',
        two: '2、If you need to advertise, you need to deposit from this address for verification',
        three: "3、Cannot bind the exchange's wallet address",
        eth: 'ETH wallet address ',
        wallet: 'Wallet',
    },
    buttonAll: {
        confirm: 'Confirm',
        affirm: 'Confirm',
        cancle: 'Cancel',
        submitVerification: 'Submit verification ',
        bind: 'Bind',
        change: 'Change',
        revise: 'Revise',
        save: 'Save',
        add: 'Add',
        delete: 'Delete',
        submits: 'Submit',
        saveChange: 'Save changes',
        finish: 'Complete',
        ok: 'OK',
    },
    initiated: {
        iInitiated: 'The crowdfunding I initiated',
        token: 'Token name',
        desc: 'Description ',
        lowTop: 'Hard cap',
        degree: 'Degree',
        status: 'Status',
        newCrowd: 'Apply for new crowdfunding',
        review: 'Pending review',
        over: 'Already on the shelves',
        refuse: 'Review failed',
        statusUpdate: 'Status update time',
    },
    project: { // 广告收益账户以及主账户
        balance: 'Balance',
        ethWalletAddress: 'ETH wallet address',
        withdraw: 'Withdrawal',
        recharge: 'Recharge',
        moneyAccount: 'Receiving account',
        enterMoneyAccount: 'Please enter your account ',
        useBalance: 'Available Balance ',
        freeze: 'Freeze',
        handlingFee: ' Fee',
        arrival: 'Amount to account',
        revenue: ' Advertising revenue account ',
        myWallet: ' My wallet',
        withdrawal: 'Withdrawal',
        enterMoney: 'please input your withdraw amount',
        emptyMoney: 'withdraw amount at least is 10000',
        notic: 'After the recharge amount is received, the corresponding amount will automatically appear in the advertiser\'s account. ',
        requireWithdraw: 'withdraw application was submitted',
    },
    accountFlow: {
        accountStatement: 'Account statement',
        startTime: 'Start date',
        endTime: 'End date ',
        search: 'Search',
        status: 'Status',
        dataTime: 'Date',
        desc: 'Description ',
        flowDirection: 'Flow direction ',
        amountOfMoney: 'Amount(AFDT)',
        withdrawals: 'Withdraw records',
        income: 'Revenue records',
        revenue: 'advertisement revenue',
        rechargeRecord: 'recharge records',
        expenses: 'expense records',
        transfer: 'transfer to wallet',
        deduction: 'deduction of advertisement',
        insufficient: 'not sufficient balance',
        withdraw: 'Application submitted',
        successTransfer: 'Successful transfer',
        passReview: 'Pending transfer (approval)',
        onReview: 'Pending review',
        refuseReview: 'Unqualified review',
        fail: 'Transfer failed',
        transfer: 'Transfer',
    },
    adServing: {
        adSer: 'Ad serving',
        trafficking: 'Serving content management ',
        averagePrice: 'Current average price',
        adjustment: 'Adjustment ',
        strategy: 'Bidding strategy ',
        all: 'Home',
        prompt: 'The bidding strategy adjustment will take effect from 00:00:00 the next day in Singapore time, only once a day. ',
        currentPosition: 'present location（location）',
        banner: 'upload banner',
        totalnumber: 'total clicking（clicks）',
        stop: 'data stopped by ',
        yestoday: 'yesterday clicking（clicks）',
        accountMoney: 'account balance of advertisement',
        pleaseSetPassword: 'Please go to the account settings and set the transaction password',
    },
    projectNotic: {
        title: 'Project Description ',
        notic: 'Please fill in the information as much as possible so that the investment committee can reasonably evaluate your project (both parties should strictly abide by the confidentiality obligations during the evaluation period)',
        newApplication: 'Crowdfunding application ',
    },
    team: {
        emptyCore: 'Core team member cannot be empty',
        emptyConsultant: 'Consultant cannot be empty',
        teamInfo: 'Team',
        teamName: 'Name',
        teamPhone: 'Contact',
        teamAddress: 'Address',
        coreMember: 'Core member ',
        consultant: 'Consultant',
        openCoreMember: 'Click to open the core member ',
        openConsultant: 'Click to open the consultant member ',
        name: 'Full name ',
        title: 'Title',
        desc: 'Introduction ',
        operating: 'Operating ',
        enterTeamName: 'Enter your team name',
        enterTeamPhone: 'Enter your team contact info',
        enterTeamAddress: 'Enter your team address',
        enterName: 'Enter your full name ',
        enterTitle: 'Enter your title',
        enterDesc: 'Enter an introduction',
        emptyTeamName: 'Team name cannot be empty (limited to 80 characters)',
        emptyTeamPhone: 'Team contact cannot be empty (limited to 64 characters)',
        emptyTeamAddress: 'The team address cannot be empty (limited to 128 characters)',
        emptyName: 'Full name cannot be empty (limited to 64 characters)',
        emptyTitle: 'Title cannot be empty (limited to 64 characters)',
        emptyDesc: 'Introduction cannot be empty (limited to 200 characters)',
    },
    projectInfo: {
        info: 'Project Status ',
        projectName: 'Name',
        projectDesc: 'Description',
        concept: 'Concept ',
        technology: 'Technology ',
        enterProjectName: 'Please enter the project name',
        enterProjectDesc: 'Please enter a project description ',
        enterTechnology1: 'Please enter technology 1',
        enterTechnology2: 'Please enter technology 2',
        emptyProjectName: 'Project name cannot be empty (limited to 64 characters)',
        emptyProjectDesc: 'Project description cannot be empty (limited to 512 characters)',
    },
    tokenInfo: {
        token: 'Token issue',
        tokenIntro: 'Token information',
        english: 'English abbreviation',
        chinese: 'Chinese abbreviation',
        englishName: 'English full name',
        logo: 'logo',
        enterEnglish: 'Please enter English shorthand ',
        enterChinese: 'Please enter Chinese shorthand ',
        enterFullEnglish: 'Please enter your full English name',
        emptyEnglish: 'English shorthand can not be empty (limited to 8 characters)',
        emptyFullEnglish: 'English full name cannot be empty (limited to 64 characters)',
        emptyLogo: 'Logo cannot be empty',
        title: 'Current round of crowdfunding title',
        issueTotal: 'Total supply',
        total: 'Total crowdfunding',
        thisIssue: 'This round of circulation',
        price: 'Crowdfunding price',
        limit: 'Exchange limit for single account',
        money: 'Target currency',
        topLimit: 'Hard cap',
        lowLimit: 'Soft cap',
        dataTime: 'This round of crowdfunding time',
        files: 'Compliance document',
        companyName: 'Company name',
        companycode: 'company ID',
        about: 'Related license ',
        upload: 'Upload',
        download: 'Dowmload',
        startTime: 'Start date ',
        to: 'To',
        endTime: 'End date ',
        enterTitle: 'Please enter this round of crowdfunding title',
        enterIssueTotal: 'Please enter the total supply of the issue',
        enterTotal: 'Please enter the total amount of crowdfunding',
        enterThisIssue: 'Please enter this round of circulation',
        enterPrice: 'Please enter the crowdfunding price',
        enterLimit: 'Please enter the exchange restriction for single account',
        enterMoney: 'Please enter the target currency',
        enterTopLimit: 'Please enter the release hard cap',
        enterLowLimit: 'Please enter the release soft cap ',
        enterCompanyName: 'Please input the company name',
        enterCompanycode: 'please input company ID',
        emptyTitle: 'Please enter the round of crowdfunding title (limited to 64 characters)',
        emptyIssueTotal: 'Please enter the total supply of the issue (limited numbers up to 10 characters)',
        emptyTotal: 'Please enter the total amount of crowdfunding (limited numbers up to 10 characters)',
        emptyThisIssue: 'Please enter the current circulation (limited numbers up to 10 characters)',
        emptyPrice: ' Please enter the crowdfunding price (limited numbers up to 10 characters)',
        emptyLimit: 'Please enter the exchange restriction for single account（limited numbers up to 10 characters）',
        emptyMoney: 'Please enter the target currency（limited to 20 characters）',
        emptyTopLimit: 'Please enter the release hard cap（limited numbers up to 10 characters）',
        emptyLowLimit: ' Please enter the release soft cap（limited numbers up to 10 characters）',
        emptyDadataTime: ' Please enter this round of crowdfunding time ',
        emptyFiles: ' Compliance documents can not be empty',
        emptyCompanyName: 'Company name cannot be empty (limited to 64 characters)',
        emptyCompanycode: 'Company ID cannot be empty (limited to 20 characters)',
        emptyAbout: ' The relevant licence cannot be empty',
        emptyStatement: 'please choose the disclaimer',
        uploadError: 'Upload failed',
    },
    aboutLink: {
        linkInfo: 'Related Links',
        website: ' Official website',
        whitePaper: 'Whitepaper address ',
        websiteName: 'Website name',
        websiteAddress: ' Website address',
        enterWebsite: ' Please enter the official website',
        enterWhitePaper: ' Please enter the whitepaper address ',
        enterWebsiteNameZh: 'Site Chinese name',
        enterWebsiteNameEn: 'Site English name',
        enterWebsiteAddress: ' Please enter the website address',
        emptyWebsite: ' The official website can not be empty (qualified website address)',
        emptyWhitePaper: ' Whitepaper address cannot be empty（qualified website address）',
        emptyAddress: 'user-defined address need be website address',
        englishLimit: 'Site English names can only be entered in English letters or numbers',
        chineseLimit: 'Site Chinese name can only input Chinese characters or numbers',
        enterChineseName: 'Please enter the Chinese name of the site',
        enterEnglishName: 'Please enter the English name of the site',
        enterAddress: 'Please enter the site address',
    },
    messageCode: { // 后台返回数据
        exceptions: ' System exception',
        success: 'Successful operation',
        failure: 'Operation failed ',
        registered: 'Registered successfully ',
        userNotExist: ' User does not exist, can not log in ',
        notRegister: ' User already exists and cannot register',
        tooManyUsers: ' There are too many users to log in',
        disabled: ' The user is disabled and cannot log in',
        alreadyBound: ' The user has been bound to the mailbox and cannot be re-bound',
        wrongPassword: ' Password error, unable to log in ',
        originalPassword: ' The original password is incorrect, please re-enter',
        transactionPassword: ' The original transaction password is incorrect, please re-enter',
        verificationCode: ' Verification code error',
        codeSendSuccess: ' The verification code was sent successfully',
        codeSendFaild: ' Verification code sending failed ',
        codeSentTooFrequently: ' The verification code is sent too frequently. Please try again later',
        codeNotExist: ' Invitation code does not exist ',
        bindedTelegram: ' The telegram account has already registered the platform account and cannot be bound',
        onShelves: ' Crowdfunding information is on the shelves and cannot be modified',
        underReview: ' Cannot be modified in crowdfunding information review ',
        notApplyAgain: ' Your ad already exists and can not re-apply',
        loginInvalid: ' Login failed, please login again ',
        noBindEmail: 'this account has not bind the email',
        illegal: 'illegal advertisement',
        remove: 'Advertisement offline',
        invalid: 'Invalid Mining',
        exist: 'The crowdfunding is not existing',
        existed: 'The transaction code is already existed',
        passwordExisted: 'The password is already existed',
        unableBind: 'The wallet address was binding ，cannot contiue',
        itemNoExist: 'the advertisement project is not existed',
        noSetConcept: 'the advertisement has not been defined',
    },
    footer: {
        partner: 'cooperative partner',
        Wechat: 'Wechat public number',
        Cooperation: 'Cooperation',
        AFD: 'AFD CHAIN FOUNDATION',
        LTD: 'LTD',
    },
    ...enLocale,
};
export default en
;
