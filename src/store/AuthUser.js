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
    student: auth ? auth.user.student : "" , // just user.student will be fine!
    role: auth ? auth.user.role.name : ""
}

export default new Vuex.Store({
    state: initialState,
    getters: {
        user: (state) => state.user,
        jwt: (state) => state.jwt,
        isAuthen: (state) => state.isAuthen,
        getStudentInfo: (state) => state.student,
        getRole: (state) => state.role
    },
    mutations: {
        loginSuccess(state, username, jwt) {
            state.user = username
            state.jwt = jwt
            state.isAuthen = true
            state.student = username.student
            state.role = username.role.name
        },
        logoutSuccess (state) {
            state.user = ""
            state.jwt = ""
            state.isAuthen = false
            state.student = "",
            state.role = ""
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