import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
// import Add from './views/Add.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/add',
  //   name: 'add',
  //   component: Add
  // },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: 'list',
      name: 'List',
      component: () => import(/* webpackChunkName: "List" */ './views/List.vue')
    }, {
      path: 'add',
      name: 'Add',
      component: () => import('./views/Add.vue')
    }]
  }

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

  ]
})
