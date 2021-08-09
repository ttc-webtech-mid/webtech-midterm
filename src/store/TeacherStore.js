import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      courses: [],
      filterCourse: []
  },
  getters: {
      getCourses: (state) => state.courses,
      getFilterCourse: (state) => state.filterCourse
  },
  mutations: {
      setCourses(state, res) {
          state.courses = res.data
      }
  },
  actions: {
      async fetchCourses({ commit }, teacherID) {
        let res = await axios.get(baseURL + "/courses?teachers.id=" + teacherID)
        commit('setCourses', res)
      },
  },
  modules: {
  }
})
