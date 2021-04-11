import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/company',
    name: 'Company',
    component: () => import(/* webpackChunkName: "about" */ '../views/Company.vue')
  },
  {
    path: '/owner',
    name: 'Owner',
    component: () => import(/* webpackChunkName: "about" */ '../views/Owner.vue')
  },
  {
    path: '/employee',
    name: 'Employee',
    component: () => import(/* webpackChunkName: "about" */ '../views/Employee.vue')
  },
  {
    path: '/cashier',
    name: 'Cashier',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cashier.vue')
  },
  {
    path: '/investor',
    name: 'Investor',
    component: () => import(/* webpackChunkName: "about" */ '../views/Investor.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
