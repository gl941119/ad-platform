<template>
	<el-container>
		<el-container class="bierinc-main-container">
			<el-aside width="225px" class="bierinc-main-container-aside">
				<div class="logo">
					<div class="logo_box">
						<img class="logo_img" src="../../assets/imgs/surmon-3.png" />
						<p class="username">用户名</p>
					</div>
				</div>
				<ul class="bierinc-main-container-aside-menu">
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'home':'tikhome' }">钱包</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'bulletin':'tikbulletin' }">广告收益账户</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'feedback':'tikfeedback' }">广告主账户</router-link>
				</ul>
				<ul class="bierinc-main-container-aside-menu">
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'home':'tikhome' }">我的众筹</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'bulletin':'tikbulletin' }">我的投票</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'feedback':'tikfeedback' }">邀请用户</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'feedback':'tikfeedback' }">账号设置</router-link>
				</ul>
				<ul class="bierinc-main-container-aside-menu">
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'home':'tikhome' }">广告方</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'bulletin':'tikbulletin' }">众筹项目方</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'feedback':'tikfeedback' }">投资人</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'home':'tikhome' }">合伙人</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'bulletin':'tikbulletin' }">交易所</router-link>
					<router-link tag="li" class="bierinc-main-container-aside-menu-li" :to="{ name: platform==='amazon'?'feedback':'tikfeedback' }">媒体</router-link>
				</ul>
				<div class="bierinc-main-container-aside-menu-li">退出登录</div>
			</el-aside>
			<el-main class="bierinc-main-container-view">
				<router-view :key="$route.name"></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
</script>

<style lang="scss" scoped>
	.logo {
		width: 225px;
		height: 190px;
		text-align: center;
		display: flex;
		.logo_box{
			margin:auto;
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
	.bierinc-main-container-aside-menu{
		margin-bottom: 20px;
	}
	.bierinc-main-container-aside-menu-li{
		background: #000000;
		text-align: center;
		height: 65px;
		line-height: 65px;
		color: #cccccc;
	}
</style>