

<template>
  <!--  <el-container style="height: 500px; border: 1px solid #eee">-->
  <div class="content_sign">
    <el-card class="box-card">
      <el-form ref="form" :model="seachData" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="关怀包名称:">
              <el-input v-model="seachData.name" placeholder="请输入商品名称" clearable />
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="厂家:">
              <el-input v-model="seachData.name" placeholder="请输入厂家名称" clearable />
            </el-form-item>
          </div></el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-button type="primary" @click="dataInit">搜索</el-button>
              <el-button @click="seachData = {}">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="add_box">
        <el-button type="primary" @click="addFun">添加关怀包</el-button>
      </div>

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column label="序号" prop="id" sortable="custom" align="center" width="80">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关怀包名称" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品清单" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
            <el-tag>{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="厂家" width="110px" align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.reviewer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="110px" align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.reviewer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="110px" align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.reviewer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
              启用
            </el-button>
            <!--              <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">-->
            <!--                Draft-->
            <!--              </el-button>-->
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              禁用
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="seachData.page" :limit.sync="seachData.limit" @pagination="dataInit" />
    </el-card>
    <el-dialog :visible.sync="addFunLock" title="新增合同">
      <el-form ref="form" :model="addObject" center label-width="120px">
        <el-form-item label="合同名称：">
          <el-input v-model="addObject.name" class="ipt_wid" clearable placeholder="请输入合同名称" />
        </el-form-item>
        <el-form-item label="关联角色：">
          <el-input v-model="addObject.name" class="ipt_wid" clearable placeholder="请输入关联角色" />
        </el-form-item>
        <el-form-item label="上传附件：">
          <el-upload
            action="#"
            list-type="picture-card"
            :file-list="fileList"
            class="upload_box"
            :auto-upload="false"
          >
            <i slot="default" class="el-icon-plus" />
          </el-upload>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFunLock = false">取消</el-button>
        <el-button type="primary" @click="addFunLock = false">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
<!--  </el-container>-->
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'CarePack',
  components: {
    Pagination
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      seachData: {
        name: '',
        createDate: [],
        page: 1,
        limit: 10
      },
      total: 0,
      showReviewer: false,
      listLoading: false,
      tableKey: 0,
      list: [],
      // 新增弹窗
      addFunLock: false,
      // 新增内容、
      addObject: {},
      // 展示列表
      fileList: []
    }
  },
  created() {
    this.dataInit()
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 新增
    addFun() {
      this.addFunLock = true;
      this.addObject = {}
    },
    // 数据初始化
    dataInit() {
      this.listLoading = true;
      fetchList(this.seachData).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        console.log(this.list);
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    handleUpdate(row) {
      console.log('编辑')
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    }
  }
}

</script>

<style lang="scss" scoped>
  .content_sign{
    padding: 15px;
    .add_box {
      margin-bottom: 20px;
    }
    .ipt_wid {
      width: 250px;
    }

  }
</style>
