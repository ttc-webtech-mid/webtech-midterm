import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      students: [],
      histories: []
  },
  getters: {
      getStudents: (state) => state.students,
      getHistories: (state) => state.histories
  },
  mutations: {
      setStudents(state, res) {
          let sortedStudents = res.data.sort((next, prev) => prev.scores - next.scores)
          state.students = sortedStudents
      },
      setHistories(state, res){
          state.histories = res
      }
  },
  actions: {
      async fetchStudents({ commit }) {
        let res = await axios.get(baseURL + "/students")
        commit('setStudents', res)
      },
    async fetchHistory({ commit }, sort) {
          let res = await axios.get(baseURL + '/score-histories')
          let sum = {}

          if(sort === 'receive') {
              let intData = res.data.map((item) => {
                  return {
                      id: item.id,
                      points: parseInt(item.points_received),
                      student: item.student
                  }
              })
              sum = intData.reduce((prev, next) => {
                  if (next.student.std_id in prev) {
                      prev[next.student.std_id].points += next.points
                  } else {
                      prev[next.student.std_id] = next
                  }
                  return prev
              }, {})
          } else {
              let intData = res.data.map((item) => {
                  return {
                      id: item.id,
                      points: parseInt(item.points_redeem),
                      student: item.student
                  }
              })
              sum = intData.reduce((prev, next) => {
                  if (next.student.std_id in prev) {
                      prev[next.student.std_id].points += next.points
                  } else {
                      prev[next.student.std_id] = next
                  }
                  return prev
              }, {})
          }
          

          let historyScores = Object.keys(sum).map(id => sum[id]).sort((prev, next) => next.points - prev.points)
          
          console.log(historyScores)
          commit('setHistories', historyScores)
      },
  },
  modules: {
  }
})
