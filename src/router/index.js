import { createRouter, createWebHistory } from 'vue-router'
import Login from '../Login.vue'
import Index from '../views/Index.vue'
import Detail from '../views/Detail.vue'
import Report from '../views/Report.vue'
import Setting from '../views/Setting.vue'
import Service from '../views/Service.vue'
import Overview from '../views/Overview.vue'
const routes = [
  { path: '/', redirect: '/login'},
  { path: '/login', component: Login },
  { 
    path: '/index', 
    component: Index,
    children: [
      {
        path: 'overview',
        component: Overview
      },
      {
        path: 'detail',
        component: Detail
      },
      {
        path: 'report',
        component: Report
      },{
        path: 'setting',
        component: Setting
      },{
        path: 'service',
        component: Service
      },
    ]
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  const getToken = window.sessionStorage.getItem("token");
  if(to.path === "/login") return next();
  if(!getToken) return next("/login");
  if(to.path === "/index") return next("/index/overview");
  next();
})
export default router
