<template>
	<div class="concept">
		<div class="concept-personal">
			<el-button :class="{'button-selected':item.isSelected }" class="concept-personal-button" @click="checked(item,index)" v-for="(item, index) in concept" :key="index" size="small" round>{{item.name}}</el-button>
		</div>
	</div>
</template>

<script>
	import Request from '../../utils/require.js';
	export default {
		props:["listenCondept",'id'],
		data() {
			return {
				concept: [],
				checkedData: [],
			}
		},
		created(){
			this.conceptData();
		},
		methods: {
			conceptData() {
				Request({
					url: 'QueryConcept',
					type: 'get'
				}).then(res => {
					this.concept = res.data;
					this.lightConcept(res.data);
				})
			},
			lightConcept(data){
				data.forEach((item, index) => {
					item.isSelected = false;
					if(this.id != undefined){
						let flag = this.id.find(id => item.id == id);
						if(flag){
							item.isSelected = true;
							this.checkedData.push(item);
						}
					}
				});
			},
			checked(item, index) {
				var length = this.checkedData.length;
				item.isSelected = true;
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