<template>
    <div>
        <!--输入框-->
        <div>
            <el-input
                    class="addJobLevel"
                    placeholder="添加职称..."
                    prefix-icon="el-icon-plus"
                    size="small"
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

            <el-button icon="el-icon-plus" style="margin-left: 8px" size="small" type="primary">添加</el-button>
        </div>

        <!--表格-->
        <div>
            <el-table
                    :data="JobLevels"
                    size="small"
                    stripe
                    border
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
        </div>
        <el-button style="margin-top: 10px" type="danger" size="small">批量删除</el-button>
    </div>
</template>

<script>
    export default {
        name: "JobLevelMana",
        data(){
            return{
                jl:{
                    name: '',
                    titleLevel: ''
                },
                titleLevels:[
                    '正高级',
                    '副高级',
                    '中级',
                    '初级',
                    '员级'
                ],
                JobLevels: []
            }
        },
        mounted(){
            this.initJobLevels();
        },
        methods:{
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