import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		id: undefined,
		username: undefined,
		usernickname: undefined,
		token: undefined,
		slangChange: 'en',
	},
	mutations: {
		setUserId(state, val) {
			state.id = val;
		},
		setUserName(state, val) {
			state.username = val;
		},
		setUserNickName(state, val) {
			state.usernickname = val;
		},
		setToken(state, val) {
			state.token = val;
		},
		changeNamecom(state, val) {
			console.log(state.slangChange)
		}
	},
});