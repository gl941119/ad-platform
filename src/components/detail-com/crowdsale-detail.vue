<template>
<div class="crowdsale">
    <div class="crowdsale-detail">
        <div class="crowdsale-detail-head">
            <div class="crowdsale-detail-head-left">
                {{detailData.title}}
                <span>|</span>
                <span>广告</span>
            </div>
            <div class="crowdsale-detail-head-right">
                <el-select size="mini" class="crowdsale-detail-head-right-select" v-model="value" @change="crowdSaleSelect" placeholder="全部阶段">
                    <el-option v-for="detail in options" :key="detail.value" :label="detail.label" :value="detail.value">
                    </el-option>
                </el-select>
                <div class="crowdsale-detail-head-right-sn">
                    <span>项目编号:</span><span>{{detailData.proNum}}</span>
                </div>
            </div>
        </div>
        <p class="crowdsale-detail-content">
            {{detailData.proDesc}}
        </p>
        <div class="crowdsale-detail-label">
            <div class="crowdsale-detail-label-left">
                <div class="crowdsale-detail-label-left-title">概念</div>
                <div class="crowdsale-detail-label-left-list">
                    <div class="crowdsale-detail-label-left-list-tap">
                        <span>{{detailData.concept1Id}}</span>
                    </div>
                    <div class="crowdsale-detail-label-left-list-tap">
                        <span>{{detailData.concept2Id}}</span>
                    </div>
                    <div class="crowdsale-detail-label-left-list-tap">
                        <span>{{detailData.concept3Id}}</span>
                    </div>
                    <div class="crowdsale-detail-label-left-list-tap">
                        <span>{{detailData.concept4Id}}</span>
                    </div>
                </div>
            </div>
            <div class="crowdsale-detail-label-middle">
                <div class="crowdsale-detail-label-middle-title">发行</div>
                <div class="crowdsale-detail-label-middle-list">
                    <div class="crowdsale-detail-label-middle-list-tap">
                        <span>总量{{detailData.circulation}}</span>
                    </div>
                    <div class="crowdsale-detail-label-middle-list-tap">
                        <span>总价{{detailData.totalCrowdfund}}</span>
                    </div>
                </div>
            </div>
            <div class="crowdsale-detail-label-middle">
                <div class="crowdsale-detail-label-middle-title">技术</div>
                <div class="crowdsale-detail-label-middle-list">
                    <div class="crowdsale-detail-label-middle-list-tap">
                        <span>{{detailData.technology1}}</span>
                    </div>
                    <div class="crowdsale-detail-label-middle-list-tap">
                        <span>{{detailData.technology2}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="crowdsale-detail-specific">
            <div>
                <div class="crowdsale-detail-specific-text">
                    <span>本轮发行数量：</span>
                    <span>{{detailData.currCirculation}} BRB</span>
                </div>
                <div class="crowdsale-detail-specific-text">
                    <span>众筹价格：</span>
                    <span>{{detailData.price}} BRB</span>
                </div>
                <div class="crowdsale-detail-specific-text">
                    <span>抢购开始时间：</span>
                    <span>{{detailData.startTime | dateFormat('time')}}</span>
                </div>
                <div class="crowdsale-detail-specific-text">
                    <span>抢购结束时间：</span>
                    <span>{{detailData.endTime | dateFormat('time')}}</span>
                </div>
            </div>
            <div v-if="status===2||status===3">
                <el-progress type="circle" :show-text="false" :width="62" color="#FF9500" :percentage="25"></el-progress>
            </div>
        </div>
    </div>
    <div class="crowdsale-footer">
        <el-button v-if="status===1" :class="{'reserve-btn':status===3}" class="crowdsale-footer-btn">{{remainTime}}{{showText}}</el-button>
        <el-button v-if="status===2" :class="{'reserve-btn':status===3}" class="crowdsale-footer-btn go-to-buy"><span>剩余时间{{remainTime}}</span><span>{{showText}}</span></el-button>
        <el-button v-if="status===3" :class="{'reserve-btn':status===3}" class="crowdsale-footer-btn">已经结束</el-button>
    </div>
</div>
</template>
<script>
    import Utils from '../../utils/util.js';
    export default {
        props: ['detailData', 'systemTime'],
        data() {
            return {
                value: 1,
                showText: '',
                remainTime: '',
                status: 0,
                utils: new Utils(),
                timer: undefined,
            }
        },
        mounted() {
            this.handleTime(this.detailData, this.systemTime);
            this.countDown(this.detailData);
        },
        computed: {
            options() {
                let {
                    website,
                    whitePaper
                } = this.detailData;
                return [{
                    label: '查看白皮书',
                    value: 1,
                    site: whitePaper
                }, {
                    label: '访问官网',
                    value: 2,
                    site: website,
                }];
            },
        },
        methods: {
            crowdSaleSelect(v) {
                let sel = this.options.find(item => v === item.value);
                console.log('options_>', v, sel);
            },
            handleTime(data, systemTime) {
                let {
                    status,
                    remainTime
                } = this.utils.handleTime(data, systemTime);
                this.status = status;
                switch (status) {
                    case 1:
                        this.showText = '后即将开始'
                        break;
                    case 2:
                        this.showText = '立即抢购'
                        break;
                    case 3:
                        this.showText = '已经结束'
                        break;
                }
                this.remainTime = remainTime;
            },
            countDown(data) {
                let sysTime = this.systemTime;
                this.timer = setInterval(() => {
                    this.handleTime(data, sysTime);
                    sysTime += 1000;
                }, 1000);
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
            height: 418px;
            background: #fff;
            padding: 16px 12px 0;
            &-head {
                width: 100%;
                height: 50px;
                @include content-flex(space-between, flex-start);
                &-left {
                    width: 232px;
                    @extend %crowdsale-detail-title;
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
        }
        &-footer {
            &-btn {
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