<template>
  <div>
    <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Store"></Sidebar>
        <div class="content_pad">
            <p>points คงเหลือ {{ student[0].reward_points }}</p>
            <div v-for="(reward, index) in rewards" :key="index">
                <div class="item_wrapper">
                    <button @click="redeemReward(student[0].reward_points, index)">Buy</button>
                    <img src="../../public/image/storeItems/item2.png">
                    <span id="detail">{{ reward.reward_name }}</span>
                    <p>{{ reward.detail }}</p>
                    <br>
                    <span id="price">{{ reward.redeem_points || 0}} points</span>
                    <!-- <span id="price">{{`${rewards[0].redeem_points}`}} Points</span> -->
                </div>
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
import AuthUser from '@/store/AuthUser'

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
            let studentLogin = AuthUser.getters.getStudentInfo
            await StudentStore.dispatch('fetchStudent', studentLogin.std_id)
            let student = StudentStore.getters.getStudent
            this.student = student
            console.log(this.student)

            await RedeemStore.dispatch('fetchRewards')
            let rewards = RedeemStore.getters.getRewards
            this.rewards = rewards
            this.student.rewards = rewards
        },
        async redeemReward(std_points, redeem_id) {
            if (std_points >= 0) {
                let redeem_point = this.rewards[redeem_id].redeem_points
                if (std_points >= redeem_point) {
                    let std_points_balance = std_points - redeem_point
                    console.log(std_points_balance);
                    this.student[0].reward_points = std_points_balance

                    let payload_std = {
                        id: this.student[0].id,
                        scores: this.student[0].scores,
                        reward_points: this.student[0].reward_points,
                        redeem_point: redeem_point
                    }

                    await this.updateReward(redeem_id)
                    await StudentStore.dispatch('updateStudent', payload_std)
                }
            }
        },
        async updateReward(redeem_id) {
            // console.log("number "+redeem_id+1);
            let payload_reward = {
                id: redeem_id + 1,
                std_id: this.student[0].id
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