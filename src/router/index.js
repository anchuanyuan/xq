import Vue from 'vue'
import VueRouter from 'vue-router'
import autoRouter from "./pages/auto"
// import { getUser } from "@/utils/auth";

Vue.use(VueRouter)

const routes = [
  ...autoRouter // 这个是自动路由
  ,
  {
    path: "/",
    component: () => import("@/components/Foot"),
    // component: () => import("@/views/login"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "/rush",
        name: "rush",
        component: () => import("@/views/rush"),
      },
      {
        path: "/mall",
        name: "mall",
        component: () => import("@/views/mall"),
      },
      {
        path: "/cart",
        name: "cart",
        component: () => import("@/views/cart"),
      },
      {
        path: "/self",
        name: "self",
        component: () => import("@/views/self"),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// // 不需要检查登录的路径
const noCheckPath = [
  "/login/**",
  "/comm/**"
]

router.beforeEach((to, from, next) => {
  // const userInfo = getUser()

  for (let i = 0; i < noCheckPath.length; i++) {
    let pass =
      noCheckPath[i] === to.path ||
      (noCheckPath[i].endsWith("/**") &&
        to.path.startsWith(noCheckPath[i].substring(0, noCheckPath[i].lastIndexOf('/'))));

    if (pass) {
      next();
      return;
    }
  }

  // 对接接口后需要解开
  next()
  // if (!userInfo) {
  //   next({
  //     name: 'login'
  //   })
  // } else {
  //   next()
  // }

});

export default router
