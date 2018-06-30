<template>
  <div class="platform-index">
      <custom-carousel></custom-carousel>
      <div class="platform-index-bull">
          <div class="platform-index-bull-block">行情播报</div>
          <div class="platform-index-bull-content"></div>
      </div>
      <div class="platform-index-item">
          <div class="platform-index-item-crowdsale">
              <div class="platform-index-item-crowdsale-title">众筹</div>
              <crowdsale-item :is-event-over="true" ></crowdsale-item>
              <crowdsale-item :is-event-over="false" ></crowdsale-item>
          </div>
          <div class="platform-index-item-ad">
              <div class="platform-index-item-ad-title">项目</div>
              <advert-item></advert-item>
          </div>
      </div>
  </div>
</template>
<script>
    import customCarouselCom from '@/components/custom-carousel';
    import crowdsaleItemCom from '@/components/index-com/crowdsale-item';
    import advertItemCom from '@/components/index-com/advert-item';
    import Request from '../../utils/require.js';
    export default {
        data() {
            return {}
        },
        mounted () {
            this.getData()
        },
        components: {
            'custom-carousel': customCarouselCom,
            'crowdsale-item': crowdsaleItemCom,
            'advert-item': advertItemCom,
        },
        methods: {
            getData(){
                Request({url: 'QueryCrowdSale', type: 'get'}).then(res => {
                    console.log('QueryCrowdSale res_>', res);
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/variable.scss';
    @import '../../assets/css/global.scss';
    %platform-index-title {
        font-size: $crowdsaleFontSize;
        color: $crowdsaleFontColor;
        font-weight: bold;
        font-family: semibold;
        line-height: 28px;
        padding: 17px 0 10px;
    }

    .platform-index {
        &-bull {
            height: $bullHeight;
            @include body-center();
            @include content-flex();
            border-bottom: 1px solid #e1e1e1;
            border-right: 1px solid #e1e1e1;
            &-block {
                width: $bullBlockWidth;
                height: 100%;
                background: $bullBlockColor;
                @include content-flex(center);
                font-size: $headerFontSize;
                color: #e5e5e5;
                box-shadow: 3px 3px 10px $bullBlockColor;
            }
        }
        &-item {
            @include body-center();
            @include content-flex(flex-start, flex-start);
            &-crowdsale {
                width: $crowdsaleWidth;
                &-title {
                    @extend %platform-index-title;
                }
            }
            &-ad {
                margin-left: 43px;
                flex: 1;
                &-title {
                    @extend %platform-index-title;
                }
            }
        }
    }
</style>