import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/users/User.vue'
import Inventory from '../components/users/Inventory.vue'
import Lending from '../components/order/Lending.vue'
import Selling from '../components/order/Selling.vue'
import Stock from '../components/users/Stock.vue'
import HomeNo from '../components/Home_no.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: 'http://127.0.0.1:8080/api', redirect: 'http://127.0.0.1:3000/api' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/1-1', component: User },
        { path: '/2-1', component: Inventory },
        { path: '/2-2', component: Stock },
        { path: '/3-1', component: Lending },
        { path: '/3-2', component: Selling }
      ]
    },
    { path: '/homeno', component: HomeNo }
  ]
})
