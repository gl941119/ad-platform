<template>
    <div class="ad-crowdsale">
        <div class="ad-crowdsale-container">
            <div class="ad-crowdsale-container-header">
                <a :href="headerImg.advertUrl" target="_blank">
                    <img :src="headerImg.banner">
                </a>
            </div>
            <div class="ad-crowdsale-container-title">
                <div class="ad-crowdsale-container-title-label">{{$t('crowdFunding.crowdfunding')}}</div>
                <div class="ad-crowdsale-container-title-appx">
                    {{$t('crowdFunding.warn')}}
                </div>
            </div>
            <div class="ad-crowdsale-container-select">
                <el-select size="mini" @change="selectStage" class="ad-crowdsale-container-select-left" v-model="stageValue" :placeholder="$t('crowdFunding.all')">
                    <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select size="mini" @change="selectConcept" class="ad-crowdsale-container-select-right" v-model="conceptValue" :placeholder="$t('crowdFunding.allConcept')">
                    <el-option v-for="item in conceptOptions" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ad-crowdsale-box" v-if="crowdSaleDatas.length>0">
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
        <div v-else class="ad-crowdsale-exec">
        	<div class="ad-crowdsale-exec-text">
        		{{$t('crowdFunding.sorry')}}
        	</div>
        </div>
    </div>
</template>
<script>
    import crowdsaleDetialCom from '@/components/detail-com/crowdsale-detail';
    import Request from '../../utils/require.js';
    import Config from '../../utils/config.js';
    // const headerImg = require('../../assets/imgs/detail-img/crowdsale.png');
    export default {
        data() {
            return {
                pageSize: Config.pageSize,
                pageTotal: 0,
                headerImg: {},
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
        computed: {
        	stateOptions(){
        		return [{
                    value: 0,
                    label: this.$t('crowdFunding.all')
                }, {
                    value: 1,
                    label: this.$t('crowdFunding.start')
                }, {
                    value: 2,
                    label: this.$t('crowdFunding.underway')
                }, {
                    value: 3,
                    label: this.$t('home.over')
                }]
        	}
        },
        mounted() {
            Promise.all([this.getCrowdSaleInfo(), this.getAllConcept(), this.getSystemTime(), this.findAdvertisement()]).then(() => {
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
                        res.data.unshift({id: 0, name: this.$t('crowdFunding.allConcept')});
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
            findAdvertisement(){
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'FindAdvertisement',
                        type: 'get',
                    }).then(res => {
                        this.headerImg = this.handleCarouselData(res.data);
                        resolve();
                    })
                })
            },
            selectStage(val){
                // console.log("select_stageValue_>", this.stageValue, val);
                this.getCrowdSaleInfo(this.stageValue, this.conceptValue, this.currpage);
            },
            selectConcept(val){
                // console.log("select_conceptValue_>", this.conceptValue, val);
                this.getCrowdSaleInfo(this.stageValue, this.conceptValue, this.currpage);
            },
            queryCurrentPageList(page){
                this.currpage = page;
                this.getCrowdSaleInfo(this.stageValue, this.conceptValue, this.currpage);
            },
            handleCarouselData(data){
                return data.find(item => item.advertPosition === 2)
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
            &-header {
                height: 366px;
                overflow: hidden;
            }
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
        &-exec{
        	background: #F5F5F5;
        	padding-top: 10px;
        	padding-bottom: 100px;
		    &-text{
			    padding-top: 100px;
			    font-size: 18px;
			    color: #606266;
			    text-align: center;
			    background: white;
			    width: 1200px;
			    margin: 0 auto;
			    height: 500px;
		    }
        }
    }
</style>