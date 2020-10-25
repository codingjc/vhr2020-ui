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
                filterText: '',
                deps:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        methods: {
            showAddDepView(data){
                console.log(data)
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