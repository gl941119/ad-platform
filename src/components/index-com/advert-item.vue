<template>
	<div :class="{'white-back': isWhiteBack}" class="advert-item">
		<div class="advert-item-left">
			<div class="advert-item-left-logo">
				<img :src="advertDatas.logo">
			</div>
			<div class="advert-item-left-text" :class="{'english-lang': language!=='zh'}">
				<a :href="advertDatas.whitePaper" target="_self">{{$t('home.whitePaper')}}</a>
			</div>
		</div>
		<div class="advert-item-middle">
			<div class="advert-item-middle-father">
				<div class="advert-item-middle-title">
					<div class="advert-item-middle-title-text">{{advertDatas.shotEnName}}<span v-show="language==='zh'&&advertDatas.shotCnName">/{{advertDatas.shotCnName}}</span></div>
					<div class="advert-item-middle-title-symbol">{{advertDatas.fullEnName}}</div>
					<i v-show="itemIndex < 10" class="custom-element-icon-huo1 hot"></i>
				</div>
			</div>
			<div class="advert-item-middle-divide"></div>
			<div class="advert-item-middle-father-member">
				<el-tooltip placement="top" effect="light">
					<div style="max-width: 200px;" slot="content">
						<span v-for="member in advertDatas.advertTeamMemberResults" :key="member.id">{{member.name}}, </span>
						<span v-for="member in advertDatas.advertTeamConsultantsResults" :key="member.id">{{member.name}}, </span>
					</div>
					<div class="advert-item-middle-father-member-title">
						<span>{{$t('team.coreMember')}}:</span>
						<span v-for="member in advertDatas.advertTeamMemberResults" :key="member.id">{{member.name}}, </span>
						<span v-for="member in advertDatas.advertTeamConsultantsResults" :key="member.id">{{member.name}}, </span>
					</div>
				</el-tooltip>
			</div>
			<div class="advert-item-middle-text">
				{{advertDatas.proDesc}}
			</div>
		</div>
		<div class="advert-item-right">
			<el-select ref="advertSelect" class="advert-item-right-select" @focus="focusAdvert" @change="handleAdvertFunc" v-model="advertValue" :placeholder="$t('home.buy')">
				<el-option v-for="(item, index) in advertDatas.websiteResultList" :key="index" :label="item&&item.websiteName" :value="item&&item.id">
				</el-option>
			</el-select>
			<div class="advert-item-right-icons">

				<a href="javascript:" @click="showShare"><i class="custom-element-icon-fenxiang"></i></a>
				<a href="javascript:" @click="telegramDialog"><i class="custom-element-icon-duihua"></i></a>
			</div>
		</div>
		<el-dialog class="telegram-dialog" :title="$t('header.tips')" :visible.sync="telegramVisible" width="360px">
			<div class="telegram-dialog-content">{{$t('header.tipMsg')}}</div>
			<div class="telegram-dialog-footer" @click="IGotIt" slot="footer">{{$t('header.got')}}</div>
		</el-dialog>
	</div>
</template>
<script>
	import Request from '../../utils/require.js';
	import Utils from '../../utils/util.js';
	export default {
		props: ['advertDatas', 'systemTime', 'isWhiteBack', 'itemIndex'],
		data() {
			return {
				advertValue: '',
				utils: new Utils(),
				telegramVisible: false,
			}
		},
		computed: {
			conceptId() {
				return this.$store.state.conceptId;
			},
			language() {
				return this.utils.getCurrLanguage(this.$store);
			}
		},
		methods: {
			showShare() {
				this.$store.commit('setDialogVisible', true);
			},
			focusAdvert() {
				this.advertValue = '';
			},
			handleAdvertFunc(val) {
				// console.log('handleAdvertFunc_>', this.conceptId, val, this.advertDatas);
				Request({
					url: 'ClickAdvertToProfit',
					data: {
						advertId: this.advertDatas.id,
						conceptId: this.conceptId,
						advertWebsiteId: val,
					},
					type: 'get'
				}).then(res => {
					// console.log('ClickAdvertToProfit_>', res);
					// skip
					this.advertDatas.websiteResultList.forEach(item => {
						if(val === item.id) {
							let {
								websiteAddress
							} = item;
							// window.open(websiteAddress,'target');
							window.location.href = websiteAddress;
						}
					});
					this.$refs.advertSelect.blur();
				}).catch(msg => {
					this.$emit('update-data');
					this.$refs.advertSelect.blur();
					if(msg.data && msg.data.islogin) {
						this.$store.commit('setDialogModalVisible', true);
					}
					// this.$router.push({name: 'index'})
				})
			},
			telegramDialog() {
				this.telegramVisible = true;
			},
			IGotIt() {
				this.telegramVisible = false;
				this.utils.newWin(this.advertDatas.telegrameUrl);
			},
		}
	}
</script>
<style lang="scss">
	@import '../../assets/css/variable.scss';
	@import '../../assets/css/global.scss';
	.advert-item {
		@include content-flex(flex-start, flex-start);
		width: 752px;
		padding: 0 18px 12px 0;
		background: $crowdsaleBackGround;
		margin-bottom: 14px;
		&.white-back {
			background: #fff;
			margin-bottom: 16px;
		}
		&-left {
			width: 85px;
			&-logo {
				@include body-center(38px);
				height: 38px;
				margin-top: 38px;
				&>img {
					height: 100%;
					width: 100%;
					border-radius: 50%;
				}
			}
			&-text {
				margin-top: 10px;
				text-align: center;
                font-size: 14px;
				& a {
					color: #3C599F;
					text-decoration: underline;
				}
				&.english-lang {
					font-size: 12px;
				}
			}
		}
		&-middle {
			&-father {
				@include content-flex(flex-start);
				&-member {
					margin-top: 6px;
					font-size: 14px;
					color: #898989;
					display: flex;
					&-title {
						max-width: 311px;
						@include text-ellipsis;
					}
				}
			}
			&-title {
				padding-top: 3px;
				width: 311px;
                
				@include content-flex(flex-start);
				&-text {
					@include item-title();
					flex: none;
				}
				&-symbol {
					margin-left: 22px;
					flex: auto;
					@include item-title(false);
					@include text-ellipsis;
				}
			}
			&-divide {
				width: 311px;
				height: 1px;
				background: #EAEAEA;
				margin: 6px 0 6px;
			}
			&-text {
				margin-top: 11px;
				width: 493px;
				@extend %text-abstract;
				height: 60px;
				@include multi-line-hide();
			}
		}
		&-right {
			padding-top: 7px;
			&-select {
				margin-left: 8px;
				& input {
					width: 153px;
					height: 34px;
				}
			}
			&-icons {
				margin-top: 29px;
				@include content-flex(flex-end, flex-start);
				& a {
					color: #aaa;
					margin-left: 20px;
                    font-size: 20px !important;
				}
			}
		}
	}
	
	.telegram-dialog {
		&-content {
			font-size: 20px;
			text-align: center;
			color: #FF9500;
			margin: 20px 0;
		}
		&-footer {
			color: #333333;
			font-size: 20px;
			margin: -10px -20px -20px;
			text-align: center;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
		}
	}
	
	i.hot {
		color: #F2584A;
        margin-left: 48px;
        font-size: 22px;
	}
	
	.el-select-dropdown__item:hover span {
		color: #FF9500;
    }
    
    .advert-item-right-select.el-select .el-input.is-focus .el-input__inner {
        border-color: #FF9500;
        color: #FF9500;
    }
    .advert-item-right-select.el-select .el-input .el-input__inner:focus {
        border-color: #FF9500;
        color: #FF9500;
    }
</style>