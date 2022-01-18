import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue' 
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Resource from '../components/admin/Resource.vue'
import Instance from '../components/admin/Instance.vue'
import Quality from '../components/admin/Quality.vue'
import Tenant from '../components/admin/Tenant.vue'

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
  const userFlag = window.sessionStorage.getItem("username"); // 取出当前用户
  if (!userFlag) return next('/login'); // 无值，返回登录页
  
  next(); // 符合要求
})

export default router
