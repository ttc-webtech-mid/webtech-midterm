<template>
  <div>
    <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Class"></Sidebar>
        <div class="content_pad">
            <div class="page_wrapper">
                <div class="head_wrapper">
                    <img src="../../public/image/icon/task_ico.png">
                    <div class="head_text">
                        <span id="heading">Heading Task</span>
                        <span id="date">00/00/0000</span>
                    </div>
                </div>
                <div class="task_wrapper">
                    <span id="details">Details</span>
                    <div class="details_wrapper">
                        <p>
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------
                            -----------------------------------------details-----------------------------------------

                        </p>
                    </div>
                </div>
                <div class="submit_wrapper">
                    <div class="submit_top_wrapper">
                        <span id="your_work">Your work</span>
                        <a href="">Assigned</a>
                        <!-- <a href="" style="background: #2BB863">Turned in</a> -->
                        <br>
                        <span id="due">Due: 00/00/0000</span>
                    </div>
                    <div class="submit_bottom_wrapper">
                        <div class="work_pad">
                            <a href="">
                                <span id="special_text">&#8226;</span>
                                <span>yourwork</span>
                            </a>
                            <a href="">
                                <img src="../../public/image/icon/add_task_ico.png">
                                <span>Add your work</span> 
                             </a>
                        </div>
                        <a id="submit" style="background-color: #2F72B0" href="">Submit</a>
                        <!-- <a id="submit" style="background-color: #CE2828; margin-right: 110px" href="">unsubmit</a> -->
                    </div>
                </div>
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
            .head_wrapper{
                height: 150px;
                img{
                    margin: 29px 0px 0px 29px;
                    float: left;
                    border-radius: 100%;
                }
                .head_text{
                    float: left;
                    margin: 40px 0px 0px 20px;
                    span{
                        display:block
                    }
                    #heading{
                        font-size: 2rem;
                        margin-bottom: 10px;
                    }
                    #date{
                        color:#8D8D8D;
                        margin-left: 1px;
                    }
                } 
            }
            .task_wrapper{
                float: left;
                margin-left: 29px;
                width: 900px;
                height: 500px;
                #details{
                    display: block;
                    font-size: 1.2rem;
                }
                .details_wrapper{
                    height: 478px;
                    overflow-y: scroll;
                }
                
            }
            .submit_wrapper{
                float: left;
                width: 350px;
                height: 500px;
                margin-left: 35px;
                border-left: 2px solid #747474;
                .submit_top_wrapper{
                    height: 80px;
                    span{
                        display: inline-block;
                    }
                    #your_work{
                        font-size: 2rem;
                        margin:0px 0px 10px 22px;

                    }
                    #due{
                        margin-left: 25px;
                        color: #8D8D8D;
                    }
                    a{
                        display: block;
                        float: right;
                        color: #fff;
                        text-decoration: none;
                        background-color: #CE2828;
                        padding: 5px 10px;
                        margin-right: 23px;
                        border-radius: 10px;
                    }
                }
                .submit_bottom_wrapper{
                    height: 418px;
                    width: 300px;
                    margin: 0px auto;
                    border: 1px solid #000000;
                    border-radius: 10px;
                    .work_pad{
                        width: 90%;
                        height: 350px;
                        margin:15px auto;
                        overflow-y: scroll;
                        #special_text{
                            float: left;
                            display: block;
                            margin: 0px 8px 0px 7px;
                        }
                        a{
                            display: block;
                            color: #3C89CF;
                            width: 131px;
                            height: 25px;
                            margin-top: 10px;
                            img{
                                float: left;
                                width: 20px;
                                height: 20px;
                            }
                        }
                    }
                    #submit{
                        display: block;
                        float: right;
                        color: #fff;
                        text-decoration: none;
                        padding: 5px 10px;
                        margin:0px 115px 0px 0px;
                        border-radius: 10px;
                        
                    }
                }
            }
        }
    }
}
</style>