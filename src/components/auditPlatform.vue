<template>
  <div>
    <div class="content">
      <el-card>
        <div style="margin: 5px 0 20px 20px">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户名">
              <el-input v-model="formInline.username"></el-input>
            </el-form-item>
            <el-form-item label="产品线">
              <el-input v-model="formInline.productLine"></el-input>
            </el-form-item>
            <el-form-item label="行业">
              <el-input v-model="formInline.industry"></el-input>
            </el-form-item>
            <el-form-item label="任务创建时间">
              <el-date-picker
                v-model="formInline.taskTime"
                type="daterange"
                range-separator="～"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column prop="username" label="用户名" sortable>
            </el-table-column>
            <el-table-column prop="userId" label="用户ID" sortable>
            </el-table-column>
            <el-table-column prop="productLine" label="产品线" sortable>
            </el-table-column>
            <el-table-column prop="time" label="创建时间" sortable>
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="toIndustry(scope.row)">审核</el-button>
                  <el-button type="text" @click="industryDelete(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="footer">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        username: undefined,
        productLine: undefined,
        industry: undefined,
        taskTime: undefined,
      },
      tableData: [],
      total: 0,
      pageNum: 1,
      loading: false,
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    onSubmit() {
      this.pageNum = 1
      this.getTableList()
    },
    getTableList() {
      this.loading = true
      const params = {
        username: this.formInline.username,
        productLine: this.formInline.productLine,
        industry: this.formInline.industry,
        startTime: this.formInline.taskTime ? new Date(this.formInline.taskTime[0]).getTime() : undefined,
        endTime: this.formInline.taskTime ? new Date(this.formInline.taskTime[1]).getTime() : undefined,
        pageNum: this.pageNum,
        pageSize: 10
      }
      this.$http
        // .get("/table/list", { params })
        .get("/table/list")
        .then((res) => {
          console.log('res', res)
          if (res.code === 0) {
            this.tableData = res.data || [];
            this.total = res.count;
          }
        })
        .catch(() => {
          this.$message("数据请求失败，请重试");
        }).finally(() => {
          this.loading = false
        }) 
    },
    handleCurrentChange(page) {
      this.pageNum = page
      this.getTableList()
    },
    industryDelete(row) {
      const params = { usernameId: row.userId }
      this.$http.post('/industry/delete').then(() => {
        this.$message.success('删除数据成功')
        this.getTableList()
      }).catch(() => {
        this.$message.error('删除失败，请重试')
      })
    },
    toIndustry(row) {
      this.$router.push(`/audit/platform/${row.userId}`)
    }
  },
  
};
</script>

<style scoped>

.content {
  margin-top: 20px;
}
.footer {
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
