import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		id: undefined,
		username: undefined,
		usernickname: undefined,
        token: undefined,
        dialogVisible: false, // share component visible
        conceptId: 0, // advert concept id
		slangChange: 'en',
		heardUrl:'',
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
        setDialogVisible(state, val) {
            state.dialogVisible = val;
        },
        setConceptId(state, val) {
            state.conceptId = val;
        },
		setHeardUrl(state, val) {
			state.heardUrl = val;
		},
		changeNamecom(state, val) {
			console.log(state.slangChange)
        },
	},
});