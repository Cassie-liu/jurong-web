<template>
    <div style="padding-left: 50px;">
      <el-tree
        :data="tree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        v-loading="treeLoading"
        :default-checked-keys="idList"
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
          label: 'name'
        },
        idList: [],
        treeLoading: false
      };
    },
    methods: {
      objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
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
      submit () {
        let menus = this.$refs.tree.getCheckedKeys();
        menus.concat(this.$refs.tree.getHalfCheckedKeys());
        this.$http(reqType.POST, `roleMenu/${this.roleId}roleId`, menus).then(
          data => {
          }
        );
      }
    },
    mounted () {
      this.treeLoading = true;
      this.$http(reqType.POST, `menu/list`, false).then(
        data => {
          let tree = data.filter(item => item.parentId === null);
          tree.map(item => {
            item.children = data.filter(sub => sub.parentId === item.id);
          });
          this.tree = tree;
        }
      ).then(
        this.$http(reqType.GET, `role/domain/${this.roleId}`, false).then(
          data => {
            this.idList = data.roleMenus.map(item => item.menuId);
            this.$refs.tree.setCheckedKeys(this.idList);
            this.treeLoading = false;
          }
        )
      );
    }
  };
</script>

<style scoped>

</style>
