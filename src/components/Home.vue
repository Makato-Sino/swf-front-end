<template>
    <!-- 引入container布局 -->
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/logo.png" class = "icon" alt="logo"/>
                <span>多租户云工作流管理平台</span>
            </div>
            <el-button type="info" @click="logout">退出登录</el-button>
        </el-header>

        <!-- 主体 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff">
                    <!-- 一级菜单 -->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>资源管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">实例管理</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">质量管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">租户管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <!-- 主体内容 -->
            <el-main>Main</el-main>

        </el-container>
    </el-container>
</template>
<script>
export default{
    data() {
        return {
            // 菜单列表
            menuList:[],
        }
    },
    // onload 事件
    created() {
        // 查询menuList
        this.getMenuList();
    },
    methods: {
        // 登出
        logout() {
            window.sessionStorage.clear(); // 清除session
            this.$router.push("/login");   // 回到首页
        },
        // 获取导航菜单
        getMenuList() {
            console.log("查询菜单");
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
}
</style>
