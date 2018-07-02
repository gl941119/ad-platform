<template>
    <div class="ad-crowdsale">
        <div class="ad-crowdsale-container">
            <div class="ad-crowdsale-container-header">
                <img :src="headerImg">
            </div>
            <div class="ad-crowdsale-container-title">
                <div class="ad-crowdsale-container-title-label">众筹</div>
                <div class="ad-crowdsale-container-title-appx">
                    风险警示：BierInc对众筹项目方合规性已尽审查义务，投资行为所天然具备的风险属性望投资者知悉并谨慎对待
                </div>
            </div>
            <div class="ad-crowdsale-container-select">
                <el-select size="mini" class="ad-crowdsale-container-select-left" v-model="value" placeholder="全部阶段">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select size="mini" class="ad-crowdsale-container-select-right" v-model="value" placeholder="全部阶段">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ad-crowdsale-box">
            <div class="ad-crowdsale-box-content">
                <crowdsale-detial></crowdsale-detial>
                <crowdsale-detial></crowdsale-detial>
                <crowdsale-detial></crowdsale-detial>
                <crowdsale-detial></crowdsale-detial>
                <crowdsale-detial></crowdsale-detial>
            </div>
        </div>
    </div>
</template>
<script>
    import crowdsaleDetialCom from '@/components/detail-com/crowdsale-detail'
    const headerImg = require('../../assets/imgs/detail-img/crowdsale.png');
    export default {
        data() {
            return {
                headerImg,
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
        },
        components: {
            'crowdsale-detial': crowdsaleDetialCom,
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/variable.scss';
    @import '../../assets/css/global.scss';
    .ad-crowdsale {
        height: 100%;
        width: 100%;
        &-container {
            @include body-center();
            &-title {
                @include content-flex(flex-start, flex-end);
                height: 48px;
                border-bottom: 1px solid #E2E2E2;
                &-label {
                    @extend %platform-title;
                }
                &-appx {
                    margin-left: 15px;
                    font-size: 12px;
                    color: #999;
                }
            }
            &-select {
                height: 65px;
                @include content-flex;
                &-left, &-right {
                    width: 112px;
                }
                &-right {
                    margin-left: 32px;
                }
            }
        }
        &-box {
            background: #F5F5F5;
            padding: 10px 0 100px;
            &-content {
                @include body-center();
                @include content-flex(flex-start, flex-start);
                flex-wrap: wrap;
            }
        }
    }
</style>