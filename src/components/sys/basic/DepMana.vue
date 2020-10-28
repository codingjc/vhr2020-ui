<template>
    <div style="width: 500px">
        <el-input
                prefix-icon="el-icon-search"
                placeholder="请输入部门名称搜索"
                v-model="filterText">
        </el-input>

        <el-tree
                :data="deps"
                :props="defaultProps"
                :filter-node-method="filterNode"
                :expand-on-click-node="false"
                ref="tree">

             <span class="custom-tree-node" style="display: flex; justify-content: space-between;width: 100%" slot-scope="{ node, data }">
                <span>{{ data.name }}</span>
                <span>
                  <el-button
                          type="primary"
                          size="mini"
                          class="depButton"
                          @click="() => showAddDepView(data)">
                    添加部门
                  </el-button>
                  <el-button
                          type="danger"
                          size="mini"
                          class="depButton"
                          @click="() => deleteDep(data)">
                    删除部门
                  </el-button>
                </span>
      </span>

        </el-tree>

      <!--dialog-->
      <el-dialog
          title="添加部门"
          :visible.sync="dialogVisible"
          width="30%">
        <div>
          <table>
            <tr>
              <td><el-tag>上级部门</el-tag></td>
              <td>{{pname}}</td>
            </tr>
            <tr>
              <td>部门名称</td>
              <td><el-input v-model="dep.name" placeholder="请输入部门名称"></el-input></td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddDep">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DepMana",
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        data(){
            return{
                dialogVisible: false,
                filterText: '',
                deps:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                pname:'',
                dep:{
                  name:'',
                  parentId:-1
               }
            }
        },
        methods: {
            initDep(){
                this.pname='';
                this.dep = {
                name:'',
                parentId:-1
              }
            },
            addDep2Deps(deps, dep){
                for (let i=0; i < deps.length; i++){
                  let d = deps[i];
                  if(d.id == dep.parentId){
                    d.children = d.children.concat(dep)
                    return;
                  } else {
                    this.addDep2Deps(d.children, dep);
                  }
                }
            },
            doAddDep(){
              this.postRequest("/system/basic/department/", this.dep).then(resp => {
                if(resp){
                  this.initDep();
                  this.dialogVisible = false;
                  this.addDep2Deps(this.deps, resp.data);
                }
              })
            },
            showAddDepView(data){
                console.log(data)
                this.pname = data.name
                this.dep.parentId = data.id;
                this.dialogVisible = true;

            },
            deleteDep(data){
                console.log(data)
            },
            initdeps(){
                this.getRequest("/system/basic/department/").then(resp => {
                    if (resp) {
                        this.deps = resp;
                    }
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            }
        },
        mounted() {
            this.initdeps();
        }
    }
</script>

<style>
    .depButton{
        padding: 2px;
    }

</style>