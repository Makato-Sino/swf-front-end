import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入Login组件
import Login from '../components/Login.vue' 
// 引入首页
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/login"
  },
  {
    path:"/login",
    component: Login
  },
  {
    path:"/home",
    component: Home
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next)=>{
  // to 将要访问
  // from 从哪里访问
  // next 下一步 next(url):重定向至url  next():继续访问 to 路径
  if (to.path == '/login') return next();
  // 获取user
  const userFlag = window.sessionStorage.getItem("user"); // 取出当前用户
  if (!userFlag) return next('/login'); // 无值，返回登录页
  
  next(); // 符合要求
})

export default router
