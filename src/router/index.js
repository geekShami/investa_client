import Vue from 'vue'
import VueRouter from 'vue-router'
import userRoles from '../Enums/userRole.js'; 
import store from '../store/index.js';

Vue.use(VueRouter)

const routes = [
  {
    path :'/',
    name :'Home',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/company',
    name: 'Company',
    component: () => import('../views/Company.vue'),
    meta: {requiresAuth: true, requiredRole: userRoles.COMPANY }
  },
  {
    path: '/owner',
    name: 'Owner',
    component: () => import( '../views/Owner.vue'),
    meta: {requiresAuth: true, requiredRole: userRoles.OWNER}
  },
  {
    path: '/employee',
    name: 'Employee',
    component: () => import('../views/Employee.vue'),
    meta: {requiresAuth: true, requiredRole: userRoles.EMPLOYEE}
  },
  {
    path: '/cashier',
    name: 'Cashier',
    component: () => import('../views/Cashier.vue'),
    meta: {requiresAuth: true, requiredRole: userRoles.CASHIER}
  },
  {
    path: '/investor',
    name: 'Investor',
    component: () => import('../views/Investor.vue'),
    meta: {requiresAuth: true, requiredRole: userRoles.CLIENT}
  }, 
  {
    path: '/nopermission',
    name: "NoPermission",
    component: () => import('../views/PermissionDenied.vue')
  },
  {
    path: '/*',
    name: "PageNotFound",
    component: () => import('../views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next)=>{
  
  
  if(to.matched.some(record => record.meta.requiresAuth)){

    const isLoggedIn = store.getters.isLoggedIn;
    if(isLoggedIn){

      const role = store.getters.userRole; 
      if(to.matched.some(record => record.meta.requiredRole == role)){ next() }
      else{ next({name:'NoPermission'}) } 

    }
    else{

      next({name: 'Login'})
      
    }
  }
  else{
    next()
  }
});

export default router
