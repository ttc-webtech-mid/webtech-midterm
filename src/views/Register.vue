<template>
  <div class="sidebar">
      <div class="background_wrapper">
          <p>KANBONG KANBAN</p>
      </div>
      <div class="register_wrapper">
          <div class="register_pad">
              <p>Register</p>
              <input type="text" placeholder="Username">
              <input type="text" placeholder="Password">
              <input type="text" placeholder="Confirm Password">
              <input type="text" placeholder="Email">
              <label for="">Incomplete plese try again</label>
              <br/>
              <div>
                <a class="confirm_btn" href="/">Confirm</a>
                <a class="cancel_btn" href="/">Cancel</a>
              </div>
              
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

.sidebar{
    position: inherit;
    display: flex;
    flex-wrap: wrap;
}

.background_wrapper {
    width: 65%;
    height: 100vh;
    background-image: url(../../public/image/appBackground.png);
    opacity: 70%;
    text-align: center;
    display: inline-block;
    overflow-x: hidden;
    p{
        height: 255px;
        padding: 10px 0px;
        border-radius: 5%;
        display: inline-block;
        font-size: 5rem;
        font-weight: bold;
        margin-top: 350px;
        color: #FFFFFF;
        background-color: #12475e;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 30rem;
    }
}

.register_wrapper{
    width: 35%;
    height: 100vh;
    background-color: #FFFFFF;
    display: inline-block;
    text-align: center;
    .register_pad{
        margin: 0px auto;
        margin-top: 160px;
        width: 55%;
        height: 55%;
        p{
        font-size: 3rem;
        display: inline-block;
        margin: 50px;
        // margin-bottom: 15px;
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
            margin-top: 5px;
        }
        .register_btn{
            color: black;
            font-size: 13px;
        }
        div{
            margin: 0px auto;
        }
        .confirm_btn,.cancel_btn{
            display: inline-block;
            margin: 0px 10px;
            margin-top: 5px;
            padding: 10px 10px;
            text-decoration: none;
            color: #FFFFFF;
            background-color: #1E6380;
            border: 1px solid #1E6380;
            border-radius: 10px;
        }

    }
    
}

</style>