<template>
  <div>
    <span class="head">{{name}}</span>
    <br>
    <span class="id">ID: {{id}}</span>
    <br>
    <span class="nickname">Nickname: {{nickname}}</span>
    <br>
    <span class="email">Email: {{email}}</span>
    <br>
    <span class="line">Line: {{line}}</span>
    <br>
    <span class="facebook">Facebook: {{facebook}}</span>
  </div>
</template>

<script>
export default {
props:['name','id','nickname','email','line','facebook']
}
</script>

<style lang="scss">

.head{
    display: block;
    margin:20px 0px 20px 20px ;
    font-size: 2rem;
}
.id,.nickname,.email,.line,.facebook{
    display: block;
    margin:10px 0px 0px 20px ;
}

</style>