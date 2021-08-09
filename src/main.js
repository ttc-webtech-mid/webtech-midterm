import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueSwal from 'vue-swal'
import '../index.css'

Vue.use(VueAxios, axios)
Vue.use(VueSwal)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
