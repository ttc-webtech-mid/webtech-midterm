import Vue from "vue"
import Vuex from 'vuex'
import AuthService from '@/services/AuthService'

Vue.use(Vuex)

let auth_key = 'auth'
let auth = JSON.parse(localStorage.getItem(auth_key))

const initialState = {
    user: auth ? auth.user : "",
    jwt: auth ? auth.jwt : "",
    isAuthen: auth ? true : false,
    student: auth ? auth.user.student : "" 
}

export default new Vuex.Store({
    state: initialState,
    getters: {
        user: (state) => state.user,
        jwt: (state) => state.jwt,
        isAuthen: (state) => state.isAuthen,
        getStudentInfo: (state) => state.student
    },
    mutations: {
        loginSuccess(state, username, jwt) {
            state.username = username
            state.jwt = jwt
            state.isAuthen = true
            state.student = username.student
        },
        logoutSuccess (state) {
            state.user = ""
            state.jwt = ""
            state.isAuthen = false
        }
    },
    actions: {
        async login({ commit }, {username, password}) {
            let res = await AuthService.login({username, password})
            if (res.success) {
                commit('loginSuccess', res.user, res.jwt)
            }
            return res
        },
        async logout({ commit }) {
            AuthService.logout()
            commit('logoutSuccess')
        },
        async register({ commit }, { username, password, confirm_password, email }) {
            let res = await AuthService.register( { username, password, confirm_password, email })
            let checkPassword = password === confirm_password
            if (res.success & checkPassword) {
                console.log("AuthUser???");
                commit("loginSuccess", res.user, res.jwt)
            }
            return res
        }
    },
    modules: {}
})