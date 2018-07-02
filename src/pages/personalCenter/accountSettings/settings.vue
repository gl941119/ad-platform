<template>
	<div class="accountSettings">
		<h3 id="shou-feng-qin-xiao-guo">设置信息</h3>
		<div class="demo-block demo-box demo-zh-CN demo-collapse">
			<div class="source">
				<div role="tablist" aria-multiselectable="true" class="el-collapse">
					<div class="el-collapse-item is-active">
						<div role="tab" aria-controls="el-collapse-content-8983" aria-describedby="el-collapse-content-8983" aria-expanded="true">
							<div role="button" id="el-collapse-head-8983" tabindex="0" class="el-collapse-item__header focusing is-active">
								<i class="el-collapse-item__arrow el-icon-arrow-down is-active"></i> 头像
								<span>更改</span>
							</div>
						</div>
						<div role="tabpanel" aria-labelledby="el-collapse-head-8983" id="el-collapse-content-8983" class="el-collapse-item__wrap" data-old-padding-top="" data-old-padding-bottom="" data-old-overflow="">
							<div class="el-collapse-item__content">
								<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
								<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
							</div>
						</div>
					</div>
					<div class="el-collapse-item">
						<div role="tab" aria-controls="el-collapse-content-1977" aria-describedby="el-collapse-content-1977">
							<div role="button" id="el-collapse-head-1977" tabindex="0" class="el-collapse-item__header">
								<i class="el-collapse-item__arrow el-icon-arrow-down"></i> 昵称
								<span>修改</span>
							</div>
						</div>
						<div role="tabpanel" aria-hidden="true" aria-labelledby="el-collapse-head-1977" id="el-collapse-content-1977" class="el-collapse-item__wrap" style="display: none;">
							<div class="el-collapse-item__content">
								<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
								<div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
							</div>
						</div>
					</div>
					<div class="el-collapse-item">
						<div role="tab" aria-controls="el-collapse-content-5256" aria-describedby="el-collapse-content-5256">
							<div role="button" id="el-collapse-head-5256" tabindex="0" class="el-collapse-item__header">
								<i class="el-collapse-item__arrow el-icon-arrow-down"></i> 邮箱
								<span>绑定</span>
							</div>
						</div>
						<div role="tabpanel" aria-hidden="true" aria-labelledby="el-collapse-head-5256" id="el-collapse-content-5256" class="el-collapse-item__wrap" style="display: none;">
							<div class="el-collapse-item__content">
								<div>简化流程：设计简洁直观的操作流程；</div>
								<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
								<div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
							</div>
						</div>
					</div>
					<div class="el-collapse-item">
						<div role="tab" aria-controls="el-collapse-content-8128" aria-describedby="el-collapse-content-8128">
							<div role="button" id="el-collapse-head-8128" tabindex="0" class="el-collapse-item__header">
								<i class="el-collapse-item__arrow el-icon-arrow-down"></i> 密码
								<span>更改</span>
							</div>
						</div>
						<div role="tabpanel" aria-hidden="true" aria-labelledby="el-collapse-head-8128" id="el-collapse-content-8128" class="el-collapse-item__wrap" style="display: none;">
							<div class="el-collapse-item__content">
								<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
								<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
							</div>
						</div>
					</div>
					<div class="el-collapse-item">
						<div role="tab" aria-controls="el-collapse-content-8128" aria-describedby="el-collapse-content-8128">
							<div role="button" id="el-collapse-head-8128" tabindex="0" class="el-collapse-item__header">
								<i class="el-collapse-item__arrow el-icon-arrow-down"></i> 交易密码
								<span>更改</span>
							</div>
						</div>
						<div role="tabpanel" aria-hidden="true" aria-labelledby="el-collapse-head-8128" id="el-collapse-content-8128" class="el-collapse-item__wrap" style="display: none;">
							<div class="el-collapse-item__content">
								<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
								<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
							</div>
						</div>
					</div>
					<div class="el-collapse-item">
						<div role="tab" aria-controls="el-collapse-content-8128" aria-describedby="el-collapse-content-8128">
							<div role="button" id="el-collapse-head-8128" tabindex="0" class="el-collapse-item__header">
								<i class="el-collapse-item__arrow el-icon-arrow-down"></i> Telegram
								<span>绑定</span>
							</div>
						</div>
						<div role="tabpanel" aria-hidden="true" aria-labelledby="el-collapse-head-8128" id="el-collapse-content-8128" class="el-collapse-item__wrap" style="display: none;">
							<div class="el-collapse-item__content">
								<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
								<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
			}
		},
		mounted() {

		},
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-component .content>h3 {
		margin: 55px 0 20px;
	}
	
	.page-container h2,
	.page-container h3,
	.page-container h4,
	.page-container h5 {
		font-weight: 400;
		color: #1f2f3d;
	}
	
	.el-collapse-item__header.is-active {
		border-bottom-color: transparent;
	}
	
	.el-collapse-item__header {
		height: 48px;
		line-height: 48px;
		background-color: #fff;
		color: #303133;
		cursor: pointer;
		border-bottom: 1px solid #ebeef5;
		font-size: 13px;
		font-weight: 500;
		transition: border-bottom-color .3s;
		outline: none;
	}
	
	.el-collapse-item__wrap {
		will-change: height;
		background-color: #fff;
		overflow: hidden;
		box-sizing: border-box;
		border-bottom: 1px solid #ebeef5;
	}
	
	.el-collapse-item__arrow.is-active {
		transform: rotate(180deg);
	}
	
	.el-collapse-item__arrow {
		font-size: 26px;
		margin-right: 8px;
		transition: transform .3s;
		float: right;
		line-height: 48px;
		font-weight: 300;
	}
	
	.el-collapse-item__content {
		width: 888px;
		height: 376px;
		background: rgba(245, 245, 245, 1);
	}
</style>