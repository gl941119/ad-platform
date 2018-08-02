<template>
    <div class="ico-detail">
        <div class="ico-detail-container">
            <div class="ico-detail-container-header">
                <img :src="data.logo" alt="">
            </div>
            <div class="ico-detail-container-abstract">
                <p>项目简介</p>
                <p>{{data.proDesc}}</p>
                <p><span>项目名称</span><span>{{data.proName}}</span></p>
                <p><span>官网地址</span><span>{{data.website}}</span></p>
            
                <p><span>白皮书地址</span><span>{{data.whitePaper}}</span></p>
                <p><span>概念</span><span>{{concept}}</span></p>
                <p><span>技术</span><span>{{technolog}}</span></p>
            </div>
            <div class="ico-detail-container-corwdTime">
                <p class="time">本轮众筹时间</p>
                <div class="main">
                    <div class="main-start">
                        <p >开始时间</p>
                        <span class="main-start-time">{{startTime.time}}</span>
                        <div class="main-start-lump">
                        	<div class="day">
                        		<div>{{startTime.day}}</div>
                        		<p>Day</p>
                        	</div>
                        	<div class="hours">
                        		<div>{{startTime.hours}}</div>
                        		<p>Hours</p>
                        	</div>
                        	<div class="mins">
                        		<div>{{startTime.mins}}</div>
                        		<p>Mins</p>
                        	</div>
                        	<div class="secs">
                        		<div>{{startTime.secs}}</div>
                        		<p>Secs</p>
                        	</div>
                        </div>
                        
                    </div>
                    <div class="main-end">
                        <p>结束时间</p>
                        <span class="main-end-time">{{endTime.time}}</span>
                        <div class="main-end-lump">
                        	<div class="day">
                        		<div>{{endTime.day}}</div>
                        		<p>Day</p>
                        	</div>
                        	<div class="hours">
                        		<div>{{endTime.hours}}</div>
                        		<p>Hours</p>
                        	</div>
                        	<div class="mins">
                        		<div>{{endTime.mins}}</div>
                        		<p>Mins</p>
                        	</div>
                        	<div class="secs">
                        		<div>{{endTime.secs}}</div>
                        		<p>Secs</p>
                        	</div>
                        </div>
                        
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom-total">
                        <p>发行总量</p>
                        <div>{{totalCrowdfund}}</div>
                    </div>
                    <div class="bottom-CurrentCirculation">
                        <p>本轮次发行量</p>
                        <div>{{currCirculation}}</div>
                    </div>
                </div>
            </div>
            <div class="ico-detail-container-team">
				<p>团队</p>
				<div class="main">
					<div class="desc" v-for='item in team' >
						<div class="desc-title">
							<!--<img src="" alt="" />-->
							<dt>{{item.name}}</dt>
							<dd>{{item.title}}</dd>
						</div>
						<div class="desc-intro">{{item.desc}}</div>
						
					</div>
				</div>
            </div>
            <div class="ico-detail-container-links">
				<p class="title">links</p>
				<div class="container">
					<div><a href="#"><i class="custom-element-icon-qq-copy"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-zhifubao"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-instagram"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-reddit"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-GitHub"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-telegram1"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-facebook1"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-meetup"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-weibo1"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-weixin1"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-blogger"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-sousuo"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-qq-copy"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-forum"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-6"></i></a></div>
					<div><a href="#"><i class="custom-element-icon-diqiu"></i></a></div>
				</div>
            </div>
            
            
            <!--<div class="ico-detail-container-milestone">

            </div>
            
            <div class="ico-detail-container-standard">

            </div>-->
        </div>
    </div>
</template>
<script>
    import Config from '../../utils/config.js'
    import Request from '../../utils/require.js'
	import Util from '../../utils/util.js'
//	import '../../assets/fonts/corwdDetailIcon.css'
export default {
    data(){
        return {
            data:[],
            concept:undefined,
            technolog:undefined,
            util:new Util(),
            startTime:{},
            endTime:{},
            currCirculation:undefined,
            totalCrowdfund:undefined,
            team:[],//团队
            
        }
    },
    created(){
        this.queryData()
    },
    methods:{
        queryData(){
            Request({
                url:'QueryCrowdDataById',
                data:{
                    id:this.$route.params.id
                },
                type:'get'
            }).then(res=>{
                this.data = res.data;

                //技术
                let {technology1,technology2} = res.data;
                this.technolog = [technology1,technology2].join('')
                //概念
                this.conceptData()
//              let ymd = this.util.dateFormat(res.data.startTime),//年月日
//              	time = this.util.dateFormat(res.data.startTime,"time"),//all
//              	pureTime = this.util.dateFormat(res.data.startTime,"pureTime")//时分秒

				//发行量
              	this.totalCrowdfund = res.data.totalCrowdfund
				this.currCirculation = res.data.currCirculation
				
               	//时间
            	this.startTime.time = this.util.dateFormat(res.data.startTime,"time")
            	this.startTime.day = new Date(res.data.startTime).getDate()
            	this.startTime.hours = new Date(res.data.startTime).getHours()
            	this.startTime.mins = new Date(res.data.startTime).getMinutes()
            	this.startTime.secs = new Date(res.data.startTime).getSeconds()
            	
            	this.endTime.time = this.util.dateFormat(res.data.endTime,"time")
            	this.endTime.day = new Date(res.data.endTime).getDate()
            	this.endTime.hours = new Date(res.data.endTime).getHours()
            	this.endTime.mins = new Date(res.data.endTime).getMinutes()
            	this.endTime.secs = new Date(res.data.endTime).getSeconds()
            	
            	//团队
				this.team = res.data.listMemberResults.concat(res.data.listConsultantsResults)
            })
        },
        conceptData() {//请求全部概念处理
            Request({
                url: 'QueryConcept',
                type: 'get'
            }).then(res => {
                let {concept1Id,concept2Id,concept3Id,concept4Id} = this.data;
                let conceptArray = [concept1Id,concept2Id,concept3Id,concept4Id]

                let arr = []
                conceptArray.forEach(item=>{
                    res.data.forEach(val=>{
                        if(item!==null&&item != -1){
                            if(item==val.id){
                              arr.push(val.name)
                            }
                        }
                    })
                })
                this.concept = arr.join('')
            })
        },
    }
}
</script>
<style lang="scss" scoped>

.ico-detail {
    width: 100%;
    background: #F9F9F9;
    padding: 36px 0 118px;
    &-container {
        width: 1200px;
        margin: 0 auto;
        >div{
           
            background: #fff;
            box-sizing: border-box;
        }
        &-header {
            height: 115px;
            
            >img{
               
                width:36px;
                height:36px;
                margin-top: 35px;
             
                margin-left: 15px;
            }
        }
        &-abstract {
            margin-top: 14px;
            min-height: 492px;
            padding: 34px 18px 0;
            p{
                margin-bottom: 20px;
                font-size:14px;
                font-family:"PingFangSC-Medium";
                color:rgba(102,102,102,1);
                line-height:20px;
                span:first-child{
                     position: absolute;
                }
                span:last-child{
                    margin-left:209px;
                    font-family:"PingFangSC-Regular";
                }
            }
            p:first-child{
                font-size: 14px;
            }
            p:nth-child(2){
                margin-bottom: 40px;
                font-size: 14px;
                line-height: 25px;
             
            }
            
        }
        &-corwdTime{
            margin-top:48px;
            height:416px;
            padding: 27px 30px 0;
            .time{
                margin-left:-13px;
                margin-bottom:20px;
                font-size:18px;
                font-family:PingFangSC-Medium;
                color:rgba(51,51,51,1);
                line-height:25px;
                font-weight: 600;

            }
            .main{
                display: flex;
                justify-content: space-between;
                &-start,&-end{
                    width:554px;
                    height:197px;
                    border-radius:4px;
                    border:1px solid rgba(151,151,151,1);
                    box-sizing: border-box;
                    padding: 20px 0 0 25px;
                    p{
                        margin-bottom: 20px;
                        font-size:18px;
                    }
                    &-time{
                        
                    }
                    &-lump{
                    	margin-top: 20px;
                        >div{
                        	width: 46px;
                        	float: left;
                        	margin-right: 5px;
                        	>div{
                        		width:46px;
								height:46px;
								line-height:46px;
								text-align: center;
								background:rgba(55,197,149,1);
								border-radius:4px;
								font-size:24px;
								font-family:PingFangSC-Regular;
								color:rgba(255,255,255,1);
								
                        	}
                        	p{
                        		margin-top: 8px;
                        		text-align: center;
                        		font-size:14px;
								font-family:PingFangSC-Regular;
								color:rgba(102,102,102,1);
								line-height:20px;
                        	}
                        }
                    }
                }
                
                
            }
            .bottom{
                	margin-top:46px;
                	display: flex;
                	justify-content: flex-start;
                	>div{
                		width: 140px;
                		margin-right: 72px;
                		p{
                			font-size:18px;
							font-family:PingFangSC-Medium;
							color:rgba(51,51,51,1);
                		}
                		>div{
                			margin-top: 18px;
                			width:140px;
							height:34px;
							line-height: 34px;
							text-align: center;
							background:rgba(232,232,232,1);
							border-radius:4px;
							
                		}
                	}
                	
                }
        }
        &-team{
            margin-top:36px;
            height:900px;
            padding: 27px 30px 0;
            
            >p{
            	margin:0 0 20px 0;
            	font-weight: 600;
            }
            .main{
            	display: flex;
            	flex-wrap: wrap;
            	justify-content: space-between;
            	.desc{
	            	width:530px;
					height:180px;
					border-radius:4px;
					border:1px solid rgba(151,151,151,1);
					margin-top: 24px;
	            	&-title{
	            		margin: 10px 0 0 10px;
	            		height: 81px;
	            		img{
	            			display: block;
	            			float: left;
	            			width:64px;
							height:64px;
							background:rgba(216,216,216,1);
							border:1px solid rgba(151,151,151,1);
							border-radius: 250px;
	            		}
	            		dt,dd{
	            			margin-left: 80px;
	            			font-size:18px;
	            			font-family:PingFangSC-Medium;
	            			line-height:25px;
	            		}
	            		dt{
	            			margin-top: 5px;
							color:black;
	            		}
	            		dd{
	            			margin-top: 11px;
							color:rgba(153,153,153,1);
	            		}
	            	}
	            	&-intro{
	            		margin:0 auto;
	            		width:460px;
						height:80px;
						font-size:14px;
						font-family:PingFangSC-Regular;
						color:rgba(102,102,102,1);
						line-height:20px;
	            	}
	            	
	            }
            }
        }
        &-links{
            margin-top:33px;
            height:328px;
            padding: 30px 30px 60px;
            .title{
            	font-size:18px;
				color:rgba(51,51,51,1);
				margin-bottom: 30px;
				font-weight: 600;
            }
            .container{
            
            	height: 182px;
            	display: flex;
            	flex-wrap: wrap;
            	 flex-direction: row;
            	justify-content: space-between;
            	>div{
            		width: 12.5%;	
            		height: 63px;
            		a{
            			display: block;
            			width: 63px;
            			height: 63px;
            			margin: 0 auto;
            			i{
            				display: block;
            				font-size: 63px;
            			}
            		}
            	}
            	
            	
            }
           
        }
        &-milestone{
            margin-top:36px;
            height:364px;
          
        }
        &-standard{
            margin-top:36px;
            height:98px;
            background:rgba(236,238,242,1) !important;
        }

    }
}
</style>
