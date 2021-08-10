<template>
  <div>
    <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Class"></Sidebar>
        <div class="content_pad">
            <div class="page_wrapper">
                <div class="head_wrapper">
                    <img src="../../public/image/icon/task_ico.png">
                    <div class="head_text">
                        <span id="heading">{{ task.topic }}</span>
                        <span id="date">Assign time: {{ convertDate(task.created_at) }}</span>
                    </div>
                </div>
                <div class="task_wrapper">
                    <span id="details">รายละเอียด</span>
                    <div class="details_wrapper">
                        <p>
                            {{ task.detail }}
                        </p>
                    </div>
                </div>

                <!-- ของ role ที่เป็นนิสิต -->
                <div v-if="role === 'Authenticated'" class="submit_wrapper">
                    <div class="submit_top_wrapper">
                        <span id="your_work">Your work</span>
                        <div>Assigned</div>
                        <!-- <div href="" style="background: #2BB863">Turned in</div> -->
                        <br>
                        <span id="due">Due: {{ convertDate(task.due_date) }}</span>
                    </div>
                    <form @submit.prevent="upload" ref="uploadForm">
                    <div class="submit_bottom_wrapper">
                        <div class="work_pad">
                                <div v-if="uploadedFiles.length === 0">
                                    <div v-for="(file, index) in files" :key="index">
                                            <a id="file" style="float:left;" href="">
                                                <span id="special_text">&#8226;</span>
                                                <span >{{ file.name }}</span>
                                            </a>
                                            <button @click="remove(index)" style="display:inline-box; margin-left:1px;"> x </button>
                                    </div>
                                </div>
                                <div v-if="uploadedFiles.length > 0">
                                    <div v-for="(file, index) in uploadedFiles" :key="index">
                                            <a href="">
                                                <span id="special_text">&#8226;</span>
                                                <span>{{ file.name }}</span>
                                            </a>
                                            <button @click="remove(index)"> x </button>
                                    </div>
                                </div>
                                
                            <div class="button-wrap">
                                <label class="button" for="upload">
                                    <img src="../../public/image/icon/add_task_ico.png">
                                    Upload File</label>
                                <input id="upload" type="file" name="files" multiple @change="onFileChange">
                            </div>
                        </div> 
                        <!-- <input v-if="files.length === 0" type="submit" id="submit" style="background-color: grey" href="" disabled> -->
                        <!-- v-if="files.length > 0"  -->
                        <input type="submit" @click="successUpload" id="submit" style="background-color: #2F72B0" href="">
                        <!-- <a id="submit" style="background-color: #CE2828; margin-right: 110px" href="">unsubmit</a> -->
                    </div>
                    </form>
                    <div v-if="isSuccess" class="flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2">
                        <!-- icons -->
                        <div class="text-green-500 rounded-full bg-white mr-3">
                            <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                            </svg>
                        </div>
                        <!-- message -->
                        <div class="text-white max-w-xs ">
                            ส่งงานสำเร็จ!
                        </div>
                    </div>
                </div>

                <!-- ของ role ที่เป็นอาจารย์ -->
                <div v-if="role === 'Teacher'" class="submit_wrapper">
                    <div class="submit_top_wrapper">
                        <span id="your_work">Turned in list</span>
                        <br>
                        <span id="due">Due: {{ convertDate(task.due_date) }}</span>
                    </div>
                    <div class="submit_bottom_wrapper">
                        <div v-if="turnedIn.length > 0" class="work_pad">
                            <div v-for="(std, index) in turnedIn" :key="index">
                                <h2>{{ `${std.student.std_id} ${std.student.firstname} ${std.student.lastname}`}}</h2>
                                <div v-for="(task, id) in std.assignment.files" :key="id">
                                    <a :href="openTask(task.url)" target="_blank">
                                        <span id="special_text">&#8226;</span>
                                        <span>{{ `${task.name}` }}</span>
                                    </a>
                                </div>
                            </div>
                        </div> 

                        <div v-if="turnedIn.length === 0" class="work_pad">
                            There is no any work!
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
import AssignmentStore from "@/store/AssignmentStore"
import StudentStore from "@/store/StudentStore"
import AuthUser from '@/store/AuthUser'

export default {

    components:{
        Header,
        Sidebar,
    },
    data() {
        return {
            task_id: this.$route.params.task_id,
            task: [],
            files: [],
            isSubmit: false,
            uploadedFiles: [],
            role: "",
            turnedIn: [],
            isSuccess: false
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData(){
            this.role = AuthUser.getters.getRole
            let params = {
                task_id: this.task_id,
                role: this.role
            }
            await AssignmentStore.dispatch("fetchAssignmentById", params)
            this.task = AssignmentStore.getters.getFilterAssignment[0]  
            if(this.role === 'Teacher') {
                this.turnedIn = AssignmentStore.getters.getTurnedIn
                console.log(this.turnedIn)
            }
            else {
                AssignmentStore.dispatch("fetchUploadedFiles")
                let uploadedFiles = AssignmentStore.getters.getUploadedFiles
                console.log(uploadedFiles)
                if(uploadedFiles.length !== 0) {
                    this.uploadedFiles = AssignmentStore.getters.getUploadedFiles[0]['files']
                }else {
                    this.uploadedFiles = []
                }
            }
        },
        onFileChange(event) {
            for(let file of event.target.files) {
                console.log(file)
                this.files.push(file)
            }
        },
        async upload(){
            const formData = new FormData()
            for (let file of this.files) {
                    formData.append('files', file)
            }
            formData.append('ref', 'hand-in-assignment')
            formData.append('field', 'files')
            await AssignmentStore.dispatch('uploadAssignments', formData)
            await StudentStore.dispatch('addScore')
        },
        remove(idx) {
            this.files = this.files.filter((item, index) => index !== idx)
            console.log(this.files)
        },
        convertDate(createdAt) {
            let date = new Date(createdAt)
            let formatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
            return formatDate.toLocaleString().replace(',', '')
        },openTask(url) {
            return process.env.VUE_APP_API_ENDPOINT + url
        },
        successUpload() {
            this.isSuccess = !this.isSuccess
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
            .head_wrapper{
                height: 150px;
                img{
                    margin: 29px 0px 0px 29px;
                    float: left;
                    border-radius: 100%;
                }
                .head_text{
                    float: left;
                    margin: 40px 0px 0px 20px;
                    span{
                        display:block
                    }
                    #heading{
                        font-size: 2rem;
                        margin-bottom: 10px;
                    }
                    #date{
                        color:#8D8D8D;
                        margin-left: 1px;
                    }
                } 
            }
            .task_wrapper{
                float: left;
                margin-left: 29px;
                width: 700px;
                height: 500px;
                #details{
                    display: block;
                    font-size: 1.2rem;
                }
                .details_wrapper{
                    height: 478px;
                    overflow-y: scroll;
                }
                
            }
            .submit_wrapper{
                float: left;
                width: 350px;
                height: 500px;
                margin-left: 35px;
                border-left: 2px solid #747474;
                .submit_top_wrapper{
                    height: 80px;
                    span{
                        display: inline-block;
                    }
                    #your_work{
                        font-size: 2rem;
                        margin:0px 0px 10px 22px;

                    }
                    #due{
                        margin-left: 25px;
                        color: #8D8D8D;
                    }
                    div{
                        display: block;
                        float: right;
                        color: #fff;
                        text-decoration: none;
                        background-color: #CE2828;
                        padding: 5px 10px;
                        margin-right: 23px;
                        border-radius: 10px;
                    }
                }
                .submit_bottom_wrapper{
                    height: 418px;
                    width: 300px;
                    margin: 0px auto;
                    border: 1px solid #000000;
                    border-radius: 10px;
                    .work_pad{
                        width: 90%;
                        height: 350px;
                        margin:15px auto;
                        overflow-y: scroll;
                        overflow-x: hidden ;
                        #special_text{
                            float: left;
                            // width: 100px;
                            display: block;
                            margin: 0px 8px 0px 7px;
                        }
                        #file{
                            width: 150px;
                            margin: 0px;
                        }
                        #file:hover{
                            border: 1px solid #46729c;
                        }
                        input[type="file"] {
                            position: absolute;
                            z-index: -1;
                            top: 10px;
                            left: 8px;
                            font-size: 17px;
                            color: #b8b8b8;
                        }
                        .button-wrap {
                            // position: relative;
                            width: 120px;
                        }
                        .button {
                            display: inline-block;
                            cursor: pointer;
                            border-radius: 5px;
                            background-color: #fff;
                            font-size: 16px;
                            font-weight: bold;
                            color: #3C89CF;
                            margin-top: 10px;
                            img{
                                float: left;
                                width: 20px;
                                height: 20px;
                                margin: 1px 4px 0px 0px;
                            }
                        }
                        .button:hover{
                            color: #46729c;
                        }

                        a{
                            display: block;
                            color: #3C89CF;
                            height: 25px;
                            margin-top: 10px;
                            img{
                                float: left;
                                width: 20px;
                                height: 20px;
                            }
                        }
                        a:hover{
                            color: #46729c;
                        }
                    }
                    #submit{
                        display: block;
                        float: right;
                        color: #fff;
                        text-decoration: none;
                        padding: 0px 10px;
                        margin:0px 115px 0px 0px;
                        border-radius: 10px;
                    }
                }
            }
        }
    }
}
</style>