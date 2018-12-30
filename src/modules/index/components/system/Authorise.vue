<template>
    <div style="padding-left: 50px;">
      <el-tree
        :data="tree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <el-button @click="submit">保存</el-button>
    </div>
</template>

<script>
  import reqType from '@/api/reqType';
  export default {
    name: 'Authorise',
    props: {
      roleId: String
    },
    data () {
      return {
        tree: [],
        defaultProps: {
          label: "name"
        }
      };
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      submit() {

      }
    },
    mounted() {
        this.$http(reqType.POST, `menu/list`).then(
          data => {
            let tree = data.filter(item => item.parentId === null);
            tree.map(item => {
              item.children = data.filter(sub => sub.parentId === item.id);
            });
            this.tree = tree;
          }
        )
    }
  };
</script>

<style scoped>

</style>
