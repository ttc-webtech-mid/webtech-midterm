<template>
  <div>
    <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Class"></Sidebar>
        <div class="content_pad">
            <div class="page_wrapper">
                <div class="top_wrapper" href="">
                    <img src="../../public/image/cal_sbj.png" >
                    <div class="left_detail">
                        <span id="subject">Cal</span>
                        <span id="teacher_name">TeacherName TeacherSurname</span>
                        <span id="teacher_email">teacher@ku.th</span>
                    </div>
                    <a class="add_task" href="/class/task">
                        <img src="../../public/image/icon/add_ico.png">
                        <span>Add somthing task to your class</span>
                    </a>
                </div>
                 <a class="task_detail" href="/class/task">
                    <img src="../../public/image/icon/task_ico.png">
                    <div>
                        <span id="heading">Heading Task 1</span>
                        <span id="date">00/00/00</span>
                    </div>
                </a>
                <a class="task_detail" href="/class/task">
                    <img src="../../public/image/icon/task_ico.png">
                    <div>
                        <span id="heading">Heading Task 2</span>
                        <span id="date">00/00/00</span>
                    </div>
                </a>
                <a class="task_detail" href="/class/task">
                    <img src="../../public/image/icon/task_ico.png">
                    <div>
                        <span id="heading">Heading Task 3</span>
                        <span id="date">00/00/00</span>
                    </div>
                </a>
                <a class="task_detail" href="/class/task">
                    <img src="../../public/image/icon/task_ico.png">
                    <div>
                        <span id="heading">Heading Task 4</span>
                        <span id="date">00/00/00</span>
                    </div>
                </a>
            </div>
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
    Sidebar,
},

}
</script>

<style scoped lang="scss">
.content_wrapper{
    width:100%;
    height: 875px;
    .content_pad{
      height: 100%;
      display: block;
      overflow: scroll;
        .page_wrapper{
            width: 1369.88px;
            height: 89.5%;
            background-color: #fff;
            margin:45px auto;
            overflow-y:scroll;
            .top_wrapper{
                height: 180px;
                background-color: #327997;
                border-radius: 0px 0px 15px 15px;
                filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
                img{
                    float: left;
                    width: 130px;
                    height: 130px;
                    border-radius: 100%;
                    margin: 25px 0px 0px 20px;
                }
                .left_detail{
                    float: left;
                    margin: 30px 0px 0px 20px;
                    span{
                        display: block;
                        color: #fff;
                    }
                    #subject{
                        font-size: 2.5rem;
                    }
                    #teacher_name{
                        display: block;
                        font-size: 1.3rem;
                        border-top: 1.5px solid #fff;
                        padding-top: 10px;
                        margin: 10px 0px 10px 0px;
                    }
                    #teacher_email{
                        
                        font-size: 0.8rem;
                        margin-left: 3px;
                    }
                }
                .add_task{
                    float: right;
                    color: #fff;
                    text-decoration: none;
                    height: 20px;
                    display: flex;
                    margin: 140px 20px 0px 0px;
                    img{
                        width: 20px;
                        height: 20px;
                        margin: 0px;
                    }
                    span{
                        margin: 2px 0px 0px 5px;
                    }
                }
            }
            .task_detail{
                display: block;
                width: 1200px;
                height: 150px;
                margin: 20px auto;
                background-color: #fff;
                border: 1px solid #B7B7B7;
                border-radius: 15px;
                filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
                img{
                    width: 120px;
                    height: 120px;
                    margin: 15px 0px 0px 20px;
                    float: left;
                    border-radius: 100%;
                    border: 0.5px solid #B7B7B7;
                }
                div{
                    float: left;
                    span{
                        display: block;
                        margin-left: 20px;
                    }
                    #heading{
                        font-size: 1.5rem;
                        margin: 45px 0px 10px 20px;
                        color: #000000;
                    }
                    #date{
                        color: #8D8D8D;
                    }
                }
            }
            .task_detail:hover{
                border:4px solid #327997;
            }
        }
    }
}
</style>