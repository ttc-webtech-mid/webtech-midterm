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
                                <tr>
                                    <td id="rank_body">1</td>
                                    <td id="name_body">Firstname Lastname</td>
                                    <td id="points_body">100</td>
                                </tr>
                                <tr>
                                    <td id="rank_body">2</td>
                                    <td id="name_body">Firstname Lastname</td>
                                    <td id="points_body">80</td>
                                </tr>
                                <tr>
                                    <td id="rank_body">3</td>
                                    <td id="name_body">Firstname Lastname</td>
                                    <td id="points_body">60</td>
                                </tr>
                                <tr>
                                    <td id="rank_body">4</td>
                                    <td id="name_body">Firstname Lastname</td>
                                    <td id="points_body">50</td>
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

export default {

    components:{
        Header,
        Sidebar
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
            
            #rank_head, #points_head{
                width: 150px;
            }
            #name_head{
                width: 700px;
            }
        }
        tbody{
            tr{
                height: 50px;
              }
            
            #rank_body,#points_body{
                
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