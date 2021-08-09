<template>
  <div>
      <Header></Header>
        <div class="content_wrapper">
            <Sidebar page="Leader Board"></Sidebar>
            <div class="content_pad">
                <div class="board_wrapper">
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
import LeaderBoardStore from '@/store/LeaderBoardStore'
import AuthUser from '@/store/AuthUser'

export default {
    components:{
        Header,
        Sidebar
    },
    data() {
        return {
            students: [],
            myself: ""
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            let studentLogin = AuthUser.getters.getStudentInfo
            this.myself = studentLogin.firstname + ' ' + studentLogin.lastname
            await LeaderBoardStore.dispatch('fetchStudents')
            let student = LeaderBoardStore.getters.getStudents
            this.students = student
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
      .board_wrapper{
        display: block;
        background-color: #fff;
        margin:45px auto;
        width: 1000px;
        height: 90%;
        overflow-y: scroll;
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
    }
}
</style>