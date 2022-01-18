<template>
  <div>
    <el-card>
      <!-- 用户列表 -->
      <el-table :data="instanceList" border stripe height="750">
        <!-- 索引列 -->
        <el-table-column label="实例名称" prop="name"></el-table-column>
        <el-table-column label="id" prop="processDefinitionId"></el-table-column>
        <el-table-column label="流程定义id" prop="processDefinitionId"></el-table-column>
        <el-table-column label="流程定义版本" prop="processDefinitionVersion"></el-table-column>
        <el-table-column label="流程定义Key" prop="processDefinitionKey"></el-table-column>
        <el-table-column label="所属用户" prop="blank"></el-table-column>
        <el-table-column label="实例状态" prop="status"></el-table-column>
        <el-table-column label="创建时间" prop="startDate"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  created() {
    this.getInstances();
  },
  data(){
    return{
      instanceList:[], // 流程实例列表
    }
  },
  methods: {
    async getInstances() {
      const {data:res} = await this.$http.get("processInstance/getInstances");
      this.instanceList = res.obj;
    }
  }
}
</script>
<style lang="less" scoped>

</style>