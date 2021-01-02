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
        <el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog">添加员工</el-button>
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
            <el-button style="padding: 3px" size="small">编辑</el-button>
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

    <el-dialog
        title="添加员工"
        :visible.sync="dialogVisible"
        width="80%">
      <div>
        <el-form>
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名:" prop="name">
                <el-input size="small" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.name" placeholder="请输入员工姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="性别:" prop="gender">
                <el-radio-group v-model="emp.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女" style="margin-left: -5px">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="出生日期:" prop="birthday">
                <el-date-picker
                    style="width: 170px"
                    v-model="emp.birthday"
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="出生日期">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="政治面貌:" prop="politicId">
                <el-select v-model="emp.politicId" placeholder="政治面貌" size="mini" style="width: 200px">
                  <el-option
                      v-for="item in politicsstatuses"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="名族:" prop="polinationIdticId">
              <el-select v-model="emp.nationId" placeholder="名族" size="mini" style="width: 150px">
                <el-option
                    v-for="item in nations"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="籍贯:" prop="nativePlace">
              <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit" v-model="emp.nativePlace" placeholder="请输入员工籍贯"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="电子邮箱:" prop="email">
              <el-input size="mini" style="width: 170px" prefix-icon="el-icon-message" v-model="emp.email" placeholder="请输入电子邮箱"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="联系地址:" prop="address">
              <el-input size="mini" style="width: 200px" prefix-icon="el-icon-s-home" v-model="emp.address" placeholder="请输入联系地址"></el-input>
            </el-form-item>
          </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="职位:" prop="polinationIdticId">
                <el-select v-model="emp.posId" placeholder="职位" size="mini" style="width: 150px">
                  <el-option
                      v-for="item in positions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="职称:" prop="joblevelId">
                <el-select v-model="emp.joblevelId" placeholder="职称" size="mini" style="width: 150px">
                  <el-option
                      v-for="item in jobLevels"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="所属部门:" prop="email">
                <el-input size="mini" style="width: 170px" prefix-icon="el-icon-message" v-model="emp.departmentId" placeholder="请输入所属部门"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="电话号码:" prop="address">
                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone" v-model="emp.phone" placeholder="请输入电话号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="工号:" prop="address">
                <el-input disabled size="mini" style="width: 150px" v-model="emp.workID" placeholder="工号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="学历:" prop="tiptopDegree">
                <el-select v-model="emp.tiptopDegree" placeholder="学历" size="mini" style="width: 150px">
                  <el-option
                      v-for="item in tiptopDegrees"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="毕业院校:" prop="school">
                <el-input size="mini" style="width: 170px" prefix-icon="el-icon-edit" v-model="emp.school" placeholder="毕业院校"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="专业名称:" prop="specialty">
                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit" v-model="emp.specialty" placeholder="专业名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="入职日期:" prop="beginDate">
                <el-date-picker
                    style="width: 130px"
                    v-model="emp.beginDate"
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="入职日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="转正日期:" prop="conversionTime">
                <el-date-picker
                    style="width: 130px"
                    v-model="emp.conversionTime"
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="转正日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合同起始日期:" prop="beginContract">
                <el-date-picker
                    style="width: 130px"
                    v-model="emp.beginContract"
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="合同起始日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="合同终止日期:" prop="endContract">
                <el-date-picker
                    style="width: 130px"
                    v-model="emp.endContract"
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="合同终止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="身份证号码:" prop="idCard">
                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit" v-model="emp.idCard" placeholder="身份证号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="聘用形式:" prop="engageForm">
                <el-radio-group v-model="emp.engageForm">
                  <el-radio label="劳动合同">劳动合同</el-radio>
                  <el-radio label="劳务合同" style="margin-left: -5px">劳务合同</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况:" prop="wedlock">
                <el-radio-group v-model="emp.wedlock">
                  <el-radio label="未婚">未婚</el-radio>
                  <el-radio label="已婚" style="margin-left: -5px">已婚</el-radio>
                  <el-radio label="离异" style="margin-left: -5px">离异</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EmpBasic",
  data() {
    return {
      emps: [],
      keyword: '',
      loading: false,
      total: 0,
      page: 1,
      size: 10,
      dialogVisible: false,
      nations:[],
      jobLevels:[],
      politicsstatuses:[],
      positions:[],
      emp: {
        name: "javaboy",
        gender: "男",
        birthday: "1989-12-31",
        idCard: "610122199001011256",
        wedlock: "已婚",
        nationId: 1,
        nativePlace: "陕西",
        politicId: 13,
        email: "laowang@qq.com",
        phone: "18565558897",
        address: "深圳市南山区",
        departmentId: 5,
        posId: 29,
        engageForm: "劳务合同",
        tiptopDegree: "本科",
        specialty: "信息管理与信息系统",
        school: "深圳大学",
        beginDate: "2017-12-31",
        workState: "在职",
        workID: "00000088",
        contractTerm: 2.0,
        conversionTime: "2018-03-31",
        notworkDate: null,
        beginContract: "2017-12-31",
        endContract: "2019-12-31",
        workAge: null,
        joblevelId: 9
      },
      tiptopDegrees:['博士', '硕士', '本科', '大专', '高中', '初中', '小学', '其他'],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  mounted() {
    this.initData();
    this.initEmps();
  },
  methods: {
    getMaxWorkID(){
      this.getRequest("/emp/basic/maxWorkId").then(resp => {
        if (resp) {
          this.emp.workID = resp.data;
        }
      })
    },
    initPosition(){
        this.getRequest("/emp/basic/positions").then(resp => {
          if (resp) {
            this.positions = resp;
          }
        })
    },
    initData(){
      let nations = window.sessionStorage.getItem("nations");
      if (!nations) {
        this.getRequest("/emp/basic/nations").then(resp => {
          if (resp) {
            this.nations = resp;
          }
        })
      }

      let jobLevels = window.sessionStorage.getItem("jobLevels");
      if (!jobLevels) {
        this.getRequest("/emp/basic/jobLevels").then(resp => {
          if (resp) {
            this.jobLevels = resp;
          }
        })
      }

      let politicsstatus = window.sessionStorage.getItem("politicsstatus");
      if (!politicsstatus) {
        this.getRequest("/emp/basic/politicsstatus").then(resp => {
          if (resp) {
            this.politicsstatuses = resp;
          }
        })
      }

    },
    showDialog(){
      this.initPosition();
      this.getMaxWorkID();
      this.dialogVisible = true;
    },
    sizeChange(currentSize) {
      this.size = currentSize;
      this.initEmps();
    },
    currentChange(currentPage) {
      this.page = currentPage;
      this.initEmps();
    },
    initEmps() {
      this.loading = true;
      this.getRequest("/emp/basic/?page=" + this.page + "&size=" + this.size + "&keyWord=" + this.keyword).then(resp => {
        this.loading = false;
        if (resp) {
          this.emps = resp.data;
          this.total = resp.total;
        }
      })
    }
  }
}
</script>

<style scoped>
.firstTool {
  display: flex;
  justify-content: space-between;
}
</style>