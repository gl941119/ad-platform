<template>
    <div :class="{'white-back': isWhiteBack}" class="advert-item">
        <div class="advert-item-left">
            <div class="advert-item-left-logo">
                <img :src="advertDatas.logo">
            </div>
            <div class="advert-item-left-text" :class="{'english-lang': language!=='zh'}"><a :href="advertDatas.whitePaper" target="_self">{{$t('home.whitePaper')}}</a></div>
        </div>
        <div class="advert-item-middle">
            <div class="advert-item-middle-title clearfix">
                <div class="advert-item-middle-title-text">{{advertDatas.shotEnName}}<span v-show="language==='zh'&&advertDatas.shotCnName">/{{advertDatas.shotCnName}}</span></div>
                <div class="advert-item-middle-title-symbol">{{advertDatas.fullEnName}}</div>
                <div class="advert-item-middle-title-icon" v-show="itemIndex < 30">
                    <i class="custom-element-icon-hot"></i>
                </div>
            </div>
            <div class="advert-item-middle-divide"></div>
            <div class="advert-item-middle-text">
                {{advertDatas.proDesc}}
            </div>
        </div>
        <div class="advert-item-right">
            <el-select ref="advertSelect" class="advert-item-right-select" @focus="focusAdvert" @change="handleAdvertFunc" v-model="advertValue" :placeholder="$t('home.buy')">
                <el-option
                    v-for="(item, index) in advertDatas.websiteResultList"
                    :key="index"
                    :label="item&&item.websiteName"
                    :value="item&&item.id">
                </el-option>
            </el-select>
            <div class="advert-item-right-icons">
                <a href="javascript:;" @click="showShare"><i class="custom-element-icon-fenxiang"></i></a>
                <a :href="advertDatas.telegrameUrl" target="_self"><i class="custom-element-icon-duihua"></i></a>
            </div>
        </div>
    </div>
</template>
<script>
import Request from '../../utils/require.js';
import Utils from '../../utils/util.js';
import Cache from '../../utils/cache.js';
export default {
    props: ['advertDatas', 'systemTime', 'isWhiteBack', 'itemIndex'],
    data(){
        return {
            advertValue: '',
            utils: new Utils(),
        }
    },
    computed: {
        conceptId(){
            return this.$store.state.conceptId;
        },
        language(){
            return this.utils.getCurrLanguage(this.$store, Cache);
        }
    },
    methods: {
        showShare() {
            this.$store.commit('setDialogVisible', true);
        },
        focusAdvert(){
            this.advertValue = '';
        },
        handleAdvertFunc(val){
            // console.log('handleAdvertFunc_>', this.conceptId, val, this.advertDatas);
            Request({
                url: 'ClickAdvertToProfit',
                data: {
                    advertId: this.advertDatas.id,
                    conceptId: this.conceptId,
                    advertWebsiteId: val,
                },
                type: 'get'
            }).then(res => {
                // console.log('ClickAdvertToProfit_>', res);
                // skip
                this.advertDatas.websiteResultList.forEach(item => {
                    if(val === item.id){
                        let {websiteAddress} = item;
                        window.open(websiteAddress,'target');
                    }
                });
                this.$refs.advertSelect.blur();
            }).catch(e => {
                // console.log('e-->', e);
                this.$emit('update-data');
                this.$refs.advertSelect.blur();
                if(e&& e.islogin){
                    this.$store.commit('setDialogModalVisible', true);
                }
                // this.$router.push({name: 'index'})
            })
        },
        
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
            margin-top: 10px;
            &>img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
            }
        }
        &-text {
            margin-top: 5px;
            text-align: center;
            font-size: $headerFontSize;
            & a {
                color: #47c3d3;
            }
            &.english-lang {
                font-size: 13px;
            }
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
            height: 60px;
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
            margin-top: 29px;
            @include content-flex(flex-end, flex-start);
            & a {
                color: #aaa;
                margin-left: 20px;
            }
        }
    }
}
</style>
