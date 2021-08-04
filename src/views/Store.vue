<template>
  <div>
    <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Store"></Sidebar>
        <div class="content_pad">
            <div class="item_wrapper">
                <button>Buy</button>
                <img src="../../public/image/storeItems/item2.png">
                <span id="detail">1st in leader board</span>
                <br>
                <span id="price">1000 Points</span>
            </div>

             <div class="item_wrapper">
                <button>Buy</button>
                <img src="../../public/image/storeItems/item3.png">
                <span id="detail">2nd in leader board</span>
                <br>
                <span id="price">750 Points</span>
            </div>
            
            <div class="item_wrapper">
                <button>Buy</button>
                <img src="../../public/image/storeItems/item4.png">
                <span id="detail">3rd in leader board</span>
                <br>
                <span id="price">500 Points</span>
            </div>

        </div>
      </div>
  </div>
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
                border:0px solid #327997;
                border-radius:0px 10px 10px 0px;
                cursor: pointer;
            }
      }
    }
}
</style>