<template>
  <div class="sidebar_wrapper">
      <div class="top">
          <div v-if="page==='Home'">
              <a class="selected_page" href="/home">
                <img src="../../public/image/icon/home_ico.png">
                <span>Home</span>
            </a>
          </div>
          <div v-if="page!=='Home'">
              <a class="not_selected_page" href="/home">
                <img src="../../public/image/icon/home_ico.png">
                <span>Home</span>
              </a>
          </div>
          
          <!-- <div v-if="page==='Class'">
              <a class="selected_page" href="/class">
                <img src="../../public/image/icon/class_ico.png">
                <span>Class</span>
              </a>
          </div>
          <div v-if="page!=='Class'">
              <a class="not_selected_page" href="/class">
                <img src="../../public/image/icon/class_ico.png">
                <span>Class</span>
              </a>
          </div> -->
          <div v-if="role === 'Authenticated' || role === 'Admin'">
            <div v-if="page==='Leader Board'">
                <a class="selected_page" href="/leader_Board">
                  <img src="../../public/image/icon/leaderBoard_ico.png">
                  <span>Leader Board</span>
                </a>
            </div>
            <div v-if="page!=='Leader Board'">
                <a class="not_selected_page" href="/leader_Board">
                  <img src="../../public/image/icon/leaderBoard_ico.png">
                  <span>Leader Board</span>
                </a>
            </div>
          </div>

          <div v-if="role === 'Authenticated' || role === 'Admin'">
          <div v-if="page==='Store'">
              <a class="selected_page" href="/store">
                <img src="../../public/image/icon/store_ico.png">
                <span>Store</span>
              </a>
          </div>
          <div v-if="page!=='Store'">
              <a class="not_selected_page" href="/store">
                <img src="../../public/image/icon/store_ico.png">
                <span>Store</span>
              </a>
          </div>
          </div>
          
          
      </div>
      <div class="bottom">
          <div v-if="page==='Profile'">
            <a class="selected_page" href="/profile">
                <img src="../../public/image/icon/profile_ico.png">
                <span>Profile</span>
            </a>
          </div>
          <div v-if="page!=='Profile'">
            <a class="not_selected_page" href="/profile">
                <img src="../../public/image/icon/profile_ico.png">
                <span>Profile</span>
            </a>
          </div>
          
          <div v-if="page==='About'">
              <a class="selected_page" href="/about">
                <img src="../../public/image/icon/about_ico.png">
                <span>About</span>
              </a>
          </div>
          <div class="not_selected_page" v-if="page!=='About'">
              <a href="/about">
                <img src="../../public/image/icon/about_ico.png">
                <span>About</span>
              </a>
          </div>
          
      </div>
  </div>
</template>

<script>
import AuthUser from '@/store/AuthUser'

export default {
    props:['page'],
    data() {
      return {
        role: AuthUser.getters.getRole || ''
      }
    },
}
</script>

<style lang="scss">
.sidebar_wrapper{
    width: 220px;
    height: 877px;
    background-color: #fff;
    float: left;
    a{
        display: block;
        height: 65px;
        img{
            margin: 8% 10% 0px 10% ;
            width: 15%;
            height: 50%;
            float: left;
        }
        span{
            font-size: 20px;
            margin-top: 11.5%;
            float: left;
            color: #000000;
        }
    }
    .not_selected_page:hover{
        background-color: #DCDCDC;
        border: 2px solid #1E6380;
    }
}
.top{
    height: 70%;
    
}

.bottom{
    height: 30%;
    border-top: 2px solid #CACACA;
}

.selected_page{
    border-left: 10px solid #1E6380;
    background-color: #DCDCDC;
}
</style>