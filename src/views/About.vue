<template>
  <div class="page_wrapper">
      <Header></Header>
        
        <div class="content_wrapper">
          <Sidebar page="About"></Sidebar>
          <div class="content_pad">
            <div class="profile_wrapper">
              <img src="../../public/image/profile_member/chat.jpg">
              <profile-member name= 'Kollawach Satiansareesuk' id='6210450016' nickname= 'Chat'
               email= 'kollawach.s@ku.th' line= 'kollawachhh' facebook= 'Kollawach Kon'>
              </profile-member>

            </div>
            <div class="profile_wrapper">
              <img src="../../public/image/profile_member/tanque.jpeg">
              <profile-member name= 'Patipan Boonsimma' id='6210400710' nickname= 'Tanque'
               email= 'patipan.bo@ku.th' line= 'iitong30' facebook= 'Patipan Boonsimma'>
              </profile-member>

            </div>
            <div class="profile_wrapper">
              <img src="../../public/image/profile_member/tata.jpg">
              <profile-member name= 'Pongpol Rojanaadisorn' id='6210401252' nickname= 'Tata'
               email= 'pongpol.ro@ku.th' line= 'tatatebaga' facebook= 'Pongpol Rojanaadisorn'>
              </profile-member>

            </div>
            
          </div>
          
        </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import ProfileMember from '@/components/ProfileMember'

export default {

    components:{
        Header,
        Sidebar,
        ProfileMember,
    }
}
</script>

<style scoped lang="scss">

.content_wrapper{
    display: inline-block;
    width:100%;

    height: 875px;
    margin: 0px auto;
    overflow: hidden;
    .content_pad{
    
      height: 100%;
      display: block;
      overflow: scroll;
    }
}
.profile_wrapper{
  display: block;
  background-color: #fff;
  float: right;
  margin:70px 25% 20px 40%;
  width: 800px;
  height: 400px;
  display: flex;
  img{
    width: 40%;
    height: 100%;
  }

}
.profile_wrapper:hover{
  border: 2px solid #1E6380;
  background-color: #DCDCDC;
}

</style>