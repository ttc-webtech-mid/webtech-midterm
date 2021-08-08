<template>
  <div>
    <Header></Header>
      <div class="content_wrapper">
        <Sidebar page="Store"></Sidebar>
        <div class="content_pad">

            <!-- ของ role admin -->
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
            <!-------------------->

            <div class="item_wrapper">
                <button class="buy_button">Buy</button>

                <!-- ของ role admin -->
                <b-button class="delete_button" v-b-modal.modal-sm variant="primary">X</b-button>
                <!-------------------->

                <img class="item_img" src="../../public/image/storeItems/item2.png">
                <span id="detail">1st in leader board</span>
                
                <!-- ของ role admin -->
                <b-button class="edit_button" v-b-modal.modal-lg variant="primary"></b-button>
                <!-------------------->

                <br>
                <span id="price">1000 Points</span>
                <span id="quantity">10 pieces</span>
            </div>

             <div class="item_wrapper">
                <button class="buy_button">Buy</button>

                <!-- ของ role admin -->                
                <b-button class="delete_button" v-b-modal.modal-sm variant="primary">X</b-button>
                <!-------------------->

                <img class="item_img" src="../../public/image/storeItems/item3.png">
                <span id="detail">2nd in leader board</span>

                <!-- ของ role admin -->
                <b-button class="edit_button" v-b-modal.modal-lg variant="primary"></b-button>
                <!-------------------->
                
                <br>
                <span id="price">750 Points</span>
                <span id="quantity">10 pieces</span>
            </div>
            
            <div class="item_wrapper">
                <button class="buy_button">Buy</button>

                <!-- ของ role admin -->
                <b-button class="delete_button" v-b-modal.modal-sm variant="primary">X</b-button>
                <!-------------------->

                <img class="item_img" src="../../public/image/storeItems/item4.png">
                <span id="detail">3rd in leader board</span>

                <!-- ของ role admin -->
                <b-button class="edit_button" v-b-modal.modal-lg variant="primary"></b-button>
                <!-------------------->

                <br>
                <span id="price">500 Points</span>
                <span id="quantity">10 pieces</span>
            </div>

            <!-- ของ role admin -->
            <div>
                <b-button class="add_task" v-b-modal.modal-xl variant="primary"><img src="../../public/image/icon/add_task_ico.png">Add somthing task to your class</b-button>
                <b-modal id="modal-xl" size="xl" title="Add task">
                    <form action="">
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
            </div>
            <!-------------------->

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
            #price{
                display: inline-block;
                margin: 0px 0px 0px 24px;
                font-size: 1.5rem;
                background-color: #AAEBFF;
                padding: 10px;
                border-radius: 10px;
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