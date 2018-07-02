<template>
<div class="crowdsale">
    <div class="crowdsale-detail">
        <div class="crowdsale-detail-head">
            <div class="crowdsale-detail-head-left">
                BRB-大数据区块链广告平台-第二轮
                <span>|</span>
                <span>广告</span>
            </div>
            <div class="crowdsale-detail-head-right">
                <el-select size="mini" class="crowdsale-detail-head-right-select" v-model="value" placeholder="全部阶段">
                    <el-option v-for="detail in options" :key="detail.value" :label="detail.label" :value="detail.value">
                    </el-option>
                </el-select>
                <div class="crowdsale-detail-head-right-sn">
                    <span>项目编号:</span>
                    <span>BR1806536</span>
                </div>
            </div>
        </div>
        <p class="crowdsale-detail-content">
            全球1.44亿币圈精准用户数据/AI机器人集群流量入口/做最大的区块链项目流量入口,全球1.44亿币圈精准用户数据/AI机器人集群流量入口/做最大的区块链项目流量入口,全球1.44亿币圈精准用户数据/AI机器人集群流量入口/做最大的区块链项目流量入口
        </p>
        <div class="crowdsale-detail-label">
            <div class="crowdsale-detail-label-left">
                <div class="crowdsale-detail-label-left-title">概念</div>
                <div class="crowdsale-detail-label-left-list">
                    <div class="crowdsale-detail-label-left-list-tap">
                        <span>大数据</span>
                    </div>
                    <div class="crowdsale-detail-label-left-list-tap">
                        <span>平台币</span>
                    </div>
                    <div class="crowdsale-detail-label-left-list-tap">
                        <span>Dapp</span>
                    </div>
                    <div class="crowdsale-detail-label-left-list-tap">
                        <span>比特币山寨</span>
                    </div>
                </div>
            </div>
            <div class="crowdsale-detail-label-middle">
                <div class="crowdsale-detail-label-middle-title">发行</div>
                <div class="crowdsale-detail-label-middle-list">
                    <div class="crowdsale-detail-label-middle-list-tap">
                        <span>众筹1.05亿</span>
                    </div>
                    <div class="crowdsale-detail-label-middle-list-tap">
                        <span>平台币</span>
                    </div>
                </div>
            </div>
            <div class="crowdsale-detail-label-middle">
                <div class="crowdsale-detail-label-middle-title">技术</div>
                <div class="crowdsale-detail-label-middle-list">
                    <div class="crowdsale-detail-label-middle-list-tap">
                        <span>Ethereum</span>
                    </div>
                    <div class="crowdsale-detail-label-middle-list-tap">
                        <span>平台币</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="crowdsale-detail-specific">
            <div class="crowdsale-detail-specific-text">
                <span>本轮发行数量：</span>
                <span>5,000,000 BRB</span>
            </div>
            <div class="crowdsale-detail-specific-text">
                <span>本轮发行数量：</span>
                <span>5,000,000 BRB</span>
            </div>
            <div class="crowdsale-detail-specific-text">
                <span>本轮发行数量：</span>
                <span>5,000,000 BRB</span>
            </div>
            <div class="crowdsale-detail-specific-text">
                <span>本轮发行数量：</span>
                <span>5,000,000 BRB</span>
            </div>
        </div>
    </div>
    <div class="crowdsale-footer">
        <el-button class="crowdsale-footer-btn">默认按钮</el-button>
    </div>
</div>  
</template>
<script>
    export default {
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        }
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
                    width: 240px;
                    @extend %crowdsale-detail-title;
                }
                &-right {
                    width: 120px;
                    text-align: right;
                    &-select {
                        display: inline-block;
                        width: 98px;
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
            }
        }
    }
</style>