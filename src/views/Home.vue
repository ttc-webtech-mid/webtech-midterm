<template>
  <div>
    <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Home"></Sidebar>
        <div class="content_pad">
        <div v-if="role === 'Authenticated' || role === 'Teacher'">
          <course-list></course-list>
        </div>

        <div v-if="role === 'Admin'">

          <div class="board_wrapper">
            <div class='flex'>
              <div>
                <button @click="receivedHistory" v-if="isClickedReceived" class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
                    ประวัติการได้รับคะแนน
                </button>
                <button @click="receivedHistory" v-if="!isClickedReceived" class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
                    ประวัติการได้รับคะแนน
                </button>
              </div>
              <div>
                <button @click="redeemHistory" v-if="isClickedRedeem" class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
                    ประวัติการแลกคะแนน
                </button>

                <button @click="redeemHistory" v-if="!isClickedRedeem" class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
                    ประวัติการแลกคะแนน
                </button>
              </div>
            </div>
            <div>
              <input id="time_search" v-model="searchDate" type="date" @change="dateChanged">
              <span id="time_search" class="text-white">Search :</span>
            </div>
            <div class="head_table">
              <div v-if="isClickedReceived === true">
                <span id="header_table">POINTS EARNED</span>
              </div>
              <div v-if="isClickedRedeem === true">
                <span id="header_table">POINTS SPENT</span>
              </div>
            </div>

            <table>
                <thead>
                    <tr id="head">
                        <th id="rank_head">Rank</th>
                        <th id="name_head">Name</th>
                        <th id="points_head">Total Points</th>
                        <th id="date_head">Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(std, index) in histories" :key="index">
                        <td id="rank_body"> {{ index + 1 }} </td>
                        <td id="name_body"> {{ `${std.student.firstname} ${std.student.lastname}` }} </td>
                        <td id="points_body">{{ `${std.points}` }}</td>
                        <td id="date_body">{{ convertDate(std.created_at) }}</td>
                    </tr>
                </tbody>
            </table>  
          </div>
        </div>
        </div>
      </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import CourseList from '../components/CourseList.vue'
import AuthUser from '@/store/AuthUser'
import LeaderBoardStore from '@/store/LeaderBoardStore'

export default {
    components:{
        Header,
        Sidebar,
        CourseList,
    },
    data() {
      return {
        role :'',
        histories: [],
        isClickedReceived: true,
        isClickedRedeem: false,
        searchDate: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        let role = AuthUser.getters.getRole
        this.role = role
        if (this.role === 'Admin') {
          await LeaderBoardStore.dispatch('fetchHistory', 'receive')
          this.histories = LeaderBoardStore.getters.getHistories
          console.log(this.histories)
        }
      },
        async receivedHistory() {
          this.toggleTab()
          await LeaderBoardStore.dispatch('fetchHistory', 'receive')
          this.histories = LeaderBoardStore.getters.getHistories
        },
        async redeemHistory() {
          this.toggleTab()
          await LeaderBoardStore.dispatch('fetchHistory', 'redeem')
          this.histories = LeaderBoardStore.getters.getHistories
        },
        toggleTab() {
            this.isClickedReceived = !this.isClickedReceived
            this.isClickedRedeem = !this.isClickedRedeem
        },
        async dateChanged() {
          let sort
          if(this.isClickedReceived) sort = 'receive'
          if(this.isClickedRedeem) sort = 'redeem'
          let payload = {
            searchDate: this.searchDate,
            cmd: sort
          }
          await LeaderBoardStore.dispatch('filterDate', payload)
          this.histories = LeaderBoardStore.getters.getHistories
          console.log(this.histories)
        },
        convertDate(createdAt) {
            let date = new Date(createdAt)
            return date.toLocaleDateString()
        }
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
            #date_head {
              width: 150px
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
            #date_body{
              display: block;
                margin:20px 20px;
            }
        }
      }

</style>