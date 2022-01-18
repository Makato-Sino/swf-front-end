<template>
    <!-- 引入container布局 -->
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../../assets/logo.png" class = "icon" alt="logo"/>
                <span>多租户云工作流管理平台</span>
            </div>
            <el-button type="info" @click="logout">退出登录</el-button>
        </el-header>

        <!-- 主体 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" :router="true">
                    <el-menu-item :index="item.path" v-for="item in menuList" :key="item.id">
                        <i :class="iconsObject[item.id]"></i>
                        <span slot="title">{{item.title}}</span>
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
export default{
    data() {
        return {
            // 菜单列表
            menuList:[],
            // 导航栏按钮icon
            iconsObject: {
                '1':'el-icon-s-home',
                '2':'el-icon-coin',
                '3':'el-icon-set-up',
                '4':'el-icon-s-data',
                '5':'el-icon-user',
            },
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
        async getMenuList() {
            const {data:res} = await this.$http.get("tenant_menus");
            // console.log(res);
            if (res.flag !== 200) return this.$message.error("获取菜单失败！"); // 访问失败
            this.menuList = res.menus; // 访问成功 数据回填
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
