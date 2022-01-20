<template>
    <div>
        <el-card class="card">
            <el-table :data="deploymentList.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe>
                <el-table-column label="流程部署ID" prop="DeploymentID"></el-table-column>
                <el-table-column label="租户" prop="Tenant"></el-table-column>
                <el-table-column label="版本" prop="Version"></el-table-column>
                <el-table-column label="流程定义主键" prop="Key"></el-table-column>
                <el-table-column label="流程名称" prop="Name"></el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=1
                :page-sizes="[1, 5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="deploymentList.length">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
created() {
        this.getDeployments();
    },
    data() {
        return {
            deploymentList:[],
            currentPage: 1,
            total: 20,
            pageSize: 10,
        }
    },
    methods: {

        async getDeployments() {
            const {data:res} = await this.$http.get("/processDefinition/getAllTenantProcessDef");
            this.deploymentList = res.obj;
        },
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
    }
}
</script>
<style lang="less" scoped>

</style>
