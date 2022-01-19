<template>
  <div>
    <!-- 购买服务按钮 -->
    <el-button type="primary" @click="editDialogVisible = true">购买服务</el-button>

    <!-- 购买服务表单 -->
    <el-dialog title="购买服务" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form label-width="70px">
        <el-form-item label="流程名称" prop="processName">
            <el-input v-model="processName"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          :http-request = submitUpload
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :name="fileName"
          :limit="1"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">部署流程</el-button>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
          <div slot="tip" class="el-upload__tip">只能上传bpmn/zip文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <!-- <el-button type="primary" @click="addUser">确 认</el-button> -->
      </span>
    </el-dialog>

  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      processName: "",
      fileName: "processName",
      fileList: [],
      editDialogVisible: false,
      username: Cookie.get('username'),
    };
  },
  methods: {
    async submitUpload(param) { 
      const filelist = new FormData()
      filelist.append('processFile',param.file)
      console.log(param.file)
      const {data:res} = await this.$http.post("processDefinition/uploadStreamAndDeployment?processName=" + this.processName + "&username=" + this.username, filelist);
      if (res.msg != "success") {
        return this.$message.error("部署流程定义失败！");
      }
      this.editDialogVisible = false;
      return this.$message.success("部署流程定义成功！");
    },
    handleRemove(file, fileList) { console.log(file, fileList); },
    handlePreview(file) { console.log(file); },
    showEditDialog() { this.editDialogVisible = true; },
    editDialogClosed() { this.editDialogVisible = false;},
  }
}
</script>
<style scoped>

</style>