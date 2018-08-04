<template>
	<div class="statement">
		<div class="statement_box" v-html="content"></div>
		<div class="statement_confirm">
			<button @click="back">{{$t('buttonAll.confirm')}}</button>
		</div>
	</div>
</template>

<script>
	import disclaimerEn from './disclaimer-en.js';
	import disclaimerZh from './disclaimer-zh.js';
	export default{
		data(){
			return {
				
			}
		},
		computed: {
            language() {
                return this.$store.state.slangChange;
            },
            content() {
                return this.language.toUpperCase() === 'EN' ? disclaimerEn : disclaimerZh;
            }
        },
		methods:{
			back(){
				this.$router.go(-1);
			},
		}
	}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/statement.scss';
</style>