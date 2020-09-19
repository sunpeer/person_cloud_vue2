import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue"
import User from "../views/User.vue"
import Login from "../views/Login.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path:'/admin',
    name:'admin',
    component:Admin,
    beforeEnter:(to,form,next)=>{
      //判断是否登录
      sessionStorage.getItem('logintype')==="admin"?next():next({name:'login'})
    }
  },
  {
    path:'/user',
    name:'user',
    component:User,
    beforeEnter:(to,form,next)=>{
      //判断是否登录
      sessionStorage.getItem('logintype')==="user"?next():next({name:'login'})
    }
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'*',
    component:Home
  }
];

const router = new VueRouter({
  routes
});

export default router;
 