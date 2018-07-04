<template>
    <div class="crowdsale-item">
        <div class="crowdsale-item-title">
            <span>{{crowdsaleDatas.title}}</span>
            <span class="crowdsale-item-title-border"></span>
            <span class="crowdsale-item-title-ad">广告</span>
        </div>
        <p class="crowdsale-item-sn">
            <span>项目编号：</span>
            <span>{{crowdsaleDatas.proNum}}</span>
        </p>
        <p class="crowdsale-item-abstract">
            {{crowdsaleDatas.proDesc}}
        </p>
        <div class="crowdsale-item-list">
            <div class="crowdsale-item-list-left">
                <div class="crowdsale-item-list-left-label">
                    <span>{{crowdsaleDatas.concept1Id}}</span>
                </div>
                <div class="crowdsale-item-list-left-label">
                    <span>{{crowdsaleDatas.concept2Id}}</span>
                </div>
                <div class="crowdsale-item-list-left-label">
                    <span>{{crowdsaleDatas.concept3Id}}</span>
                </div>
                <div class="crowdsale-item-list-left-label">
                    <span>{{crowdsaleDatas.concept4Id}}</span>
                </div>
                <div class="crowdsale-item-list-left-label">
                    <span>本轮发行：</span>
                    <span>{{crowdsaleDatas.currCirculation}}</span>
                </div>
            </div>
            <div class="crowdsale-item-list-right">
                <div v-show="!isEventOver" :class="{'event-over': isEventOver}" class="crowdsale-item-list-right-content">
                    <div>{{showText}}</div>
                    <div class="crowdsale-item-list-right-content-divide"></div>
                    <div>{{remainTime}}</div>
                </div>
                <div v-show="isEventOver" :class="{'event-over': isEventOver}" class="crowdsale-item-list-right-content">
                    已结束
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Utils from '../../utils/util.js';
    export default {
        props: ['crowdsaleDatas', 'systemTime'],
        data() {
            return {
                isEventOver: false,
                showText: '',
                remainTime: '',
                utils: new Utils(),
            }
        },
        mounted() {
            this.handleTime(this.crowdsaleDatas, this.systemTime);
            this.countDown(this.crowdsaleDatas);
        },
        methods: {
            handleTime(data, systemTime) {
                let {
                    isOver,
                    showText,
                    remainTime
                } = this.utils.handleTime(data, systemTime);
                this.isEventOver = isOver;
                this.showText = showText === 1 ? '即将开始' : '剩余时间';
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
    .crowdsale-item {
        padding: 16px;
        width: crowdsaleItemWidth;
        background: $crowdsaleBackGround;
        margin-bottom: 14px;
        &-title {
            @include content-flex();
            height: 25px;
            @include item-title();
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
            height: 60px;
        }
        &-list {
            @include content-flex();
            height: 73px;
            margin-top: 16px;
            &-left {
                width: 226px;
                height: 100%;
                @include content-flex();
                flex-wrap: wrap;
                &-label {
                    width: 112px;
                    background: #E0E0E0;
                    border-radius: 3px;
                    text-align: center;
                    margin-bottom: 5px;
                    & span {
                        font-size: 12px;
                        display: inline-block;
                        transform: scale(0.85);
                    }
                    &:nth-child(2n) {
                        margin-left: 2px;
                    }
                    &:last-child {
                        width: 100%;
                        margin: 0;
                    }
                }
            }
            &-right {
                height: 100%;
                margin-left: 21px;
                flex: 1;
                &-content {
                    height: 100%;
                    background: #FF9500;
                    @include content-flex(center);
                    flex-direction: column;
                    color: #fff;
                    border-radius: 5px;
                    font-size: 18px;
                    &-divide {
                        width: 63px;
                        height: 1px;
                        background: #fff;
                        margin: 5px 0;
                    }
                    &.event-over {
                        background: #999999;
                    }
                }
            }
        }
    }
</style>