<template>
    <div>
        <div id="title">购买服务</div>
        <el-card>
            <el-table :data="serviceList.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe>
                <el-table-column label="流程定义名称" prop="name"></el-table-column>
                <el-table-column label="流程定义ID" prop="processDefinitionId"></el-table-column>
                <el-table-column label="版本号" prop="processDefinitionVersion"></el-table-column>
                <el-table-column label="流程购买状态" prop="state"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <el-tooltip effect="dark" content="查看" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-info" @click="checkService(scope.row.id)"></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="购买" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-goods" @click="buyService(scope.row.id)"></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-delete" @click="deleteService(scope.row.id)"></el-button>
                            </el-tooltip>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="serviceList.length">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
    created() {
        this.getServices();
    },
    data() {
        return {
            serviceList: [],
            currentPage: 1,
            total: 0,
            pageSize: 1,
        }
    },
    methods: {
        async getServices() {
            this.serviceList = [
            {
                name: 1,
                processDefinitionId: 1,
                processDefinitionVersion: 1,
                state: 1,
            },
            {
                name: 2,
                processDefinitionId: 2,
                processDefinitionVersion: 2,
                state: 2,
            },
            {
                name: 3,
                processDefinitionId: 3,
                processDefinitionVersion: 3,
                state: 3,
            },
            {
                name: 4,
                processDefinitionId: 4,
                processDefinitionVersion: 4,
                state: 4,
            },
            {
                name: 5,
                processDefinitionId: 5,
                processDefinitionVersion: 5,
                state: 5,
            },
            ];
        },
        // 最大条目数量变化
        handleSizeChange(newSize) {
            this.currentPage = 1;
            this.pageSize = newSize;
        },
        // pageNum变化
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
        },
        // 查看服务信息
        checkService(id) {

        },
        // 购买服务
        async buyService(id) {

        },
        // 删除服务
        async deleteService(id) {

        },
    },
}
</script>
<style scoped>
#title{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  text-align: center;
  font-size: 2em;
  margin-bottom: 0.5em;
}
</style>