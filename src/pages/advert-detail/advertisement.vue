<template>
    <div class="advertisement">
        <div class="advertisement-container">
            <div class="advertisement-container-header">
                <a :href="headerImg.advertUrl" target="_blank">
                    <img :src="headerImg.banner">
                </a>
            </div>
            <div class="advertisement-container-title">
                <div class="advertisement-container-title-label">{{$t('header.project')}}</div>
            </div>
            <div class="advertisement-container-select">
                <el-select size="mini" @change="selectConcept" class="advertisement-container-select-left" v-model="conceptId" :placeholder="$t('crowdFunding.allConcept')">
                    <el-option v-for="item in conceptOptions" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="advertisement-box">
            <div class="advertisement-box-content">
                <div class="advertisement-box-content-item">
                    <advert-item v-for="advert in advertDatas" :key="advert.id" :advert-datas="advert"  :item-index="(currpage?currpage:1)*29" :system-time="sysTime" :is-white-back="true" @update-data="updateAdvertData"></advert-item>
                    <el-pagination class="ad-crowdsale-box-pagination"
                        background
                        layout="prev, pager, next"
                        @current-change="queryCurrentPageList"
                        :page-size="pageSize"
                        :total="pageTotal">
                    </el-pagination>
                </div>
                <div class="advertisement-box-content-imgs">
                    <a :href="thumb.advertUrl" v-for="thumb in thumbImgs" :key="thumb.id" target="_blank">
                        <img :src="thumb.banner">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Request from '../../utils/require.js';
import Config from '../../utils/config.js';
    export default {
        data() {
            return {
                headerImg: {},
                thumbImgs: [],
                conceptOptions: [],
                advertDatas: [],
                totalAdvertItemDatas: [],
                conceptId: 0,
                sysTime: undefined,
                page: Config.pageStart,
                pageSize: 30,
                pageTotal: 0,
                currpage: undefined,
            }
        },
        mounted() {
            Promise.all([this.getAdvertInfoInit(), this.getAllConcept(), this.getSystemTime(), this.findAdvertisement()]).then(() => {
            })
        },
        computed: {
			slangChange() {
				var lang = this.$store.state.slangChange || this.$i18n.locale;
				if(lang == 'en'){
					lang = lang.toUpperCase();
				}
				return lang;
			}
		},
		watch: {
			slangChange(val, oldval) {
				Promise.all([this.getAdvertInfoInit(), this.getAllConcept(), this.getSystemTime(), this.findAdvertisement()]).then(() => {
            	})
			}
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
                        url: 'QueryAdvertInfoForPage',
                        data: {
                            page,
                            pageSize,
                            conceptId,
                        },
                        type: 'get'
                    }).then(res => {
                        // console.log('QueryAdvertInfoForPage>', res);
                        this.advertDatas = res.data;
                        this.pageTotal = res.total;
                        resolve();
                    })
                });
            },
            getAdvertInfoInit(page = this.page, pageSize = this.pageSize) {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryAdvertInfo',
                        data: {
                            page,
                            pageSize,
                        },
                        type: 'get'
                    }).then(res => {
                        // console.log('QueryAdvertInfo_>', res);
                        this.advertDatas = res.data;
                        this.pageTotal = res.total;
                        resolve();
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
                        this.thumbImgs = this.handlePicList(res.data);
                        // console.log('FindAdvertisement->', this.thumbImgs);
                        resolve();
                    })
                })
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
                this.getAdvertInfo(this.conceptId, page)
            },
            updateAdvertData(){
                this.getAdvertInfo(this.conceptId, this.currpage);
            },
            handleCarouselData(data){
                return data.find(item => item.advertPosition === 3)
            },
            handlePicList(data){
                return data.filter(item => item.advertPosition === 1).sort((a, b) => a.advertSort - b.advertSort)
            }
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
            }
            &-select {
                height: 65px;
                @include content-flex;
                &-left {
                    width: 115px;
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
                    
                    overflow: hidden;
                    margin-top: 12px;
                    @include content-flex(flex-start, flex-start);
                    flex-direction: column;
                    & a {
                        margin-bottom: 24px;
                        & img {
                            height: 162px;
                            width: 416px;
                        }
                    }
                }
            }
        }
    }
</style>