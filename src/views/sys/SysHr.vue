<template>
    <div>
      <div style="margin-top: 10px; display: flex; justify-content: center;">
        <el-input v-model="keyword" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                  style="width: 400px;margin-right: 10px" @keydown.enter.native="search"></el-input>
        <el-button icon="el-icon-search" type="primary" size="small" @click="search">搜索</el-button>
      </div>
      <div class="hr-container">
        <el-card class="hr-card" v-for="(hr, index) in hrs" :key="index" >
          <div slot="header" class="clearfix">
            <span>{{hr.name}}</span>
            <el-button style="float: right; padding: 3px 0; color: red" type="text" @click="doDelete(hr)" icon="el-icon-delete"></el-button>
          </div>
          <div>
            <div class="img-container">
              <img :src="hr.userface" :alt="hr.name" :title="hr.name" class="userface-img">
            </div>
            <div class="userinfo-container">
              <div>用户名:{{hr.name}}</div>
              <div>手机号码:{{hr.phone}}</div>
              <div>电话号码:{{hr.telephone}}</div>
              <div>地址:{{hr.address}}</div>
              <div>用户状态: <el-switch
                  v-model="hr.enabled"
                  @change="enabledChange(hr)"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="启动"
                  inactive-text="禁用">
              </el-switch></div>
              <div>用户角色:<el-tag type="success" style="margin-right: 4px" v-for="(item, indexj) in hr.roles"
                                :key="indexj">{{item.nameZh}}</el-tag>

                <el-popover
                    placement="right"
                    title="角色列表"
                    @show="showPop(hr)"
                    @hide="hidePop(hr)"
                    width="200"
                    trigger="click">
                  <el-select v-model="selectRoles" multiple placeholder="请选择">
                    <el-option
                        v-for="(r, indexj) in allRoles"
                        :key="indexj"
                        :label="r.nameZh"
                        :value="r.id">
                    </el-option>
                  </el-select>
                  <el-button slot="reference" icon="el-icon-more" type="text"></el-button>
                </el-popover>
              </div>
              <div>备注:{{hr.remark}}</div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
</template>

<script>
    export default {
      name: "SysHr",
      data() {
        return {
          keyword: '',
          hrs:[],
          selectRoles:[],
          allRoles:[]
        }
      },
      mounted() {
        this.initHrs();
      },
      methods:{
        doDelete(hr){

          this.$confirm('此操作将永久删除【'+ hr.name +'】操作员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRequest("/system/hr/" + hr.id).then(resp => {
              if (resp) {
                this.initHrs();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        search(){
          this.initHrs();
        },
        showPop(hr){
          this.initAllRoles();
          let roles = hr.roles;
          this.selectRoles = [];
          roles.forEach(role => {
            this.selectRoles.push(role.id);
          })
        },
        hidePop(hr){
          let roles = [];
          Object.assign(roles, hr.roles);
          let flag = false;
          if (roles.length != this.selectRoles.length) {
            flag = true;
          } else {
            for(let i=0; i< roles.length ; i++){
              let role = roles[i];
              for (let j=0; j < this.selectRoles.length; j++){
                let sr = this.selectRoles[i];
                if (role.id == sr) {
                  roles.splice(i, 1);
                  i--;
                  break;
                }
              }
            }
            if (roles.length = 0) {
              flag = true;
            }
          }
          if (flag) {
            let url = '/system/hr/updateHrRole?hrId=' + hr.id;
            this.selectRoles.forEach(role => {
              url += "&rids=" + role
            })
            this.putRequest(url).then(resp =>{
              if (resp) {
                this.initHrs();
              }
            })
          }
        },
        initAllRoles(){
          this.getRequest("/system/hr/roles").then(resp => {
            if (resp) {
              this.allRoles = resp;
            }
          })
        },
        enabledChange(hr){
          console.log(hr);
          delete hr.roles;
          this.putRequest("/system/hr/", hr).then(resp => {
            if (resp) {
              this.initHrs();
            }
          })
        },
        initHrs(){
          this.getRequest("/system/hr/?keyword=" + this.keyword).then(resp => {
            if (resp) {
              this.hrs = resp;
            }
          })
        }
      }
    }
</script>

<style scoped>
  .userinfo-container div {
    font-size: 12px;
    color: #0040ff;
  }

  .userinfo-container{
    margin-top: 20px;
  }

  .img-container{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .userface-img{
    width: 72px;
    height: 72px;
    border-radius: 72px;
  }

  .hr-container{
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .hr-card{
    width: 350px;
  }
</style>