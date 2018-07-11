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
                <el-select size="mini" @change="selectStage" class="ad-crowdsale-container-select-left" v-model="stageValue" placeholder="全部阶段">
                    <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select size="mini" @change="selectConcept" class="ad-crowdsale-container-select-right" v-model="conceptValue" placeholder="全部概念">
                    <el-option v-for="item in conceptOptions" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ad-crowdsale-box">
            <div class="ad-crowdsale-box-content">
                <crowdsale-detial v-for="(detail, i) in crowdSaleDatas" :key="i" :detail-data="detail" :system-time="sysTime"></crowdsale-detial>
            </div>
            <el-pagination class="ad-crowdsale-box-pagination"
                background
                layout="prev, pager, next"
                @current-change="queryCurrentPageList"
                :page-size="pageSize"
                :total="pageTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import crowdsaleDetialCom from '@/components/detail-com/crowdsale-detail';
    import Request from '../../utils/require.js';
    import Config from '../../utils/config.js';
    const headerImg = require('../../assets/imgs/detail-img/crowdsale.png');
    export default {
        data() {
            return {
                pageSize: Config.pageSize,
                pageTotal: 0,
                headerImg,
                stateOptions: [{
                    value: 0,
                    label: '全部阶段'
                }, {
                    value: 1,
                    label: '即将开始'
                }, {
                    value: 2,
                    label: '进行中'
                }, {
                    value: 3,
                    label: '已经结束'
                }],
                conceptOptions: [],
                stageValue: 0,
                conceptValue: 0,
                currpage: undefined,
                crowdSaleDatas: [],
                sysTime: undefined,
            }
        },
        components: {
            'crowdsale-detial': crowdsaleDetialCom,
        },
        mounted() {
            Promise.all([this.getCrowdSaleInfo(), this.getAllConcept(), this.getSystemTime()]).then(() => {
            })
        },
        methods: {
            getCrowdSaleInfo(state = 0, concept = 0, page = Config.pageStart) {
                return new Promise((resolve, reject) => {
                    Request({
                            url: 'QueryCrowdSaleDetailInfo',
                            data: {
                                page,
                                pageSize: this.pageSize,
                                state,
                                concept,
                            },
                            type: 'get'
                        })
                        .then(res => {
                            this.crowdSaleDatas = res.data;
                            this.pageTotal = res.total;
                            resolve();
                        })
                });
            },
            getAllConcept(){
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryAllConcept',
                        type: 'get'
                    }).then(res => {
                        res.data.unshift({id: 0, name: "全部概念"});
                        this.conceptOptions = res.data;
                        resolve();
                    })
                });
            },
            getSystemTime() {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'GetSystemTime',
                        type: 'get'
                    }).then(res => {
                        this.sysTime = res.data;
                        resolve()
                    })
                });
            },
            selectStage(val){
                console.log("select_stageValue_>", this.stageValue, val);
                this.getCrowdSaleInfo(this.stageValue, this.conceptValue, this.currpage);
            },
            selectConcept(val){
                console.log("select_conceptValue_>", this.conceptValue, val);
                this.getCrowdSaleInfo(this.stageValue, this.conceptValue, this.currpage);
            },
            queryCurrentPageList(page){
                this.currpage = page;
                this.getCrowdSaleInfo(this.stageValue, this.conceptValue, this.currpage);
            },
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
                &-left,
                &-right {
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
            &-pagination {
                text-align: center;
            }
        }
    }
</style>