import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from 'axios'
import crypt from './util/crypt.js'

Vue.config.productionTip = false;

Vue.use(ElementUI);

//对axios做全局配置
axios.defaults.baseURL='http://localhost:3000'
axios.defaults.withCredentials = true;
//注册一些工具
Vue.prototype.$axios=axios;
Vue.prototype.encrypt=crypt

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
