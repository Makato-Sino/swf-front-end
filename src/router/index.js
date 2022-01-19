import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue' 
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Resource from '../components/admin/Resource.vue'
import Instance from '../components/admin/Instance.vue'
import Quality from '../components/admin/Quality.vue'
import Tenant from '../components/admin/Tenant.vue'
import UserHome from '../components/UserHome.vue'
import MyProcess from '../components/user/MyProcess.vue'
import MyInstance from '../components/user/MyInstance.vue'
import Purchase from '../components/user/Purchase.vue'
import WelcomeUser from '../components/WelcomeUser.vue'

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
    component: Home,
    redirect:"/welcome",
    children:[
      { path:"/welcome", component: Welcome, },
      { path:"/resource", component: Resource, },
      { path:"/instance", component: Instance, },
      { path:"/quality", component: Quality, },
      { path:"/tenant", component: Tenant, },
    ]
  },
  {
    path:"/userhome",
    component: UserHome,
    redirect:"/welcomeuser",
    children:[
      { path:"/welcomeuser", component: WelcomeUser, },
      { path:"/myprocess", component: MyProcess, },
      { path:"/myinstance", component: MyInstance, },
      { path:"/purchase", component: Purchase, },
    ]
  },
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
  const userFlag = window.sessionStorage.getItem("username"); // 取出当前用户
  if (!userFlag) return next('/login'); // 无值，返回登录页
  
  next(); // 符合要求
})

export default router
