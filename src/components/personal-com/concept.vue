<template>
	<div class="concept">
		<div class="concept-personal">
			<el-button :class="{'button-selected': item.isSelected}" class="concept-personal-button" @click="checked(item,index)" v-for="(item, index) in concept" :key="index" size="small" round>{{item.name}}</el-button>
		</div>
	</div>
</template>

<script>
	import Request from '../../utils/require.js';
	export default {
		props:["listenCondept"],
		data() {
			return {
				concept: [],
				checkedData: [],
			}
		},
		mounted() {
			this.conceptData();
		},
		methods: {
			conceptData() {
				Request({
					url: 'QueryConcept',
					type: 'get'
				}).then(res => {
					res.data.forEach(item => {
						item.isSelected = false;
					})
					this.concept = res.data;
				})
			},
			checked(item, index) {
				var length = this.checkedData.length;
				item.isSelected = !item.isSelected;
				if(item.isSelected) {
					if(length < 4) {
						var obj={};
						obj.conceptId = item.id;
						obj.name = item.name;
						this.checkedData.push(obj);
						this.$emit('listenCondept',this.checkedData);
					} else {
						item.isSelected = false;
						this.$message({
							message:this.$t('messageNotice.nomore'),
							type:'warning'
						});
					}
				} else {
					let _index = this.checkedData.findIndex(v => item.name === v.name);
					this.checkedData.splice(_index, 1)
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.concept-personal-button {
		margin-bottom: 15px;
	}
	
	.button-selected {
		background: #2096f3;
		color: #FFFFFF;
	}
</style>