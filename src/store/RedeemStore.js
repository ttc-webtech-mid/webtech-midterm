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
        // console.log(payload)
        // state.rewards[payload.id].students = payload.data.students
      }
  },
  actions: {
      async fetchRewards({ commit }) {
        let res = await axios.get(baseURL + "/rewards")
        commit('setRewards', res)
      },
      async updateRewards({ commit }, payload) {
        let selectedReward = await axios.get(baseURL + `/rewards/${payload.id}`)
        let beforeStudents = selectedReward.data.students.map(student => student.id)
        beforeStudents.push(payload.std_id)
        let body = {
          id: payload.id,  
          students: beforeStudents
        }
        let url = baseURL + `/rewards/${payload.id}`
        let res = await axios.put(url, body)
        commit('updateRewards', payload)
      }
  },
  modules: {
  }
})
