<template>
	<div class="concept">
		<div class="concept-personal">
			<el-button :class="{'button-selected': item.isSelected}" class="concept-personal-button" @click="checked(item,index)" v-for="(item, index) in concept" :key="index" size="small" round>{{item.label}}</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				concept: [{
					label: '1111111',
					isSelected: false
				}, {
					label: '22222',
					isSelected: false
				}, {
					label: '33333',
					isSelected: false
				}, {
					label: '555555',
					isSelected: false
				}, {
					label: '44444',
					isSelected: false
				}],
				checkedData: [],
			}
		},
		mounted() {

		},
		methods: {
			checked(item, index) {
				var length = this.checkedData.length;
				console.log(length);
				item.isSelected = !item.isSelected;
				if(item.isSelected) {
					if(length < 4) {
						this.checkedData.push(item);
					} else {
						item.isSelected = false;
						this.$message('最多四个哦，不能再多了');
					}
				} else {
					let _index = this.checkedData.findIndex(v => item.label === v.label);
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