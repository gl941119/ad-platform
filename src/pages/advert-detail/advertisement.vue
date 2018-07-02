<template>
    <div class="advertisement">
        <div class="advertisement-container">
            <div class="advertisement-container-header">
                <img :src="headerImg">
            </div>
            <div class="advertisement-container-title">
                <div class="advertisement-container-title-label">项目</div>
            </div>
            <div class="advertisement-container-select">
                <el-select size="mini" class="advertisement-container-select-left" v-model="value" placeholder="全部阶段">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="advertisement-box">
            <div class="advertisement-box-content">
                <div class="advertisement-box-content-item">
                    <advert-item :is-white-back="true"></advert-item>
                    <advert-item :is-white-back="true"></advert-item>
                    <advert-item :is-white-back="true"></advert-item>
                </div>
                <div class="advertisement-box-content-imgs">
                    <img v-for="thumb in thumbImgs" :key="thumb" :src="thumb">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import advertItemCom from '@/components/index-com/advert-item';
    const headerImg = require('../../assets/imgs/detail-img/advertisement.jpg');
    const thumb1 = require('../../assets/imgs/detail-img/dis-thumb1.jpg');
    const thumb2 = require('../../assets/imgs/detail-img/dis-thumb2.jpg');
    const thumb3 = require('../../assets/imgs/detail-img/dis-thumb3.jpg');
    const thumb4 = require('../../assets/imgs/detail-img/dis-thumb4.jpg');
    const thumb5 = require('../../assets/imgs/detail-img/dis-thumb5.jpg');
    export default {
        data() {
            return {
                headerImg,
                thumbImgs: [thumb1, thumb2, thumb3, thumb4, thumb5],
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
            'advert-item': advertItemCom,
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/variable.scss';
    @import '../../assets/css/global.scss';
    .advertisement {
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
            }
            &-select {
                height: 65px;
                @include content-flex;
                &-left {
                    width: 112px;
                }
            }
        }
        &-box {
            background: #F5F5F5;
            padding: 10px 0 100px;
            &-content {
                @include body-center();
                @include content-flex(space-between, flex-start);
                &-imgs {
                    margin-top: 12px;
                    @include content-flex(flex-start, flex-start);
                    flex-direction: column;
                    & img {
                        margin-bottom: 24px;
                    }
                }
            }
        }
    }
</style>