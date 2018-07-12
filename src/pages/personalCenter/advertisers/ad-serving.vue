<template>
	<div class="ad-serving">
		<h3>广告投放</h3>
		<p><el-button @click="newProject" type="text">投放内容管理</el-button></p>
		<div class="ad-serving-info">
			<div class="ad-serving-info-top">
				<div class="ad-serving-info-top-price">
					<h5>ppc</h5>
					<div>当前均价</div>
					<div>
						<span>number</span>
						<el-button type="text" @click="dialogTableVisible = true">调整</el-button>
					</div>
					<el-dialog title="竞价策略" :visible.sync="dialogTableVisible">
					  <el-form :model="form">
					    <el-form-item label="首页（综合）" :label-width="formLabelWidth">
					        <el-input-number v-model="form.num" controls-position="right" @change="handleChange">
					        </el-input-number>
					    </el-form-item>
					    <el-form-item label="相 关 概 念 1" :label-width="formLabelWidth">
					      	<el-input-number v-model="form.num1" controls-position="right" @change="handleChange">
					      	</el-input-number>
					    </el-form-item>
					     <el-form-item label="相 关 概 念 2" :label-width="formLabelWidth">
					      	<el-input-number v-model="form.num2" controls-position="right" @change="handleChange">
					      	</el-input-number>
					    </el-form-item>
					     <el-form-item label="相 关 概 念 3" :label-width="formLabelWidth">
					      	<el-input-number v-model="form.num3" controls-position="right" @change="handleChange">
					      	</el-input-number>
					    </el-form-item>
					    </el-form-item>
					     <el-form-item :label-width="formLabelWidth">
					      	<div>竞价策略调整将于新加坡时间次日00:00:00起生效，每天仅限调整一次</div>
					    </el-form-item>
					  	</el-form>
						<div slot="footer" class="dialog-footer">
						    <el-button type="primary" @click="dialogFormVisible = false">修 改</el-button>
						</div>
					</el-dialog>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require.js';
    import Config from '../../../utils/config.js';
	export default {
		data() {
			return {
				dialogTableVisible:false,
				formLabelWidth: '120px',
				form:{
					num:'',
					num1:'',
					num2:'',
					num3:'',
				}
			}
		},
		methods: {
			newProject(){
				this.$router.push({
					name:'advertisers',
				})
			},
			handleChange(){
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>