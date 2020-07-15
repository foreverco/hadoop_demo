<template>
  <!-- 头部整体盒子 -->
  <div id="header" class="container-fuild" :class="tabNav ? 'navscroll' : ''">
    <!-- 电脑导航 -->
    <div class="header-nav container hidden-xs">
      <!-- 导航内容 -->
      <div class="navCon row">
        <div id="navshowLogo">
          <!-- <img src="@/assets/img/home/1-head-logo.png" alt /> -->
        </div>
        <ul class="header-nav-wrapper">
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="index == navIndex ? 'active' : ''"
            @click="navClick1(index, item.name, item)"
          >
            <router-link :to="item.path">
              <span class="navTxt">{{ item.name }}</span>
              <div id="line"></div>
            </router-link>
            <dl v-if="item.children && item.children.length > 0">
              <dt v-for="(i, n) in item.children" :key="n">
                <router-link :to="i.path">{{ i.name }}</router-link>
              </dt>
            </dl>
          </li>
        </ul>
        <!-- <ul class="loginBox">
          <li>
            <span class="glyphicon glyphicon-user"></span>
          </li>
          <li>登录</li>
          <li>/</li>
          <li>注册</li>
        </ul> -->
      </div>
    </div>

    <!-- 手机导航 -->
    <div class="header-nav-m container-fuild visible-xs">
      <!-- <div class="header-nav-m-logo">
        <img src="@/assets/img/logo.png" alt="logo" />
        <span class="logotxt">国草园集团</span>
      </div> -->
      <!-- 导航栏 -->
      <div class="header-nav-m-menu text-center">
        <!-- {{ menuName }}
        <span v-if="sonName" style="font-size:13px;">- {{ sonName }}</span> -->
        <div
          class="userMsg"
          @click.stop="getuserMsg"
          v-if="$route.path != '/login'"
        >
          <!-- <span>未登录</span> -->
          <i :class="userMsgActive ? 'el-icon-user-solid' : 'el-icon-user'"></i>
        </div>
        <ul
          class="userList"
          :class="{ open: userMsgActive }"
          @click="userMsgActive = false"
        >
          <li
            :class="{ listShowClass: userMsgActive }"
            style="animation-delay:0.5s;"
          >
            <span>我的订单</span>
          </li>
          <li
            :class="{ listShowClass: userMsgActive }"
            style="animation-delay:0.6s;"
          >
            <span>我的卡券</span>
          </li>
          <li
            :class="{ listShowClass: userMsgActive }"
            style="animation-delay:0.7s;"
          >
            <span>我的积分</span>
          </li>
          <li
            :class="{ listShowClass: userMsgActive }"
            style="animation-delay:0.8s;"
          >
            <span>我的积分</span>
          </li>
          <li
            :class="{ listShowClass: userMsgActive }"
            style="animation-delay:0.9s;"
            @click="getlogin"
          >
            <span>{{ isLogin || "请登录" }}</span>
          </li>
          <li
            :class="{ listShowClass: userMsgActive }"
            style="animation-delay:1s;"
            v-show="isLogin"
          >
            <el-button type="danger">退出</el-button>
          </li>
        </ul>
        <div class="titlelogoBox">
          <i class="el-icon-s-data"></i>
          <span>{{ $route.meta.title || 404 }}</span>
        </div>

        <div
          class="header-nav-m-menu-wrapper"
          data-toggle="collapse"
          data-target="#menu"
          @click="menuClick"
        >
          <div class="burger" :class="burgerActive ? 'burgerActive' : ''">
            <div class="top_line"></div>
            <div class="mid_line"></div>
            <div class="bot_line"></div>
          </div>
        </div>
        <!-- 导航内容 -->
        <ul id="menu" class="header-nav-m-wrapper collapse">
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="index == navIndex ? 'active' : ''"
            data-toggle="collapse"
            aria-expanded="false"
            :data-target="item.children.length > 0 ? targetId : '#menu'"
            @click="navClick(index, item.name, item)"
          >
            <router-link :to="item.children.length == '0' ? item.path : ''">
              {{ item.name }}
              <span
                v-if="item.children && item.children.length > 0"
                :class="item.menuClass"
              ></span>
              <!-- <span :class="menuClass"></span> -->
            </router-link>
            <ul
              :class="'navClass' + index"
              v-if="item.children && item.children.length > 0"
              class="header-nav-m-wrapper1 collapse"
            >
              <li
                v-for="(i, n) in item.children"
                :key="n"
                @click="getsonName(i.name)"
                data-toggle="collapse"
                data-target="#menu"
              >
                <router-link :to="i.path">{{ i.name }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      /* 滚动监听导航条 */
      tabNav: false,
      burgerActive: false,
      userMsgActive: false,
      isLogin: "",
      targetId: "333",
      navIndex: sessionStorage.getItem("navIndex")
        ? sessionStorage.getItem("navIndex")
        : 0,
      menuName: "首页",
      sonName: "",
      menuClass: "el-icon-arrow-down",
      navList: [
        {
          name: "首页",
          name1: "SHOWYE",
          path: "/",
          children: []
        },
        {
          name: "企业文化",
          name1: "QIYEWENHUA",
          path: "/software/aboutUs",
          menuClass: "el-icon-arrow-down",
          // path: "/software",
          children: [
            {
              name: "企业简介",
              path: "/software/aboutUs"
            },
            // {
            //   name: "荣誉历程",
            //   path: "/software/rongyu"
            // },
            {
              name: "组织架构",
              path: "/software/jiagou"
            },
            {
              name: "企业风采",
              path: "/software/fengcai"
            }
          ]
        },
        {
          name: "产品中心",
          name1: "CPZHONGXIN",
          path: "/product/productpack",
          menuClass: "el-icon-arrow-down",
          // path: "/service",
          children: [
            // {
            //   name: "原料展示",
            //   path: "/product/bigData"
            // },
            {
              name: "养生茶",
              path: "/product/productpack"
            },
            {
              name: "道地药材",
              path: "/product/productpack1"
            },
            {
              name: "药食同源",
              path: "/product/productpack2"
            }
            // {
            //   name: "种植实力",
            //   path: "/product/stockshow"
            // }
            // {
            //   name: "防伪查询",
            //   path: "/software/bigData"
            // }
          ]
        },
        {
          name: "产业规划",
          name1: "XWZHONGXIN",
          path: "/base/plantingbase",
          menuClass: "el-icon-arrow-down",
          // path: "/newsinformation",
          children: [
            {
              name: "种植基地",
              path: "/base/plantingbase"
            },
            {
              name: "智慧农业",
              path: "/base/inteligentAg"
            },
            {
              name: "康养小镇",
              path: "/base/kytown"
            },
            {
              name: "加工产业园",
              path: "/base/park"
            }
          ]
        },
        {
          name: "新闻中心",
          name1: "XWZHONGXIN",
          path: "/news/companynews",
          menuClass: "el-icon-arrow-down",
          // path: "/newsinformation",
          children: [
            {
              name: "企业新闻",
              path: "/news/companynews"
            },
            {
              name: "视频展示",
              path: "/news/videonews"
            }
            // {
            //   name: "重要公告",
            //   path: "/software/bigData"
            // },
            // {
            //   name: "行业动态",
            //   path: "/software/smartTown"
            // },
            // {
            //   name: "专题报道",
            //   path: "/software/bigData"
            // },
            //  {
            //   name: "视频展示",
            //   path: "/software/bigData"
            // }
          ]
        },
        // {
        //   name: "公司介绍",
        //   path: "/companyintroduction",
        //   children: []
        // },
        // {
        //   name: "工作机会",
        //   path: "/jobchance",
        //   children: []
        // },
        {
          name: "联系我们",
          name1: "LIANXIWOMEN",
          path: "/contactus",
          children: [
            // {
            //   name: "人力资源",
            //   path: "/software/bigData"
            // },
            //  {
            //   name: "联系我们",
            //   path: "/contactus"
            // }
          ]
        }
      ]
    };
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route(to, from) {
      if (to.meta.navIndex) {
        this.navIndex = to.meta.navIndex;
      }
      console.log("我变了");
      console.log(from);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    console.log(this.$route.path);
  },
  methods: {
    navClick(index, name, e) {
      console.log(e);
      this.navIndex = index;
      sessionStorage.setItem("navIndex", index);
      this.sonName = "";
      this.menuName = name;
      this.targetId = ".navClass" + index;
      if (e.menuClass == "el-icon-arrow-down") {
        e.menuClass = "el-icon-arrow-up";
      } else {
        e.menuClass = "el-icon-arrow-down";
      }
      if (e.children && e.children.length == "0") {
        this.burgerActive = !this.burgerActive;
      }
    },
    navClick1(index, name, e) {
      this.navIndex = index;
      sessionStorage.setItem("navIndex", index);
      this.sonName = "";
      this.menuName = name;
      this.targetId = ".navClass" + index;
    },
    menuClick() {
      console.log(123);
      this.burgerActive = !this.burgerActive;
      this.userMsgActive = false;
    },
    getuserMsg() {
      console.log(456);
      this.userMsgActive = !this.userMsgActive;
    },
    getsonName(name) {
      this.sonName = name;
      this.burgerActive = !this.burgerActive;
      console.log(this.sonName);
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 400) {
        this.tabNav = true;
        console.log(1111);
      } else if (scrollTop < 400) {
        this.tabNav = false;
        console.log(222);
      }
    },
    getlogin() {
      console.log(this.isLogin);
      if (!this.isLogin) {
        console.log(this.$route);
        this.$router.replace({ name: "Login" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.navscroll {
  // opacity: 0.3;
  background: #ffffff !important;
  position: fixed;
}
/* 顶部 */
#header {
  transition: all ease 0.6s;
  width: 100%;
  // border-bottom: 1px solid $mainColor;
  background: #ffffff;
  z-index: 102;
  // background: url("../assets/img/dingbu.png") no-repeat;
  // background-size: auto;
  // background-position: bottom;
  .header-nav {
    .navCon {
      // border: 1px solid red;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      #navshowLogo {
        height: 60%;
        img {
          height: 100%;
        }
      }
      .header-nav-wrapper {
        height: 100%;
        margin: 0;
        li {
          float: left;
          // border: 1px solid blue;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          width: 105px;
          margin-left: 10px;
          margin-right: 10px;
          &.active {
            background: #24585210;
            #line {
              width: 100%;
            }
          }
          &:hover {
            // background: #81b25b20;
            cursor: pointer;
            > a {
              color: $maincolor;
              span {
                transform: translateY(-5px);
              }
            }
            dl {
              display: block;
            }
            #line {
              width: 100%;
            }
          }
          > a {
            color: $maincolor;
            display: inline-block;
            height: 50px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            height: 100%;
            span {
              color: $maincolor;
              transition: all 0.2s linear;
            }
            #line {
              width: 0px;
              height: 2px;
              border-radius: 2px;
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              background-color: $maincolor;
              margin: 0 auto;
              transition: all 0.6s ease;
            }
            &:hover {
              text-decoration: none;
            }
            .navTxt {
              display: inline-block;
              width: 100%;
              font-size: 22px;
              text-align: center;
            }
          }
          dl {
            display: none;
            position: absolute;
            width: 105px;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 103;
            // box-shadow: 0 0 3px 1px #ccc;
            background: #fff;
            padding: 0 20px;
            box-sizing: content-box;
            // border-top: 1px solid red;

            dt {
              width: 100%;
              /* padding: 10px; */
              color: #fff;
              height: 100%;
              width: 100%;
              text-align: center;
              transition: all 0.2s linear;
              &:hover {
                transform: translateX(5px);
                a {
                  color: #24585290;
                }
              }
              a {
                color: $maincolor;
                border-bottom: 1px solid #fff;
                font-size: 14px;
                text-align: center;
                text-decoration: none;
                height: 100%;
                width: 90%;
                display: inline-block;
                padding: 10px;
                transition: all 0.2s linear;
              }
            }
          }
        }
      }
      .loginBox {
        li {
          float: left;
          font-size: 18px;
          span {
            font-size: 16px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}

@keyframes hideIndex {
  0% {
    opacity: 0;
    width: 0px;
    // transform: translate(800px, 0);
    // transform: translateX(-50%) scale(0);
  }
  100% {
    opacity: 1;
    width: 100px;
    // transform: translate(0, 0);
    // transform: translateX(-50%) scale(1.2);
  }
}

@keyframes listShow {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@media screen and (max-width: 997px) {
  #header .header-nav-m {
    position: relative;
  }
  /* 导航栏logo容器 */
  #header .header-nav-m .header-nav-m-logo {
    height: 80px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 95px;
      height: 95px;
    }
    .logotxt {
      font-size: 25px;
      font-weight: bold;
    }
  }
  /* 导航栏logo图片 */

  /* 导航栏  菜单容器 */
  #header .header-nav-m .header-nav-m-menu {
    color: #fff;
    height: 80px;
    line-height: 80px;
    background: #474747;
    position: relative;
    // border: 1px solid red;

    .titlelogoBox {
      // border: 1px solid blue;
      width: 50%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      // background: blue;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 30px;
        // border: 1px solid red;
      }
      i {
        font-size: 40px;
        // border: 1px solid red;
        height: 100%;
        margin-right: 20px;
      }
    }
    .userMsg {
      position: absolute;
      left: 0px;
      // background: red;
      z-index: 105;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 10%;
      &:hover {
        cursor: pointer;
      }
      i {
        font-size: 40px;
        transition: 0.4s ease-in-out;
      }
    }
    .userList {
      // border: 1px solid red;
      position: absolute;
      z-index: 105;
      background: $navColor;
      top: 80px;
      height: calc(100vh - 80px);
      // height: 100vh;
      width: 50%;
      transform: translateX(-100%);
      transition: 0.4s ease-in-out;
      li {
        // border-bottom: 1px dashed #ffffff20;
        transition: 0.4s ease-in-out;
        transform: translateX(-50px);
        opacity: 0;
        &:last-child {
          // border: 1px solid red;
          position: absolute;
          bottom: 30px;
          width: 100%;

          .el-button {
            width: 80%;
            margin: 0 auto;

            height: 100%;
          }
        }
        span {
          font-size: 18px;
          display: inline-block;
          border-bottom: 1px solid #ffffff20;
          width: 80%;
          &:last-child {
            border-bottom: 0;
          }
        }
        &.listShowClass {
          animation: listShow 0.4s ease-in-out forwards 0.4s;
        }
      }
      &.open {
        transform: translateX(0);
      }
    }

    .header-nav-m-menu-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      // margin-top: -20px;
      width: 100%;
      height: 100%;
      color: #fff;
      z-index: 104;
      text-align: right;
      padding-right: 20px;
      font-size: 12px;
      .burger {
        // border: 1px solid red;
        height: 40px;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 35px;
        &:hover {
          cursor: pointer;
        }
        > div {
          height: 3px;
          width: 100%;
          background: #dadbdd;
          // margin: 4px;
        }
        &.burgerActive {
          > div {
            transition: 0.3s ease-in-out;
            &.top_line {
              transform: rotate(45deg) translate(9px, 10px);
            }
            &.bot_line {
              transform: rotate(-45deg) translate(9px, -10px);
            }
            &.mid_line {
              transform: translateX(20px);
              opacity: 0;
            }
          }
        }
      }
    }
  }
  /* 导航栏 菜单图标 */
  /* 导航栏 */
  #header .header-nav-m .header-nav-m-wrapper {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background: #474747;
    z-index: 104;
  }
  /* 导航栏 每个导航 */
  #header .header-nav-m .header-nav-m-wrapper > li {
    /* height: 40px; */
    line-height: 80px;
    border-bottom: 1px solid #ccc;
  }
  /* 导航栏 每个导航下面的 a 链接 */
  #header .header-nav-m .header-nav-m-wrapper > li > a {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 15px 0;
    position: relative;
  }
  /* 导航栏 每个导航下面的 a 链接的右侧小三角 */
  #header .header-nav .header-nav-wrapper > li > a > span {
    font-size: 10px;
  }
}
.header-nav-m-wrapper1 {
  background: #555;
}
/* 导航栏 每个导航 */
#header .header-nav-m .header-nav-m-wrapper1 > li {
  /* height: 40px; */
  line-height: 80px;
  border-bottom: 1px solid #ccc;
}
#header .header-nav-m .header-nav-m-wrapper1 > li > a {
  color: #fff;
  font-size: 14px;
  display: inline-block;
  font-weight: bold;
  width: 100%;
  position: relative;
}
.loginBox {
  /* border:1px solid red; */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 768px) {
  #header .header-nav-m .header-nav-m-wrapper > li > a[data-v-61dd7a3d] {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 0;
    position: relative;
    width: 100%;
    display: inline-block;
  }
}
</style>
