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
        instantBuyVisible: false, // buy dialog visible
        dialogModalVisible: false, // login dialog
        instantBuyDataId: undefined,
        change: false,
        bullsData: undefined,
		slangChange: '',
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
        setInstantBuyVisible(state, val) {
            state.instantBuyVisible = val;
        },
        setDialogModalVisible(state, val) {
            state.dialogModalVisible = val;
        },
        saveInstantBuyDataId(state, id) {
            state.instantBuyDataId = id;
        },
        valueChange(state) {
            state.change = !state.change;
        },
        setBullsData(state, val) {
            state.bullsData = val;
        },
		setHeardUrl(state, val) {
			state.heardUrl = val;
		},
		setLanguage(state, val) {
			state.slangChange = val;
        },
	},
});