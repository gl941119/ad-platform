<template>
<div class="platform-index">
    <custom-carousel></custom-carousel>
    <div class="platform-index-bull">
        <div class="platform-index-bull-block">行情播报</div>
        <div class="platform-index-bull-content">
            <swiper :options="swiperOptions" class="platform-index-bull-content-swiper" ref="swiperBulls">
                <swiper-slide v-for="(item, index) in bullsData" :key="index">
                    <div class="swiper-text">
                        <span>{{item.symbol}}指数</span>
                        <span>${{item.price}} /</span>
                        <span :style="{color: item.percent_change_24h>=0?'#3da283':'#e50000'}">{{item.percent_change_24h}}%</span>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
    <div class="platform-index-item">
        <div class="platform-index-item-crowdsale">
            <div class="platform-index-item-crowdsale-title">众筹</div>
            <crowdsale-item v-for="(crowdsale, i) in crowdsaleItemdata" :key="i" :crowdsale-datas="crowdsale" :system-time="sysTime">
            </crowdsale-item>
            <learn-more :type="1" @seemore="toCrowdDetailPage"></learn-more>
        </div>
        <div class="platform-index-item-ad">
            <div class="platform-index-item-ad-title">项目</div>
            <advert-item v-for="(advert, _i) in totalAdvertItemDatas" :key="_i"
                :advert-datas="advert" :system-tiem="sysTime">
            </advert-item>
            <learn-more v-if="totalAdvertItemDatas.length<30" :type="2" @seemore="learnMoreItem"></learn-more>
            <learn-more v-else :type="1" @seemore="toAdvertDetailPage"></learn-more>
        </div>
    </div>
</div>
</template>
<script>
    import customCarouselCom from '@/components/custom-carousel';
    import crowdsaleItemCom from '@/components/index-com/crowdsale-item';
    import advertItemCom from '@/components/index-com/advert-item';
    import Request from '../../utils/require.js';
    import Config from '../../utils/config.js';
    import axios from 'axios';
    export default {
        data() {
            return {
                swiperOptions: {
                    autoplay: {
                        delay: 2000,
                        disableOnInteraction: false,
                    },
                    loop: true,
                    slidesPerView: 4,
                    loopedSlides: 10,
                    simulateTouch: true,
                    init: false,
                },
                bullsData: [],
                crowdsaleItemdata: [],
                sysTime: undefined,
                advertItemDatas: [],
                totalAdvertItemDatas: [],
                page: Config.pageStart,
                pageSize: Config.pageSize,
            }
        },
        mounted() {
            Promise.all([this.getSystemTime(), this.getBulls(), this.getData(), this.getAdvertInfo()])
                .then(() => {
                    this.swiper.init();
                })
        },
        computed: {
            swiper() {
                return this.$refs.swiperBulls.swiper;
            }
        },
        components: {
            'custom-carousel': customCarouselCom,
            'crowdsale-item': crowdsaleItemCom,
            'advert-item': advertItemCom,
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
                        console.log('QueryAdvertInfo_>', res);
                        this.advertItemDatas = res.data;
                        this.totalAdvertItemDatas.push(...this.advertItemDatas);
                        resolve();
                    })
                });
            },
            toCrowdDetailPage(){
                this.$router.push({name: 'crowdsale'});
            },
            learnMoreItem(){
                this.page++;
                this.getAdvertInfo(this.page);
            },
            toAdvertDetailPage(){
                this.$router.push({name: 'advertisement'});
            },
            getBulls() {
                return new Promise((resolve, reject) => {
                    axios.get('https://api.coinmarketcap.com/v2/ticker/?limit=10&sort=id&structure=array').then(res => {
                        this.bullsData = this.handleBullsData(res.data.data);
                        resolve()
                    }).catch(e => {
                        console.error('bulls_>', e);
                        reject(e)
                    })
                });
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
                for (let i = 0, len = data.length; i < len; i++) {
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
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/variable.scss';
    @import '../../assets/css/global.scss';
    %platform-index-title {
        @extend %platform-title;
        padding: 17px 0 10px;
    }

    .platform-index {
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
            &-crowdsale {
                width: $crowdsaleWidth;
                &-title {
                    @extend %platform-index-title;
                }
            }
            &-ad {
                margin-left: 43px;
                flex: 1;
                &-title {
                    @extend %platform-index-title;
                }
            }
        }
    }
</style>