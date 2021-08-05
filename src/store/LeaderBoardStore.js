import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      students: [],
  },
  getters: {
      getStudents: (state) => state.students,
  },
  mutations: {
      setStudents(state, res) {
          let sortedStudents = res.data.sort((next, prev) => prev.scores - next.scores)
          state.students = sortedStudents
      },
  },
  actions: {
      async fetchStudents({ commit }) {
        let res = await axios.get(baseURL + "/students")
        commit('setStudents', res)
      },
  },
  modules: {
  }
})
