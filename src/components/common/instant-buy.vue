<template>
    <el-dialog :close-on-click-modal="false" :visible.sync="instantBuyVisible" width="480px">
        <div class="instant-buy" v-loading="loadingData">
            <div class="instant-buy-box">
                <div>
                    <span>{{$t('crowdFunding.residue')}}：</span>
                    <span>{{immediateBuyDatas.remain}} ETH</span>
                </div>
                <div>
                    <span>{{$t('crowdFunding.crowdPrice')}}：</span>
                    <span>1 EHT={{immediateBuyDatas.rate}} AFDT</span>
                </div>
                <div>
                    <span>{{$t('crowdFunding.limit')}}：</span>
                    <span>{{immediateBuyDatas.minContribution}}-{{immediateBuyDatas.maxContribution}} ETH</span>
                </div>
                <div>
                    <span>{{$t('crowdFunding.timeLeft')}}：</span>
                    <span>{{remainTime}}</span>
                </div>
            </div>
            <div class="instant-buy-content">
                <div>* {{$t('crowdFunding.afdAccount')}}</div>
                <div>
                    <span>{{$t('crowdFunding.walletAddress')}} :</span>
                    <span class="instant-buy-content-address">{{immediateBuyDatas.contractId}}</span>
                </div>
                <div class="instant-buy-content-website">
                    <span>{{$t('crowdFunding.qrCode')}} :</span>
                    <span v-if="immediateBuyDatas.qrCode"><img width="90" :src="'data:image/png;base64, ' + immediateBuyDatas.qrCode"></span>
                    <div class="instant-buy-content-website-anchor">
                        <p>{{$t('crowdFunding.purchaseRoute')}}:</p>
                        <p><a href="https://www.okex.com" target="_blank">OKEX</a></p>
                        <p><a href="https://www.hbg.com" target="_blank">{{$t('crowdFunding.fireIcon')}}</a></p>
                        <p><a href="https://otcbtc.com" target="_blank">OTCBTC</a></p>
                    </div>
                </div>
            </div>
            <div class="instant-buy-foot">
                <el-button class="instant-buy-foot-btn" type="default" size="small" round @click="finish">{{$t('buttonAll.finish')}}</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
    import getDetail from '../../service/getData.js';
    import Utils from '../../utils/util.js';
    import {mainNetContract} from '../../utils/index.js'; 
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
                        contractAbi,
                        qrCode,
                        systemTime
                    } = res;
                    let immediateBuyDatas = {
                        startTime,
                        endTime,
                        price,
                        contractId,
                        qrCode
                    };
                    // console.log('get getDetail data_>', res);
                    this.handleTime(startTime, endTime, systemTime)
                    this.timer = setInterval(() => {
                        systemTime += 1000;
                        this.handleTime(startTime, endTime, systemTime);
                    }, 1000);
                    // return handleContract({ico_abi: JSON.parse(contractAbi), ico_address: contractId});
                    // return handleContract({ico_abi, ico_address: '0x06a1280e1eb6ac56565f9cc7b32329f883e48081'});
                    let result = mainNetContract(JSON.parse(contractAbi), contractId);
                        let {
                            raisedAmount,
                        total,
                    } = result;
                    this.immediateBuyDatas = Object.assign(immediateBuyDatas, result, {
                        remain: total - raisedAmount,
                    });
                    // console.log('res--->', this.immediateBuyDatas);
                    this.loadingData = false;
                })
                .catch(e => {
                    console.error('contract_abi_and_address error_>', e);
                    this.$message.error({message: this.$t('home.instant')});
                    this.finish();
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
                this.remainTime = `${dayArr[0]} ${this.$t('crowdFunding.day')} ${dayArr[1]} ${this.$t('crowdFunding.hour')} ${dayArr[2]} ${this.$t('crowdFunding.minute')} ${dayArr[3]} ${this.$t('crowdFunding.second')}`;
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
                margin: 16px 0;
                &>span:first-child {
                    display: inline-block;
                    font-size: 14px;
                    width: 6em;
                }
            }
            &-address {
                word-break: break-word;
                text-overflow: ellipsis;  
            }
            &-website {
                position: relative;
                &-anchor {
                    position: absolute;
                    right: 0;
                    top: 0;
                    margin-right: 15px;
                    & p {
                        margin: 2px 0;
                        & a {
                            color: #909399;
                            font-size: 14px;
                            line-height: 20px;
                        }
                    } 
                }
            }
        }
        &-foot {
            text-align: center;
            margin-top: 25px;
            &-btn {
                width: 116px;
                @include my-button();
            }
        }
    }
</style>