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
                ref="tree">
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

<style scoped>

</style>