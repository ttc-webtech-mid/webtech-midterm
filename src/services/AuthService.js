import Axios from 'axios'

const auth_key = "auth"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const jwt = auth ? auth.jwt : ""
const api_endpoint = "http://localhost:1337"


export default {
    isAuthen() {
        return (user !== "") && (jwt != "")
    },
    getApiHeader() {
        if (jwt !== "") {
            return {
                headers: {
                    Authorization: "Bearer " + jwt
                }
            }
        }
        return {

        }
    },
    async login({ username, password }) {
        // call POST /auth/local
        try {
            let url = api_endpoint + "/auth/local"
            let body = {
                identifier: username,
                password: password
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                console.log(res);
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            }
            else {
                console.log("NOT 200", res);
            }
        }
        catch (e) {
            // console.error(e);
            console.error(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
        }
    },
    async register({ username, password, confirm_password, email}) {
        // call POST /auth/register
        let checkPassword = password === confirm_password
        console.log(password + " " + confirm_password);
        console.log(checkPassword);
        try {
            let url = `${api_endpoint}/auth/local/register`
            let body = {
                username: username,
                password: password,
                confirm_password: confirm_password,
                email: email
            }
            if (!checkPassword) {
                return {
                    success: false,
                    message: "Password does not match"
                }
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                console.log("res1 "+res);
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            }
        } 
        catch (e) {
            // console.error(e);
            console.log("res2 "+e);
            if(e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            }
        }
    },
    logout() {
        localStorage.removeItem(auth_key)
    }

}