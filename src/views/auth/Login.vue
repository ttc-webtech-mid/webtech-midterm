<template>
  <div class="sidebar">
      <div class="background_wrapper">
          <p style="height:260px;">KANBONG KANBAN</p>
      </div>
      <div class="login_wrapper">
          <form @submit.prevent="login">
            <div class="login_pad">
              <p>Login</p>
              <input v-model="form.username" type="text" placeholder="Username">
              <input v-model="form.password" type="password" placeholder="Password">
              <!-- <label for="">Incomplete plese try again</label> -->
              <br/>
              <a class="register_btn" href="/register">Register</a>
              <br/>
              <div>
                <button class="login_btn">Log In</button>
              </div>
              <!-- <a class="login_btn">Login</a> -->
          </div>
          </form>
      </div>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
export default {
    data() {
        return {
            form: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        async login() {
            // console.log(this.form);
            let res = await AuthUser.dispatch('login', this.form)
            if (res.success) {
                this.$swal("Login Sucess", `Welcome, ${res.user.username}`, "success")
                this.$router.push('/home')
            }
            else {
                this.$swal("Login Failed", res.message, "error")
                this.clearForm()
            }
        },
        clearForm() {
            this.form = {
                username: "",
                password: ""
            }
        }
    }
}
</script>

<style lang="scss">

.sidebar{
    position: inherit;
    display: flex;
    flex-wrap: wrap;
}

.background_wrapper {
    width: 65%;
    height: 100vh;
    background-image: url(../../../public/image/appBackground.png);
    opacity: 70%;
    text-align: center;
    display: inline-block;
    overflow-x: hidden;
    p{
        padding: 10px 0px;
        border-radius: 5%;
        display: inline-block;
        font-size: 5rem;
        font-weight: bold;
        margin-top: 350px;
        color: #FFFFFF;
        background-color: #1E6380;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 30rem;
    }
}

.login_wrapper{
    width: 35%;
    height: 100vh;
    background-color: #FFFFFF;
    display: inline-block;
    text-align: center;
    .login_pad{
        margin: 0px auto;
        margin-top: 220px;
        width: 55%;
        height: 55%;
        p{
        font-size: 3rem;
        display: inline-block;
        margin: 50px;
        }
        input{
            background: #FFFFFF;
            border: 1px solid #000000;
            box-sizing: border-box;
            box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
            padding: 15px 20px;
            margin: 15px 0px;
        }
        label{
            display: block;
            margin-top: 15px;
            font-size: 13px;
            color: red;
        }
        a{
            margin-top: 0px;
        }
        .register_btn{
            color: black;
            font-size: 13px;
        }
        .login_btn{
            display: block;
            margin: 0px auto;
            margin-top: 5px;
            padding: 10px 10px;
            // width: 45px;
            width: auto;
            text-decoration: none;
            color: #FFFFFF;
            background-color: #1E6380;
            border: 1px solid #1E6380;
            border-radius: 10px;
            cursor: pointer;
        }

    }
    
}

</style>