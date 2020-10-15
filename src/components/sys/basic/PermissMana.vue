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
            <el-collapse accordion @change="handleChange">
                <el-collapse-item :title="role.nameZh" :name="role.id" v-for="(role, index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可操作的资源</span>
                            <el-button style="float: right; padding: 3px 0; color: #ff0000" icon="el-icon-delete" type="text"></el-button>
                        </div>
                        <div>
                            <el-tree show-checkbox
                                    :data="allMenus" :props="defaultProps"></el-tree>
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
                roles:[],
                allMenus:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        created(){
            this.initRoles();
        },
        methods:{
            handleChange(name){
                if(name){
                    this.initMenus();
                }
            },
            addPermiss(){

            },
            initRoles(){
                this.getRequest("/system/basic/per/").then(resp => {
                    if (resp) {
                        this.roles = resp;
                    }
                })
            },
            initMenus(){
                this.getRequest("/system/basic/per/menus").then(resp => {
                    if(resp){
                        this.allMenus = resp;
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