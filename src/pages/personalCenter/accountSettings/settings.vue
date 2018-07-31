<template>
	<div>
		<div>
			<div class="title">{{$t('setting.setInfo')}}</div>
			<div class="settings_box">
				<el-collapse class="top" v-model="activeName" accordion>
					<el-collapse-item  name="1">
						<template slot="title">
						      {{$t('setting.headUrl')}}
						      <i class="custom-element-icon-duihao1 icons"></i>
						      <i v-if="existImg" class="custom-element-icon-duihao1 icons green"></i>
						</template>
						<div>
							<div class="el-collapse-item__content">
								<div class="el-collapse-item__content_img">
									<img :src="imgsrc" />
								</div>
								<div class="el-collapse-item__content_imgs">
									<div class="el-collapse-item__content_imgs_box" v-for="(item, index) in imgData" :key="index">
										<img @click="selectImg(item)" :src="item" />
									</div>
								</div>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item name="2">
						<template slot="title">
						      {{$t('setting.nickname')}}
						      <i class="custom-element-icon-duihao1 icons"></i>
						      <i v-if="existNickname" class="custom-element-icon-duihao1 icons green"></i>
						</template>
						<div class="el-collapse-item__content">
							<div class="el-collapse-item__content-box">
								<h3>{{$t('setting.changeNickname')}}</h3>
								<el-input :placeholder="$t('setting.enterNickname')" v-model="nickName"></el-input>
								<span v-show="errors.has('nickName')" class="help is-danger">{{ errors.first('nickName') }}</span>
								<div class="el-collapse-item__content-box_buttonBox">
									<button class="cancle" @click="cancle">{{$t('buttonAll.cancle')}}</button>
									<button @click="changeNickName">{{$t('buttonAll.confirm')}}</button>
								</div>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item name="3">
						<template slot="title">
						      {{$t('setting.email')}}
						      <i class="custom-element-icon-duihao1 icons"></i>
						      <i v-if="existEmail" class="custom-element-icon-duihao1 icons green"></i>
						</template>
						<div class="el-collapse-item__content">
							<div class="el-collapse-item__content-box">
								<h3>{{$t('setting.bindEmail')}}</h3>
								<p>
									<el-input :placeholder="$t('setting.enterBindEmail')" v-model="bindEmail"></el-input>
									<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
								</p>
								<div style="position: relative;">
									<el-input :placeholder="$t('setting.enterEmailCode')" v-model="code"></el-input>
									<div class="el-button-getCode password">
										<span>|</span>
										<el-button v-if="disable" type="text" @click="getCode">{{$t('setting.getEmailCode')}}</el-button>
										<el-button v-if="!disable" disabled type="text">(<span>{{num}}</span>s){{$t('setting.once')}}</el-button>
									</div>
								</div>
								<div class="el-collapse-item__content-box_buttonBox">
									<button class="cancle" @click="cancle">{{$t('buttonAll.cancle')}}</button>
									<button @click="toBindEmail">{{$t('buttonAll.confirm')}}</button>
								</div>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item name="4">
						<template slot="title">
						      {{$t('passwordInfo.passwords')}}
						      <i class="custom-element-icon-duihao1 icons"></i>
						      <i v-if="existPassword" class="custom-element-icon-duihao1 icons green"></i>
						</template>
						<div class="el-collapse-item__content">
							<div class="el-collapse-item__content-box">
								<h3 v-if="!existPassword">{{$t('passwordInfo.setPassword')}}</h3>
								<h3 v-if="existPassword">{{$t('passwordInfo.changePassword')}}</h3>
								<p>
									<el-input v-if="existPassword" :placeholder="$t('passwordInfo.oldPassword')" v-model="oldPassword"></el-input>
								</p>
								<p>
									<el-input type="password" :placeholder="$t('passwordInfo.newPassword')" v-model="newPassword"></el-input>
								</p>
								<p>
									<el-input type="password" :placeholder="$t('passwordInfo.oncePassword')" v-model="oncePassword"></el-input>
								</p>
								<div style="position: relative;">
									<el-input :placeholder="$t('setting.enterEmailCode')" v-model="codePassword"></el-input>
									<div class="el-button-getCode password">
										<span>|</span>
										<button class="el-button-getCode_button" v-if="disabledPassword" @click="getPasswordCode()">{{$t('setting.getEmailCode')}}</button>
										<el-button v-if="!disabledPassword" disabled type="text">(<span>{{numPassword}}</span>s){{$t('setting.once')}}</el-button>
									</div>
								</div>
								<div class="el-collapse-item__content-box_buttonBox">
									<button class="cancle" @click="cancle">{{$t('buttonAll.cancle')}}</button>
									<button v-if="!existPassword" @click="setPassword">{{$t('buttonAll.confirm')}}</button>
									<button v-if="existPassword" @click="changePassword">{{$t('buttonAll.confirm')}}</button>
								</div>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item name="5">
						<template slot="title">
						      {{$t('passwordInfo.tradePassword')}}
						      <i class="custom-element-icon-duihao1 icons"></i>
						      <i v-if="existTradePassword" class="custom-element-icon-duihao1 icons green"></i>
						</template>
						<div class="el-collapse-item__content">
							<div v-if="!existTradePassword" class="el-collapse-item__content-box">
								<h3>{{$t('passwordInfo.setTradePassword')}}</h3>
								<p>
									<el-input type="password" :placeholder="$t('passwordInfo.tradePassword')" v-model="tradePassword"></el-input>
								</p>
								<p>
									<el-input type="password" :placeholder="$t('passwordInfo.onceTradePassword')" v-model="onceSetTradePassword"></el-input>
								</p>
								<div style="position: relative;">
									<el-input :placeholder="$t('setting.enterEmailCode')" v-model="codeTradePassword"></el-input>
									<div class="el-button-getCode password">
										<span>|</span>
										<button class="el-button-getCode_button" v-if="disabledTradePassword" @click="getchangeTradePasswordCode">{{$t('setting.getEmailCode')}}</button>
										<el-button v-if="!disabledTradePassword" disabled type="text">(<span>{{numTradePassword}}</span>s){{$t('setting.once')}}</el-button>
									</div>
								</div>
								<div class="el-collapse-item__content-box_buttonBox">
									<button class="cancle" @click="cancle">{{$t('buttonAll.cancle')}}</button>
									<button @click="setTradePassword">{{$t('buttonAll.confirm')}}</button>
								</div>
							</div>
							<div v-if="existTradePassword" class="el-collapse-item__content-box">
								<h3>{{$t('passwordInfo.changeTradePassword')}}</h3>
								<p>
									<el-input :placeholder="$t('passwordInfo.oldTradePassword')" v-model="oldTradePassword"></el-input>
								</p>
								<p>
									<el-input type="password" :placeholder="$t('passwordInfo.newTradePassword')" v-model="newTradePassword"></el-input>
								</p>
								<p>
									<el-input type="password" :placeholder="$t('passwordInfo.onceTradePassword')" v-model="onceTradePassword"></el-input>
								</p>
								<div style="position: relative;">
									<el-input :placeholder="$t('setting.enterEmailCode')" v-model="codeTradePassword"></el-input>
									<div class="el-button-getCode password">
										<span>|</span>
										<button class="el-button-getCode_button" v-if="disabledTradePassword" @click="getchangeTradePasswordCode">{{$t('setting.getEmailCode')}}</button>
										<el-button v-if="!disabledTradePassword" disabled type="text">(<span>{{numTradePassword}}</span>s){{$t('setting.once')}}</el-button>
									</div>
								</div>
								<div class="el-collapse-item__content-box_buttonBox">
									<button class="cancle" @click="cancle">{{$t('buttonAll.cancle')}}</button>
									<button @click="changeTradePassword">{{$t('buttonAll.confirm')}}</button>
								</div>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item class="border-none" name="6">
						<template slot="title">
						    {{$t('setting.telegram')}}
						    <i class="custom-element-icon-duihao1 icons"></i>
						    <i v-if="isBindTelegram" class="custom-element-icon-duihao1 icons green"></i>
						</template>
						<div class="el-collapse-item__content">
							<ul class="el-collapse-item__content_item">
								<!-- <li class="el-collapse-item__content_item_li">新浪微博
									<a>去绑定</a>
								</li>
								<li class="el-collapse-item__content_item_li">腾讯qq
									<a>去绑定</a>
								</li> -->
								<li class="el-collapse-item__content_item_li">
                                    <telegram-login mode="callback" :telegram-login="telegramBot" @callback="callbackFunction"></telegram-login>
								</li>
								<!-- <li class="el-collapse-item__content_item_li">微信
									<a>去绑定</a>
								</li>
								<li class="el-collapse-item__content_item_li">小鸟
									<a>去绑定</a>
								</li>
								<li class="el-collapse-item__content_item_li">f
									<a>去绑定</a>
								</li> -->
							</ul>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
		<div class="title">{{$t('setting.authentication')}}</div>
		<el-dialog :title="$t('messageNotice.giveyou')" :visible.sync="dialogVisible" width="30%">
			<span>{{$t('messageNotice.giveyou')}}</span>
			<div>
				<p>{{$t('passwordNotic.one')}}</p>
				<p>{{$t('passwordNotic.two')}}</p>
				<p>{{$t('passwordNotic.three')}}</p>
				<p>{{$t('passwordNotic.four')}}</p>
			</div>
			<span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible = false">{{$t('buttonAll.cancle')}}</el-button>
				</span>
		</el-dialog>
		<div class="settings_box">
			<el-collapse class="top" v-model="active" accordion>
				<el-collapse-item class="border-none" name="1">
					<template slot="title">
					    {{$t('setting.fillInformation')}}
					    <i class="custom-element-icon-duihao1 icons"></i>
						<i v-if="authStatus == 1" class="custom-element-icon-duihao1 icons green"></i>
					</template>
						<ul v-if="authStatus!=1" class="el-collapse-item__content_authentication">
							<li class="el-collapse-item__content_authentication_li">
								<label>{{$t('setting.name')}}</label>
								<input class="el-collapse-item__content_authentication_li_info" @blur="name" v-model="realName" />
							</li>
							<li class="el-collapse-item__content_authentication_li">
								<label>{{$t('setting.identityFileType')}}</label>
								<el-select v-model="idType" clearable :placeholder="$t('setting.pleaseSelect')">
									<el-option v-for="item in idTypeData" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</li>
							<li class="el-collapse-item__content_authentication_li">
								<label>{{$t('setting.identityFileNumber')}}</label>
								<input class="el-collapse-item__content_authentication_li_info" @blur="text" v-model="idNum" />
							</li>
							<li class="el-collapse-item__content_authentication_li">
								<label>{{$t('setting.country')}}</label>
								<el-select v-model="country" filterable clearable :placeholder="$t('setting.pleaseSelect')">
									<el-option v-for="item in countryData" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</li>
							<li class="el-collapse-item__content_authentication_li last">
								<h4 class="el-collapse-item__content_authentication_li_identityUpload">{{$t('setting.identityFile')}}</h4>
								<div>
									<el-upload class="avatar-uploader" 
										:show-file-list="false" 
										:action="uploadImg"
										:headers="requestToken"
										:limit="1"
										accept=".jpg,.png"
										:on-success="getImg">
										<img v-if="imageUrl" :src="imageUrl" class="avatar">
										<i v-else class="el-icon-plus custom-element-icon-shangchuanzhaopian avatar-uploader-icon"></i>
									</el-upload>
								</div>
								<div class="el-collapse-item__content_authentication_li_precautions">
									<p class="el-collapse-item__content_authentication_li_precautions_title">{{$t('setting.notic')}}</p>
									<ol class="el-collapse-item__content_authentication_li_precautions_item">
										<li class="el-collapse-item__content_authentication_li_precautions_item_li">{{$t('setting.noticOne')}}</li>
										<li class="el-collapse-item__content_authentication_li_precautions_item_li">{{$t('setting.noticTwo')}}</li>
										<li class="el-collapse-item__content_authentication_li_precautions_item_li">{{$t('setting.noticThree')}}</li>
										<li class="el-collapse-item__content_authentication_li_precautions_item_li">{{$t('setting.noticFour')}}</li>
									</ol>
								</div>
							</li>
						</ul>
						<div class="withdraw" v-if="authStatus == 2 || authStatus == 3">
							<div class="withdraw_box" style="text-align: center;width: 400px;height: 200px;">
								<p class="notic"><i class="custom-element-icon-weibiaoti1psd"></i><span class="noticText">{{$t('setting.tips')}}</span></p>
								<p class="notic" v-if="authStatus == 2">{{$t('setting.review')}}</p>
								<p class="notic" v-if="authStatus == 3">{{$t('setting.nopass')}}</p>
								<button class="commit" style="margin: 0;" @click="close">{{$t('buttonAll.affirm')}}</button>
							</div>
						</div>
						<button class="commit" v-if="authStatus != 1" @click="authentication">{{$t('buttonAll.submitVerification')}}</button>
					<div v-if="authStatus == 1">
						<p class="notic"><i class="custom-element-icon-shenfenrenzheng auth"></i><span class="noticText">{{$t('setting.tips')}}</span></p>
						<p class="notic">{{$t('setting.pass')}}</p>
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>
<script>
	import Config from '../../../utils/config.js';
	import Request from '../../../utils/require.js';
	import Cache from '../../../utils/cache';
	import Utils from '../../../utils/util';
	import Country from '../../../utils/countrys';
	import validateFun from '../../../utils/validate.js';
	export default {
		data() {
			return {
                utils: new Utils(),
                telegramBot: Config.TelegramBot,
                nickName: this.$store.state.usernickname || Cache.getSession('bier_usernickname'),
				activeName: '',
				active: '',
				bindEmail: "",
				oldPassword: "",
				newPassword: "",
				oncePassword: "",
				tradePassword: '',
				onceSetTradePassword: '',
				oldTradePassword: "",
				newTradePassword: "",
				onceTradePassword: "",
				code: "",
				codePassword: '',
				codeTradePassword: '',
				/*身份验证*/
				country: "",
				countryData: Country.country,
				idNum: "",
				idType: "",
				idTypeData: [{
					value: '身份证',
					label: '身份证'
				}, {
					value: '护照',
					label: '护照'
				}],
				realName: "",
				imageUrl: '',
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
				username: this.$store.state.username || Cache.getSession('bier_username'),
				token: this.$store.state.token || Cache.getSession('bier_token'),
				dialogVisible: false,
				disable: true,
				disabledTradePassword: true,
				disabledPassword: true,
				num: 60,
				numPassword: 60,
				numTradePassword: 60,
				imgData: Config.headPortrait,
				imgsrc: this.$store.state.heardUrl || Cache.getSession('bier_heardUrl') || Config.headPortrait[5],
				existEmail: false,
				existPassword: false,
				existTradePassword: false,
                isBindTelegram: false,
                existImg:'',
                existNickname:'',
                authStatus:'',
                uploadImg: Config.UploadImg,
                requestToken: {
					token:
                        this.$store.state.token ||
                        Cache.getSession('bier_token')
				},
			}
		},
		// computed:{
		// 	nickName(){
		// 		return this.$store.state.usernickname || Cache.getSession('bier_usernickname');
		// 	}
		// },
		mounted() {
			this.info();
		},
		methods: {
			close(){
				this.active = '';
			},
			cancle(){
				this.activeName = '';
				this.oldPassword = '';
				this.newPassword = '';
				this.oncePassword = '';
				this.tradePassword = '';
				this.onceSetTradePassword = '';
				this.oldTradePassword = '';
				this.newTradePassword = '';
				this.onceTradePassword = '';
				this.code = '';
				this.codePassword = '';
				this.codeTradePassword = '';
			},
			info(){
				Request({
					url: 'QuerySettings',
					type: 'get',
				}).then(res => {
					this.authStatus = res.data.authStatus;
					this.bindEmail = res.data.Email;
					this.existEmail = res.data.existEmail;
					this.existPassword = res.data.existPassword;
					this.existTradePassword = res.data.existTradePassword;
					this.isBindTelegram = res.data.isBindTelegram;
					this.existImg = res.data.nickname;
					this.existNickname = res.data.heardUrl;
				})
            },
            // telegram 绑定回调
            callbackFunction(user) {
				// console.log('hanguishuai_bot_>', user);
				Request({
					url: 'BindTelegram',
					data: user,
					flag: true,
				}).then(res => {
                    // console.log('bind success->', res);
                    this.info();
				})
			},
			setPassword() { //设置密码
				var reg = new RegExp();
				var str = this.newPassword;
				var value = /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.{8,16}$/.test(str) && str !== this.username;
				if(value) {
					if(this.newPassword === this.oncePassword) {
						Request({
							url: 'SetPassword',
							data: {
								verificationCode: this.codePassword,
								password: validateFun.encrypt(this.newPassword),
							},
							type: 'post',
							flag: true
						}).then(res => {
							this.$message({
								message:this.$t('messageNotice.setSuccess'),
								type:'success'
							});
							this.info();
							this.cancle();
						})
					} else {
						this.$message({
							message:this.$t('messageNotice.oncePasswordEqual'),
							type:'warning'
						});
					}
				} else {
					this.dialogVisible = true;
				}
			},
			setTradePassword() { //设置交易密码
				var reg = new RegExp();
				var str = this.tradePassword;
				var value = /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.{8,16}$/.test(str) && str !== this.username;
				if(value) {
					if(this.tradePassword === this.onceSetTradePassword) {
						Request({
							url: 'SetTradePassword',
							data: {
								verificationCode: this.codeTradePassword,
								password: validateFun.encrypt(this.tradePassword),
							},
							type: 'post',
							flag: true
						}).then(res => {
							this.$message({
								message:this.$t('messageNotice.setTradePassword'),
								type:'success'
							});
							this.info();
							this.cancle();
						})
					} else {
						this.$message({
							message:this.$t('messageNotice.oncePasswordEqual'),
							type:'warning'
						});
					}
				} else {
					this.dialogVisible = true;
				}
			},
			selectImg(url) {
				Request({
					url: 'QueryAccountSettings',
					data: {
						id: this.accountId,
						headUrl: url,
					},
					type: 'post',
					flag: true
				}).then(res => {
						this.imgsrc = url;
						this.$store.commit('setHeardUrl', url);
						Cache.setSession('bier_heardUrl', url);
						this.$message({
							message:this.$t('messageNotice.changeSuccess'),
							type:'success'
						});
						this.info();
				})
			},
			getCode() {
				if(this.bindEmail) {
					Request({
						url: 'QueryCode',
						data: {
							email: this.bindEmail,
						},
					}).then(res => {
						this.disable = false;
						let timerEmail = setInterval(() => {
							this.num--;
							if(this.num < 1) {
								clearInterval(timerEmail);
								this.disable = true;
								this.num = 60;
							}
						}, 1000);
						this.$message({
							message: this.utils.judgeLanguage(this.$store.state.slangChange, res.message),
							type: 'success'
						});
					})
				} else {
					this.$message({
						message:this.$t('messageNotice.emailEmpty'),
						type:'warning'
					});
				}
			},
			getPasswordCode() {
				Request({
					url: 'QueryPasswordCode',
					data: {
						codeType: 3,
					},
				}).then(res => {
					this.disabledPassword = false;
					let timerPassword = setInterval(() => {
						this.numPassword--;
						if(this.numPassword < 1) {
							clearInterval(timerPassword);
							this.disabledPassword = true;
							this.numPassword = 60;
						}
					}, 1000);
					this.$message({
						message: this.utils.judgeLanguage(this.$store.state.slangChange, res.message),
						type: 'success'
					});
				})
			},
			getchangeTradePasswordCode() {
				Request({
					url: 'QueryPasswordCode',
					data: {
						codeType: 4,
					},
				}).then(res => {
					this.$message({
						message:this.$t('messageNotice.getSuccess'),
						type:'success'
					});
					this.disabledTradePassword = false;
					let timerTradePassword = setInterval(() => {
						this.numTradePassword--;
						if(this.numTradePassword < 1) {
							clearInterval(timerTradePassword);
							this.disabledTradePassword = true;
							this.numTradePassword = 60;
						}
					}, 1000);
					this.$message({
						message: this.utils.judgeLanguage(store.state.slangChange, res.message),
						type: 'success'
					});
				})
			},
			changeTradePassword() {
				var reg = new RegExp();
				var str = this.newTradePassword;
				var value = /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.{8,16}$/.test(str) && str !== this.username;
				if(value) {
					if(this.newTradePassword === this.onceTradePassword) {
						Request({
							url: 'QueryAccountSettings',
							data: {
								id: this.accountId,
								tradePassword: validateFun.encrypt(this.newTradePassword),
								oldTradePassword: validateFun.encrypt(this.oldTradePassword),
								verificationCode: this.codeTradePassword,
							},
							type: 'post',
							flag: true
						}).then(res => {
							this.$message({
								message:this.$t('messageNotice.changeSuccess'),
								type:'success'
							});
							this.info();
							this.cancle();
							this.disabledTradePassword = true;
						})
					} else {
						this.$message({
							message:this.$t('messageNotice.oncePasswordEqual'),
							type:'warning'
						});
					}
				} else {
					this.dialogVisible = true;
				}
			},
			changePassword() {
				var reg = new RegExp();
				var str = this.newPassword;
				var value = /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.{8,16}$/.test(str) && str !== this.username && str === this.oncePassword;
				if(value) {
					Request({
						url: 'QueryAccountSettings',
						data: {
							id: this.accountId,
							oldPassword: validateFun.encrypt(this.oldPassword),
							password: validateFun.encrypt(this.newPassword),
							verificationCode: this.codePassword,
						},
						type: 'post',
						flag: true
					}).then(res => {
						this.info();
						this.out();
					})
				} else {
					this.dialogVisible = true;
				}
			},
			out(){
				Request({
					url: 'SignOut',
					type: 'get',
					data: {
						token: this.token
					}
				}).then(res => {
					this.handleSignOut();
					this.$router.push({
						name: 'index'
					});
				})
			},
			handleSignOut() {
				this.$store.commit('setUserId', undefined);
				this.$store.commit('setUserName', undefined);
				this.$store.commit('setUserNickName', undefined);
                this.$store.commit('setToken', undefined);
                Cache.removeSession('bier_username');
                Cache.removeSession('bier_token');
                Cache.removeSession('bier_userid');
				Cache.getSession('bier_usernickname') && Cache.removeSession('bier_usernickname');
			},
			toBindEmail() { //绑定邮箱
				if(this.bindEmail) {
					Request({
						url: 'QueryAccountSettings',
						data: {
							id: this.accountId,
							email: this.bindEmail,
						},
						type: 'post',
						flag: true
					}).then(res => {
						this.$message({
							message:this.$t('messageNotice.bindSuccess'),
							type:'success'
						});
						this.info();
						this.cancle();
					})
				} else {
					this.$message({
						message:this.$t('messageNotice.emailEmpty'),
						type:'warning'
					});
				}
			},
			changeNickName() { //改昵称
				if(this.nickName) {
					if(this.nickName.length<=8){
						Request({
							url: 'QueryAccountSettings',
							data: {
								id: this.accountId,
								nickname: this.nickName,
							},
							type: 'post',
							flag: true
						}).then(res => {
	                        this.$store.commit('setUserNickName', this.nickName);
	                        Cache.setSession('bier_usernickname', this.nickName);
	                        this.$message({
	                            message: this.$t('messageNotice.changeSuccess'), 
	                            type: 'success'
	                        });
	                        this.info();
	                        this.cancle();
						}).catch(e => {
	                        console.error('change nickname error_>', e);
	                    })
					}else{
						this.$message({
							message:this.$t('messageNotice.nicknameLength'),
							type:'warning'
						});
					}
				} else {
					this.$message({
						message:this.$t('messageNotice.nicknameEmpty'),
						type:'warning'
					});
				}
			},
			authentication() {
				Request({
					url: 'QueryAuthentication',
					data: {
						id: this.accountId,
						country: this.country,
						idType: this.idType,
						idNum: this.idNum,
						realname: this.realName,
						idImg: this.imageUrl
					},
					type: 'post',
					flag: true
				}).then(res => {
						/*this.country = '';
						this.idType = '';
						this.idNum = '';
						this.realName = '';
						this.imageUrl = '';*/
						this.$message({
							message:this.$t('messageNotice.certificationSuccess'),
							type:'success'
						});
						this.info();
				})
			},
			name(){
				if(!this.realName || this.realName.length>64){
					this.$message(this.$t('setting.limitName'));
				}
			},
			text(){
				if(this.idNum.length>32){
					this.$message(this.$t('setting.limit'));
				}
			},
			getImg(res) {
				this.imageUrl = res.data;
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../assets/css/global.scss';
	@import '../../../assets/css/variable.scss';
	@import '../../../assets/css/withdraw.scss';
	@import '../../../assets/css/upload.css';
	.accountSettings {
		padding: 0 28px;
		&_content {
			#shou-feng-qin-xiao-guo {
				margin: 20px 0 30px 0;
			}
		}
	}
	.el-collapse-item__content {
		height: 376px;
		background: rgba(245, 245, 245, 1);
		padding-top: 20px;
		box-sizing: border-box;
		&_img {
			float: left;
			margin: 115px 80px 0 80px;
			img {
				border-radius: 50%;
			}
		}
		&_imgs {
			float: left;
			width: 530px;
			height: 330px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
			padding-top: 6px;
			&_box {
				float: left;
				width: 106px;
				height: 106px;
				img {
					width: 106px;
					height: 106px;
					border-radius: 50%;
				}
			}
		}
		&_authentication {
			&_li {
				height: 70px;
				label{
					vertical-align: middle;
					display:inline-block; 
					width:200px; 
					text-align:right;
					margin-right: 20px;
				}
				&_info{
					width: 222px;
					height: 40px;
					padding: 10px;
					border-radius:4px;
					border:1px solid rgba(216,220,230,1);
					vertical-align: middle;
				}
				&_precautions {
					font-size: 12px;
					color: rgba(153, 153, 153, 1);
					position: absolute;
					top: 6px;
    				left: 570px; 
					&_title {
						font-size: 14px;
						color: rgba(96, 98, 102, 1);
						padding-bottom: 10px;
						border-bottom: 2px solid rgba(245, 245, 245, 1);
					}
					&_item {
						&_li {
							margin-top: 20px;
						}
					}
				}
				&_identityUpload {
					margin: 26px 0 28px 0;
					font-size: 18px;
					color: rgba(96, 98, 102, 1);
				}
				&_box {
					padding-left: 144px;
					overflow: hidden;
					&_one {
						&_title {
							margin: 28px 0;
						}
						&_name {
							width: 220px;
						}
					}
				}
			}
			.last {
				height: auto;
				border: 0;
				padding-left: 144px;
				position: relative;
			}
		}
		&_item {
			height: 376px;
			margin: 17px 0;
			&_li {
				margin-top: 30px;
				margin-right: 20px;
				text-align: right;
				a {
					display: inline-block;
					margin-left: 20px;
				}
			}
		}
		&-box {
			min-width: 395px;
    		max-width: 555px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
			margin: 0 auto;
			padding: 16px 30px 26px;
			position: relative;
			h3 {
				margin-bottom: 10px;
			    font-size: 24px;
			    color: #333333;
			}
			p {
				margin-bottom: 10px;
			}
			&_buttonBox {
				display: flex;
				justify-content: flex-end;
				margin-top: 12px;
				button {
					margin-left: 10px;
					padding: 8px 24px;
					border-radius: 5px;
					font-size: 14px;
					color: rgba(255, 255, 255, 1);
					background: #FF9500;
				}
				.cancle{
				    color: rgba(94,97,102,1);
				    background: #ffffff;
				    border: 1px solid rgba(220,223,230,1);
				}
			}
		}
	}
	.el-upload__text {
		padding: 10px 30px;
		background: #ff9500;
		border-radius: 4px;
		position: absolute;
		bottom: 20px;
		left: 50%;
		margin-left: -44px;
	}
	.commit {
		padding: 10px 17px;
		background: rgba(255, 149, 0, 1);
		border-radius: 4px;
		font-size: 14px;
		color: rgba(255, 255, 255, 1);
		margin: 26px 0 0 144px;
	}
	.avatar-uploader-icon {
		font-size: 130px;
		color: #8c939d;
		width: 400px;
		height: 300px;
		line-height: 300px;
		text-align: center;
		border: 1px solid #EEEEEE;
	}
	.avatar {
		width: 400px;
		height: 300px;
		display: block;
	}
	.el-button-getCode {
		position: absolute;
		top: 0;
		height: 37px;
		line-height: 37px;
		right: 20px;
		font-size: 14px;
		color: rgba(255, 149, 0, 1);
		button {
			font-size: 14px;
			color: rgba(255, 149, 0, 1);
			height: 38px;
			background: transparent;
		}
	}
	.title {
		font-size: 24px;
		color: rgba(51, 51, 51, 1);
		margin: 10px 0 30px 20px;
	}
	.settings_box {
		padding: 0 20px;
		background: #FFFFFF;
	}
	.top{
		border: 0;
	}
	.notic{
		text-align: center;
		font-size: 16px;
		color:rgba(102,102,102,1);
		margin: 10px 0 20px;
	}
	.notic:first-child{
		font-size: 21px;
		color:rgba(51,51,51,1);
		margin: 0;
	}
	.noticText{
		display: inline-block;
		margin-left: 5px;
		font-size: 20px;
	}
	.icons{
		position: absolute;
	    right: 35px;
	    font-size: 18px;
		color: #999999;
	}
	.auth{
		font-size: 24px;
		color: #FF9500;
	}
	.green{
		color: #2a9c2b;
	}
</style>