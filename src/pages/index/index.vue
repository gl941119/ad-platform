<template>
	<div class="platform-index">
		<custom-carousel :swiper-imgs="swiperImgs"></custom-carousel>
		<div class="platform-index-bull">
			<div class="platform-index-bull-block">{{$t('home.broadcast')}}</div>
			<div class="platform-index-bull-content" v-if="bullsData.length>0">
				<swiper :options="swiperOptions" class="platform-index-bull-content-swiper" ref="swiperBulls">
					<swiper-slide v-for="(item, index) in bullsData" :key="index">
						<div class="swiper-text">
							<span>{{item.symbol}}{{$t('home.number')}}</span>
							<span>${{item.price}} /</span>
							<span :style="{color: item.percent_change_24h>=0?'#3da283':'#e50000'}">{{item.percent_change_24h}}%</span>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
		<div class="platform-index-item">
			<div class="platform-index-item-crowdsale">
				<div class="platform-index-item-crowdsale-title">
					<div class="platform-index-item-crowdsale-title-linear">
					</div>
					{{$t('crowdFunding.crowdfunding')}}
				</div>
				<!-- <crowdsale-item v-for="crowdsale in crowdsaleItemdata" :key="crowdsale.id" :crowdsale-datas="crowdsale" :system-time="sysTime">
				</crowdsale-item> -->
                <div class="temp-crowd" v-for="item in 5" :key="item">
                	<div v-if="slangChange === 'EN'">
                		<img src="../../assets/imgs/img/index_corwd_en.png"/>
                	</div>
                    <div v-else>
                		<img src="../../assets/imgs/img/index_corwd.png"/>
                    </div>
                </div>
				<!-- <learn-more :type="1" @seemore="toCrowdDetailPage"></learn-more> -->
			</div>
			<div class="platform-index-item-ad">
				<div class="platform-index-item-ad-title">
					<div class="platform-index-item-crowdsale-title-linear">
					</div>
					{{$t('header.project')}}
                    <router-link  tag="a" :to="{name: 'advertisement'}" class="platform-index-item-ad-title-more">{{$t('header.more')}}></router-link>
                   
				</div>
				<advert-item v-for="(advert, _i) in totalAdvertItemDatas" :key="advert.id" :advert-datas="advert" :item-index="_i" :system-time="sysTime" @update-data="updateAdvertData">
				</advert-item>
				<!--<learn-more v-if="totalAdvertItemDatas.length<30&&advertItemDatas.length>0" :type="2" @seemore="learnMoreItem"></learn-more>-->
				<!--<learn-more v-else :type="1" @seemore="toAdvertDetailPage"></learn-more>-->
			</div>
		</div>
        <partner></partner>
	</div>
</template>
<script>
	import customCarouselCom from '@/components/custom-carousel';
	import crowdsaleItemCom from '@/components/index-com/crowdsale-item';
	import advertItemCom from '@/components/index-com/advert-item';
	import Partner from '@/components/index-com/partner';
	import Request from '../../utils/require.js';
	import Config from '../../utils/config.js';
	import axios from 'axios';
	export default {
        data() {
			return {
                type: this.$route.query.type,
				swiperOptions: {
					autoplay: {
						delay: 2000,
						disableOnInteraction: false,
					},
					loop: true,
					slidesPerView: 4,
					loopedSlides: 10,
					simulateTouch: false,
					init: false,
				},
				bullsData: [],
				swiperImgs: [],
				crowdsaleItemdata: [],
				sysTime: undefined,
				advertItemDatas: [],
				totalAdvertItemDatas: [],
				page: Config.pageStart,
				pageSize: Config.pageSize,
			}
		},
		mounted() {
			let loading = this.$loading({
				lock: true,
				text: 'Loading...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.5)',
				fullscreen: true,
            });
            // 跳出注册
            if(this.type === 'register') {
                this.$store.commit('setDialogModalVisible', 'register');
            }
			Promise.all([this.getSystemTime(), this.getBulls(), this.getData(), this.getAdvertInfo(), this.findAdvertisement()])
				.then(() => {
					this.swiperInstance.init();
					loading.close();
				})
		},
		watch: {
			slangChange(val, oldval) {
				let loading = this.$loading({
					lock: true,
					text: 'Loading...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.5)',
					fullscreen: true,
				});
				this.totalAdvertItemDatas = [];
				Promise.all([this.getSystemTime(), this.getBulls(), this.getData(), this.getAdvertInfo(1), this.findAdvertisement()])
					.then(() => {
						this.swiperInstance.init();
						loading.close();
					})
			}
		},
		computed: {
			swiperInstance() {
				return this.$refs.swiperBulls && this.$refs.swiperBulls.swiper;
			},
			slangChange() {
				var lang = this.$store.state.slangChange || this.$i18n.locale;
				if(lang == 'en') {
					lang = lang.toUpperCase();
				}
				return lang;
			}
		},
		components: {
			'custom-carousel': customCarouselCom,
			'crowdsale-item': crowdsaleItemCom,
			'advert-item': advertItemCom,
            Partner
		},
		methods: {
			getData() {
				return new Promise(resolve => {
					Request({
						url: 'QueryCrowdSale',
						type: 'get'
					}).then(res => {
						// console.log('QueryCrowdSale res_>', res);
						this.crowdsaleItemdata = res.data;
						resolve();
					})
				});
			},
			getAdvertInfo(page = this.page, pageSize = this.pageSize) {
				return new Promise((resolve, reject) => {
					Request({
						url: 'QueryAdvertInfo',
						data: {
							page,
							pageSize,
						},
						type: 'get'
					}).then(res => {
						// console.log('QueryAdvertInfo_>', res);
						this.advertItemDatas = res.data;
						if(this.advertItemDatas && this.advertItemDatas.length === 0) {
							this.$message({
								message: this.$t('home.noData'),
								type: 'warning'
							})
							resolve();
						} else {
							this.totalAdvertItemDatas.push(...this.advertItemDatas);
							resolve();
						}
					})
				});
			},
			toCrowdDetailPage() {
				this.$router.push({
					name: 'crowdsale'
				});
			},
			learnMoreItem() {
				this.page++;
				this.getAdvertInfo(this.page);
			},
			toAdvertDetailPage() {
				this.$router.push({
					name: 'advertisement'
				});
			},
			getBulls() {
				return new Promise((resolve, reject) => {
					let bull = this.$store.state.bullsData;
					if(bull) {
						this.bullsData = bull;
						resolve();
					} else {
						axios.get('https://api.coinmarketcap.com/v2/ticker/?limit=10&sort=id&structure=array').then(res => {
							this.bullsData = this.handleBullsData(res.data.data);
							this.$store.commit('setBullsData', this.bullsData);
							resolve()
						}).catch(e => {
							console.error('bulls_>', e);
							reject(e)
						})
					}
				});
            },
            // carousel image from server
			findAdvertisement() {
				return new Promise((resolve, reject) => {
					Request({
						url: 'FindAdvertisement',
						type: 'get',
					}).then(res => {
						// console.log('FindAdvertisement->', res);
						this.swiperImgs = this.handleCarouselData(res.data);
						// console.log('this.swiperImgs->', this.swiperImgs);
						resolve();
					})
				})
			},
			getSystemTime() {
				return new Promise((resolve, reject) => {
					Request({
						url: 'GetSystemTime',
						type: 'get'
					}).then(res => {
						this.sysTime = res.data;
						resolve()
					})
				});
			},
			handleBullsData(data) {
				let bullsData = [];
				for(let i = 0, len = data.length; i < len; i++) {
					let {
						id,
						symbol,
						quotes: {
							USD: {
								price,
								percent_change_24h
							}
						}
					} = data[i];
					bullsData.push({
						id,
						symbol,
						price,
						percent_change_24h
					});
				}
				return bullsData;
			},
			updateAdvertData() {
				this.getAdvertInfo(1);
			},
			handleCarouselData(data) {
				return data.filter(item => item.advertPosition === 1).sort((a, b) => a.advertSort - b.advertSort)
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../assets/css/variable.scss';
	@import '../../assets/css/global.scss';
	%platform-index-title {
		@extend %platform-title;
        box-sizing: border-box;
        padding-left: 6px;
		margin: 14px 0 9px;
		height: 34px;
		background: linear-gradient(90deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.45));
	}
	
	.platform-index {
		background-color: $wrapBackgroundColor;
		&-bull {
			height: $bullHeight;
			@include body-center();
			@include content-flex();
			border-bottom: 1px solid #e1e1e1;
			border-right: 1px solid #e1e1e1;
			&-block {
				width: $bullBlockWidth;
				height: 100%;
				background: $bullBlockColor;
				@include content-flex(center);
				font-size: $headerFontSize;
				color: #e5e5e5;
				box-shadow: 3px 3px 10px $bullBlockColor;
			}
			&-content {
				flex: 1;
				width: 1070px;
				height: 100%;
                overflow: hidden;
				&-swiper {
					height: 100%;
					& .swiper-text {
						height: 100%;
						line-height: $bullHeight;
						text-align: center;
						& .swiper-line {
							font-size: 18px;
							color: #666;
						}
					}
				}
			}
		}
		&-item {
			@include body-center();
			@include content-flex(flex-start, flex-start);
			padding-bottom: 50px;
			&-crowdsale {
				width: $crowdsaleWidth;
				&-title {
					@extend %platform-index-title;
					&-linear {
                        margin-left: -6px;
						height: 2px;
						background: linear-gradient(-90deg, rgba(60, 89, 159, 0), rgba(60, 89, 159, 0.45), rgba(60, 89, 159, 1));
					}
                   
				}
			}
			&-ad {
				margin-left: 43px;
				flex: 1;
				&-title {
					@extend %platform-index-title;
                    &-more{
                        float: right;
                        margin-right: 24px;
                        font-size:12px;
                        font-family:'PingFangSC-Light';
                        color:rgba(111,111,111,1);
                        line-height:34px;
                    }
				}
			}
		}
	}
    .temp-crowd {
        background: #D3DCE6;
        height: 300px;
        padding-top: 60px;
        &>div{
            @include content-flex(center);
        	width: 100%;
        	height: 240px;
        	background: white;
        	& img{
        		width: 200px;
        	}
        }
    }
</style>