<template>
    <div class="crowdsale-item">
        <div class="crowdsale-item-title">
            <span>{{crowdsaleDatas.title}}</span>
            <span class="crowdsale-item-title-border"></span>
            <span class="crowdsale-item-title-ad">{{$t('home.advertising')}}</span>
        </div>
        <p class="crowdsale-item-sn">
            <span>{{$t('home.projectNum')}}：</span>
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
                    <span>{{$t('home.thisIssuance')}}：</span>
                    <span>{{crowdsaleDatas.currCirculation}}</span>
                </div>
            </div>
            <div class="crowdsale-item-list-right">
                <div v-show="status===1" :class="{'event-over': status===3}" class="crowdsale-item-list-right-content">
                    <div>{{showText}}</div>
                    <div class="crowdsale-item-list-right-content-divide"></div>
                    <div>{{remainTime}}</div>
                </div>
                <div v-show="status===2" :class="{'event-over': status===3}" class="crowdsale-item-list-right-content">
                    <div>{{showText}}</div>
                    <div class="crowdsale-item-list-right-content-divide"></div>
                    <div>{{remainTime}}</div>
                </div>
                <div v-show="status===3" :class="{'event-over': status===3}" class="crowdsale-item-list-right-content">
                    {{$t('home.over')}}
                </div>
            </div>
        </div>
        <div v-if="status===2||status===3" class="crowdsale-item-progress">
            <el-progress :percentage="progress" :show-text="false" color="#FF9500"></el-progress>
        </div>
        <div v-else style="height:6px;margin-top:12px;"></div>
    </div>
</template>
<script>
    import Utils from '../../utils/util.js';
    export default {
        props: ['crowdsaleDatas', 'systemTime'],
        data() {
            return {
                status: 0,
                showText: '',
                remainTime: '',
                utils: new Utils(),
                progress: 65,
            }
        },
        mounted() {
            console.log('crowdsaleDatas_>', this.crowdsaleDatas);
            this.handleTime(this.crowdsaleDatas, this.systemTime);
            this.countDown(this.crowdsaleDatas);
        },
        methods: {
            handleTime(data, systemTime) {
                let {
                    status,
                    remainTime
                } = this.utils.handleTime(data, systemTime);
                this.status = status;
                switch (status) {
                    case 1:
                        this.showText = this.$t('home.begin')
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
        padding: 15px 16px 12px;
        width: $crowdsaleWidth;
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
            height: 56px;
            line-height: 19px;
        }
        &-list {
            @include content-flex();
            height: 71px;
            margin-top: 10px;
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
                    margin-bottom: 4px;
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
        &-progress {
            margin-top: 12px;
        }
    }
</style>