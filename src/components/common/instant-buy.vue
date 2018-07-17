<template>
    <el-dialog :close-on-click-modal="false" :visible.sync="instantBuyVisible" width="360px">
        <div class="instant-buy" v-loading="loadingData">
            <div class="instant-buy-box">
                <div>
                    <span>本轮发行剩余：</span>
                    <span>{{immediateBuyDatas.remain}} ETH</span>
                </div>
                <div>
                    <span>众筹价格：</span>
                    <span>1 EHT={{immediateBuyDatas.rate}} AFDT</span>
                </div>
                <div>
                    <span>单账户兑换限制：</span>
                    <span>{{immediateBuyDatas.minContribution}}-{{immediateBuyDatas.maxContribution}} ETH</span>
                </div>
                <div>
                    <span>本轮众筹剩余时间：</span>
                    <span>{{remainTime}}</span>
                </div>
            </div>
            <div class="instant-buy-content">
                <div>
                    <span>钱包地址：</span>
                    <span>{{immediateBuyDatas.contractId}}</span>
                </div>
                <div>
                    <span>二维码：</span>
                    <span v-if="immediateBuyDatas.qrCode"><img width="90" :src="'data:image/png;base64, ' + immediateBuyDatas.qrCode"></span>
                </div>
            </div>
            <div class="instant-buy-foot">
                <el-button class="instant-buy-foot-btn" type="default" size="small" round @click="finish">完成</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
    import getDetail from '../../service/getData.js';
    import Utils from '../../utils/util.js';
   /* import {
        handleContract
    } from '../../utils/contract.js';
    import ico_abi from '../../../build/contracts/LavevelICO.json';*/
    export default {
        data() {
            return {
                immediateBuyDatas: {},
                remainTime: undefined,
                utils: new Utils(),
                timer: null,
                loadingData: true,
            }
        },
        computed: {
            instantBuyVisible: {
                get() {
                    return this.$store.state.instantBuyVisible;
                },
                set() {
                    this.$store.commit('setInstantBuyVisible', false);
                }
            },
            instantBuyData() {
                return this.$store.state.instantBuyData;
            },
            id() {
                return this.$store.state.instantBuyDataId;
            },
            change() {
                return this.$store.state.change;
            },
        },
        watch: {
            change(newVal) {
                this.loadingData = true;
                getDetail(this.id).then(res => {
                    let {
                        startTime,
                        endTime,
                        price,
                        contractId,
                        qrCode,
                        systemTime
                    } = res;
                    this.immediateBuyDatas = {
                        startTime,
                        endTime,
                        price,
                        contractId,
                        qrCode
                    };
                    // console.log('get getDetail data_>', this.immediateBuyDatas);
                    this.handleTime(startTime, endTime, systemTime)
                    this.timer = setInterval(() => {
                        systemTime += 1000;
                        this.handleTime(startTime, endTime, systemTime);
                    }, 1000);
                    return handleContract(ico_abi, '0x06a1280e1eb6ac56565f9cc7b32329f883e48081');
                }).then(res => {
                    let {
                        raisedAmount,
                        total,
                    } = res;
                    this.immediateBuyDatas = Object.assign(this.immediateBuyDatas, res, {
                        remain: total - raisedAmount,
                    });
                    this.loadingData = false;
                    // console.log('get getDetail data contractData------>', this.immediateBuyDatas);
                })
            },
            instantBuyVisible(val, old) {
                // console.log(' newval_>', val, old);
                if (false === val) {
                    this.timer && clearInterval(this.timer);
                }
            }
        },
        methods: {
            handleTime(startTime, endTime, systemTime) {
                let {
                    status,
                    dayArr
                } = this.utils.handleTime({
                    startTime,
                    endTime
                }, systemTime);
                this.remainTime = `${dayArr[0]} 天 ${dayArr[1]} 时 ${dayArr[2]} 分 ${dayArr[3]} 秒`;
            },
            finish() {
                this.instantBuyVisible = false;
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .instant-buy {
        &-box {
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 7px;
            &>div {
                color: #606266;
                line-height: 24px;
                font-weight: bold;
            }
        }
        &-content {
            & > div {
                color: #909399;
                line-height: 20px;
                &:first-child {
                    margin: 18px 0;
                }
                &>span:first-child {
                    display: inline-block;
                    font-size: 14px;
                    width: 6em;
                }
            }
        }
        &-foot {
            text-align: center;
            margin-top: 16px;
            &-btn {
                width: 116px;
                @include my-button();
            }
        }
    }
</style>