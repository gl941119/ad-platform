<template>
    <div class="crowdsale-item">
        <div class="crowdsale-item-title">
            <span>品牌规划的投入和策略</span>
            <span class="crowdsale-item-title-border"></span>
            <span class="crowdsale-item-title-ad">广告</span>
        </div>
        <p class="crowdsale-item-sn">
            <span>项目编号：</span>
            <span>BR1806536</span>
        </p>
        <p class="crowdsale-item-abstract">
            通常情况下，高端品牌的优势都是比较大的，这也为企业的经营和发展带来了很大的优势，不过，还是要充分考虑到品牌形象的维护，因为这对企业的发展所起到的积极作用是不言而喻的。
        </p>
        <div class="crowdsale-item-list">
            <div class="crowdsale-item-list-left">
                <div class="crowdsale-item-list-left-label">
                    <span>2018世界杯</span>
                </div>
                <div class="crowdsale-item-list-left-label">
                    <span>超级去中心化式交易</span>
                </div>
                <div class="crowdsale-item-list-left-label">
                    <span>Dapp去中心化</span>
                </div>
                <div class="crowdsale-item-list-left-label">
                    <span>比特币山寨</span>
                </div>
                <div class="crowdsale-item-list-left-label">
                    <span>本轮发行：</span>
                    <span>21,000,000</span>
                </div>
            </div>
            <div class="crowdsale-item-list-right">
                <div v-show="!isEventOver" :class="{'event-over': isEventOver}" class="crowdsale-item-list-right-content">
                    <div>剩余时间</div>
                    <div class="crowdsale-item-list-right-content-divide"></div>
                    <div>12:07:18</div>
                </div>
                <div v-show="isEventOver" :class="{'event-over': isEventOver}" class="crowdsale-item-list-right-content">
                    已结束
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['isEventOver'],
    data (){
        return {}
    }
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
