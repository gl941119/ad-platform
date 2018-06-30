<template>
    <div class="crowdsale-item">
        <div class="crowdsale-item-head">
            <div class="crowdsale-item-head-left">
                BRB-大数据区块链广告平台-第二轮
                <span>|</span>
                <span>广告</span>
            </div>
            <div class="crowdsale-item-head-right">
                <el-select size="mini" class="crowdsale-item-head-right-select" v-model="value" placeholder="全部阶段">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div class="crowdsale-item-head-right-sn">
                    <span>项目编号:</span>
                    <span>BR1806536</span>
                </div>
            </div>
        </div>
        <p class="crowdsale-item-content">
            全球1.44亿币圈精准用户数据/AI机器人集群流量入口/做最大的区块链项目流量入口,全球1.44亿币圈精准用户数据/AI机器人集群流量入口/做最大的区块链项目流量入口,全球1.44亿币圈精准用户数据/AI机器人集群流量入口/做最大的区块链项目流量入口
        </p>
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
    .crowdsale-item {
        width: 383px;
        height: 453px;
        background: #fff;
        margin-bottom: 40px;
        padding: 16px 12px 0;
        &-head {
            width: 100%;
            height: 50px;
            @include content-flex(space-between, flex-start);
            &-left {
                width: 240px;
                color: #333;
                font-size: 18px;
                font-weight: bold;
                line-height: 25px;
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
    }
</style>