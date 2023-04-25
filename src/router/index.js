import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/audit/platform'
  },
  {
    path: '/audit/platform',
    name: '/audit/platform',
    component: () => import('../components/auditPlatform.vue')
  },
  {
    path: '/audit/platform/:userId',
    name: '/audit/platform/:userId',
    component: () => import('../components/industry')
  }
]

const router = new VueRouter({
  routes
})
export default router