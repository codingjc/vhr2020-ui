<template>
    <div>
        <div class="permissManaTool">
            <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
                <template slot="prepend">ROlE_</template>
            </el-input>
            <el-input size="small" placeholder="请输入角色中文名" @keydown.enter.native="addRole" v-model="role.nameZh">
            </el-input>
            <el-button size="small" type="primary" @click="addRole" icon="el-icon-plus">添加</el-button>
        </div>

        <div class="permissManaMain">
            <el-collapse v-model="activeName" v-loading="loading" accordion @change="handleChange">
                <el-collapse-item :title="role.nameZh" :name="role.id" v-for="(role, index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可操作的资源</span>
                            <el-button @click="deleteRole(role.nameZh, role.id)" style="float: right; padding: 3px 0; color: #ff0000" icon="el-icon-delete" type="text"></el-button>
                        </div>
                        <div>
                            <el-tree show-checkbox
                                     node-key="id"
                                     :default-checked-keys="selectedMenus"
                                     ref="tree"
                                     :key="index"
                                    :data="allMenus" :props="defaultProps"></el-tree>
                            <div style="display: flex;justify-content: flex-end">
                                <el-button size="small" @click="calcelUpdate">取消修改</el-button>
                                <el-button type="primary" size="small" @click="doUpdate(role.id, index)">确认修改</el-button>
                            </div>
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
                loading: false,
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
                selectedMenus:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                activeName: -1
            }
        },
        created(){
            this.initRoles();
        },
        methods:{
            deleteRole(nameZh, rid){
                this.$confirm('此操作将永久删除该【'+ nameZh +'】角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/per/role/" + rid).then(resp => {
                        if (resp) {
                            this.initRoles();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addRole(){
                if(this.role.name && this.role.nameZh){
                    this.postRequest("/system/basic/per/addRole", this.role).then(resp => {
                        if (resp) {
                            this.role.name = '';
                            this.role.nameZh = '';
                            this.initRoles();
                        }
                    })
                } else {
                    this.$message.error('数据不可为空');
                }
            },
            calcelUpdate(){
               this.activeName = -1;
            },
            doUpdate(rid, index){
                let tree = this.$refs.tree[index];
                let selectedKeys = tree.getCheckedKeys();
                let url = "/system/basic/per/updateMenuRole?rid=" + rid;
                selectedKeys.forEach(item => {
                    url += "&mids=" + item;
                });
                this.putRequest(url).then(resp => {
                    if (resp) {
                        this.initRoles();
                        this.activeName = -1;
                    }
                })
            },
            handleChange(rid){
                if(rid){
                    this.initMenus();
                    this.initSelectMenus(rid);
                }
            },
            initSelectMenus(rid){
                this.getRequest("/system/basic/per/mids/" + rid).then(resp => {
                    if (resp) {
                        this.selectedMenus = resp;
                    }
                })
            },
            initRoles(){
                this.loading = true;
                this.getRequest("/system/basic/per/").then(resp => {
                    this.loading = false;
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