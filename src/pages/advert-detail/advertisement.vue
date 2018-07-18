<template>
    <div class="advertisement">
        <div class="advertisement-container">
            <div class="advertisement-container-header">
                <img :src="headerImg">
            </div>
            <div class="advertisement-container-title">
                <div class="advertisement-container-title-label">{{$t('header.home')}}</div>
            </div>
            <div class="advertisement-container-select">
                <el-select size="mini" @change="selectConcept" class="advertisement-container-select-left" v-model="concepId" :placeholder="$t('crowdFunding.allConcept')">
                    <el-option v-for="item in conceptOptions" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="advertisement-box">
            <div class="advertisement-box-content">
                <div class="advertisement-box-content-item">
                    <advert-item v-for="(advert, _i) in advertDatas" :key="_i" :advert-datas="advert" :system-tiem="sysTime" :is-white-back="true"></advert-item>
                    <el-pagination class="ad-crowdsale-box-pagination"
                        background
                        layout="prev, pager, next"
                        @current-change="queryCurrentPageList"
                        :page-size="pageSize"
                        :total="pageTotal">
                    </el-pagination>
                </div>
                <div class="advertisement-box-content-imgs">
                    <img v-for="thumb in thumbImgs" :key="thumb" :src="thumb">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Request from '../../utils/require.js';
import Config from '../../utils/config.js';
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
                conceptOptions: [],
                advertDatas: [],
                totalAdvertItemDatas: [],
                concepId: 0,
                sysTime: undefined,
                page: Config.pageStart,
                pageSize: 30,
                pageTotal: 0,
                currpage: undefined,
            }
        },
        mounted() {
            Promise.all([this.getAdvertInfo(), this.getAllConcept(), this.getSystemTime()]).then(() => {
            })
        },
        methods: {
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
            getAdvertInfo(conceptId = 0, page = this.page, pageSize = this.pageSize) {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryAdvertInfoByCId',
                        data: {
                            page,
                            pageSize,
                            conceptId,
                        },
                        type: 'get'
                    }).then(res => {
                        // console.log('QueryAdvertInfoByCId_>', res);
                        this.advertDatas = res.data;
                        this.pageTotal = res.total;
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
            selectConcept(val){
                // console.log('select concept adverts manage_>', val);
                this.$store.commit('setConceptId', val);
                this.getAdvertInfo(val, this.currpage);
            },
            queryCurrentPageList(page){
                this.currpage = page;
                this.getAdvertInfo(this.concepId, page)
            },
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