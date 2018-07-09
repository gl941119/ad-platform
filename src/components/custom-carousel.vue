<template>
  <div class="custom-carousel">
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide v-for="img in swiperImg" :key="img"><img :src="img"></swiper-slide>
      </swiper>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
    import {swiper,swiperSlide} from 'vue-awesome-swiper';
    const swiperImg1 = require('../assets/imgs/swiper-img/swiper1.jpg');
    const swiperImg2 = require('../assets/imgs/swiper-img/swiper2.jpg');
    const swiperImg3 = require('../assets/imgs/swiper-img/swiper3.jpg');
    const swiperImg4 = require('../assets/imgs/swiper-img/swiper4.jpg');
    const swiperImg5 = require('../assets/imgs/swiper-img/swiper5.jpg');
    let swiperImg = [swiperImg1, swiperImg2, swiperImg3, swiperImg4, swiperImg5];
    export default {
        data() {
            return {
                swiperImg,
                swiperOptionTop: {
                    autoplay: {
                        disableOnInteraction: false,
                    },
                    loop: true,
                    simulateTouch: false,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + '"><image width="208" src="' + swiperImg[index] + '"></span>';
                        },
                    },
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style lang="scss">
@import '../assets/css/variable.scss';
    .custom-carousel {
        width: 100%;
        height: auto;
        position: relative;
    }
    .gallery-top {
        height: 100%;
        width: $contentWidth;
        margin: 0 auto;
    }
    .swiper-pagination{
        width: $contentWidth;
        height: auto;
        position: absolute;
        padding: 0 40px;
        bottom: 26px;
        left: 50%;
        transform: translate(-50%,0);
        text-align: left;
    }
	.swiper-pagination-bullet{
		width:$thumbsWidth;
		height:auto;
        background:none;
        opacity: 1;
        outline: none;
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
    .swiper-pagination-bullet.swiper-pagination-bullet-active img {
        box-shadow:  0 0 15px #fff;
    }
</style>