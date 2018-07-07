<template>
	<div class="accountSettings">
		<div class="accountSettings_content">
			<h3 id="shou-feng-qin-xiao-guo">设置信息</h3>
			<div class="demo-block demo-box demo-zh-CN demo-collapse">
				<div class="source">
					<div role="tablist" aria-multiselectable="true" class="el-collapse">
						<div class="el-collapse-item">
							<div role="tab" aria-controls="el-collapse-content-8983" aria-describedby="el-collapse-content-8983" aria-expanded="true">
								<div role="button" id="el-collapse-head-8983" tabindex="0" class="el-collapse-item__header focusing">
									<i class="el-collapse-item__arrow el-icon-arrow-down" @click="checked(1)"></i> 头像
									<span class="el-collapse-item__header_span" @click="checked(1)">更改</span>
								</div>
							</div>
							<div role="tabpanel" :class="{'button-selected': headPortrait}" aria-labelledby="el-collapse-head-8983" id="el-collapse-content-8983" class="el-collapse-item__wrap" data-old-padding-top="" data-old-padding-bottom="" data-old-overflow="">
								<div class="el-collapse-item__content">
									<div class="el-collapse-item__content_img">

									</div>
									<div class="el-collapse-item__content_imgs">

									</div>
								</div>
							</div>
						</div>
						<div class="el-collapse-item">
							<div role="tab" aria-controls="el-collapse-content-1977" aria-describedby="el-collapse-content-1977">
								<div role="button" id="el-collapse-head-1977" tabindex="0" class="el-collapse-item__header">
									<i class="el-collapse-item__arrow el-icon-arrow-down" @click="checked(2)"></i> 昵称
									<span class="el-collapse-item__header_span" @click="checked(2)">修改</span>
								</div>
							</div>
							<div role="tabpanel" :class="{'button-selected': nickname}" aria-hidden="true" aria-labelledby="el-collapse-head-1977" id="el-collapse-content-1977" class="el-collapse-item__wrap">
								<div class="el-collapse-item__content">
									<div class="el-collapse-item__content-box">
										<h3>修改昵称</h3>
										<el-input placeholder="请输入你的昵称" v-model="nickName"></el-input>
										<span v-show="errors.has('nickName')" class="help is-danger">{{ errors.first('nickName') }}</span>
										<div class="el-collapse-item__content-box_buttonBox">
											<button @click="changeNickName">确定</button>
											<button @click="cancel">取消</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="el-collapse-item">
							<div role="tab" aria-controls="el-collapse-content-5256" aria-describedby="el-collapse-content-5256">
								<div role="button" id="el-collapse-head-5256" tabindex="0" class="el-collapse-item__header">
									<i class="el-collapse-item__arrow el-icon-arrow-down" @click="checked(3)"></i> 邮箱
									<span class="el-collapse-item__header_span" @click="checked(3)">绑定</span>
								</div>
							</div>
							<div role="tabpanel" :class="{'button-selected': email}" aria-hidden="true" aria-labelledby="el-collapse-head-5256" id="el-collapse-content-5256" class="el-collapse-item__wrap">
								<div class="el-collapse-item__content">
									<div class="el-collapse-item__content-box max">
										<h3>绑定邮箱</h3>
										<p>
											<el-input placeholder="请输入你的邮箱" v-validate data-rules="required|email" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" v-model="bindEmail"></el-input>
											<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
										</p>
										<p style="position: relative;">
											<el-input placeholder="请输入你的验证码" v-model="code"></el-input>
											<div class="el-button-getCode">
												<span>|</span>
												<el-button v-if="disabled" type="text"  @click="getCode">获取邮箱验证码</el-button>
												<el-button  v-else disabled type="text">(<span>{{num}}</span>s)后重试</el-button>
											</div>
										</p>
										<div class="el-collapse-item__content-box_buttonBox">
											<button @click="toBindEmail">确定</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="el-collapse-item">
							<div role="tab" aria-controls="el-collapse-content-8128" aria-describedby="el-collapse-content-8128">
								<div role="button" id="el-collapse-head-8128" tabindex="0" class="el-collapse-item__header">
									<i class="el-collapse-item__arrow el-icon-arrow-down" @click="checked(4)"></i> 密码
									<span class="el-collapse-item__header_span" @click="checked(4)">更改</span>
								</div>
							</div>
							<div role="tabpanel" :class="{'button-selected': password}" aria-hidden="true" aria-labelledby="el-collapse-head-8128" id="el-collapse-content-8128" class="el-collapse-item__wrap">
								<div class="el-collapse-item__content">
									<div class="el-collapse-item__content-box bindEmail">
										<h3>修改密码</h3>
										<p>
											<el-input placeholder="旧密码" v-model="oldPassword"></el-input>
										</p>
										<p>
											<el-input placeholder="新密码" v-model="newPassword"></el-input>
										</p>
										<p>
											<el-input placeholder="确认新密码" v-model="oncePassword"></el-input>
										</p>
										<p>
											<el-input placeholder="请输入你的验证码" v-model="code"></el-input>
											<div class="el-button-getCode password">
												<span>|</span>
												<button class="el-button-getCode_button" @click="getCode()">获取邮箱验证码</button>
											</div>
										</p>
										<div class="el-collapse-item__content-box_buttonBox">
											<button @click="changePassword">确定</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="el-collapse-item">
							<div role="tab" aria-controls="el-collapse-content-8128" aria-describedby="el-collapse-content-8128">
								<div role="button" id="el-collapse-head-8128" tabindex="0" class="el-collapse-item__header">
									<i class="el-collapse-item__arrow el-icon-arrow-down" @click="checked(5)"></i> 交易密码
									<span class="el-collapse-item__header_span" @click="checked(5)">更改</span>
								</div>
							</div>
							<div role="tabpanel" :class="{'button-selected': transactionPassword}" aria-hidden="true" aria-labelledby="el-collapse-head-8128" id="el-collapse-content-8128" class="el-collapse-item__wrap">
								<div class="el-collapse-item__content">
									<div class="el-collapse-item__content-box bindEmail">
										<h3>更改交易密码</h3>
										<p>
											<el-input placeholder="旧交易密码" v-model="oldTradePassword"></el-input>
										</p>
										<p>
											<el-input placeholder="新交易密码" v-model="newTradePassword"></el-input>
										</p>
										<p>
											<el-input placeholder="确认新交易密码" v-model="onceTradePassword"></el-input>
										</p>
										<p>
											<el-input placeholder="请输入你的验证码" v-model="code"></el-input>
											<div class="el-button-getCode password">
												<span>|</span>
												<button class="el-button-getCode_button" @click="getCode">获取邮箱验证码</button>
											</div>
										</p>
										<div class="el-collapse-item__content-box_buttonBox">
											<button @click="changeTradePassword">确定</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="el-collapse-item">
							<div role="tab" aria-controls="el-collapse-content-8128" aria-describedby="el-collapse-content-8128">
								<div role="button" id="el-collapse-head-8128" tabindex="0" class="el-collapse-item__header">
									<i class="el-collapse-item__arrow el-icon-arrow-down" @click="checked(6)"></i> Telegram
									<span class="el-collapse-item__header_span" @click="checked(6)">绑定</span>
								</div>
							</div>
							<div role="tabpanel" :class="{'button-selected': telegram}" aria-hidden="true" aria-labelledby="el-collapse-head-8128" id="el-collapse-content-8128" class="el-collapse-item__wrap">
								<div class="el-collapse-item__content">
									<ul class="el-collapse-item__content_item">
										<li class="el-collapse-item__content_item_li">新浪微博
											<a>去绑定</a>
										</li>
										<li class="el-collapse-item__content_item_li">腾讯qq
											<a>去绑定</a>
										</li>
										<li class="el-collapse-item__content_item_li">飞机
											<a>去绑定</a>
										</li>
										<li class="el-collapse-item__content_item_li">微信
											<a>去绑定</a>
										</li>
										<li class="el-collapse-item__content_item_li">小鸟
											<a>去绑定</a>
										</li>
										<li class="el-collapse-item__content_item_li">f
											<a>去绑定</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<h3 id="shou-feng-qin-xiao-guo">身份验证</h3>
			<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
				<span>提示</span>
				<div>
					<p>1、密码长度必须介于8到16个字符之间。</p>
					<p>2、密码只能包含英文字母（A-Z）、数字字符（0-9）以及标点符号。</p>
					<p>3、密码至少包含1个英文字母和1个数字字符。</p>
					<p>4、密码不能与账号相同。</p>
				</div>
				<span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible = false">取 消</el-button>
				</span>
			</el-dialog>

			<div class="demo-block demo-box demo-zh-CN demo-collapse">
				<div class="el-collapse-item">
					<div role="tab" aria-controls="el-collapse-content-8983" aria-describedby="el-collapse-content-8983" aria-expanded="true">
						<div role="button" id="el-collapse-head-8983" tabindex="0" class="el-collapse-item__header focusing">
							<i class="el-collapse-item__arrow el-icon-arrow-down" @click="checked(7)"></i>填写认证信息
						</div>
					</div>
					<ul class="el-collapse-item__content_authentication" :class="{'button-selected': certificationInformation}">
						<li class="el-collapse-item__content_authentication_li">
							<div class="el-collapse-item__content_authentication_li_box">
								<div class="el-collapse-item__content_authentication_li_box_one">
									<p class="el-collapse-item__content_authentication_li_box_one_title">填写国家或地区</p>
									<el-select v-model="country" clearable placeholder="请选择">
										<el-option v-for="item in countryData" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</div>
							</div>
						</li>
						<li class="el-collapse-item__content_authentication_li">
							<div class="el-collapse-item__content_authentication_li_box">
								<div class="el-collapse-item__content_authentication_li_box_one exec">
									<p class="el-collapse-item__content_authentication_li_box_one_title">身份文件类型</p>
									<el-select v-model="idType" clearable placeholder="请选择">
										<el-option v-for="item in idTypeData" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</div>
								<div class="el-collapse-item__content_authentication_li_box_one exec">
									<p class="el-collapse-item__content_authentication_li_box_one_title">身份文件号码</p>
									<el-input v-model="idNum"></el-input>
								</div>
							</div>
						</li>
						<li class="el-collapse-item__content_authentication_li">
							<div class="el-collapse-item__content_authentication_li_box">
								<div class="el-collapse-item__content_authentication_li_box_one">
									<p class="el-collapse-item__content_authentication_li_box_one_title">姓名</p>
									<div class="el-collapse-item__content_authentication_li_box_one_name">
										<el-input v-model="realName"></el-input>
									</div>
								</div>
							</div>
						</li>
						<li class="el-collapse-item__content_authentication_li last">
							<h4 class="el-collapse-item__content_authentication_li_identityUpload">身份文件人像页</h4>
							<div>
								<el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="getImg" :before-upload="beforeAvatarUpload">
									<img v-if="imageUrl" :src="imageUrl" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</div>
							<div class="el-collapse-item__content_authentication_li_precautions">
								<p class="el-collapse-item__content_authentication_li_precautions_title">注意事项</p>
								<ol class="el-collapse-item__content_authentication_li_precautions_item">
									<li class="el-collapse-item__content_authentication_li_precautions_item_li">1.请确保你使用的证件真实可信</li>
									<li class="el-collapse-item__content_authentication_li_precautions_item_li">2.你要手持身份证，距离面部7公分</li>
									<li class="el-collapse-item__content_authentication_li_precautions_item_li">3.进行肩部以上的手持证件照拍摄</li>
									<li class="el-collapse-item__content_authentication_li_precautions_item_li">4.你现在使用的证件在有效期内</li>
								</ol>
							</div>
						</li>
					</ul>
					<button :class="{'button-selected': certificationInformation}" class="commit" @click="authentication">提交验证</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Request from '../../../utils/require.js';
	import Cache from '../../../utils/cache';
	export default {
		data() {
			return {
				fileList: [],
				value4: '',
				options: [],
				headPortrait: false,
				nickname: false,
				email: false,
				password: false,
				transactionPassword: false,
				telegram: false,
				certificationInformation: false,
				bindEmail: "",
				headUrl: "",
				id: 0,
				nickName: "",
				oldPassword: "",
				newPassword: "",
				oncePassword: "",
				oldTradePassword: "",
				newTradePassword: "",
				onceTradePassword: "",
				code: "",
				/*身份验证*/
				country: "",
				countryData: [{
					value: '中国',
					label: '中国'
				}, {
					value: '大中国',
					label: '大中国'
				}, {
					value: '大中华',
					label: '大中华'
				}, {
					value: '俄罗斯',
					label: '俄罗斯'
				}, {
					value: '巴基斯坦',
					label: '巴基斯坦'
				}],
				idNum: "",
				idType: "",
				idTypeData: [{
					value: '身份证',
					label: '身份证'
				}, {
					value: '脸',
					label: '脸'
				}],
				realName: "",
				imageUrl: '',
				accountId: this.$store.state.id || Cache.getSession('bier_userid'),
				username: this.$store.state.username || Cache.getSession('bier_username'),
				dialogVisible: false,
				disabled: true,
				num:'',
			}
		},
		mounted() {

		},
		methods: {
			cancel() { //取消修改昵称
				this.nickName = '';
			},
			getCode() {
				if(this.bindEmail) {
					Request({
						url: 'QueryCode',
						data: {
							email: this.bindEmail,
							codeType: 2,
						},
					}).then(res => {
						console.log(res);
						this.disabled = false;
						let timer = setInterval(() => {
							this.num--;
							if(this.num < 1) {
								clearInterval(timer);
								this.disabled = true;
								this.num = 60;
							}
						}, 1000);
						/*if(res.success == 1) {
							this.$message('获取成功');
						} else {
							this.$message('获取失败');
						}*/
					})
				}else{
					this.$message('绑定邮箱不能为空');
				}
			},
			changeTradePassword() {
				var reg = new RegExp();
				var str = this.newTradePassword;
				var value = /\d{6}/.test(str) && str === this.onceTradePassword;
				if(this.oldTradePassword) {
					if(value) {
						Request({
							url: 'QueryAccountSettings',
							data: {
								id: this.accountId,
								tradePassword: this.newTradePassword,
								oldTradePassword: this.oldTradePassword,
							},
							type: 'post',
							flag: true
						}).then(res => {
							console.log(res);
							if(res.success == 1) {
								this.$message('修改成功');
							}
						})
					} else {
						this.$message('密码必须为六位数字，且和确认密码保持一致');
					}
				} else {
					this.$message('旧交易密码不能为空')
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
							oldPassword: this.oldPassword,
							password: this.newPassword,
						},
						type: 'post',
						flag: true
					}).then(res => {
						console.log(res);
						if(res.success == 1) {
							this.$message('修改成功');
							Request({
								url: 'SignOut',
								type: 'get',
								data: {
									token: this.token
								}
							}).then(res => {
								if(res.success) {
									this.$router.push({
										name: 'index'
									});
								}
							})
						}
					})
				} else {
					this.dialogVisible = true;
				}
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
						if(res.success == 1) {
							this.$message('认证成功');
						}
					})
				} else {
					this.$message('昵称不能为空');
				}
			},
			changeNickName() { //改昵称
				if(this.nickName) {
					Request({
						url: 'QueryAccountSettings',
						data: {
							id: this.accountId,
							nickName: this.nickName,
						},
						type: 'post',
						flag: true
					}).then(res => {
						if(res.success == 1) {
							this.$message('认证成功');
						}
					})
				} else {
					this.$message('昵称不能为空');
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
						realName: this.realName,
						idImg: this.imageUrl
					},
					type: 'post',
					flag: true
				}).then(res => {
					console.log(res);
					if(res.data.success == 1) {
						this.$message('认证成功');
					} else {
						this.$message('认证失败');
					}
				})
			},
			getImg(file) {
				this.imageUrl = file.url;
				console.log(file);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			checked(value) {
				switch(value) {
					case 1:
						this.headPortrait = !this.headPortrait;
						break;
					case 2:
						this.nickname = !this.nickname;
						break;
					case 3:
						this.email = !this.email;
						break;
					case 4:
						this.password = !this.password;
						break;
					case 5:
						this.transactionPassword = !this.transactionPassword;
						break;
					case 6:
						this.telegram = !this.telegram;
						break;
					case 7:
						this.certificationInformation = !this.certificationInformation;
						break;
					default:
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.accountSettings {
		padding: 0 28px;
		&_content {
			#shou-feng-qin-xiao-guo {
				margin: 20px 0 30px 0;
			}
		}
	}
	
	.page-component .content>h3 {
		margin: 55px 0 20px;
	}
	
	.page-container h2,
	.page-container h3,
	.page-container h4,
	.page-container h5 {
		font-weight: 400;
		color: #1f2f3d;
	}
	
	.el-collapse-item__header.is-active {
		border-bottom-color: transparent;
	}
	
	.el-collapse-item__header {
		height: 48px;
		line-height: 48px;
		background-color: #fff;
		cursor: pointer;
		border-bottom: 1px solid #ebeef5;
		font-size: 13px;
		font-weight: 500;
		font-size: 18px;
		color: rgba(96, 98, 102, 1);
		transition: border-bottom-color .3s;
		outline: none;
		position: relative;
		&_span {
			position: absolute;
			top: 0px;
			right: 45px;
			font-size: 18px;
			color: rgba(96, 98, 102, 1);
		}
	}
	
	.el-collapse-item__wrap {
		will-change: height;
		background-color: #fff;
		overflow: hidden;
		box-sizing: border-box;
		border-bottom: 1px solid #ebeef5;
		display: none;
	}
	
	.el-collapse-item__arrow.is-active {
		transform: rotate(180deg);
	}
	
	.el-collapse-item__arrow {
		font-size: 26px;
		margin-right: 8px;
		transition: transform .3s;
		float: right;
		line-height: 48px;
		font-weight: 300;
	}
	
	.el-collapse-item__content {
		height: 376px;
		background: rgba(245, 245, 245, 1);
		padding-top: 20px;
		box-sizing: border-box;
		&_img {
			float: left;
		}
		&_imgs {
			float: left;
			width: 530px;
			height: 330px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
		}
		&_authentication {
			border: 1px solid rgba(228, 231, 237, 1);
			display: none;
			border-top: 0;
			&_li {
				display: block;
				height: 144px;
				border-bottom: 1px solid rgba(228, 231, 237, 1);
				position: relative;
				&_precautions {
					position: absolute;
					top: 0;
					right: 100px;
					font-size: 12px;
					color: rgba(153, 153, 153, 1);
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
			width: 395px;
			height: 192px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
			margin: 0 auto;
			padding: 30px;
			position: relative;
			h3 {
				text-align: center;
				margin-bottom: 10px;
			}
			p {
				margin-bottom: 10px;
			}
			&_buttonBox {
				display: flex;
				justify-content: space-between;
				margin-top: 12px;
				button {
					padding: 12px 24px;
					border-radius: 5px;
					font-size: 14px;
					color: rgba(255, 255, 255, 1);
					background: #FF9500;
				}
			}
		}
	}
	
	.max {
		height: 250px;
	}
	
	.bindEmail {
		height: 330px;
	}
	
	.exec {
		float: left;
		margin-right: 60px;
	}
	
	.last {
		height: 300px;
		border: 0;
		padding-left: 144px;
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
		display: none;
	}
	
	.button-selected {
		display: block;
	}
	
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
		width: 300px;
		height: 200px;
		line-height: 178px;
		text-align: center;
		border: 1px solid #EEEEEE;
	}
	
	.avatar {
		width: 300px;
		height: 200px;
		display: block;
	}
	
	.el-button-getCode {
		position: absolute;
		top: 117px;
		right: 45px;
		font-size: 14px;
		color: rgba(255, 149, 0, 1);
		button {
			background: #ffffff;
			font-size: 14px;
			color: rgba(255, 149, 0, 1);
			    height: 38px;
		}
	}
	
	.password {
		top: 223px;
	}
</style>