import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      assignments: [],
      filterAssignment: [],
      uploadedFiles: []
  },
  getters: {
      getAssignments: (state) => state.assignments,
      getFilterAssignment: (state) => state.filterAssignment,
      getUploadedFiles: (state) => state.uploadedFiles
  },
  mutations: {
      setAssignments(state, res){
          state.assignments = res.data
      },
      setFilterAssignment(state, res){
          state.filterAssignment = res.data
          console.log(state.filterAssignment)
      },
      setUploadedFiles(state) {
          let handInAssignments = state.filterAssignment[0]['hand_in_assignments']
          let uploadedFiles = handInAssignments.filter(task => task.student === 2)
          state.uploadedFiles = uploadedFiles
      }
  },
  actions: {
      async fetchAssignments({ commit }){

      },
      async fetchAssignmentById({ commit }, task_id){
          let res = await axios.get(baseURL + "/assignments?id=" + task_id)
          commit('setFilterAssignment', res)
      },
      fetchUploadedFiles({ commit }) {
          commit('setUploadedFiles')
      },
      async uploadAssignments({ commit }, formData) {
            /*
                Request body: {
                    student: id
                    assignment: id
                    files: []
            }
            */
           let body = { 
               student: 2,
               assignment: this.state.filterAssignment[0].id
           }
            try {
                const postAssignmentsResponse = await axios.post('http://localhost:1337/hand-in-assignments', body)
                const newFilesId = postAssignmentsResponse.data.id
                console.log(newFilesId)
                formData.append('refId', newFilesId)
                let res = await axios.post('http://localhost:1337/upload', formData)
                
                // return res
            } catch(e) {
                console.error(e)
            }
      }
  },
  modules: {
  }
})
