<template>
	<el-container>
		<el-container class="bierinc-main-container">
			<el-aside width="225px" class="bierinc-main-container-aside">
				<div class="logo">
					<div class="logo_box">
						<img class="logo_img" src="../../assets/imgs/thumbs/thumb3.jpg" />
						<p class="username">{{username}}</p>
					</div>
				</div>
				<ul class="bierinc-main-container-aside-menu">
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'purse'}">钱包</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'revenue'}">广告收益账户</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">广告主账户</router-link>
				</ul>
				<ul class="bierinc-main-container-aside-menu">
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'crowdfunding'}">我的众筹</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">我的投票</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'invite'}">邀请用户</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'settings'}">账号设置</router-link>
				</ul>
				<ul class="bierinc-main-container-aside-menu">
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'advertisers'}">广告方</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'project'}">众筹项目方</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">投资人</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">合伙人</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">交易所</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: 'main'}">媒体</router-link>
				</ul>
				<div class="bierinc-main-container-aside-menu-li" @click="out">退出登录</div>
			</el-aside>
			<el-main class="bierinc-main-container-view">
				<router-view :key="$route.name"></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import Cache from '../../utils/cache';
	import Request from '../../utils/require';
	export default {
		data() {
			return {
				uid: this.$store.state.id || Cache.getSession('bier_userid'),
				token: this.$store.state.token || Cache.getSession('bier_token'),
				username: this.$store.state.username || Cache.getSession('bier_username')
			};
		},
		computed: {
			activeIndex() {
				return this.$route.name;
			},
		},
		methods: {
			out() {
				console.log(this.token)
				Request({
					url: 'SignOut',
					type: 'get',
					data: {
						token: this.token
					}
				}).then(res => {
					if(res.success) {
                        this.handleSignOut();
						this.$router.push({
							name: 'index'
						});
					}
				})
            },
            handleSignOut(){
                this.$store.commit('setUserId', undefined);
				this.$store.commit('setUserName', undefined);
				this.$store.commit('setUserNickName', undefined);
                this.$store.commit('setToken', undefined);
                Cache.removeSession('bier_username');
                Cache.removeSession('bier_token');
                Cache.removeSession('bier_userid');
				Cache.getSession('bier_usernickname') && Cache.removeSession('bier_usernickname');
            }
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
		width: 1200px;
		margin: 0 auto;
	}
	
	.bierinc-main-container-aside-menu {
		margin-bottom: 20px;
	}
	
	.bierinc-main-container-aside-menu-li {
		background: #000000;
		text-align: center;
		height: 65px;
		line-height: 65px;
		color: #cccccc;
	}
</style>