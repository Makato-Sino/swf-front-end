<template>
    <div>
        <div id="title">我的实例</div>
        <el-card>
            <el-table :data="tenantInstanceList.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe>
                <el-table-column label="流程实例ID" prop="processInstanceID"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <el-tooltip effect="dark" content="挂起" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-video-pause" @click="suspendInstance(scope.row.processInstanceID)"></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="激活" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-video-play" @click="resumeInstance(scope.row.processInstanceID)"></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-delete" @click="deleteInstance(scope.row.processInstanceID)"></el-button>
                            </el-tooltip>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
    
            <!-- 分页组件 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=1
                :page-sizes="[1, 5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tenantInstanceList.length">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import Cookie from "js-cookie";

export default {
    created() {
        this.getUserInstancesByUserID();
    },
    data() {
        return {
        username:Cookie.get('username'),
        tenantInstanceList:[],
        currentPage: 1,
        total: 20,
        pageSize: 10,
        }
    },
    methods: {
        async getUserInstancesByUserID(){
            const {data:res} = await this.$http.get("processInstance/getUserInstancesByUserID?USER_ID_="+this.username);
            this.tenantInstanceList = res.obj;
        },
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        async suspendInstance(id) {
            const {data:res} = await this.$http.get("processInstance/suspendInstance?instanceID=" + id);
            if (res.status != "0") {
                return this.$message.error("挂起流程实例失败！");
            }
            this.$message.success("挂起流程实例成功！");
            this.getInstances();
        },
        async resumeInstance(id) {
            const {data:res} = await this.$http.get("processInstance/resumeInstance?instanceID=" + id);
            if (res.status != "0") {
                return this.$message.error("激活流程实例失败！");
            }
            this.$message.success("激活流程实例成功！");
            this.getInstances();
        },
        async deleteInstance(id) {
            const confirmResult = await this.$confirm('确认删除该流程？', '提示', {
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).catch(err => err)
            if (confirmResult != 'confirm') {
                return this.$message.info("取消删除！");
            }
            const {data:res} = await this.$http.get("processInstance/deleteInstance?instanceID=" + id);
            if (res.status != "0") {
                return this.$message.error("删除流程实例失败！");
            }
            this.$message.success("删除流程实例成功！");
            this.getInstances();
        },
    },

}
</script>
<style lang="less" scoped>
#title{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  text-align: center;
  font-size: 2em;
  margin-bottom: 0.5em;
}
</style>