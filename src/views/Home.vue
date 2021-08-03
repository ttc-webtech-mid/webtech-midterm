<template>
  <div>
      <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Home"></Sidebar>
        <div class="content_pad">
            <a href="">
                <div class="top_button">
                    <img src="../../public/image/cal_sbj.png">
                    <span id="subject">Cal</span>
                </div>
                <div class="bottom_button">
                    <span id="teacher_name">TeacherName TeacherLastname</span>
                    <span id="teacher_email">Teacher@ku.th</span>
                </div>
            </a>

            <a href="">
                <div class="top_button">
                    <img src="../../public/image/science_sbj.png">
                    <span id="subject">Science</span>
                </div>
                <div class="bottom_button">
                    <span id="teacher_name">TeacherName TeacherLastname</span>
                    <span id="teacher_email">Teacher@ku.th</span>
                </div>
            </a>

            <a href="">
                <div class="top_button">
                    <img src="../../public/image/com_sbj.png">
                    <span id="subject">Computer</span>
                </div>
                <div class="bottom_button">
                    <span id="teacher_name">TeacherName TeacherLastname</span>
                    <span id="teacher_email">Teacher@ku.th</span>
                </div>
            </a>
        </div>
      </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default {

    components:{
        Header,
        Sidebar
    }
}
</script>

<style lang="scss">

.content_wrapper{
    width:100%;
    height: 875px;
    .content_pad{
      height: 100%;
      display: block;
      overflow: scroll;
      a{
        display: block;
        background-color: #fff;
        margin:45px auto;
        width: 1000px;
        height: 50%;
        border-radius: 20px;
        text-decoration: none;
        .top_button{
            height: 50%;
            background-color: #4EAFD8;
            border-radius: 15px 15px 0px 0px;
            display: flex;
            img{
                margin: 55px 0px 0px 55px;
                width: 320px;
                height: 320px;
                border-radius: 100%;
            }
            #subject{
                font-size: 3rem;
                color: #fff;
                margin: 85px 0px 0px 30px;
            }
        }
        .bottom_button{
            height: 50%;
            background-color: #fff;
            border-radius: 0px 0px 15px 15px;
            color: #000000;
            #teacher_name{
                width: 590px;
                display: inline-block;
                margin: 55px 0px 0px 405px;
                font-size: 2.5rem;
            }
            #teacher_email{
                display: block;
                margin: 20px 0px 0px 413px;
                color: #787878;
            }
        }
    
      }
      a:hover{
          border:4px solid #327997;
      }
    }
}

</style>