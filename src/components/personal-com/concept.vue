<template>
	<div class="concept">
		<div class="concept-personal">
			<el-button class="concept-personal-button" @click="checked(item)" v-for="(item, index) in concept" size="small" round>{{item}}</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				concept:['111111','222222222','33333333','444444444','5555555','6666666666'],
				checkedq:false,
			}
		},
		methods:{
			checked(value){
				console.log(value);
			},
		}
	}
</script>

<style lang="scss" scoped>
.concept-personal-button{
	margin-bottom: 15px;
}
</style>