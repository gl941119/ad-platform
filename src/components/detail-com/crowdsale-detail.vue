<template>
<div class="crowdsale">
    <div class="crowdsale-detail">
        <div class="crowdsale-detail-head">
            <div class="crowdsale-detail-head-left">
                {{detailData.title}}
                <!-- <span>|</span>
                <span>{{$t('home.advertising')}}</span> -->
            </div>
            <div class="crowdsale-detail-head-right">
                <el-select ref="crowdSaleSelectCom" @focus="crowdsaleFocus" size="mini" class="crowdsale-detail-head-right-select" v-model="value" @change="crowdSaleSelect" :placeholder="$t('crowdFunding.readWhitePaper')">
                    <el-option v-for="detail in options" :key="detail.value" :label="detail.label" :value="detail.value">
                    </el-option>
                </el-select>
                <div class="crowdsale-detail-head-right-sn">
                    <span>{{$t('home.projectNum')}}:</span><span>{{detailData.proNum}}</span>
                </div>
            </div>
        </div>
        <p class="crowdsale-detail-content">
            {{detailData.proDesc}}
        </p>
        <div class="crowdsale-detail-label">
            <div class="crowdsale-detail-label-left">
                <div class="crowdsale-detail-label-left-title">{{$t('crowdFunding.concept')}}</div>
                <div class="crowdsale-detail-label-left-list">
                    <div v-if="detailData.concept1Id" class="crowdsale-detail-label-left-list-tap">
                        <span>{{detailData.concept1Id}}</span>
                    </div>
                    <div v-if="detailData.concept2Id" class="crowdsale-detail-label-left-list-tap">
                        <span>{{detailData.concept2Id}}</span>
                    </div>
                    <div v-if="detailData.concept3Id" class="crowdsale-detail-label-left-list-tap">
                        <span>{{detailData.concept3Id}}</span>
                    </div>
                    <div v-if="detailData.concept4Id" class="crowdsale-detail-label-left-list-tap">
                        <span>{{detailData.concept4Id}}</span>
                    </div>
                </div>
            </div>
            <div class="crowdsale-detail-label-middle">
                <div class="crowdsale-detail-label-middle-title">{{$t('crowdFunding.issuance')}}</div>
                <div class="crowdsale-detail-label-middle-list">
                    <div class="crowdsale-detail-label-middle-list-tap">
                        <span>{{$t('crowdFunding.volume')}}{{detailData.circulation}}</span>
                    </div>
                    <div class="crowdsale-detail-label-middle-list-tap">
                        <span>{{$t('crowdFunding.totalPrice')}}{{detailData.totalCrowdfund}}</span>
                    </div>
                </div>
            </div>
            <div class="crowdsale-detail-label-middle">
                <div class="crowdsale-detail-label-middle-title">{{$t('crowdFunding.technology')}}</div>
                <div class="crowdsale-detail-label-middle-list">
                    <div v-if="detailData.technology1" class="crowdsale-detail-label-middle-list-tap">
                        <span>{{detailData.technology1}}</span>
                    </div>
                    <div v-if="detailData.technology2" class="crowdsale-detail-label-middle-list-tap">
                        <span>{{detailData.technology2}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="crowdsale-detail-specific">
            <div>
                <div class="crowdsale-detail-specific-text">
                    <span>{{$t('crowdFunding.issueNumber')}}：</span>
                    <span>{{detailData.currCirculation}} AFDT</span>
                </div>
                <div class="crowdsale-detail-specific-text">
                    <span>{{$t('crowdFunding.crowdPrice')}}：</span>
                    <span>{{detailData.price}} AFDT</span>
                </div>
                <div class="crowdsale-detail-specific-text">
                    <span>{{$t('crowdFunding.startTime')}}：</span>
                    <span>{{detailData.startTime | dateFormat('time')}}</span>
                </div>
                <div class="crowdsale-detail-specific-text">
                    <span>{{$t('crowdFunding.endTime')}}：</span>
                    <span>{{detailData.endTime | dateFormat('time')}}</span>
                </div>
            </div>
            <div v-if="status===2||status===3">
                <el-progress type="circle" :show-text="false" :width="62" color="#FF9500" :percentage="progress"></el-progress>
            </div>
        </div>
        <div class="crowdsale-detail-disclaimer clearfix">
            <el-checkbox class="crowdsale-detail-disclaimer-item" v-model="disclaimerChecked"></el-checkbox>
            <a class="crowdsale-detail-disclaimer-item">{{$t('crowdFunding.disclaimer')}}</a>
        </div>
    </div>
    <div class="crowdsale-footer">
        <el-button v-show="status===1&&progress<100" :class="{'reserve-btn':status===3||progress===100}" class="crowdsale-footer-btn">{{remainTime}}{{showText}}</el-button>
        <el-button @click="instantBuy" v-show="status===2&&progress<100" :class="{'reserve-btn':status===3||progress===100}" class="crowdsale-footer-btn go-to-buy"><span>{{$t('home.time')}}{{remainTime}}</span><span>{{showText}}</span></el-button>
        <el-button v-show="status===3||progress===100" :class="{'reserve-btn':status===3||progress===100}" class="crowdsale-footer-btn">{{$t('home.over')}}</el-button>
    </div>
</div>
</template>
<script>
    import Utils from '../../utils/util.js';
    import Cache from '../../utils/cache.js';
    import Request from '../../utils/require.js';
    export default {
        props: ['detailData', 'systemTime'],
        data() {
            return {
                value: '',
                showText: '',
                remainTime: '',
                status: 0,
                utils: new Utils(),
                timer: undefined,
                progress: 0,
                disclaimerChecked: false,
            }
        },
        mounted() {
            this.handleTime(this.detailData, this.systemTime);
            this.countDown(this.detailData);
            // console.log('detail corwdsale_>', this.detailData.id, this.detailData);
            let {croAchieve, topLimit} = this.detailData;
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
            options() {
                let {
                    website,
                    whitePaper
                } = this.detailData;
                return [{
                    label: this.$t('crowdFunding.readWhitePaper'),
                    value: 1,
                    site: whitePaper
                }, {
                    label: this.$t('crowdFunding.website'),
                    value: 2,
                    site: website,
                }];
            },
            accountId(){
                return this.$store.state.id;
            }
        },
        methods: {
            crowdSaleSelect(v) {
                let sel = this.options.find(item => v === item.value);
                if(sel){
                    // window.open(sel.site,'target'); // 会被拦截
                    window.location.href = sel.site;
                }
                this.$refs.crowdSaleSelectCom.blur();
            },
            crowdsaleFocus(){
                this.value = '';
            },
            handleTime(data, systemTime) {
                let {
                    status,
                    remainTime,
                    dayArr
                } = this.utils.handleTime(data, systemTime, this.$t('crowdFunding.day'));
                // console.log('data-?>',data.id, data, remainTime, dayArr);
                this.status = status;
                switch (status) {
                    case 1:
                        this.showText = this.$t('crowdFunding.laterStart')
                        break;
                    case 2:
                        this.showText = this.$t('home.immediately')
                        break;
                    case 3:
                        this.showText = this.$t('home.over')
                        break;
                }
                this.remainTime = remainTime;
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
                                this.$store.commit('saveInstantBuyDataId', this.detailData.id);
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
                        // console.log('authStatus_>', res.data);
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
    %crowdsale-detail-title {
        color: #666;
        font-size: 18px;
        font-weight: bold;
        line-height: 25px;
    }

    %crowdsale-detail-label {
        background: #E0E0E0;
        border-radius: 3px;
        text-align: center;
        margin-bottom: 9px;
        line-height: 20px;
        & span {
            font-size: 12px;
            color: #A5A5A5;
            display: inline-block;
            transform: scale(0.85);
        }
    }

    .crowdsale {
        width: 383px;
        height: 453px;
        margin-bottom: 40px;
        &:nth-child(3n - 1) {
            margin: 0 25px;
        }
        &-detail {
            width: 100%;
            background: #fff;
            padding: 16px 12px 0;
            &-head {
                width: 100%;
                height: 50px;
                @include content-flex(space-between, flex-start);
                &-left {
                    width: 232px;
                    @extend %crowdsale-detail-title;
                    @include multi-line-hide(2);
                }
                &-right {
                    width: 126px;
                    text-align: right;
                    &-select {
                        display: inline-block;
                        width: 105px;
                    }
                    &-sn {
                        margin-top: 5px;
                        color: #999;
                        font-size: 12px;
                    }
                }
            }
            &-content {
                margin-top: 11px;
                color: #666;
                font-size: 12px;
                height: 98px;
                border-bottom: 1px solid #E9E9E9;
                line-height: 20px;
            }
            &-label {
                height: 114px;
                padding-top: 18px;
                border-bottom: 1px solid #E9E9E9;
                @include content-flex(flex-start, flex-start);
                &-left {
                    width: 144px;
                    height: 100%;
                    &-title {
                        @extend %crowdsale-detail-title;
                        margin-bottom: 10px;
                    }
                    &-list {
                        width: 100%;
                        @include content-flex();
                        flex-wrap: wrap;
                        &-tap {
                            width: 67px;
                            @extend %crowdsale-detail-label;
                            @include text-ellipsis();
                            &:nth-child(2n) {
                                margin-left: 9px;
                            }
                        }
                    }
                }
                &-middle {
                    width: 67px;
                    height: 100%;
                    margin-left: 25px;
                    &-title {
                        @extend %crowdsale-detail-title;
                        margin-bottom: 10px;
                    }
                    &-list {
                        width: 100%;
                        &-tap {
                            @extend %crowdsale-detail-label;
                            margin-bottom: 9px;
                            @include text-ellipsis();
                        }
                    }
                }
            }
            &-specific {
                padding-top: 16px;
                @include content-flex(space-between, flex-end);
                &-text {
                    font-size: 14px;
                    color: #666;
                    line-height: 20px;
                    margin-bottom: 5px;
                }
            }
            &-disclaimer {
                padding-bottom: 5px;
                &-item {
                    float: left;
                }
                &>a {
                    color: #666666;
                    font-size: 12px;
                    line-height: 17px;
                    margin-left: 15px;
                }
            }
        }
        &-footer {
            &-btn {
                margin: 0;
                display: block;
                border: none;
                height: 35px;
                width: 100%;
                background: #FF9500;
                color: #fff;
                border-radius: 0;
                &.reserve-btn {
                    background: #999;
                }
                &.go-to-buy {
                    @include content-flex();
                }
            }
        }
    }
</style>