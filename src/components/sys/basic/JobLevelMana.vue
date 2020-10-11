<template>
    <div>
        <!--输入框-->
        <div>
            <el-input
                    class="addJobLevel"
                    placeholder="添加职称..."
                    prefix-icon="el-icon-plus"
                    size="s mall"
                    v-model="jl.name">
            </el-input>

            <el-select style="margin-left: 8px" size="small" placeholder="职称等级" v-model="jl.titleLevel">
                <el-option
                        v-for="item in titleLevels"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>

            <el-button icon="el-icon-plus" style="margin-left: 8px" size="small" type="primary" @click="addJobLevel">添加</el-button>
        </div>

        <!--表格-->
        <div>
            <el-table
                    :data="JobLevels"
                    size="small"
                    stripe
                    border
                    @selection-change="handleSelectionChange"
                    style="width: 70%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职称名称"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="titleLevel"
                        label="职称级别"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="enabled"
                        label="是否启用"
                        width="100">
                    <template slot-scope="scope">
                        <el-tag size="small" type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="danger" v-else="scope.row.enabled">未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="deleteJobLevel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-button :disabled="this.multipleSelection.length == 0" style="margin-top: 10px" type="danger" size="small" @click="deleteMany">批量删除</el-button>

        <!--编辑模态框-->
        <div>
            <el-dialog
                    title="修改职称"
                    :visible.sync="dialogVisible"
                    width="30%">
                <table>
                    <tr>
                        <td>
                            <el-tag>职称名</el-tag>
                        </td>
                        <td>
                            <el-input size="small" v-model="updateJl.name"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>职称级别</el-tag>
                        </td>
                        <td>
                            <el-select style="margin-left: 8px" size="small" placeholder="职称等级" v-model="updateJl.titleLevel">
                                <el-option
                                        v-for="item in titleLevels"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>是否启用</el-tag>
                        </td>
                        <td>
                            <el-switch
                                    v-model="updateJl.enabled"
                                    active-text="启用"
                                    inactive-text="禁用"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </td>
                    </tr>
                </table>

                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="doUpdate" size="small">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {putRequest} from "../../../utils/api";

    export default {
        name: "JobLevelMana",
        data(){
            return{
                dialogVisible: false,
                jl:{
                    name: '',
                    titleLevel: ''
                },
                updateJl:{
                    name: '',
                    titleLevel: '',
                    enabled: false
                },
                titleLevels:[
                    '正高级',
                    '副高级',
                    '中级',
                    '初级',
                    '员级'
                ],
                JobLevels: [],
                multipleSelection: []
            }
        },
        mounted(){
            this.initJobLevels();
        },
        methods:{
            deleteMany(){
                this.$confirm('此操作将永久删除【'+ this.multipleSelection.length +'】条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    });
                    this.deleteRequest("/system/basic/job/" + ids).then(resp => {
                        if (resp) {
                            this.initJobLevels();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val){
                console.log(val);
                this.multipleSelection = val;
            },

            doUpdate(){
                putRequest("/system/basic/job/", this.updateJl).then(resp => {
                   if (resp) {
                       this.dialogVisible = false;
                       this.initJobLevels();
                       this.updateJl = {
                           name: '',
                           titleLevel: '',
                           enabled: false
                       }
                   }
                });
            },
            showEditView(index, data){
                Object.assign(this.updateJl, data);
                this.dialogVisible = true;
            },
            deleteJobLevel(index, data){
                this.$confirm('此操作将永久删除【'+ data.name +'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/job/" + data.id).then(resp => {
                        if (resp) {
                            this.initJobLevels();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addJobLevel(){
                if (this.jl.name == '') {
                    this.$message.error("请填写职称名称");
                    return;
                }
                if (this.jl.titleLevel == '') {
                    this.$message.error("请选择职称等级");
                    return;
                }
              this.postRequest("/system/basic/job/", this.jl).then(resp => {
                  if (resp) {
                      this.initJobLevels();
                      this.jl.name = '';
                      this.jl.titleLevel = '';
                  }
              })
            },
            initJobLevels(){
                this.getRequest("/system/basic/job/").then(resp => {
                    if(resp){
                        this.JobLevels = resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .addJobLevel{
        width: 350px;
        margin-bottom: 10px;
    }

</style>