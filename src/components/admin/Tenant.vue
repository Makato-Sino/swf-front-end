<template>
    <div>
        <el-card>
            <el-row :gutter="35">
                <el-col :span="10">
                    <!-- 搜索框 -->
                    <el-input placeholder="请输入搜索内容(支持模糊搜索)" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>

                <el-col :span="4">
                    <!-- 添加按钮 -->
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表 -->
            <el-table :data="userList" border stripe>
                <!-- 索引列 -->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="角色" prop="roles"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- 修改 -->
                        <!-- <el-tooltip effect="dark" content="修改" placement="top-start" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        </el-tooltip> -->
                        <!-- 删除 -->
                        <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
                :page-sizes="[1, 2, 5, 100]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>

        <!-- 新增用户 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="addForm.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">提 交</el-button>
            </span>
        </el-dialog>

        <!-- 修改用户信息 -->
        <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="editForm.address"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    created() {
        this.getUserList();
    },
    data() {
        return {
            // 查询信息实体
            queryInfo:{
                query:"", // 查询信息
                pageNum: 1, // 当前页
                pageSize: 5, // 每页条目数量
            },
            userList:[], // 用户列表
            total: 0, // 条目数量
            addDialogVisible: false, //对话框状态
            editDialogVisible: false, // 显示/隐藏修改用户框
            // 添加表单信息
            addForm: {
                name: '',
                address:'',
                username: '',
                password: '',
            },
            // 修改用户信息
            // editForm: {
            //     name: '',
            //     address: '',
            //     password:'',
            //     username:'',
            //     roles:"ROLE_ACTIVITI_USER",
            // },
            // 新增表单验证
            addFormRules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入联系地址', trigger: 'blur' },
                    { min: 1, max: 30, message: '请输入正确的联系地址', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ],
            },
            // 修改表单验证
            // editFormRules: {
            //     name: [
            //         { required: true, message: '请输入姓名', trigger: 'blur' },
            //         { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
            //     ],
            //     password: [
            //         { required: true, message: '请输入密码', trigger: 'blur' },
            //         { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
            //     ],
            //     address: [
            //         { required: true, message: '请输入联系地址', trigger: 'blur' },
            //         { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
            //     ],
            // },
        }
    },
    methods: {
        async getUserList() {
            const {data:res} = await this.$http.get("user/getUserList", {params:this.queryInfo});
            this.userList = res.obj.data;
            this.total = res.obj.numbers;
        },
        // 最大条目数量变化
        handleSizeChange(newSize) {
            this.queryInfo.pageSize = newSize;
            this.getUserList();
        },
        // pageNum变化
        handleCurrentChange(newPage) {
            this.queryInfo.pageNum = newPage;
            this.getUserList();
        },
        // 监听添加用户窗口
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
        },
        // 添加用户
        addUser() {
            this.$refs.addFormRef.validate(async valid=>{
                if (!valid) {
                    return;
                }
                const {data:res} = await this.$http.post("/user/addUser", this.addForm);
                if (res.msg != "success") {
                    return this.$message.error("添加用户失败！");
                }
                this.$message.success("添加用户成功！");
                this.addDialogVisible = false;
                this.getUserList();
            });
        },
        // 根据主键删除用户
        async deleteUser(id) {
            const confirmResult = await this.$confirm('此操作将永久删除该用户，是否继续？', '提示', {
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).catch(err => err)
            if (confirmResult != 'confirm') {
                return this.$message.info("取消删除！");
            }
            const {data:res} = await this.$http.delete("user/deleteUser?id=" + id);
            if (res.msg != "success") {
                return this.$message.error("删除失败！");
            }
            this.$message.success("删除成功！");
            this.getUserList();
        },
        // 显示/隐藏修改用户信息窗口
        async showEditDialog(id) {
            const {data:res} = await this.$http.get("user/getUserByID?id=" + id);
            this.editForm = res.obj;
            this.editDialogVisible = true;
            console.log(this.editForm);
        },
        // 关闭用户信息修改窗口
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        // 修改用户信息
        editUser() {
            this.$refs.editFormRef.validate(async valid =>{
                if (!valid) {
                    return;
                }
                // console.log(this.editForm);
                const {data:res} = await this.$http.put("user/editUser", this.editForm);
                if (res.msg != "success") {
                    return this.$message.error("修改用户信息失败！");
                }
                this.editDialogVisible = false;
                this.getUserList();
                return this.$message.success("修改用户信息成功！");
            })
        },
    },
}
</script>
<style lang="less" scoped>

</style>
