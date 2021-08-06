<template>
  <div>
      <home></home>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
import Home from '../Home.vue'
export default {
  components: { Home },
    mounted() {
        AuthUser.dispatch('logout')
        this.$swal({
          title: "Are you sure to log out?",
          dangerMode: false,
          buttons: true,
        })
        .then((willLogout) => {
          if (willLogout) {
            this.$router.push('/')
          } 
          else {
            this.$router.push('home')
          }
        });
    },
    
}
</script>

<style>
</style>