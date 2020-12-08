<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addPositionInput"
                    placeholder="添加职位"
                    @keydown.enter.native="addPosition"
                    prefix-icon="el-icon-plus"
                    v-model="pos.name">
            </el-input>
            <el-button size="small" type="primary" icon="el-icon-plus" @click="addPosition">添加</el-button>
        </div>
        <div>
            <el-table
                    v-loading="loading"
                    :data="positions"
                    stripe
                    border
                    size="small"
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
                        label="职位名称"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        width="160"
                        label="创建时间">
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
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-button type="danger" size="small" style="margin-top: 8px" @click="deleteMany" :disabled="multipleSelection.length == 0">批量删除</el-button>
        </div>

        <!--编辑对话框-->
        <div>
            <el-dialog
                    title="修改职位"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div>
                    <el-tag>职位名称</el-tag>
                    <el-input v-model="updatePos.name" class="updatePosInput" size="small"></el-input>
                </div>
                <div>
                    <el-tag>是否启用</el-tag>
                    <el-switch
                            v-model="updatePos.enabled"
                            active-text="启用"
                            inactive-text="禁用"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="doUpdate" size="small">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getRequest} from "../../../utils/api";

    export default {
        name: "PosMana",
        data(){
            return{
                loading: false,
                pos: {
                    name: ''
                },
                updatePos: {
                    name: '',
                    enabled: false
                },
                positions: [],
                dialogVisible: false,
                multipleSelection: []
            }
        },
        mounted(){
            this.initPositions();
        },
        methods:{
            deleteMany(){
                this.$confirm('此操作将永久删除【'+ this.multipleSelection.length +'】条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    });
                    this.deleteRequest("/system/basic/pos/" + ids).then(resp => {
                        if(resp){
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            doUpdate(){
                this.putRequest("/system/basic/pos/", this.updatePos).then(resp => {
                    if(resp){
                        this.initPositions();
                        this.updatePos.name = '';
                        this.dialogVisible = false;
                    }
                })
            },
            addPosition(){
              if(this.pos.name){
                  this.postRequest('/system/basic/pos/', this.pos).then(resp => {
                     if(resp){
                         this.initPositions();
                         this.pos.name = '';
                     }
                  });
              } else {
                  this.$message.error('请输入职位名称');
              }
            },
            initPositions(){
                this.loading = true;
                this.getRequest("/system/basic/pos/").then(resp => {
                    this.loading = false;
                    if(resp){
                        this.positions = resp;
                    }
                })
            },
            showEditView(index, data){
                Object.assign(this.updatePos, data);
                this.dialogVisible = true;
            },
            handleDelete(index, data){
                this.$confirm('此操作将永久删除【' + data.name + '】职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/pos/" + data.id).then(resp => {
                        if (resp) {
                            this.initPositions();
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
            }
        }
    }
</script>

<style>
    .updatePosInput{
        width: 200px;
        margin-left: 8px;
    }

    .addPositionInput{
        width: 300px;
        margin-right: 5px;
        margin-bottom: 10px;
    }
</style>