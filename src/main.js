import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import './registerServiceWorker'
Vue.config.productionTip = false
// Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueCookie);

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
