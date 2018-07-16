<template>
    <el-dialog :close-on-click-modal="false" :visible.sync="instantBuyVisible" width="360px">
        <div class="instant-buy">
            <div class="instant-buy-box">
                <div>
                    <span>本轮发行剩余：</span>
                    <span>{{instantBuyData.remain}} ETH</span>
                </div>
                <div>
                    <span>众筹价格：</span>
                    <span>1 EHT={{instantBuyData.rate}} AFDT</span>
                </div>
                <div>
                    <span>单账户兑换限制：</span>
                    <span>{{instantBuyData.minContribution}}-{{instantBuyData.maxContribution}} ETH</span>
                </div>
                <div>
                    <span>本轮众筹剩余时间：</span>
                    <span>{{remainTime}}</span>
                </div>
            </div>
            <div>
                <div>
                    <span>钱包地址：</span>
                    <span>{{immediateBuyDatas.contractId}}</span>
                </div>
                <div>
                    <span>二维码：</span>
                    <span v-if="immediateBuyDatas.qrCode"><img :src="'data:image/png;base64, ' + immediateBuyDatas.qrCode"></span>
                </div>
            </div>
            <div>
                <el-button @click="finish">完成</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import getDetail from '../../service/getData.js';
import Utils from '../../utils/util.js';
export default {
    data(){
        return {
            immediateBuyDatas: {},
            remainTime: undefined,
            utils: new Utils(),
            timer: null,
        }
    },
    computed: {
        instantBuyVisible: {
            get(){
                return this.$store.state.instantBuyVisible;
            },
            set(){
                this.$store.commit('setInstantBuyVisible', false);
            }
        },
        instantBuyData(){
            let {raisedAmount, total} = this.$store.state.instantBuyData;
            return Object.assign({}, this.$store.state.instantBuyData, {
                remain: total - raisedAmount,
            });
        },
        id(){
            return this.$store.state.instantBuyDataId;
        },
        change(){
            return this.$store.state.change;
        },
    },
    watch: {
        change(newVal){
            getDetail(this.id).then(res => {
                console.log('get getDetail _>', res);
                let {startTime, endTime, price, contractId, qrCode, systemTime} = res;
                this.immediateBuyDatas = {startTime, endTime, price, contractId, qrCode};
                console.log('get getDetail data_>', this.immediateBuyDatas);
                this.handleTime(startTime, endTime, systemTime)
                this.timer = setInterval(() => {
                    systemTime += 1000;
                    this.handleTime(startTime, endTime, systemTime);
                }, 1000);
            })
        },
        instantBuyVisible(val, old){
            // console.log(' newval_>', val, old);
            if(false === val){
                this.timer && clearInterval(this.timer);
            }
        }
    },
    methods: {
        handleTime(startTime, endTime, systemTime){
            let {status, dayArr} = this.utils.handleTime({startTime, endTime}, systemTime);
            this.remainTime = `${dayArr[0]} 天 ${dayArr[1]} 时 ${dayArr[2]} 分 ${dayArr[3]} 秒`;
        },
        finish(){
            this.instantBuyVisible = false;
        },
    }
}
</script>
<style lang="scss" scoped>
.instant-buy {
    &-box {
        border-bottom: 1px solid #e0e0e0;
    }
}
</style>
