<template>
    <div>
        <div class="permissManaTool">
            <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
                <template slot="prepend">ROlE_</template>
            </el-input>
            <el-input size="small" placeholder="请输入内容" v-model="role.nameZh">
            </el-input>
            <el-button size="small" type="primary" @click="addPermiss" icon="el-icon-plus">添加</el-button>
        </div>

        <div class="permissManaMain">
            <el-collapse accordion>
                <el-collapse-item :title="role.nameZh" :name="index" v-for="(role, index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可操作的资源</span>
                            <el-button style="float: right; padding: 3px 0; color: #ff0000" icon="el-icon-delete" type="text"></el-button>
                        </div>
                        <div>

                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissMana",
        data(){
            return{
                role:{
                    name:'',
                    nameZh:''
                },
                updateRole:{
                    name:'',
                    nameZh:''
                },
                roles:[]
            }
        },
        created(){
            this.initRoles();
        },
        methods:{
            addPermiss(){

            },
            initRoles(){
                this.getRequest("/system/basic/per/").then(resp => {
                    if (resp) {
                        this.roles = resp;
                    }
                })
            }
        }

    }
</script>

<style>
    .permissManaTool{
        display: flex;
        justify-content: flex-start;
    }

    .permissManaTool .el-input{
        width: 300px;
        margin-right: 8px;
    }

    .permissManaMain{
        width: 800px;
        margin-top: 10px;
    }
</style>