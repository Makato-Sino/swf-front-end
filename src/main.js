import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css' // 添加全局样式
import './assets/font/iconfont.css' // 引入iconfont
import axios from 'axios' //导入axios

// 挂载axios
Vue.prototype.$http = axios
// 设置访问根路径
axios.defaults.baseURL = "http://localhost:9000"


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
