<template>
    <!-- 引入container布局 -->
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/cloud.png" class = "icon" alt="logo"/>
                <span>多租户云工作流管理平台(用户）</span>
            </div>
            <div class="userinfo">
                <el-avatar size="medium" :src="circleUrl"></el-avatar>
                <span>{{showUsername}}</span>
            </div>
            <el-button type="info" @click="logout">退出登录</el-button>
        </el-header>

        <!-- 主体 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" :router="true">
                    <!-- <el-menu-item :index="item.path"  :key="item.id">
                        <i :class="iconsObject[item.id]"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item> -->
                    <el-menu-item index="purchase">
                        <i class="el-icon-shopping-cart-1"></i>
                        <span slot="title">购买服务</span>
                    </el-menu-item>
                    <el-menu-item index="myprocess">
                        <i class="el-icon-shopping-bag-1"></i>
                        <span slot="title">我的流程</span>
                    </el-menu-item>
                    <el-menu-item index="newprocess">
                        <i class="el-icon-document-add"></i>
                        <span slot="title">新建流程</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <!-- 主体内容 -->
            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>
    </el-container>
</template>
<script>
import Cookie from 'js-cookie'
export default{
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        }
    },
    computed: {
        showUsername() {
            return Cookie.get('username');
        },
    },
    // onload 事件
    created() {
        
    },
    methods: {
        // 登出
        logout() {
            window.sessionStorage.clear(); // 清除session
            this.$router.push("/login");   // 回到首页
        },

    },
}
</script>
<style lang='less' scoped>
// 布局器样式
.home-container{
    height: 100%;
}

// 头部样式
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between; // 左右贴边
  padding-left: 0%; // 左边界
  color: #fff;
  font-size: 20px;
  align-items: center;
  >div{
      display: flex;
      align-items: center;
        span{
            margin-left: 15px;
        }
  }
}

// 侧边栏样式
.el-aside {
  background-color: #333744;
}

// 主体内容样式
.el-main {
  background-color: #eaedf1;
}

.icon{
    width: 55px;
    height: 55px;
    margin-left: 20px;
}

.userinfo{
    margin-left: 1300px;
}
</style>
