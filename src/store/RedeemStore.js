import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      rewards: []
  },
  getters: {
      getRewards: (state) => state.rewards
  },
  mutations: {
      setRewards(state, res){
        state.rewards = res.data
      },
      updateRewards(state, payload) {
        state.rewards[payload.index].students = payload.students
      }
  },
  actions: {
      async fetchRewards({ commit }) {
        let res = await axios.get(baseURL + "/rewards")
        commit('setRewards', res)
      },
      async updateRewards({ commit }, payload) {
        console.log("tata2 come");
        let body = {
          id: payload.id,  
          students: [{
            id: payload.std_id
          }]
        }
        let url = baseURL + `/rewards/${payload.id}`
        let res = await axios.put(url, body)
        console.log("tata2 " + res);
        commit('updateRewards', res)
      }
  },
  modules: {
  }
})
