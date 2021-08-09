<template>
  <div class="content_pad">
            <!-- in DB, it's authenticated role. Change to Student! -->
      <div v-if="role === 'Authenticated'">
      <div v-for="(course, index) in courses" :key="index">
            <a :href="'/class/' + course.course_id">
                <div class="top_button">
                    <img src="../../public/image/cal_sbj.png">
                    <span id="subject">{{ course.course_name }}</span>
                </div>
                <div class="bottom_button">
                    <div v-for="(teacher, idx) in course.teachers" :key="idx">
                        <span id="teacher_name">{{ `${ teacher.firstname || "noname"} ${ teacher.lastname || "noname"}` }}</span>
                        <span id="teacher_email">{{ `${ teacher.teacher_email }` }}</span>
                    </div>
                </div>
            </a>
      </div>
      </div>

      <div v-if="role === 'Teacher'">
      <div v-for="(course, index) in courses" :key="index">
            <a :href="'/class/' + course.course_id">
                <div class="top_button">
                    <img src="../../public/image/cal_sbj.png">
                    <span id="subject">{{ course.course_name }}</span>
                </div>
                <div class="bottom_button">
                    <div v-for="(teacher, idx) in course.teachers" :key="idx">
                        <span id="teacher_name">{{ `${ teacher.firstname || "noname"} ${ teacher.lastname || "noname"}` }}</span>
                        <span id="teacher_email">{{ `${ teacher.teacher_email }` }}</span>
                    </div>
                </div>
            </a>
      </div>
      </div>      
    </div>
</template>

<script>
import StudentStore from '@/store/StudentStore'
import AuthUser from '@/store/AuthUser'
import TeacherStore from '@/store/TeacherStore'

export default {
    data() {
        return {
            courses: [],
            role: ""
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
            if (this.role === "Teacher") {
                let { teacher } = AuthUser.getters.user // change this to every student page!
                await TeacherStore.dispatch('fetchCourses', teacher.id)
                this.courses = TeacherStore.getters.getCourses
                console.log(this.courses)
            } else {
                let studentLogin = AuthUser.getters.getStudentInfo
                await StudentStore.dispatch('fetchCourses', studentLogin.std_id)
                let courses = StudentStore.getters.getCourses
                this.courses = courses
                console.log(this.courses)
            }
        }
    }
}
</script>

<style lang="scss">

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
        .bottom_button{
            height: 50%;
            background-color: #fff;
            border-radius: 0px 0px 15px 15px;
            color: #000000;
            #teacher_name{
                width: 590px;
                display: inline-block;
                margin: 55px 0px 0px 405px;
                font-size: 2.5rem;
            }
            #teacher_email{
                display: block;
                margin: 20px 0px 0px 413px;
                color: #787878;
            }
        }
    
      }
      a:hover{
          border:4px solid #327997;
      }
    }
}

</style>