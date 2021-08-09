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
        state.student[0].reward_points = payload.reward_points
      },
      updateScoreAndReward(state, res){
        state.student[0].scores = res.data.scores
        state.student[0].reward_points = res.data.scores
      }
  },
  actions: {
      async fetchStudent({ commit }, studentID) {
        let res = await axios.get(baseURL + "/students?std_id=" + studentID)
        commit('setStudent', res)
      },
      async fetchCourses({ commit }, studentID) {
        let res = await axios.get(baseURL + "/courses?students.std_id=" + studentID)
        commit('setCourses', res)
      },
      async fetchCourseById({ commit }, course_id){
        let res = await axios.get(baseURL + `/courses?students.std_id=6210400710&course_id=${course_id}`)
        commit('setFilterCourse', res)
      },
      async updateStudent({ commit }, payload) {
        let body = {
          id: payload.id,
          // scores: payload.scores, // update ?
          reward_points: payload.reward_points
        }
        console.log(body)
        let toHistoryTable = {
          points_redeem: payload.redeem_point,
          student: [this.state.student[0].id],
          reward: payload.redeem_id
        }
        console.log(toHistoryTable)
        let historyTableURL = baseURL + `/score-histories`
        let historyRes = await axios.post(historyTableURL, toHistoryTable)

        let url = baseURL + `/students/${payload.id}`
        let res = await axios.put(url, body)
        commit('updateStudent', payload)
      },
      async addScore({ commit }, studentID) {
        let toHistoryTable = {
          points_received: 5, // HARDCODE points receive
          student: studentID || [this.state.student[0].id]
        }

        let historyTableURL = baseURL + `/score-histories`
        let historyRes = await axios.post(historyTableURL, toHistoryTable)

        let toStudentTable = {
          scores: parseInt(this.state.student[0].scores) + 5,
          reward_points: parseInt(this.state.student[0].reward_points) + 5
        }

        let studentTableURL = baseURL + `/students/${this.state.student[0].id}`
        let studentRes = await axios.put(studentTableURL, toStudentTable)

        commit('updateScoreAndReward', studentRes)
      },
      async updateHistory(toHistoryTable) {

      }
  },
  modules: {
  }
})
