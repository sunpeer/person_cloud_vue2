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
    path:'/admin/:id',
    name:'admin',
    component:Admin,
    beforeEnter:(to,form,next)=>{
      //判断是否登录
      if(sessionStorage.getItem('logintype')==="admin"&&sessionStorage.getItem('loginid')==to.params.id)
        next()
      else
        next({name:'login',params:{type:'admin'}})
    }
  },
  {
    path:'/user/:id',
    name:'user',
    component:User,
    beforeEnter:(to,form,next)=>{
      //判断是否登录
      if(sessionStorage.getItem('logintype')==='user'&&sessionStorage.getItem('loginid')==to.params.id)
        next()
      else
        next({name:'login',params:{type:'user'}})
    }
  },
  {
    path:'/login/:type',
    name:'login',
    component:Login,
    beforeEnter:(to,form,next)=>{
      //如果type的值不对，则不允许进去
      if(to.params.type!=='user'&&to.params.type!=='admin')
        next({name:'home'})
      else
        next()
    }
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
 