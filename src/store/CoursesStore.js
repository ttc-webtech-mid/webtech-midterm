import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      courses: []
  },
  getters: {
      getCourses: (state) => state.courses
  },
  mutations: {
      setCourses(state, res){
        state.courses = res.data
      }
  },
  actions: {
      async fetchCourses({ commit }) {
        let res = await axios.get(baseURL + "/courses")
        commit('setCourses', res)
      }
  },
  modules: {
  }
})