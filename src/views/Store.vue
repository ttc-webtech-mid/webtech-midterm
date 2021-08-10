<template>
  <div>
    <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Store"></Sidebar>
        <div class="content_pad">
            <div v-if="role === 'Authenticated'" class="container text-center my-10">
                <p class="bg-yellow-400 px-5 py-3 w-50 text-2xl shadow-sm font-medium tracking-wider border text-yellow-100 rounded-full hover:shadow-lg hover:bg-yellow-500">points คงเหลือของคุณ: {{ student[0].reward_points }}</p>
            </div>

            <!-- ของ role admin -->
            <div v-if="role === 'Admin'">
                <!-- ADD REWARD -->
                <div class="container text-center my-10">
                <button @click="showAddModal" class="w-52 bg-blue-500 px-4 py-3 rounded text-gray-200 font-semibold hover:bg-blue-600 transition duration-200 each-in-out">เพิ่มของรางวัลใหม่</button>
                </div>
                <div v-if="isAddModalOpen">
                    <div id='edit-reward' class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <!-- Modal Background -- -->
                        <div class="fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-25 left-0 right-0 top-0 bottom-0">
                            <!-- Modal -->
                            <div class="bg-white rounded-xl shadow-2xl p-6 sm:w-10/12 mx-10" > 
                                <!-- Title -->
                                <div>Add New Reward</div>
                                <div class='container'>
                                    <div>
                                        <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                            Reward Name
                                        </label>
                                        <input
                                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            type="text"
                                            placeholder="Reward Name"
                                            v-model="rewardForm.reward_name"
                                        />
                                    </div>

                                    <div>
                                        <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                            Detail
                                        </label>
                                        <textarea
                                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            type="text"
                                            placeholder="รายละเอียด"
                                            v-model="rewardForm.detail"
                                        />
                                    </div>

                                    <div>
                                        <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                            Point Spent
                                        </label>
                                        <input
                                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            type="number"
                                            placeholder="แต้มที่ใช้แลก"
                                            v-model="rewardForm.point_spent"
                                        />
                                    </div>

                                    <div>
                                        <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                            Stocks
                                        </label>
                                        <input
                                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            type="text"
                                            placeholder="จำนวนคงเหลือ"
                                            v-model="rewardForm.stocks"
                                        />
                                    </div>

                                    <div>
                                    <label class="button" for="upload">
                                            <img src="../../public/image/icon/add_task_ico.png">
                                            Upload File
                                    </label>
                                        <input id="upload" type="file" name="files" @change="onFileChange">
                                    </div>

                                </div>
                                <div class="text-right space-x-5 mt-5">
                                    <button @click="showAddModal" class="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Cancel</button>
                                    <button @click="addReward" class="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">บันทึก</button>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <b-modal id="modal-sm" size="sm" title="Delete">Are you sure to delete it?!</b-modal>
                <b-modal id="modal-lg" size="lg" title="Edit">
                    <form action="">
                        <img style="float:left; width:225px; margin-right:20px; background-color:#B92D2D;" src="../../public/image/storeItems/item2.png">
                        <span>Name</span>
                        <input placeholder="Type text..." type="text">
                        <span>Point value</span>
                        <input placeholder="Type number..." type="number">
                        <span>Quantity</span>
                        <input placeholder="Type number..." type="number">
                        <span>Details</span>
                        <textarea name="details" id="details" placeholder="Type something..."></textarea>
                    </form>
                </b-modal>

                <div v-for="(reward, index) in rewards" :key="index">
                    <div class="container bg-white space my-10 rounded-xl">
                        <div class="flex items-center space-">
                            <div class="flex">
                                <img class="w-44 h-44" :src="openPic(reward)">
                            </div>
                            <div class="mx-24 flex-1 ">
                                <p class="text-4xl font-bold" id="detail">{{ reward.reward_name }}</p>
                                <div>
                                    <p class="text-xl">{{ reward.detail }}</p>
                                </div>
                                <div>
                                    <span id="price">{{ reward.redeem_points || 0}} points</span>
                                    <span id="price">{{` Stocks: ${reward.stocks}`}}</span>
                                    
                                </div>
                            </div>
                            <div class="flex mx-auto">
                                <div>
                                <button v-if="role === 'Authenticated'" class="w-40 h-20 bg-green-600 text-white text-2xl px-6 py-2 rounded-xl font-medium mx-3 hover:bg-green-700 transition duration-200 each-in-out">Get this!</button>

                                </div>
                                <div>
                                <button v-if="role === 'Admin'" @click="showEditModal(reward, index)" class="w-40 h-20 bg-green-600 text-white text-2xl px-6 py-2 rounded-xl font-medium mx-3 hover:bg-green-700 transition duration-200 each-in-out">Edit</button>

                                </div>
                                <div>

                                <button v-if="role === 'Admin'" @click="removeReward(reward, index)" class="w-40 h-20 bg-red-600 text-white text-2xl px-6 py-2 rounded-xl font-medium mx-3 hover:bg-red-700 transition duration-200 each-in-out">Delete</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <!-- EDIT REWARD -->
                <div v-if="isEditModalOpen">
                    <div id='edit-reward' class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <!-- Modal Background -- -->
                        <div class="fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-25 left-0 right-0 top-0 bottom-0">
                            <!-- Modal -->
                            <div class="bg-white rounded-xl shadow-2xl p-6 sm:w-10/12 mx-10" > 
                                <!-- Title -->
                                <div>Edit Reward</div>
                                <div class='container'>
                                    <div>
                                        <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                            Reward Name
                                        </label>
                                        <input
                                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            type="text"
                                            placeholder="Reward Name"
                                            v-model="rewardForm.reward_name"
                                        />
                                    </div>

                                    <div>
                                        <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                            Detail
                                        </label>
                                        <textarea
                                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            type="text"
                                            placeholder="รายละเอียด"
                                            v-model="rewardForm.detail"
                                        />
                                    </div>

                                    <div>
                                        <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                            Point Spent
                                        </label>
                                        <input
                                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            type="number"
                                            placeholder="แต้มที่ใช้แลก"
                                            v-model="rewardForm.point_spent"
                                        />
                                    </div>

                                    <div>
                                        <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                            Stocks
                                        </label>
                                        <input
                                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            type="text"
                                            placeholder="จำนวนคงเหลือ"
                                            v-model="rewardForm.stocks"
                                        />
                                    </div>

                                </div>
                                <div class="text-right space-x-5 mt-5">
                                    <button @click="showEditModal" class="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Cancel</button>
                                    <button @click="submitrewardForm" class="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">บันทึก</button>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            <div v-if="role === 'Authenticated'">
                <div v-for="(reward, index) in rewards" :key="index">
                    <div class="container bg-white space my-10 rounded-xl">
                        <div class="flex items-center justify-center">
                            <div class="flex"> 
                                <img class="w-44 h-44" :src="openPic(reward)">
                            </div>
                            <div class="flex-1 mx-16">
                                <p class="text-4xl font-bold" id="detail">{{ reward.reward_name }}</p>
                                <div>
                                    <p class="text-xl">{{ reward.detail }}</p>
                                </div>
                                <div>
                                    <span id="price" style="background-color:#AAEBFF;">{{ reward.redeem_points || 0}} points</span>
                                    <span id="price" style="background-color:#3489a3; margin-left: 20px;">{{`${rewards[0].stocks}`}} Stocks</span>
                                </div>
                            </div>
                            <div class="flex">
                                <div>
                                    <button v-if="role === 'Authenticated'" @click="redeemReward(student[0].reward_points, index)" class="w-40 h-20 bg-green-600 text-white text-2xl px-6 py-2 rounded-xl font-medium mx-3 hover:bg-green-700 transition duration-200 each-in-out">Get this!</button>
                                </div>
                            </div>
                        </div>
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
            }],
            rewards: [{
                reward_id: '',
                reward_name: '',
                redeem_points: 0,
                detail: ''
            }],
            role: '',
            isEditModalOpen: false,
            isAddModalOpen: false,
            rewardForm: {
                index: '',
                id: '',
                reward_name: '',
                detail: '',
                point_spent: '',
                stocks: ''
            },
            file: ''
        }
    },
    async created() {
        await this.fetchData()
    },
    methods: {
        async fetchData() {
            let role = AuthUser.getters.getRole
            this.role = role
            console.log(this.role)
            await RedeemStore.dispatch('fetchRewards')
            let rewards = RedeemStore.getters.getRewards
            this.rewards = rewards
            console.log(this.rewards)
            if(role === 'Authenticated') {
                let studentLogin = AuthUser.getters.getStudentInfo
                await StudentStore.dispatch('fetchStudent', studentLogin.std_id)
                let student = StudentStore.getters.getStudent
                this.student = student
                this.student.rewards = rewards
            }
        },
        async redeemReward(std_points, redeem_id) {
            if (std_points >= 0) {
                  
                let redeem_point = this.rewards[redeem_id].redeem_points
                if (std_points >= redeem_point) {
                    swal({
                        title: "Are you sure to purshase it?",
                        text: "Press confirm button to purshase",
                        // type: "warning",
                        buttons: true,
                        dangerMode: true,
                    }). then((purshaseIt) => {
                        if (purshaseIt) {
                            let std_points_balance = std_points - redeem_point
                            console.log(std_points_balance);
                            this.student[0].reward_points = std_points_balance

                            let payload_std = {
                                id: this.student[0].id,
                                scores: this.student[0].scores,
                                reward_points: this.student[0].reward_points,
                                redeem_point: redeem_point,
                                redeem_id: this.rewards[redeem_id].id
                            }
                            console.log('ready to get item')
                            
                            this.updateReward(redeem_id)
                            StudentStore.dispatch('updateStudent', payload_std)
                            swal("Purshase complete!", {
                            icon: "success",
                            });
                        } 
                    });
                    
                }
                else{
                    this.$swal("Not enought Points", "Failed")
                }
            }
        },
        async updateReward(redeem_id) {
            let payload_reward = {
                id: redeem_id + 1,
                std_id: this.student[0].id
            }
            await RedeemStore.dispatch('updateRewards', payload_reward)
        },
        showEditModal(reward, index) {
            this.rewardForm.index = index
            this.rewardForm.id = reward.id
            this.rewardForm.reward_name = reward.reward_name
            this.rewardForm.detail = reward.detail
            this.rewardForm.point_spent = reward.redeem_points
            this.rewardForm.stocks = reward.stocks
            this.isEditModalOpen = !this.isEditModalOpen
        },
        async submitrewardForm() {
            let payload = {
                index: this.rewardForm.index,
                id: this.rewardForm.id,
                reward_name: this.rewardForm.reward_name,
                redeem_points: this.rewardForm.point_spent,
                detail: this.rewardForm.detail,
                stocks: this.rewardForm.stocks
            }

            await RedeemStore.dispatch('editReward', payload)
            this.isEditModalOpen = !this.isEditModalOpen
            this.clearForm()
        },
        clearForm() {
            this.rewardForm = {
                index: '',
                id: '',
                reward_name: '',
                detail: '',
                point_spent: '',
                stocks: '2'
            }
        },
        async removeReward(reward, index) {
            let payload = {
                index: index,
                id: reward.id
            }

            await RedeemStore.dispatch('removeReward', payload)
        },
        showAddModal() {
            this.isAddModalOpen = !this.isAddModalOpen
        },
        onFileChange(event) {
            this.file = event.target.files[0]
            console.log(this.file)
        },
        async addReward() {
            const formData = new FormData()
            formData.append('files', this.file)
            formData.append('ref', 'reward')
            formData.append('field', 'picture')
            let payload = {
                newReward: this.rewardForm,
                formData: formData
            }
            await RedeemStore.dispatch('addReward', payload)
            this.isAddModalOpen = !this.isAddModalOpen
        },
        openPic(reward){
            // console.log(reward)
            return `${process.env.VUE_APP_API_ENDPOINT}${reward.picture.url}`
        }
    },
    components:{
        Header,
        Sidebar,
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
            .delete_button{
                float: left;
                color: #5f5f5f;
                font-size: 1.3rem;
                margin: 5px 0px 0px 10px;
                border: 0px;
                background-color: #fff;
            }
            .delete_button:hover{
                color: #000000;
            }
            .edit_button{
                background-color: #fff;
                border: 0px;
                width: 25px;
                height: 25px;
                background-image: url(../../public/image/icon/edit_ico.png);
                margin: 0px 0px 15px 10px;
            }
            .edit_button:hover{
                background-image: url(../../public/image/icon/edit_hover_ico.png);
            }
            .item_img{
                float: left;
                border-radius: 100%;
                background-color: #B92D2D;
                margin: 14px 0px 0px 0px;
            }
            #detail{
                display: inline-block;
                font-size: 2.5rem;
                margin: 40px 0px 20px 20px;
            }
            
            #quantity{
                display: inline-block;
                margin: 0px 0px 0px 24px;
                font-size: 1.5rem;
                background-color: #31aed4;
                padding: 10px;
                border-radius: 10px;
            }
            .buy_button{
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
            .buy_button:hover{
                background-color: #3aa4d4;
            }
      }
    }
}
#price{
    display: inline-block;
    margin: 0px 0px 0px 0px;
    font-size: 1.5rem;
    padding: 10px;
    border-radius: 10px;
}
.add_task{
    color: #3a8caf;
    text-decoration: none;
    height: 25px;
    display: flex;
    padding: 2px 10px;
    margin:0px auto;
    margin-bottom: 45px;
    background-color: #fff;
    border: 0px;
    
    img{
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }
    span{
        margin: 2px 0px 0px 5px;
    }
}
.add_task:hover{
    color: #6aa7c2;
    border-left: 10px solid #327997;
}
#modal-lg{
    span{
        display: block;
        font-size: 1.2rem;
    }
    input{
        margin: 10px 0px;
    }

    #details{
        border-radius: 5px;
        margin-top: 10px;
        width: 765px;
        height: 300px;
    }
}
#modal-xl{
    span{
        display: block;
        font-size: 1.2rem;
    }
    
    input{
        margin: 10px 0px;
    }
    #details{
        border-radius: 5px;
        margin-top: 10px;
        width: 1108px;
        height: 300px;
    }
}
</style>