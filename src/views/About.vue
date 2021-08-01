<template>
  <div class="page_wrapper">
      <Header></Header>
      <!-- <div class="body_page"> -->
        <Sidebar page="About"></Sidebar>
        <div class="content_wrapper"></div>
      </div>
  <!-- </div> -->
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
// .body_page{
//     overflow-x: scroll;
// }
// .content_wrapper{
//     display: inline-block;
//     width:85vw;

//     height: 875px;
//     margin: 0px auto;
// }

</style>