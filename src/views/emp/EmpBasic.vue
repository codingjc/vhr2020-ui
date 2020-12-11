<template>
    <div>
      <div class="firstTool">
        <div>
          <el-input
              style="width: 300px; margin-right: 10px"
              placeholder="通过员工名搜索员工,记得回车哦..."
              suffix-icon="el-icon-search"
              clearable
              @clear="initEmps"
              size="small"
              @keydown.enter.native="initEmps"
              v-model="keyword">
          </el-input>
          <el-button icon="el-icon-search" type="primary" size="small" @click="initEmps">搜索</el-button>
          <el-button type="primary" size="small">
            <i class="fa fa-angle-double-down" aria-hidden="true"></i>
            高级搜索
          </el-button>
        </div>
        <div>
          <el-button size="small" type="success">
            <i class="fa fa-level-up" aria-hidden="true"></i>
            导入数据
          </el-button>
          <el-button size="small" type="success">
            <i class="fa fa-level-down" aria-hidden="true"></i>
            导出数据
          </el-button>
          <el-button icon="el-icon-plus" size="small" type="primary">添加员工</el-button>
        </div>
      </div>

      <div style="margin-top: 10px">
        <el-table
            :data="emps"
            border
            stripe
            v-loading="loading"
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              fixed
              align="left"
              width="90">
          </el-table-column>
          <el-table-column
              prop="workID"
              label="工号"
              align="left"
              width="85">
          </el-table-column>
          <el-table-column
              prop="birthday"
              label="出生日期"
              align="left"
              width="100">
          </el-table-column>
          <el-table-column
              prop="idCard"
              label="身份证号"
              align="left"
              width="150">
          </el-table-column>
          <el-table-column
              prop="wedlock"
              label="婚姻状况"
              width="85">
          </el-table-column>
          <el-table-column
              prop="nation.name"
              label="民族"
              width="50">
          </el-table-column>
          <el-table-column
              prop="nativePlace"
              label="籍贯"
              width="80">
          </el-table-column>
          <el-table-column
              prop="politicsstatus.name"
              label="政治面貌"
              width="85">
          </el-table-column>
          <el-table-column
              prop="email"
              label="电子邮件"
              align="left"
              width="180">
          </el-table-column>
          <el-table-column
              prop="phone"
              label="电话号码"
              align="left"
              width="120">
          </el-table-column>
          <el-table-column
              prop="address"
              label="联系地址"
              align="left"
              width="220">
          </el-table-column>
          <el-table-column
              prop="department.name"
              label="所属部门"
              align="left"
              width="100">
          </el-table-column>
          <el-table-column
              prop="position.name"
              label="职位"
              width="100">
          </el-table-column>
          <el-table-column
              prop="jobLevel.name"
              label="职称"
              width="100">
          </el-table-column>
          <el-table-column
              prop="engageForm"
              label="聘用形式"
              width="100">
          </el-table-column>
          <el-table-column
              prop="beginDate"
              label="入职日期"
              align="left"
              width="100">
          </el-table-column>
          <el-table-column
              prop="conversionTime"
              label="转正日期"
              align="left"
              width="100">
          </el-table-column>
          <el-table-column
              prop="beginContract"
              label="合同起始日期"
              align="left"
              width="110">
          </el-table-column>
          <el-table-column
              prop="endContract"
              label="合同终止日期"
              align="left"
              width="110">
          </el-table-column>
          <el-table-column
              prop="contractTerm"
              label="合同期限"
              align="left"
              width="75">
          </el-table-column>
          <el-table-column
              prop="tiptopDegree"
              label="最高学历">
          </el-table-column>
          <el-table-column
              fixed="right"
              width="200px"
              label="操作">
            <template slot-scope="scope">
              <el-button style="padding: 3px" size="small" >编辑</el-button>
              <el-button style="padding: 3px" size="small" type="primary">查看高级资料</el-button>
              <el-button style="padding: 3px" size="small" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex; justify-content: flex-end; margin-top: 5px">
          <el-pagination
              background
              @current-change="currentChange"
              @size-change="sizeChange"
              layout="sizes, prev, pager, next, jumper, ->, total, slot"
              :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "EmpBasic",
      data(){
        return{
          emps:[],
          keyword:'',
          loading:false,
          total:0,
          page:1,
          size:10
        }
      },
      mounted() {
        this.initEmps();
      },
      methods:{
        sizeChange(currentSize){
          this.size = currentSize;
          this.initEmps();
        },
        currentChange(currentPage){
          this.page = currentPage;
          this.initEmps();
        },
        initEmps(){
          this.loading=true;
          this.getRequest("/emp/basic/?page=" + this.page + "&size=" + this.size + "&keyWord=" + this.keyword).then(resp => {
            this.loading=false;
            if (resp) {
              this.emps = resp.data;
              this.total=resp.total;
            }
          })
        }
      }
    }
</script>

<style scoped>
  .firstTool{
    display: flex;
    justify-content: space-between;
  }
</style>