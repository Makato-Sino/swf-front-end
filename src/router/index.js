import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue' 
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Resource from '../components/admin/Resource.vue'
import Instance from '../components/admin/Instance.vue'
import Quality from '../components/admin/Quality.vue'
import Tenant from '../components/admin/Tenant.vue'
import TenantHome from '../components/tenant/TenantHome.vue'
import Order from '../components/tenant/Order.vue'
import Purchase from '../components/tenant/Purchase.vue'

// 不加这个会报错，但页面还能运行
const originalReplace = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err);
}
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
    // redirect:"/welcome",
    children:[
      { path:"/welcome", component: Welcome, },
      { path:"/resource", component: Resource, },
      { path:"/instance", component: Instance, },
      { path:"/quality", component: Quality, },
      { path:"/tenant", component: Tenant, },
    ]
  },
  {
    path: "/tenanthome",
    component: TenantHome,
    redirect: "/tenantwelcome",
    children: [
      { path:"/tenantwelcome", component: Welcome, },
      { path:"/purchase", component: Purchase, },
      { path:"/order", component: Order, },
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
  console.log(to.path);
  if (to.path == '/login') return next();
  // 获取user
  const userFlag = window.sessionStorage.getItem("username"); // 取出当前用户
  const role_admin = eval(window.sessionStorage.getItem('role_admin'));
  const role_user = eval(window.sessionStorage.getItem('role_user'));
  if (!userFlag) return next('/login'); // 无值，返回登录页
  // 根据是管理员或是租户跳转到相应页面
  if (to.path == '/home') {
    // console.log('role_admin: ', role_admin);
    // console.log('role_user: ', role_user);
    if (role_admin) {
      // console.log('admin!!!');
      return next('/welcome');
    }
    if (role_user) {
      // console.log('user!!!');
      return next('/tenanthome');
    }
  }
  next(); // 符合要求
})

export default router
