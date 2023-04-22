import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const customRoute = [
  {
    path:'/',
    component: () => import('../components/c.vue')
  },
  {
    path: '/audit-platform',
    name: '/audit-platform',
    component: () => import('../components/auditPlatform.vue')
  }
]

const router = new VueRouter({
  customRoute
})
export default router