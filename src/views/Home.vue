<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <!--标题-->
                <div class="title">微人事</div>
                <!--用户相关-->
                <div>
                    <el-dropdown class="userInfo" @command="commandHandler">
                        <span class="el-dropdown-link">
                        {{user.name}}<i><img :src="user.userface" alt=""></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>
                            <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu @select="menuClick">
                        <el-submenu index="1" v-for="(item, index) in this.$router.options.routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item v-for="(menu, indexj) in item.children" :index="menu.path" :key="indexj">{{menu.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        methods: {
            menuClick(index){
                this.$router.push(index);

            },

            commandHandler(cmd) {
                if (cmd == 'logout') {
                    //确认是否注销
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem("user");
                        this.$router.replace("/")
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消注销'
                        });
                    });
                }
            }
        }
    }
</script>

<style>
    .homeHeader{
        background-color: #6816ca;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }

    .homeHeader .title{
        font-size: 30px;
        font-family: 华文行楷;
        color: white;
    }

    .homeHeader .userInfo{
        cursor: pointer;
    }

    .el-dropdown-link img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 7px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #ffffff;
        display: flex;
        align-items: center;
    }

</style>