<template>
    <div :class="{'white-back': isWhiteBack}" class="advert-item">
        <div class="advert-item-left">
            <div class="advert-item-left-logo">
            </div>
            <div class="advert-item-left-text">白皮书</div>
        </div>
        <div class="advert-item-middle">
            <div class="advert-item-middle-title clearfix">
                <div class="advert-item-middle-title-text">BTC/比特币</div>
                <div class="advert-item-middle-title-symbol">bit coin</div>
                <div class="advert-item-middle-title-icon">
                    <i class="custom-element-icon-hot"></i>
                </div>
            </div>
            <div class="advert-item-middle-divide"></div>
            <div class="advert-item-middle-text">
                从2017年初开始，各类代币持续升温，以纯数字资产交易平台的代表Poloniex为例，月访问量从2月份的7百万人次陡增至5月份的3千万人次，日均交易额达到50亿人民币。即使以交易手续费0.2%计算，日均收入也能达到1000万人民币，而且市场还在迅速扩大。
            </div>
        </div>
        <div class="advert-item-right">
            <el-select class="advert-item-right-select" v-model="advertValue" placeholder="去交易">
                <el-option
                    v-for="item in advertOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <div class="advert-item-right-icons">
                <i class="custom-element-icon-fenxiang"></i>
                <i class="custom-element-icon-duihua"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['isWhiteBack'],
    data(){
        return {
            advertValue: '',
            advertOptions: [{label: 'huobi', value: 1}, {label: 'binance', value: 2}, {label: 'okex', value: 3}],
        }
    }
}
</script>
<style lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/global.scss';
.advert-item {
    @include content-flex(flex-start, flex-start);
    width: 752px;
    padding: 0 18px 12px 0;
    background: $crowdsaleBackGround;
    margin-bottom: 14px;
    &.white-back {
        background: #fff;
        margin-bottom: 16px;
    }
    &-left {
        width: 79px;
        &-logo {
            @include body-center(38px);
            height: 38px;
            border-radius: 50%;
            margin-top: 10px;
            background: #46638B;
        }
        &-text {
            margin-top: 5px;
            text-align: center;
            font-size: $headerFontSize;
            color: #47c3d3;
        }
    }
    &-middle {
        &-title {
            padding-top: 3px;
            width: 311px;
            &-text {
                float: left;
                @include item-title();
            }
            &-symbol {
                float: left;
                margin-left: 22px;
                @include item-title(false);
            }
            &-icon {
                float: right;
                color: #FF2400;
            }
        }
        &-divide {
            width: 311px;
            height: 1px;
            background: #EAEAEA;
            margin: 0 0 10px;
        }
        &-text {
            width: 493px;
            @extend %text-abstract;
        }
    }
    &-right {
        padding-top: 7px;
        &-select {
            margin-left: 8px;
            & input {
                width: 153px;
                height: 34px;
            }
        }
        &-icons {
            color: #aaa;
            margin-top: 29px;
            @include content-flex(flex-end, flex-start);
            & i {
                margin-left: 20px;
            }
        }
    }
}
</style>
