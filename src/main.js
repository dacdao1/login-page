import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router'

Vue.config.productionTip = false
// Vue.use(BootstrapVue);
Vue.use(VueRouter);

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
