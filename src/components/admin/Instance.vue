<template>
    <div>
        <el-card>
            <el-table :data="instanceList.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe>
                <el-table-column label="流程实例名称" prop="name"></el-table-column>
                <el-table-column label="流程实例ID" prop="id"></el-table-column>
                <el-table-column label="流程定义ID" prop="processDefinitionId"></el-table-column>
                <el-table-column label="启动时间" prop="startDate"></el-table-column>
                <el-table-column label="版本号" prop="processDefinitionVersion"></el-table-column>
                <el-table-column label="实例状态" prop="status"></el-table-column>
                <!-- <el-table-column label="流程定义Key" prop="processDefinitionKey"></el-table-column> -->
                <el-table-column label="发起用户"></el-table-column>
                <el-table-column label="操作">
                    <!-- <template slot-scope="scope"> -->
                        <!-- 删除 -->
                        <!-- <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>
                        </el-tooltip>
                    </template> -->
                    <template slot-scope="scope">
                        <el-row>
                            <el-tooltip effect="dark" content="挂起" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-video-pause" @click="suspendInstance(scope.row)"></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="激活" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-video-play"></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-delete"></el-button>
                            </el-tooltip>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentNum"
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
            currentPage: 1,
            total: 20,
            pageSize: 10,
        }
    },
    methods: {
        async getInstances() {
            const {data:res} = await this.$http.get("processInstance/getInstances");
            this.instanceList = res.obj;
        },
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
    },
}
</script>
<style lang="less" scoped>

</style>