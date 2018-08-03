<template>
	<el-container>
		<div class="bodyBackground">
			<el-container class="bierinc-main-container">
				<el-aside width="225px" class="bierinc-main-container-aside">
					<div class="logo">
						<div class="logo_box">
							<img class="logo_img" :src="heardUrl" />
							<p class="username">{{username}}</p>
						</div>
					</div>
					<ul class="bierinc-main-container-aside-menu">
						<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'purse'}"><span>{{$t('personal.purse')}}</span></router-link>
						<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'revenue'}"><span>{{$t('personal.revenue')}}</span></router-link>
						<router-link tag="li" v-if="isCheck == 1 || isCheck == 3" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">{{$t('personal.main')}}</router-link>
					</ul>
					<ul class="bierinc-main-container-aside-menu">
						<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'crowdfunding'}">{{$t('personal.crowdfunding')}}</router-link>
						<!--<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">我的投票</router-link>-->
						<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'invite'}">{{$t('personal.invite')}}</router-link>
						<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'settings'}">{{$t('personal.settings')}}</router-link>
					</ul>
					<ul class="bierinc-main-container-aside-menu">
						<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'adserving'}">{{$t('personal.adserving')}}</router-link>
						<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'project'}">{{$t('personal.project')}}</router-link>
						<!--<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">投资人</router-link>-->
						<!--<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">合伙人</router-link>-->
						<!--<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">交易所</router-link>-->
						<!--<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">媒体</router-link>-->
					</ul>
					<div class="bierinc-main-container-aside-menu">
						<div class="bierinc-main-container-aside-menu-li" @click="out">{{$t('personal.loginOut')}}</div>
					</div>
				</el-aside>
				<el-main class="bierinc-main-container-view">
					<router-view :key="$route.name"></router-view>
				</el-main>
			</el-container>
		</div>
	</el-container>
</template>

<script>
	import Cache from '../../utils/cache';
    import Request from '../../utils/require';
    import Config from '../../utils/config.js';
	export default {
		data() {
			return {
				uid: this.$store.state.id || Cache.getSession('bier_userid'),
				token: this.$store.state.token || Cache.getSession('bier_token'),
                isRouterAlive:true,
                isCheck:'',
			};
		},
		computed: {
			activeIndex() {
				return this.$route.name;
            },
            heardUrl() {
                return this.$store.state.heardUrl || Cache.getSession('bier_heardUrl') || Config.headPortrait[5];
            },
            username(){
            	return this.$store.state.usernickname || this.$store.state.username;
            }
		},
		mounted(){
			this.query();
		},
		methods: {
			query(){//查询广告状态
				Request({
					url: 'QueryWalletAddress',
					data: {
						accountId: this.uid,
					},
					type: 'get',
					flag:true,
				}).then(res => {
					this.isCheck = res.data.isCheck;
                }).catch(e => {
                    // console.log('errr_>', e);
                    if(e.data && e.data.islogin){
                        this.$router.push({name: 'index'});
                    }
                })
			},
			out() {
				Request({
					url: 'SignOut',
					type: 'get',
					data: {
						token: this.token
					}
				}).then(res => {
                    this.handleSignOut();
					this.$router.push({
						name: 'index'
					});
				})
            },
            handleSignOut(){
                this.$store.commit('setUserId', undefined);
				this.$store.commit('setUserName', undefined);
				this.$store.commit('setUserNickName', undefined);
                this.$store.commit('setToken', undefined);
                this.$store.commit('setHeardUrl', undefined);
                Cache.removeSession('bier_username');
                Cache.removeSession('bier_token');
                Cache.removeSession('bier_auth');
                Cache.removeSession('bier_heardUrl');
                Cache.removeSession('bier_userid');
				Cache.getSession('bier_usernickname') && Cache.removeSession('bier_usernickname');
            },
		}
	};
</script>

<style lang="scss" scoped>
	.logo {
		width: 225px;
		height: 190px;
		text-align: center;
		display: flex;
		.logo_box {
			margin: auto;
			:hover{
				cursor: pointer;
			}
			.logo_img {
				width: 88px;
				height: 88px;
				overflow: hidden;
				border-radius: 50%;
			}
			.username {
				width: 225px;
				height: 30px;
				line-height: 30px;
				text-align: center;
			}
		}
	}
	.el-container {
		width: 100%;
		background: #f5f5f5;
	}
	.bodyBackground{
		width: 1200px;
		margin: 0 auto;
		background: #FFFFFF;
	}
	.bierinc-main-container-aside-menu {
		margin-bottom: 20px;
		background: #FFFFFF;
		:hover{
			cursor: pointer;
		}
		&-li {
			background: #FFFFFF;
		    text-align: center;
		    min-height: 65px;
		    color: #666666;
		    padding: 0 10px;
		    display: flex;
		    justify-content: center;
		    align-items: center;
			:hover{
				cursor: pointer;
			}
			&.router-link-active {
		        color: rgba(255,149,0,1);
		    }
		}
	}
</style>