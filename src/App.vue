<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, Kanit, sans-serif;
  background-color: #EAEAEA;
}
body{
    margin: 0px;
  }
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

}
</style>
