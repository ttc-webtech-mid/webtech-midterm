<template>
  <div>
      <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Profile"></Sidebar>
        <div class="content_pad">
            <div v-if="role === 'Authenticated'" class="profile_wrapper">
                <div class="top_wrapper">
                    <div class="profile_img">
                        <img src="../../public/image/icon/profile_ico.png">
                    </div>
                    <div class="top_detail_wrapper">
                        <span id="username">User: {{ `${student[0].firstname} ${student[0].lastname}` }}</span>
                        <br>
                        <span id="email">{{ student[0].student_email }}</span>
                    </div>
                </div>
                <div class="bottom_wrapper">
                    <div class="left_detail_wrapper">
                        <span id="reward">Reward</span>
                        <div class="reward_pad">
                            <div class="reward">
                                <tr v-for="(std, index) in student" :key="index">
                                    <div v-for="(reward, index) in std.rewards" :key="index">
                                        <div class="flex py-2">
                                            <img class="w-44 h-44" :src="openPic(reward)">
                                            <p class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-yellow-500 rounded">{{ reward.reward_name }}</p>
                                        </div>
                                    </div>
                                </tr>
                                <button @click="openHistory" class="text-white bg-pink-400 hover:bg-gray-700 hover:text-white block px-3 py-2 my-2 rounded-md text-base font-medium">
                                    History
                                </button>
                                <history ref="modal"></history>
                            </div>
                        </div>
                    </div>
                    <div class="right_detail_wrapper">
                        <span id="classes">Classes</span>
                        <div class="classes_pad">
                            <div v-for="(course, index) in courses" :key="index">
                                <div class="class">
                                    <img src="../../public/image/science_sbj.png">
                                    <span>{{ course.course_name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="role === 'Teacher'" class="profile_wrapper">
                <div class="top_wrapper">
                    <div class="profile_img">
                        <img src="../../public/image/icon/profile_ico.png">
                    </div>
                    <div class="top_detail_wrapper">
                        <span id="username">User: {{ `${teacher[0].firstname} ${teacher[0].lastname}` }}</span>
                        <br>
                        <span id="email">{{ teacher[0].teacher_email }}</span>
                    </div>
                </div>
                <div class="bottom_wrapper">
                    <div class="right_detail_wrapper">
                        <span id="classes">Classes</span>
                        <div class="classes_pad">
                            <div v-for="(course, index) in courses" :key="index">
                                <div class="class">
                                    <img src="../../public/image/science_sbj.png">
                                    <span>{{ course.course_name}}</span>
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
import History from '@/components/History'
import TeacherStore from '@/store/TeacherStore'

// isLoading
export default {
    components:{
        Header,
        Sidebar,
        History
    },
    data() {
        return {
            // student: [],
            student: [{
                firstname: '',
                lastname: '',
                rewards: {
                    // reward_id: '',
                    // reward_name: '',
                    // redeem_points: 0,
                    detail: ''
                },
                rewards_detail: ''
            }],
            rewards: [],
            courses: [],
            teacher: [],
            role: '',
            isOpen: false
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            this.role = AuthUser.getters.getRole
            if (this.role === 'Teacher') {
                this.teacher.push (AuthUser.getters.user.teacher)
                await TeacherStore.dispatch('fetchCourses', this.teacher[0].id)
                this.courses = TeacherStore.getters.getCourses
            }else {
                let studentLogin = AuthUser.getters.getStudentInfo
                await StudentStore.dispatch('fetchStudent', studentLogin.std_id)
                await StudentStore.dispatch('fetchCourses', studentLogin.std_id)
                await RedeemStore.dispatch('fetchRewards')
                this.student = StudentStore.getters.getStudent
                console.log(this.student)
                this.courses = StudentStore.getters.getCourses
                this.rewards = RedeemStore.getters.getRewards
                this.rewards_detail = RedeemStore.getters.getRewards
            }
        },
        openHistory() {
            this.$refs.modal.openModal()
        },
        openPic(reward){
            // console.log(reward)
            return `${process.env.VUE_APP_API_ENDPOINT}${reward.picture.url}`
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
      .profile_wrapper{
        display: block;
        background-color: #fff;
        margin:0px auto;
        margin-top: 90px;
        width: 1200px;
        height: 700px;
        .top_wrapper{
            display: block;
            height: 330px;
            .profile_img{
                float: left;
                width: 250px;
                height: 250px;
                margin: 40px 0px 0px 40px;
                border-radius: 100%;
                background-color: black;
                overflow: hidden;
                img{    
                    width: 250px;
                    height: 250px;
                }
            }
            .top_detail_wrapper{
                float: left;
                margin: 110px 0px 0px 40px;
                #username{
                    font-size: 3.5rem;
                }
                #email{
                    color: #909090;
                    font-size: 1.5rem;
                    margin-left: 5px;
                }
            }
        }
        .bottom_wrapper{
            display: block;
            height: 370px;
            .left_detail_wrapper{
                float: left;
                width: 50%;
                height: 100%;
                #reward{
                    font-size: 1.5rem;
                    margin-left: 50px;
                }
                .reward_pad{
                    display: block;
                    width: 80%;
                    height: 80%;
                    margin-left: 50px;
                    // overflow-y: scroll;
                    .reward{
                        margin: 20px 0px 0px 20px;
                        width: 80%;
                        height: 60px;
                        img{
                            float: left;
                            width: 50px;
                            height: 50px;
                        }
                        span{
                            font-size: 1.1rem;
                            float: left;
                            margin: 16px 0px 0px 20px;
                        }
                    }
                }
            }
            .right_detail_wrapper{
                float: left;
                width: 50%;
                height: 100%;
                
                #classes{
                    font-size: 1.5rem;
                    margin-left: 50px;
                }
                .classes_pad{
                    display: block;
                    width: 80%;
                    height: 80%;
                    margin-left: 50px;
                    .class{
                        
                        margin: 20px 0px 0px 20px;
                        width: 80%;
                        height: 60px;
                        img{
                            float: left;
                            width: 50px;
                            height: 50px;
                            border-radius: 100%;
                        }
                        span{
                            font-size: 1.1rem;
                            float: left;
                            margin: 16px 0px 0px 20px;
                        }
                    }
                }
            }
        }
      }
    }
}

</style>