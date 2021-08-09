<template>
  <div>
    <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Home"></Sidebar>
        <div class="content_pad">
        <!-- <course-list></course-list> -->

          <div class="board_wrapper">
            
            <div class="head_table">
              <span id="header_table">POINTS EARNED</span>
              <input id="time_search" type="date">
              <span id="time_search">Search :</span>
            </div>

            <table>
                <thead>
                    <tr id="head">
                        <th id="rank_head">Rank</th>
                        <th id="name_head">Name</th>
                        <th id="points_head">Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(std, index) in students" :key="index">
                        <td id="rank_body"> {{ index + 1 }} </td>
                        <td id="name_body"> {{ `${std.firstname} ${std.lastname}` }} </td>
                        <td id="points_body">{{ `${std.scores}` }}</td>
                    </tr>
                </tbody>
            </table>  
          </div>

          <div class="board_wrapper">

            <div class="head_table">
              <span id="header_table">POINTS USED</span>
              <input id="time_search" type="date">
              <span id="time_search">Search :</span>
            </div>

              <table>
                  <thead>
                      <tr id="head">
                          <th id="rank_head">Rank</th>
                          <th id="name_head">Name</th>
                          <th id="points_head">Total Points</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(std, index) in students" :key="index">
                          <td id="rank_body"> {{ index + 1 }} </td>
                          <td id="name_body"> {{ `${std.firstname} ${std.lastname}` }} </td>
                          <td id="points_body">{{ `${std.scores}` }}</td>
                      </tr>
                  </tbody>
              </table>
              
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import CourseList from '../components/CourseList.vue'

export default {
    components:{
        Header,
        Sidebar,
        CourseList,
    }
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
      }
    }
}

.board_wrapper{
        display: block;
        background-color: #fff;
        margin:45px auto;
        width: 1000px;
        height: 90%;
        overflow-y: scroll;
        
        .head_table{
          color: #fff;
          display: block;
          width: 995px;
          height: 50px;
          background-color: #13516b;
        }
        #header_table{
          display: block;
          float: left;
          margin: 13px 0px 0px 20px;
          font-weight: bold;
        }
        #time_search{
          display: block;
          float: right;
          margin: 12px 20px 0px 0px;
        }
        #head{
            background-color: #327997;
            color: #fff;
            height: 50px;
            text-align: center;
            
            #rank_head{
                width: 150px;
                border-right: 2px solid #ffffff;
            } 
            #points_head{
                width: 150px;
                border-left: 2px solid #ffffff;
            }
            #name_head{
                width: 700px;
            }
        }
        tbody{
            tr{
                height: 50px;
              }
            
            #rank_body{
                text-align:center;
                // border-right: 2px solid #000000;
            }
            #points_body{
                // border-left: 2px solid #000000;
                text-align:center;
            }
            #name_body{
                
                display: block;
                margin:20px 20px;
            }
        }
      }

</style>