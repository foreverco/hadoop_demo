let viewRouter = [
  // {
  //   path: "/",
  //   redirect: "/home",
  //   class_true: false,
  //   hidden: true,
  //   meta: {
  //     title: "主页",
  //     icon: "navmenu"
  //   }
  // },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("@/views/view/Login"),
    meta: {
      title: "登录",
      icon: "navmenu"
    }
  },
  {
    path: "/register",
    name: "Register",
    hidden: true,
    component: () => import("@/views/view/Register"),
    meta: {
      title: "注册",
      icon: "navmenu"
    }
  },
  {
    path: "home",
    name: "ViewHomeindex",
    class_true: false,
    component: () => import("@/views/view/Home"),
    hidden: false,
    meta: {
      title: "主页",
      icon: "navmenu"
    }
  },
  {
    path: "insect",
    name: "Insect",
    class_true: false,
    component: () => import("@/views/view/Insect"),
    hidden: false,
    meta: {
      title: "虫情分析",
      icon: "navmenu"
    }
  },
  {
    path: "benefit",
    name: "Benefit",
    class_true: false,
    component: () => import("@/views/view/Benefit"),
    hidden: false,
    meta: {
      title: "效益分析",
      icon: "navmenu"
    },
    children: [
      {
        path: "benefit1",
        name: "Benefit1",
        class_true: false,
        component: () => import("@/views/view/Benefit/components/Benefit1"),
        hidden: false,
        meta: {
          title: "效益分析1",
          icon: "navmenu"
        }
      },
      {
        path: "benefit2",
        name: "Benefit2",
        class_true: false,
        component: () => import("@/views/view/Benefit/components/Benefit2"),
        hidden: false,
        meta: {
          title: "效益分析2",
          icon: "navmenu"
        }
      }
    ]
  },
  {
    path: "soil",
    name: "Soil",
    class_true: false,
    component: () => import("@/views/view/Soil"),
    hidden: false,
    meta: {
      title: "土壤分析",
      icon: "navmenu"
    }
  },
  {
    path: "plantSearch",
    name: "PlantSearch",
    class_true: false,
    component: () => import("@/views/view/PlantSearch"),
    hidden: false,
    meta: {
      title: "植物全息搜索",
      icon: "navmenu"
    }
  },
  {
    path: "/404",
    name: "page404",
    hidden: true,
    class_true: false,
    component: () => import("@/views/page404/index.vue")
  }
];
export default viewRouter;
