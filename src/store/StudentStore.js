import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let baseURL = process.env.VUE_APP_API_ENDPOINT

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      student: [],
      courses: []
  },
  getters: {
      getStudent: (state) => state.student,
      getCourses: (state) => state.courses
  },
  mutations: {
      setStudent(state, res) {
          state.student = res.data
      },
      setCourses(state, res){
          state.courses = res.data
      }
  },
  actions: {
      async fetchStudent({ commit }) {
        let res = await axios.get(baseURL + "/students?std_id=6210400710")
        commit('setStudent', res)
      },
      async fetchCourses({ commit }) {
        let res = await axios.get(baseURL + "/courses?students.std_id=6210400710")
        commit('setCourses', res)
      }
  },
  modules: {
  }
})
