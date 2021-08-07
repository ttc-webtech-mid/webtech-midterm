<template>
  <div>
    <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Store"></Sidebar>
        <h5>ไว้เช็คแต้มที่เหลือเฉยๆ ลบออกให้ด้วย</h5>
        <h5>{{ `Scores ${student[0].scores} point_total ${student[0].reward_points}` }}</h5>
        <h5>{{ `point_total_balance ${student[0].reward_points}` }}</h5>
        <div class="content_pad">
            <div class="item_wrapper">
                <button @click="redeemReward(student[0].reward_points, 0)">Buy</button>
                <img src="../../public/image/storeItems/item2.png">
                <span id="detail">1st in leader board</span>
                <br>
                <span id="price">1000 Points</span>
                <!-- <span id="price">{{`${rewards[0].redeem_points}`}} Points</span> -->
            </div>

             <div class="item_wrapper">
                <button @click="redeemReward(student[0].reward_points, 1)">Buy</button>
                <img src="../../public/image/storeItems/item3.png">
                <span id="detail">2nd in leader board</span>
                <br>
                <span id="price">750 Points</span>
                <!-- <span id="price">{{`${rewards[1].redeem_points}`}} Points</span> -->
            </div>
            
            <div class="item_wrapper">
                <button @click="redeemReward(student[0].reward_points, 2)">Buy</button>
                <img src="../../public/image/storeItems/item4.png">
                <span id="detail">3rd in leader board</span>
                <br>
                <span id="price">500 Points</span>
                <!-- <span id="price">{{`${rewards[2].redeem_points}`}} Points</span> -->
            </div>

        </div>
      </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import StudentStore from '@/store/StudentStore'
import RedeemStore from '@/store/RedeemStore'

export default {
    data() {
        return {
            student: [{
                id: '',
                firstname: '',
                lastname: '',
                scores: 0,
                reward_points: 0,
                // rewards: [{
                //     reward_id: '',
                //     reward_name: '',
                //     redeem_points: 0,
                //     detail: ''
                // }]
            }],
            rewards: [{
                reward_id: '',
                reward_name: '',
                redeem_points: 0,
                detail: ''
            }]
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            await StudentStore.dispatch('fetchStudent')
            let student = StudentStore.getters.getStudent
            this.student = student

            await RedeemStore.dispatch('fetchRewards')
            let rewards = RedeemStore.getters.getRewards
            this.rewards = rewards
            this.student.rewards = rewards
        },
        async redeemReward(std_points, redeem_id) {
            if (std_points > 0) {
                let redeem_point = this.rewards[redeem_id].redeem_points
                if (std_points >= redeem_point) {
                    let std_points_balance = std_points - redeem_point
                    console.log(std_points_balance);
                    this.student[0].reward_points = std_points_balance

                    let payload_std = {
                        id: this.student[0].id,
                        scores: this.student[0].scores,
                        reward_points: this.student[0].reward_points
                    }

                    this.updateReward(redeem_id)
                    await StudentStore.dispatch('updateStudent', payload_std)
                }
            }
        },
        async updateReward(redeem_id) {
            // console.log("number "+redeem_id+1);
            let payload_reward = {
                id: redeem_id + 1,
                std_id: 1
            }
            await RedeemStore.dispatch('updateRewards', payload_reward)
        }
    },
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
      .item_wrapper{
            width: 1400px;
            height: 200px;
            background-color: #fff;
            margin:45px auto;
            border-radius: 15px;
            img{
                float: left;
                border-radius: 100%;
                background-color: #B92D2D;
                margin: 14px 0px 0px 15px;
            }
            #detail{
                display: inline-block;
                // float: left;
                font-size: 2.5rem;
                margin: 40px 0px 20px 20px;
            }
            #price{
                display: inline-block;
                margin: 0px 0px 0px 24px;
                font-size: 1.5rem;
                background-color: #AAEBFF;
                padding: 10px;
                border-radius: 10px;
            }
            button{
                color: #fff;
                font-size: 1.5rem;
                float: right;
                width: 150px;
                height: 100%;
                background-color: #327997;
                border:0px;
                border-radius:0px 10px 10px 0px;
                cursor: pointer;
            }
            button:hover{
                background-color: #2f6780;
            }
      }
    }
}
</style>