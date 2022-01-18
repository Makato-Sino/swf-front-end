<template>
    <div>
        质量管理页
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>

</style>


<!--<template>-->
<!--  <div>-->
<!--    <el-card>-->
<!--      <el-table :data="tableData" border stripe>-->
<!--        <el-table-column label="工作流主键" prop="blank"></el-table-column>-->
<!--        <el-table-column label="sla主键" prop="blank"></el-table-column>-->
<!--        <el-table-column label="用户名" prop="a"></el-table-column>-->
<!--        <el-table-column label="流程定义主键" prop="b"></el-table-column>-->
<!--        <el-table-column label="流程实例id" prop="c"></el-table-column>-->
<!--        <el-table-column label="创建时间" prop="d"></el-table-column>-->
<!--        <el-table-column label="流程状态" prop="e"></el-table-column>-->

<!--        <el-table-column label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button size="mini" @click="">查看</el-button>-->
<!--            <el-button size="mini" type="danger" @click="">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->

<!--      &lt;!&ndash; 分页组件 &ndash;&gt;-->
<!--      <el-pagination-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :current-page="currentPage1"-->
<!--          :page-sizes="[1, 2, 5, 100]"-->
<!--          :page-size="1"-->
<!--          layout="total, sizes, prev, pager, next, jumper"-->
<!--          :total="7">-->
<!--      </el-pagination>-->

<!--    </el-card>-->
<!--  </div>-->



<!--</template>-->


<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      currentPage1: 1,-->
<!--      currentPage2: 2,-->
<!--      currentPage3: 3,-->
<!--      currentPage4: 4,-->

<!--      // 模拟数据-->
<!--      tableData: [{-->
<!--        a: 'test',-->
<!--        b: 'test',-->
<!--        c: 'test',-->
<!--        d: 'test',-->
<!--        e: 'test'-->
<!--      }, {-->
<!--        a: 'test',-->
<!--        b: 'test',-->
<!--        c: 'test',-->
<!--        d: 'test',-->
<!--        e: 'test'-->
<!--      }, {-->
<!--        a: 'test',-->
<!--        b: 'test',-->
<!--        c: 'test',-->
<!--        d: 'test',-->
<!--        e: 'test'-->
<!--      }, {-->
<!--        a: 'test',-->
<!--        b: 'test',-->
<!--        c: 'test',-->
<!--        d: 'test',-->
<!--        e: 'test'-->
<!--      }, {-->
<!--        a: 'test',-->
<!--        b: 'test',-->
<!--        c: 'test',-->
<!--        d: 'test',-->
<!--        e: 'test'-->
<!--      }, {-->
<!--        a: 'test',-->
<!--        b: 'test',-->
<!--        c: 'test',-->
<!--        d: 'test',-->
<!--        e: 'test'-->
<!--      }, {-->
<!--        a: 'test',-->
<!--        b: 'test',-->
<!--        c: 'test',-->
<!--        d: 'test',-->
<!--        e: 'test'-->
<!--      }]-->
<!--    }-->
<!--  },-->
<!--  methods:{-->
<!--    handleSizeChange(val) {-->
<!--      console.log(`每页 ${val} 条`);-->
<!--    },-->
<!--    handleCurrentChange(val) {-->
<!--      console.log(`当前页: ${val}`);-->
<!--    },-->

<!--  }-->
<!--}-->
<!--</script>-->
<!--<style lang="less" scoped>-->

<!--</style>-->
