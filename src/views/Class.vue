<template>
  <div>
    <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Class"></Sidebar>
        <div v-if="course.length === 0">
            Loading...
        </div>
        <div v-if="course.length > 0" class="content_pad">
            <div class="page_wrapper">
                <div class="top_wrapper" href="">
                    <img src="../../public/image/cal_sbj.png" >
                    <div class="left_detail">
                        <span id="subject">{{ `${courses[0].course_name}` }}</span>
                        <span id="teacher_name">{{ `${courses[0].teachers[0].firstname}&nbsp;&nbsp;${courses[0].teachers[0].lastname}` }}</span>
                        <span id="teacher_email">{{ `${courses[0].teachers[0].teacher_email}` }}</span>
                    </div>

                    <!-- div นี้เอาออกถ้ามี role เป็นนักเรียน -->
                    <div v-if="role === 'Teacher'">
                        <b-button class="add_task" v-b-modal.modal-xl variant="primary" ref="btnShow"><img src="../../public/image/icon/add_ico.png">Add something task to your class</b-button>
                        <b-modal id="modal-xl" size="xl" title="Add task" hide-footer>
                            <form action="">
                                <span>Topic</span>
                                <div>
                                    <input type="text" class="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" id="topic" v-model="form.topic">
                                </div>
                                <span>Details</span>
                                <div id="due">
                                    <label>Due Date: </label>
                                    <input type="date" class="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" v-model="form.due_date">
                                    <input type="time" class="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" v-model="form.due_time">
                                </div> 
                                <br>
                                <textarea name="details" class="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" id="details" v-model="form.detail"></textarea>
                                
                            </form>
                            <b-button @click="addAssignment">ASSIGN</b-button>   
                        </b-modal>
                    </div>


                </div>
                <!-- <div v-for="(task, index) in assignments" :key="index">
                    <a class="task_detail" href="/class/task">
                    <img src="../../public/image/icon/task_ico.png">
                    <div> -->
                        <!-- <span id="heading">Heading Task 1</span> -->
                        <!-- <span id="heading">{{`${assignments[index].topic}`}}</span> -->
                        <!-- <span id="date">00/00/00</span> -->
                        <!-- <span id="date">{{`${assignments[index].due_date}`}}</span> -->
                    <!-- </div> -->
                    <!-- </a> -->
                <!-- </div> -->
                <!-- <a class="task_detail" href="/class/task">
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
                </a> -->
                <!-- <div v-for="(task, index) in "></div> -->
                <div v-for="(task, index) in course[0].assignments" :key="index">
                    <a class="task_detail" :href="'/class/' + course_id + '/' + task.id">
                        <img src="../../public/image/icon/task_ico.png">
                        <div>
                            <span id="heading">{{ task.topic }}</span>
                            <span id="date">Due Date: {{ convertDate(task.due_date) }}</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
// handle loading
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import StudentStore from '@/store/StudentStore'
import CoursesStore from '@/store/CoursesStore'
import AssignmentStore from '@/store/AssignmentStore'
import AuthUser from '@/store/AuthUser'

export default {
    components:{
        Header,
        Sidebar,
    },
    data() {
        return {
            course_id: this.$route.params.id,
            course: [],
            courses: [],
            assignments: [],
            form: {
                topic: '',
                detail: '',
                due_date: '',
                due_time: ''
            },
            role: ""
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            this.role = AuthUser.getters.getRole
            await CoursesStore.dispatch('fetchCourses')
            let course = CoursesStore.getters.getCourses
            this.courses = course

            await AssignmentStore.dispatch('fetchAssignments')
            let assignment = AssignmentStore.getters.getAssignments
            this.assignments = assignment

            await StudentStore.dispatch('fetchCourseById', this.course_id)
            this.course = StudentStore.getters.getFilterCourse
            console.log(this.course);
        },
        addAssignment() {
            let { teacher } = AuthUser.getters.user
            let date = this.form.due_date.split('-')
            let time = this.form.due_time.split(':')
            // if jan ? it's 0 - 1
            let datetime = new Date(date[0], date[1] - 1, date[2], time[0], time[1]).toISOString()
            let payload = {
                topic: this.form.topic,
                detail: this.form.detail,
                due_date: datetime,
                teacher: [teacher.id],
                courseID: this.course_id
            }
            AssignmentStore.dispatch("addAssignment", payload)
            this.fetchData()
            this.clearForm()
            this.$root.$emit('bv::hide::modal', 'modal-xl', '#btnShow')
        },
        clearForm() {
            this.form = {
                topic: '',
                detail: '',
                due_date: ''
            }
        },
        convertDate(createdAt) {
            let date = new Date(createdAt)
            let formatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
            return formatDate.toLocaleString().replace(',', '')
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
                    height: 25px;
                    display: flex;
                    padding: 0px;
                    margin: 140px 20px 0px 0px;
                    background-color: #327997;
                    border: 0px;
                    
                    img{
                        width: 20px;
                        height: 20px;
                        margin: 0px;
                    }
                    span{
                        margin: 2px 0px 0px 5px;
                    }
                }
                .add_task:hover{
                    color: #b1d6e6;
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
#modal-xl {
    span{
    font-size: 1.2rem;
    }
    #due{
        float: right;
        border: 1px solid #A1A1A1;
        border-radius: 5px;
        input{
            border: 0px;
        }
    }
    #details{
        border-radius: 5px;
        margin-top: 20px;
        width: 1108px;
        height: 300px;
    }
}

</style>