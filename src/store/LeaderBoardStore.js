import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      students: [],
      histories: [],
  },
  getters: {
      getStudents: (state) => state.students,
      getHistories: (state) => state.histories,
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
          let histories = []

          if(sort === 'receive') {
               let receviedHistory = res.data.filter(item => item.points_received > 0)
               histories = receviedHistory.map((item) => {
                  return {
                      id: item.id,
                      points: parseInt(item.points_received),
                      student: item.student,
                      created_at: item.created_at
                  }
              })
          } else {
               let redeemHistory = res.data.filter(item => item.points_redeem > 0)
               histories = redeemHistory.map((item) => {
                  return {
                      id: item.id,
                      points: parseInt(item.points_redeem),
                      student: item.student,
                      created_at: item.created_at
                  }
              })
          }

          commit('setHistories', histories)
      },
      async filterDate({ commit }, { searchDate, cmd}) {
          let res = await axios.get(baseURL + '/score-histories')
          let filtered = []
          let mapHistories = []
          if(cmd === 'receive'){
              let receviedHistory = res.data.filter(item => item.points_received > 0)
              filtered = receviedHistory.filter(item => {
                let date = new Date(item.created_at)
                let search = new Date(searchDate)
                if(date.toLocaleDateString() === search.toLocaleDateString()) {
                    return item
                }
              })
              mapHistories = filtered.map(elem => {
              return {
                  points: elem.points_received,
                  student: elem.student,
                  created_at: elem.created_at
              }
          })
          } else {
              let redeemHistory = res.data.filter(item => item.points_redeem > 0)
              filtered = redeemHistory.filter(item => {
                let date = new Date(item.created_at)
                let search = new Date(searchDate)
                if(date.toLocaleDateString() === search.toLocaleDateString()) {
                    return item
                }
              })
              mapHistories = filtered.map(elem => {
              return {
                  points: elem.points_redeem,
                  student: elem.student,
                  created_at: elem.created_at
              }  
          })
        }

          commit('setHistories', mapHistories)
    }

  },
  modules: {
  }
})
