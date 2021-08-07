import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      assignments: []
  },
  getters: {
      getAssignments: (state) => state.assignments
  },
  mutations: {
      setAssignments(state, res){
        state.assignments = res.data
      },
      addAssignment(state, payload) {
        state.courses.push(payload)
      }
  },
  actions: {
      async fetchAssignments({ commit }) {
        let res = await axios.get(baseURL + "/assignments")
        commit('setAssignments', res)
      },
      async addAssignment({ commit }, payload) {
        let body = {
            topic: payload.topic,
            detail: payload.detail,
            due_date: payload.due_date
        }
        let url = baseURL + `/assignments/`
        let res = await axios.post(url, body)
        commit('addAssignment', res)
      }
  },
  modules: {
  }
})