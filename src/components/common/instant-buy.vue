<template>
    <el-dialog :close-on-click-modal="false" :visible.sync="instantBuyVisible" width="360px">
        <div class="instant-buy">
            <div class="instant-buy-box">
                <div>
                    <span>本轮发行剩余：</span>
                    <span>{{immediateBuyDatas.remain}}BRB</span>
                </div>
                <div>
                    <span>众筹价格：</span>
                    <span>1 EHT={{immediateBuyDatas.price}} BRB</span>
                </div>
                <div>
                    <span>单账户兑换限制：</span>
                    <span>1-{{immediateBuyDatas.mostNumber}}</span>
                </div>
                <div>
                    <span>本轮众筹剩余时间：</span>
                    <span>{{immediateBuyDatas.remainTime}}</span>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props:['immediateBuyDatas'],
    data(){
        return {}
    },
    computed: {
        instantBuyVisible: {
            get(){},
            set(){}
        }
    },
}
</script>
<style lang="scss" scoped>
.instant-buy {
    &-box {
        border-bottom: 1px solid #e0e0e0;
    }
}
</style>
