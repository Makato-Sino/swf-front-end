<template>
  <div>
    <div id="title">我的流程</div>
    <el-card>
      <el-table :data="tenantProcessDefList.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe>
        <el-table-column label="流程定义ID" prop="DeploymentID"></el-table-column>
        <el-table-column label="版本号" prop="Version"></el-table-column>
        <el-table-column label="流程定义主键" prop="Key"></el-table-column>
        <el-table-column label="流程实例名称" prop="Name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-row>
<!--              <el-tooltip effect="dark" content="挂起" placement="top-start" :enterable="false">-->
<!--                <el-button type="primary" icon="el-icon-video-pause" @click="suspendInstance(scope.row.id)"></el-button>-->
<!--              </el-tooltip>-->
<!--              <el-tooltip effect="dark" content="激活" placement="top-start" :enterable="false">-->
<!--                <el-button type="primary" icon="el-icon-video-play" @click="resumeInstance(scope.row.id)"></el-button>-->
<!--              </el-tooltip>-->
              <el-tooltip effect="dark" content="启动实例" placement="top-start" :enterable="false">
                <el-button type="primary" icon="el-icon-plus" @click="startFormParam(scope.row.Key)"></el-button>
              </el-tooltip>

              <el-tooltip effect="dark" content="删除流程部署" placement="top-start" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" @click="deleteDeployment(scope.row.DeploymentID)"></el-button>
              </el-tooltip>
            </el-row>
          </template>
        </el-table-column>
      </el-table>


      <!-- 启动流程实例 -->
      <el-dialog title="启动流程实例" :visible.sync="startProcessDialogVisible" width="50%" @close="startProcessDialogClosed">
        <el-form :model="startForm" :rules="startFormRules" ref="startProcessRef" label-width="110px">
          <el-form-item label="流程实例名称" prop="instanceName">
            <el-input v-model="startForm.instanceName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="startProcessDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="startProcess">提 交</el-button>
      </span>
      </el-dialog>

      <!-- 分页组件 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page=1
          :page-sizes="[1, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tenantProcessDefList.length">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import Cookie from "js-cookie";

export default {
  created() {
    this.getAllTenantProcessDef();
  },
  data() {
    return {
      username:Cookie.get('username'),
      startProcessDialogVisible : false,//对话框状态
      startForm:{
        processDefinitionKey:'',//流程定义主键processDefinitionKey
        instanceName:'',//自定义流程实例名称
      },
      //启动实例表单验证
      startFormRules:{
        instanceName: [
          { required: true, message: '请输入流程实例名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
      },
      tenantProcessDefList:[],
      currentPage: 1,
      total: 20,
      pageSize: 10,
    }
  },
  methods: {
    async getAllTenantProcessDef(){
      // const {data:res} = await this.$http.get("getDefinitionByTenantID?TENANT_ID_="+this.username);
      const {data:res} = await this.$http.get("processDefinition/getDefinitionByTenantID?TENANT_ID_="+this.username);
      this.tenantProcessDefList=res.obj
    },
    // 根据流程定义id删除流程部署
    async deleteDeployment(DeploymentID) {
      const confirmResult = await this.$confirm('此操作将永久删除该流程部署，是否继续？', '提示', {
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).catch(err => err)
      if (confirmResult != 'confirm') {
        return this.$message.info("取消删除！");
      }
      const {data:res} = await this.$http.get("processDefinition/delDefinition?pdID=" + DeploymentID);
      if (res.msg != "success") {
        return this.$message.error("删除失败！");
      }
      this.$message.success("删除成功！");
      this.getAllTenantProcessDef();
    },

    //打开流程实例窗口
    async startFormParam(Key){
      this.startProcessDialogVisible = true
      this.startForm.processDefinitionKey = Key
    },
    //关闭启动流程实例窗口
    startProcessDialogClosed(){
      this.$refs.startProcessRef.resetFields();
    },
    //启动流程实例
    startProcess(){
      this.$refs.startProcessRef.validate(async valid=>{
        if (!valid) {
          return;
        }
        const {data:res} = await this.$http.get("processInstance/startProcess?processDefinitionKey="+this.startForm.processDefinitionKey+"&instanceName="+this.startForm.instanceName);
        if (res.status != "0") {
          return this.$message.error("启动流程实例失败！");
        }
        this.$message.success("启动流程实例成功！");
        this.startProcessDialogVisible = false;
      });
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
#title{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  text-align: center;
  font-size: 2em;
  margin-bottom: 0.5em;
}
</style>