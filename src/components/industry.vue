<template>
  <div>
    <div style="margin-top: 20px">
      <el-card>
        <div class="list-head" v-for="(card, index) of detailInfo" :key="index">
          <div class="list-contains" style="backgroundcolor: #fafafa">
            <span>
              {{ card.label || "-" }}
            </span>
          </div>
          <div class="list-contains">
            <span class="text-secondary">{{ card.value }}</span>
          </div>
        </div>
        <div class="button-opeation">
          <el-button type="success" @click="chooseChange('approve')">通过所选</el-button>
          <el-button type="danger" @click="chooseChange('reject')">拒绝所选</el-button>
          <el-button type="danger" @click="rejectAccount">拒绝账户</el-button>
          <el-button ype="primary" @click="awatiChoose">搁置</el-button>
          <el-button type="info" @click="nextTask">下一个任务</el-button>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            style="width: 100%"
            border
            v-loading="loading"
            :data="tableData"
            :span-method="objectSpanMethod"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
          <el-table-column
            type="selection"
            width="55" />
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="desc" label="描述"></el-table-column>
            <el-table-column prop="imgs" label="图片">
              <template slot-scope="scope"> 
                <div class="content-img">
                  <img :src="scope.row.imgs" alt="">
                  <img :src="scope.row.imgs" alt="">
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="opeation" label="操作">
              <template slot-scope="scope"> 
                <div>
                  <el-button type="text" @click="changeItem(scope.row, 'approve')">通过</el-button>
                  <el-button type="text" @click="changeItem(scope.row, 'reject')">拒绝</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="page" label="落地页">
              <template slot-scope="scope"> 
                <div class="warp">
                  <div class="page-content">
                    <el-button type="text" style="white-space: normal; text-align: left;">{{scope.row.pageUrl}}</el-button>
                    <img :src="scope.row.page" alt="">
                  </div>
                  <div class="page-content-opeation">
                    <el-button type="text">通过</el-button>
                    <el-button type="text">拒绝</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "industry",
  mounted() {
    this.getDetailList()
    this.getTableList()
  },
  data() {
    return {
      detailInfo: [
        {
          key: "username",
          label: "用户名",
          value: undefined,
        },
        {
          key: "userId",
          label: "用户id",
          value: undefined,
        },
        {
          key: "companyUrl",
          label: "公司网站",
          value: undefined,
        },
        {
          key: "power",
          label: "资质",
          value: undefined,
        },
        {
          key: "oneIndustry",
          label: "一级行业",
          value: undefined,
        },
        {
          key: "twoIndustry",
          label: "二级行业",
          value: undefined,
        },
        {
          key: "userType",
          label: "用户类型",
          value: undefined,
        },
        {
          key: "Annotations",
          label: "批注",
          value: undefined,
        },
      ],
      tableData: [],
      multipleSelection: [],
      loading: false
    };
  },
  methods: {
    getDetailList() {
      this.$http.get('/detail/list').then(res => {
        this.detailInfo.map(item => {
            item.value = res.data[`${item.key}`] || '-'
          })
      }).catch(() => {
        this.$message.error('数据请求失败，请重试')
      })
    },
    getTableList() {
      this.loading = true
      this.$http.get('/get/table/list').then(res => {
        this.tableData = res.data || []
      }).catch(() => {
        this.$message.error('数据请求失败，请重试')
      }).finally(() => {
        this.loading = false
      })
    },
    objectSpanMethod({rowIndex, columnIndex}) {
      if (columnIndex === 5) {
          if (rowIndex % 4 === 0) {
            return {
              rowspan: 4,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    chooseChange(type) {
      if(!this.multipleSelection.length) return this.$message.info("请至少选择一项")
      const url = (type == "approve") ? '/approve/choose' : '/reject/choose'
      const status = (type == "approve") ? '通过' : '拒绝'
      const userId = this.multipleSelection.map(item => { // 获取唯一标识传递给后端
        return item.userId 
      }) 
      const parasm = { userId }
      // this.$http.post('/approve/choose', {parasm}).then(() => {  此处真实接口直接解开注释
      this.$http.post(url).then((res) => {
        if(res.code === 0) {
          this.multipleSelection = []
          this.$refs.multipleTable.clearSelection()
          this.getTableList()
          this.$message.success(`${status}选择成功`)
        } else {
          this.$message.error(`${status}失败，请联系管理员`)
        }
      }).catch(() => {
        this.$message.error(`${status}失败，请联系管理员`)
      })
    },
    changeItem(row, type) {
      this.multipleSelection.push(row)
      this.chooseChange(type)
    },
    rejectAccount() {
      const id = this.detailInfo.filter(item => {
        return item.key == 'userId'
      })[0].value
      // this.$http.post('/reject/account', { id }).then(res => {
      this.$http.post('/reject/account').then(res => {
        if(res.code === 0) {
          this.$message.success('账户拒绝成功')
          this.getDetailList()
        } else {
          this.$message.error('账户拒绝失败')
        }
      }).catch(() => {
        this.$message.error('账户拒绝失败')
      })
    },
    awatiChoose() {
      if(!this.multipleSelection.length) return this.$message.info("请至少选择一项")
       const userId = this.multipleSelection.map(item => { // 获取唯一标识传递给后端
        return item.userId 
      }) 
      const parasm = { userId }
      this.$http.get('/await/choose').then(res => {
        if(res.code === 0) {
          this.multipleSelection = []
          this.$refs.multipleTable.clearSelection()
          this.$message.success('搁置成功')
        } else {
          this.$message.success('搁置失败')
        }
      }).catch(() => {
        this.$message.success('搁置失败')
      })
    },
    nextTask() {
      this.$refs.multipleTable.clearSelection()
      this.multipleSelection = []
      this.getDetailList()
      this.getTableList()
    }
  }
};
</script>

<style scoped>
.list-head {
  display: inline-flex;
  width: 50%;
  height: 40px;
}
.list-head .list-contains {
  width: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 0 0 0 #f5f5f5, 0 1px 0 0 #f5f5f5, 1px 1px 0 0 #f5f5f5,
    inset 1px 0 0 0 #f5f5f5, inset 0 1px 0 0 #f5f5f5;
}
.button-opeation {
  margin: 20px 0px;
  display: flex;
  justify-content: space-around;
}
.warp {
  display: flex;
}
.page-content {
  width: 250px;
  margin-right: 30px;
}
.content-img img{
  margin-left: 20px;
  height: 100px;
  width: 100px;
}
.page-content img {
  margin-top: 30px;
  width: 100%;
  height: 400px;
}
.page-content-opeation {
  display: flex;
}
</style>
