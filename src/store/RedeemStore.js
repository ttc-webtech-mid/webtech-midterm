import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import AuthUser from '@/services/AuthService'

let baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      rewards: []
  },
  getters: {
      getRewards: (state) => state.rewards
  },
  mutations: {
      setRewards(state, res){
        state.rewards = res.data
      },
      updateRewards(state, payload) {
        state.rewards[0].students = payload.students
      },
      editReward(state, {res, index}){
        state.rewards[index] = res.data
      },
      removeReward(state, index) {
        state.rewards.splice(index, 1)
      }
  },
  actions: {
      async fetchRewards({ commit }) {
        console.log('fetch reward')
        let res = await axios.get(baseURL + "/rewards")
        commit('setRewards', res)
      },
      async updateRewards({ commit }, payload) {
        /*
          Update Reward table
          when there is new student redeem item
        */
        console.log(payload)
        let selectedReward = await axios.get(baseURL + `/rewards/${payload.id}`)
        let beforeStudents = []
        console.log(selectedReward.data)
        if(selectedReward.data.students !== null) {
          beforeStudents = selectedReward.data.students.map(student => student.id)
        }

        beforeStudents.push(payload.std_id)
        let body = {
          id: payload.id,  
          students: beforeStudents,
          stocks: parseInt(selectedReward.data.stocks) - 1
        }

        let headers = AuthUser.getApiHeader()
        let url = baseURL + `/rewards/${payload.id}`
        let res = await axios.put(url, body, headers)
        console.log(payload)
        commit('updateRewards', payload)
      },
      async editReward({ commit }, payload) {
        let headers = AuthUser.getApiHeader()
        let body = {
          reward_name: payload.reward_name,
          redeem_points: parseInt(payload.redeem_points),
          detail: payload.detail,
          stocks: payload.stocks
        }
        let res = await axios.put(baseURL + `/rewards/${payload.id}`, body, headers)
        let editToStore = {
          res: res,
          index: payload.index
        }
        commit('editReward', editToStore)
      },
      async removeReward({ commit }, payload) {
        let headers = AuthUser.getApiHeader()
        let res = await axios.delete(baseURL + '/rewards/' + payload.id, headers)
        commit('removeReward', payload.index)
      },
      async addReward({ commit }, payload) {
        let { formData } = payload
        let body = {
          reward_name: payload.newReward.reward_name,
          detail: payload.newReward.detail,
          redeem_points: parseInt(payload.newReward.point_spent),
          stocks: payload.newReward.stocks
        }
        console.log(body)
        let headers = AuthUser.getApiHeader()
        try{
          const postRewardResponse = await axios.post(baseURL + '/rewards', body, headers)
          const newRewardID = postRewardResponse.data.id
          formData.append('refId', newRewardID)
          let res = await axios.post(`${baseURL}/upload`, formData)
          
        }catch(e) {
          console.error(e)
        }
      }
  },
  modules: {
  }
})
