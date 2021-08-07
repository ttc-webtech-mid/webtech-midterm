import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      student: [],
      courses: [],
      filterCourse: []
  },
  getters: {
      getStudent: (state) => state.student,
      getCourses: (state) => state.courses,
      getFilterCourse: (state) => state.filterCourse
  },
  mutations: {
      setStudent(state, res) {
          state.student = res.data
      },
      setCourses(state, res){
          state.courses = res.data
      },
      setFilterCourse(state, res){
          state.filterCourse = res.data
      },
      updateStudent(state, payload) {
        state.student[payload.index].scores = payload.scores
        state.student[payload.index].reward_points = payload.reward_points
      }
  },
  actions: {
      async fetchStudent({ commit }) {
        let res = await axios.get(baseURL + "/students")
        commit('setStudent', res)
      },
      async fetchCourses({ commit }) {
        let res = await axios.get(baseURL + "/courses?students")
        commit('setCourses', res)
      },
      async updateStudent({ commit }, payload) {
        let body = {
          id: payload.id,
          scores: payload.scores,
          reward_points: payload.reward_points
        }
        let url = baseURL + `/students/${payload.id}`
        let res = await axios.put(url, body)
        // console.log("tata " + res);
        commit('updateStudent', res)
      },
      async fetchCourseById({ commit }, course_id){
        let res = await axios.get(baseURL + `/courses?students.std_id=6210400710&course_id=${course_id}`)
        commit('setFilterCourse', res)
      }
  },
  modules: {
  }
})
