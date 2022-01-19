<template>
    <div>
        <el-card class="card">
            <el-table :data="instanceList.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe>
                <el-table-column label="流程实例名称" prop="name"></el-table-column>
                <el-table-column label="流程实例ID" prop="id"></el-table-column>
                <el-table-column label="流程定义ID" prop="processDefinitionId"></el-table-column>
                <el-table-column label="启动时间" prop="startDate"></el-table-column>
                <el-table-column label="版本号" prop="processDefinitionVersion"></el-table-column>
                <el-table-column label="实例状态" prop="status"></el-table-column>
                <el-table-column label="发起用户">
                  <template slot-scope="scope">
                    <span>{{variableList[scope.$index]}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <el-tooltip effect="dark" content="挂起" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-video-pause" @click="suspendInstance(scope.row.id)"></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="激活" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-video-play" @click="resumeInstance(scope.row.id)"></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-delete" @click="deleteInstance(scope.row.id)"></el-button>
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
                :total="instanceList.length">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
    created() {
        this.getInstances();
    },
    data() {
        return {
            instanceList:[],
            variableList:[],
            currentPage: 1,
            total: 20,
            pageSize: 10,
        }
    },
    methods: {

        async getInstances() {
            const {data:res} = await this.$http.get("processInstance/getInstances");
            this.instanceList = res.obj;
            for(let i =0; i < this.instanceList.length;i++){
                const {data:res_v} = await this.$http.get("processInstance/variables?instanceID="+this.instanceList[i].id);
                if(res_v.obj.length != 0) {
                    this.variableList[i] = res_v.obj[0].value.username;
                } else {
                    this.variableList[i]= "未绑定用户";
                }
            }
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

</style>