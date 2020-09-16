import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'

import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import Popover from 'vue-js-popover'



Vue.use(Vuelidate)
Vue.use(Popover)
Vue.config.productionTip = false






Vue.use(VueRouter);
Vue.use(VueCookie);


new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
