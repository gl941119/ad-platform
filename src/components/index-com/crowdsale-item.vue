<template>
    <div class="crowdsale-item">
        <div class="crowdsale-item-title">
            <span>{{crowdsaleDatas.title}}</span>
            <!-- <span class="crowdsale-item-title-border"></span>
            <span class="crowdsale-item-title-ad">{{$t('home.advertising')}}</span> -->
        </div>
        <p class="crowdsale-item-sn">
            <span>{{$t('home.projectNum')}}：</span>
            <span>{{crowdsaleDatas.proNum}}</span>
        </p>
        <p class="crowdsale-item-abstract">
            {{crowdsaleDatas.proDesc}}
        </p>
        <div class="crowdsale-item-tap clearfix">
            <div class="crowdsale-item-tap-label curr-circulation">
                <span>{{$t('home.thisIssuance')}}：</span>
                <span>{{crowdsaleDatas.currCirculation}}</span>
            </div>
            <div class="crowdsale-item-tap-label" v-show="crowdsaleDatas.concept1Id">
                <span>{{crowdsaleDatas.concept1Id}}</span>
            </div>
            <div class="crowdsale-item-tap-label" v-show="crowdsaleDatas.concept2Id">
                <span>{{crowdsaleDatas.concept2Id}}</span>
            </div>
            <div class="crowdsale-item-tap-label" v-show="crowdsaleDatas.concept3Id">
                <span>{{crowdsaleDatas.concept3Id}}</span>
            </div>
            <div class="crowdsale-item-tap-label" v-show="crowdsaleDatas.concept4Id">
                <span>{{crowdsaleDatas.concept4Id}}</span>
            </div>
        </div>
        <div class="crowdsale-item-progress">
            <el-progress :stroke-width="32" :percentage="progress" :show-text="false" color="#FF9500"></el-progress>
        </div>
        <div class="crowdsale-item-disclaimer clearfix">
            <a class="crowdsale-item-disclaimer-item">{{$t('crowdFunding.disclaimer')}}</a>
            <el-checkbox class="crowdsale-item-disclaimer-item" v-model="disclaimerChecked"></el-checkbox>
        </div>
        <div>
            <div v-show="status===1&&progress<100" class="crowdsale-item-footer">
                <span class="crowdsale-item-footer-text">{{remainTime[0]}}{{$t('crowdFunding.day')}}{{$t('crowdFunding.later')}}{{$t('crowdFunding.instantStart')}}</span>
                <a class="crowdsale-item-footer-website" href="javascript:;">{{$t('crowdFunding.more')}}</a>
                <el-button class="crowdsale-item-footer-btn">{{$t('home.begin')}}</el-button>
            </div>
            <div v-show="status===2&&progress<100" class="crowdsale-item-instant clearfix">
                <i class="float-left crowdsale-item-instant-icon custom-element-icon-gaojingshandian"></i>
                <span class="float-left crowdsale-item-instant-text">{{$t('crowdFunding.remain')}}</span>
                <div v-show="remainTime[0]<=0" class="float-left clearfix crowdsale-item-instant-time">
                    <span>{{remainTime[1]}}</span>
                    <span>:</span>
                    <span>{{remainTime[2]}}</span>
                    <span>:</span>
                    <span>{{remainTime[3]}}</span>
                </div>
                <div v-show="remainTime[0]>0" class="float-left crowdsale-item-instant-day">
                    <span>{{remainTime[0]}}</span>
                    <span>{{$t('crowdFunding.day')}}</span>
                </div>
                <el-button @click="instantBuy" class="crowdsale-item-instant-btn">{{$t('home.immediately')}}</el-button>
                <a class="crowdsale-item-instant-website" href="javascript:;">{{$t('crowdFunding.more')}}</a>
            </div>
            <div v-show="status===3||progress===100" class="crowdsale-item-end clearfix">
                <div class="crowdsale-item-end-btn">{{$t('home.over')}}</div>
                <a class="crowdsale-item-end-website" href="javascript:;">{{$t('crowdFunding.more')}}</a>
            </div>
        </div>
    </div>
</template>
<script>
    import Utils from '../../utils/util.js';
    import Cache from '../../utils/cache.js';
    import Request from '../../utils/require.js';
    export default {
        props: ['crowdsaleDatas', 'systemTime'], // croAchieve-> 众筹量 currCirculation-> 总量 mostNumber-> 单笔最大 topLimit -> 硬顶
        data() {
            return {
                status: 0,
                remainTime: '',
                utils: new Utils(),
                progress: 65,
                disclaimerChecked: false,
            }
        },
        mounted() {
            this.handleTime(this.crowdsaleDatas, this.systemTime);
            this.countDown(this.crowdsaleDatas);
            // console.log('crowdsaleDatas_>', this.crowdsaleDatas);
            let {croAchieve, topLimit} = this.crowdsaleDatas;
            // 进度的判断
            if(!topLimit || topLimit <= 0){
                this.progress = 0;
            }else{
                let progress = (croAchieve / topLimit).toFixed(2);
                // console.log('progress_>',croAchieve,topLimit, progress);
                progress = progress > 1 ? 1 : progress;
                this.progress = progress * 100;
            }
        },
        computed: {
            accountId(){
                return this.$store.state.id || Cache.getSession('bier_userid');
            }
        },
        methods: {
            handleTime(data, systemTime) {
                let {
                    status,
                    dayArr
                } = this.utils.handleTime(data, systemTime);
                this.status = status;
                this.remainTime = dayArr;
            },
            countDown(data) {
                let sysTime = this.systemTime;
                this.timer = setInterval(() => {
                    sysTime += 1000;
                    this.handleTime(data, sysTime);
                }, 1000);
            },
            instantBuy(){
                if(this.accountId){
                    this.judgeAuthStatus().then(res => {
                        switch(res.authStatus){
                            case 0:
                                this.$message({message: this.$t('messageNotice.noAuth'), type: 'warning'})
                                break;
                            case 1:
                                this.disclaimerChecked = true;
                                this.$store.commit('saveInstantBuyDataId', this.crowdsaleDatas.id);
                                this.$store.commit('setInstantBuyVisible', true);
                                this.$store.commit('valueChange');
                                break;
                            case 2:
                                this.$message({message: this.$t('messageNotice.onAuth'), type: 'warning'})
                                break;
                            case 3:
                                this.$message({message: this.$t('messageNotice.refuseAuth'), type: 'warining'})
                                break;
                        }
                    })
                }else {
                    this.$alert(this.$t('login.pleaseLogin'), {
                        confirmButtonText: this.$t('buttonAll.confirm'),
                        callback: () => {
                            this.$store.commit('setDialogModalVisible', true)
                        }
                    });
                }
            },
            // 是否实名认证
            judgeAuthStatus(){
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryRevenueBasicInformation',
                        data: {
                            accountId: this.accountId
                        },
                        type: 'get'
                    }).then(res => {
                        resolve(res.data);
                    })
                });
            },
        },
        destroyed() {
            this.timer && clearInterval(this.timer);
        },
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/variable.scss';
    @import '../../assets/css/global.scss';
    %instant-buy-btn {
        border: 1px solid #FF9500;
        background: #FF9500;
        height: 32px;
        width: 76px;
        color: #fff;
        padding: 6px 10px;
        border-radius: 0;
        font-weight: bold;
        &:hover {
            color: #000;
        }
        &:active {
            border: 1px solid #DCDFE6;
            background: #fff;
            color: #5E6166;
        }
    }
    %footer-text {
        font-size:14px;
        color: #666;
    }
    %custom-num {
        background: #000;
        color: #fff;
        line-height: 22px;
        padding: 0px 6px;
        border-radius: 3px;
    }
    .crowdsale-item {
        padding: 15px 16px 12px;
        width: $crowdsaleWidth;
        background: $crowdsaleBackGround;
        margin-bottom: 14px;
        &-title {
            @include content-flex();
            @include item-title();
            font-size: 16px;
            height: 22px;
            &-border {
                height: 100%;
                border: 1px solid #E2E2E2;
                margin-left: 32px;
                margin-right: 10px;
            }
            &-ad {
                font-size: $crowdsaleAdFontSize;
                color: #000;
                font-weight: normal;
            }
        }
        &-sn {
            color: $crowdsaleSNColor;
            font-size: $crowdsaleAdFontSize;
            margin-bottom: 10px;
            line-height: 17px;
        }
        &-abstract {
            @extend %text-abstract;
            height: 77px;
            line-height: 20px;
            @include multi-line-hide(4);
        }
        &-tap {
            width: 345px;
            height: 35px;
            margin: 10px 0;
            &-label {
                width: 112px;
                height: 16px;
                line-height: 16px;
                float: left;
                margin-right: 2px;
                margin-bottom: 3px;
                background: #E0E0E0;
                border-radius: 3px;
                text-align: center;
                @include text-ellipsis();
                & span {
                    font-size: 12px;
                    display: inline-block;
                    transform: scale(0.8);
                }
                &.curr-circulation {
                    width: 226px;
                }
            }
        }
        &-progress {
            margin-top: 12px;
        }
        &-disclaimer {
            margin: 5px 0;
            &-item {
                float: right;
            }
            &>a {
                color: #666666;
                font-size: 12px;
                line-height: 17px;
                margin-left: 15px;
            }
        }
        &-footer {
            width: 100%;
            height: 32px;
            @include content-flex(space-between);
            &-text {
                @extend %footer-text;
                line-height: 20px;
            }
            &-website {
                font-size:12px;
                color: #666;
                margin-right: -110px;
            }
            &-btn {
               @extend %instant-buy-btn;
            }
        }
        &-instant {
            width: 100%;
            height: 32px;
            line-height: 32px;
            &>.float-left {
                float: left;
            }
            &-icon {
                color: #EA1E04;
                font-size: 26px;
            }
            &-text {
                @extend %footer-text;
                margin: 0 10px;
            }
            &-time {
                @extend %footer-text;
                @include content-flex();
                &>span {
                    &:nth-child(2n+1) {
                        @extend %custom-num;
                    }
                    &:nth-child(2n) {
                        margin: 0 2px;
                    }
                }
            }
            &-day {
                &>span {
                    @extend %footer-text;
                    &:first-child {
                        @extend %custom-num;
                    }
                }
            }
            &-website {
                font-size:12px;
                color: #666;
                float: right;
                margin-right: 18px;
            }
            &-btn {
                float: right;
                @extend %instant-buy-btn;
            }
        }
        &-end {
            width: 100%;
            height: 32px;
            line-height: 32px;
            &-btn {
                float: right;
                height: 32px;
                padding: 0 12px;
                color: #fff;
                background: #999;
            }
            &-website {
                float:  right;
                @extend %footer-text;
                font-size:12px;
                margin-right: 18px;
            }
        }
    }
</style>