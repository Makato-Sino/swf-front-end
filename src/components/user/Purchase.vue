<template>
    <div>
        <el-card>
            <el-table :data="serviceList" border stripe>
                <el-table-column label="流程定义名称" prop="name"></el-table-column>
                <el-table-column label="流程定义ID" prop="processDefinitionId"></el-table-column>
                <el-table-column label="版本号" prop="processDefinitionVersion"></el-table-column>
                <el-table-column label="流程购买状态" prop="state"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <el-tooltip effect="dark" content="查看" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-video-info" @click="checkService(scope.row.id)"></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="购买" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-video-goods" @click="buyService(scope.row.id)"></el-button>
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
                :current-page=1
                :page-sizes="[1, 5, 10, 20]"
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
            total: 20,
            pageSize: 10,
        }
    },
    methods: {
        async getServices() {
            
        },
        // 最大条目数量变化
        handleSizeChange(newSize) {
            // this.queryInfo.pageSize = newSize;
            // this.getUserList();
        },
        // pageNum变化
        handleCurrentChange(newPage) {
            // this.queryInfo.pageNum = newPage;
            // this.getUserList();
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

</style>