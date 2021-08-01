<template>
    <div class="header_wrapper">
        <p>KANBONG KANBAN</p>
        <a class="logout_btn" href="/"><span>Logout</span></a>
        <a class="profile_btn" href="">
            <div class="img_wrapper">
                <img src="../../public/image/User_img.png" >
            </div>
            <span>User: Firstname Lastname</span>
        </a>
 
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.header_wrapper{
    height: 96px;
    background-color: #1E6380;
    overflow-x: hidden;
    color: #FFFFFF;
    p{
        font-size: 40px;
        margin: 25px 0px 0px 1.5%;
        display: inline-block;
        overflow-x: hidden;
    }
    .profile_btn{
        display: block;
        width: 350px;
        height: 97%;
        float: right;
        .img_wrapper{
            width: 19%;
            height: 63%;
            border-radius: 100%;
            overflow: hidden;
            float: left;
            margin: 4.5% 0px;
            margin-left: 2%;
            
            img{
                width: 100%;
                height: 100%;
                background-color: #FFFFFF;
                margin: 0px;
            }
        }
        span{
            color: #FFFFFF;
            font-size: 20px;
            float: left;
            margin: 10% 1vh;

        }
    }
    .profile_btn:hover{
        background-color: #377f9e;
        margin-top: -1px;
    }
    
    .logout_btn{
        color: #FFFFFF;
        background-color: #3E8FB1;
        text-align: center;
        text-decoration: none;
        display: block;
        width: 100px;
        height: 97%;
        float: right;
        span{
            font-size: 20px;
            display: block;
            margin: 35% 20% 0px 20%;
        }
    }
    .logout_btn:hover{
        background-color: #5eacce;
        margin-top: -1px;
    }
    
}
</style>