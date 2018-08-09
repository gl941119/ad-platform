<template>
    <div style="width: 1400px;margin:0 auto;">
        <div class="partner">
            <div class="title">
                <div class="linear"></div>
                {{$t('footer.partner')}}
            </div>
            <div class="main">
                <img src="@/assets/imgs/img/partner (1).jpg">
                <img src="@/assets/imgs/img/partner (2).jpg">
                <img src="@/assets/imgs/img/partner (3).jpg">
                <img src="@/assets/imgs/img/partner (4).jpg">
                <img src="@/assets/imgs/img/partner (5).jpg">
                <img src="@/assets/imgs/img/partner (6).jpg">
                <img src="@/assets/imgs/img/partner (7).jpg">
                <img src="@/assets/imgs/img/partner (9).jpg">
                <img src="@/assets/imgs/img/partner (10).jpg">
                <img src="@/assets/imgs/img/partner (11).jpg">
                <img src="@/assets/imgs/img/partner (12).jpg">
                <img src="@/assets/imgs/img/partner (1).png">
            </div>
        </div>
        <div class="footer" id='callMy'>
            <div class="footerLogo">
                <img src="@/assets/imgs/img/logo.png" />
                <p class="fw6">AFD Chain</p>
            </div>
            <div class="call">
                <div>
                    <img src="@/assets/imgs/img/Telegram.png" alt="">
                    <p>Telegram</p>
                </div>
                <div>
                    <img src="@/assets/imgs/img/Wechat public number.png" alt="">
                    <p class="Wechatp">{{$t('footer.Wechat')}}</p>
                </div>
                <div>
                    <img src="@/assets/imgs/img/Wechat.png" alt="">
                    <p style="width: 64px;">{{$t('footer.Cooperation')}}</p>
                </div>
                <!--<div>-->
                    <!--<img src="img/kefu.jpg" alt="">-->
                    <!--<p style="white-space: nowrap;margin-left: -10px;">Service wechat</p>-->
                <!--</div>-->
                <ul>
                    <!-- <li id="callMy">联系我们</li> -->
                    <li>
                        <!--<a href="https://t.me/AFDchain99" class="custom-element-icon-hoveraax"></a>-->
                        <a href="https://twitter.com/AfDchain" class="custom-element-icon-telegram"></a>

                    </li>
                    <li>AFDwechat：AFDchain123</li>
                </ul>

            </div>
        </div>
        <div class="coypRight">
            <span>Copyright © 2018 </span>
            <span>AFD基金会</span>
            <span>版权所有</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'partner'
    }
</script>

<style lang="scss" scoped>
    .partner {
        width: 1440px;
        margin: 0 auto;
        padding-top: 8px;
        overflow: hidden;
        background:rgba(255,255,255,1);
        >.title{
            height:33px;
            line-height:28px;
            font-size:20px;
            font-family:PingFangSC-Semibold;
            color:rgba(60,89,159,1);
            text-align: center;
            .linear{
                width: 80px;
                height: 2px;
                margin: 0 auto;
                margin-bottom: 6px;
                background: linear-gradient(-90deg, rgba(60, 89, 159, 0), rgba(60, 89, 159, 0.45), rgba(60, 89, 159, 1));
            }
        }
        .main {
            box-sizing: border-box;
            padding: 0 100px 0 100px;
            margin-top: 48px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            height: 384px;
            img {
                display: block;
                width: 188px;
                height: 110px;
            }
        }
    }

    .footer {
        width: 1440px;
       
        background: rgba(100, 100, 100, 1);

        color: rgba(255, 255, 255, 1);
        overflow: hidden;
        .footerLogo {
            float: left;
            margin: 38px 80px;
            width: 89px;
            text-align: center;
            img {
                width: 60px;
                height: 72px;
            }
            p {
                margin-top: 3px;
                font-size: 18px;
                font-family: "PingFangSC-Regular";
                line-height: 25px;
                white-space: nowrap;
                
            }

        }
        .call{
            float: right;
            height: 188px;
            ul{
                float: left;
                margin-top: 20px;
                width: 150px;
                margin-right: 150px;
                li{
                    /* margin-top: 69px; */
                    width: 56px;
                    font-size:14px;
                    font-family:"PingFangSC-Medium";
                    white-space: nowrap;

                }
                li:first-child{
                    margin-top:69px;
                    a{
                        display: inline-block;
                        color: rgb(44, 165, 224);
                        width: 24px;
                        height: 24px;
                    }
                    a:first-child{
                        
                        
                    }
                    a:last-child{
                        /*margin-left:22px;*/
 
                    }
                }
                li:last-child{
                    margin-top: 10px;
                }
                .bian{
                    letter-spacing:29px
                }
            }
            >div{
                float: left;
                width: 64px;
                height: 188px;
                margin-right: 48px;
                box-sizing: border-box;
                padding-top: 50px;
                p{
                    margin-top: 10px;
                    font-size:12px;
                    font-family:PingFangSC-Medium;
                    color:rgba(255,255,255,1);
                    line-height:17px;
                    text-align: center;
                }
                img{
                    width: 64px;
                    height: 64px;
                }
                .Wechatp{
                    width: 126px;
                    text-align: center;
                    white-space: nowrap;
                    margin-left: -35px;
                }
            }


        }
        
    }

    .coypRight {
        width: 1440px;
        height: 40px;
        line-height: 40px;
        background: rgba(51, 51, 51, 1);
        font-size:12px;
        color:rgba(255,255,255,1);
        text-align: center;
        
        span:first-child {
            font-family: "ArialMT";

        }
        span:nth-child(2) {
            font-family: "PingFangSC";
        }
        span:last-child {
            font-family: "ArialMT";
        }
    }

</style>