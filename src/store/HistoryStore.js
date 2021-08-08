import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      receivedHistory: [],
      redeemHistory: []
  },
  getters: {
      getReceivedHistory: (state) => state.receivedHistory,
      getRedeemHistory: (state) => state.redeemHistory
  },
  mutations: {
      setReceivedHistory(state, history){
          state.receivedHistory = history
      },
      setRedeemHistory(state, history){
          state.redeemHistory = history
      }
  },
  actions: {
      async fetchHistory({ commit }, studentID) {
        let res = await axios.get(baseURL + "/score-histories?student.std_id=" + studentID)
        let receivedHistory = res.data.filter(score => score.points_received > 0)
        let redeemHistory = res.data.filter(score => score.points_redeem > 0)

        commit('setReceivedHistory', receivedHistory)
        commit('setRedeemHistory', redeemHistory)
      },
  },
  modules: {
  }
})
