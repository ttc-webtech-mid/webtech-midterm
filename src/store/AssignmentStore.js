import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import AuthService from '@/services/AuthService'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      assignments: [],
      filterAssignment: [],
      uploadedFiles: [],
      turnedIn: []
  },
  getters: {
      getAssignments: (state) => state.assignments,
      getFilterAssignment: (state) => state.filterAssignment,
      getUploadedFiles: (state) => state.uploadedFiles,
      getTurnedIn: (state) => state.turnedIn
  },
  mutations: {
      setAssignments(state, res){
          state.assignments = res.data
      },
      setFilterAssignment(state, res){
          state.filterAssignment = res.data
      },
      setUploadedFiles(state) {
          let handInAssignments = state.filterAssignment[0]['hand_in_assignments']
          let uploadedFiles = handInAssignments.filter(task => task.student === 2)
          if (uploadedFiles !== []) {
              state.uploadedFiles = uploadedFiles
          }else {
              state.uploadedFiles = []
          }
      },
      addAssignment(state, payload) {
        state.assignments.push(payload.data)
      },
      setTurnedIn(state, res) {
          state.turnedIn = res
      }
  },
  actions: {
      async fetchAssignments({ commit }){
        let res = await axios.get(baseURL + "/assignments")
        commit('setAssignments', res)
      },
      async fetchAssignmentById({ commit }, {task_id, role}){
          let res = await axios.get(baseURL + "/assignments?id=" + task_id)
          if(role === 'Teacher') {
              let { hand_in_assignments, students } = res.data[0]
              let bindingData = []
              for(let assignment of hand_in_assignments) {
                  for(let student of students) {
                      if(assignment.student === student.id) {
                          bindingData.push({
                              assignment: assignment,
                              student: student
                          })
                      }
                  }
              }

              commit('setFilterAssignment', res)
              commit('setTurnedIn', bindingData)
          }else {
              commit('setFilterAssignment', res)
          }
      },
      fetchUploadedFiles({ commit }) {
          commit('setUploadedFiles')
      },
      async uploadAssignments({ commit }, formData) {
            /*
                Request body {
                    student: id
                    assignment: id
                    files: []
            }
            */
           let body = { 
               student: 2,
               assignment: this.state.filterAssignment[0].id
           }
           let headers = AuthService.getApiHeader()
           console.log(headers)
            try {
                const postAssignmentsResponse = await axios.post(`${baseURL}/hand-in-assignments`, body, headers)
                const newFilesId = postAssignmentsResponse.data.id
                console.log(newFilesId)
                formData.append('refId', newFilesId)
                let res = await axios.post(`${baseURL}/upload`, formData, headers)
                
                // return res
            } catch(e) {
                console.error(e)
            }
      },
       async addAssignment({ commit }, payload) {
           /*
           REQUEST BODY
           {
                "topic": "test", yes
                "detail": "test",yes,
                "due_date": yes
                "course": 1,
                "teacher": [4],
                "students": [1, 2]
            }
           */
        let headers = AuthService.getApiHeader()
        let student = await axios.get(`${baseURL}/students?courses.course_id=${payload.courseID}`)
        let course = await axios.get(`${baseURL}/courses?course_id=${payload.courseID}`)
        console.log(course.data)
        let body = {
            topic: payload.topic,
            detail: payload.detail,
            due_date: payload.due_date,
            course: course.data[0].id,
            teacher: payload.teacher,
            students: student.data.map(std => std.id)
        }

        let url = baseURL + `/assignments/`
        let res = await axios.post(url, body, headers)
        commit('addAssignment', res)
      }
  },
  modules: {
  }
})