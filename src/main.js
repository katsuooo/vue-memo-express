import Vue from 'vue'
/*
 bootstrap-vue
*/
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)


Vue.config.productionTip = false

import VueRouter from 'vue-router'  //add
Vue.use(VueRouter)
import routes from './routes'
const router = new VueRouter({routes})




/*
 click-confirm
*/
//import ClickConfirm from 'click-confirm/src/components/ClickConfirm.vue'
//Vue.component('clickConfirm', ClickConfirm);
/**
 * exchenge vb-popup delete icon
 */

import App from './App.vue'


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

