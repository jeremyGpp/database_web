import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Userhome from '../components/Userhome.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: 'http://127.0.0.1:8080/api', redirect: 'http://127.0.0.1:3000/api' },
    { path: '/login', component: Login },
    { path: '/userhome', component: Userhome }
  ]
})
