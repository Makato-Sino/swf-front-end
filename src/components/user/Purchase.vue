<template>
  <div>
    <el-upload
        ref="upload"
        action=""
        :http-request = httpRequest
        :auto-upload="true">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <!--        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
    </el-upload>


  </div>
</template>
<script>

export default {
  data() {
    return {
      // fileList: []
    };
  },
  methods: {
    async httpRequest (param) {
      const filelist = new FormData()
      filelist.append('processFile',param.file)
      const {data:res} = await this.$http.post("processDefinition/uploadStreamAndDeployment?processName=testUploadBPMN", filelist)
      console.log(param.file)
      if (res.msg == "success") {
        return this.$message.success('上传成功！')
      } else {
        return this.$message.error(res.msg)
      }
    }
  }
}
</script>
<style scoped>

</style>