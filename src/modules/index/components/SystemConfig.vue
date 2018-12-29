<template>
  <div class="config">
    <el-row>
      <el-button>文化类别管理</el-button>
    </el-row>
    <CommonTable :api-root="'center'" :columns="columns" ref="configTable"></CommonTable>
    <CommonDialog  :form-columns="formColumns" :show-btn="false" ref="configDialog"></CommonDialog>
  </div>
</template>

<script>
  import CommonTable from './common/CommonTable';
  import CommonDialog from './common/CommonDialog';
  export default {
    name: 'SystemConfig',

    data () {
      return {
        columns: [
          {
            type: 'index',
            label: '序号'
          },
          {
            prop: 'coding',
            label: '编码'
          },
          {
            prop: 'culturalCategoryName',
            label: '文化类别名称'
          },
          {
            prop: 'useStatus',
            label: '使用状态'
          },
          {
            type: 'function',
            label: '操作',
            functionOpt: [
              {
                type: 'text',
                label: '编辑',
                func: this.edit
              },
              {
                type: 'text',
                label: '删除',
                func: this.deleteRow
              }
            ]
          }
        ],
        formColumns: [
          {
            type: 'text',
            key: 'coding',
            label: '编码'
          },
          {
            type: 'text',
            key: 'culturalCategoryName',
            label: '文化类别名称'
          }
        ]
      };
    },

    components: {
      CommonTable,
      CommonDialog
    },

    mounted () {
      // dummy数据
      if (this.$refs.configTable) {
        this.$refs.configTable.tableData = [
          {
            coding: '11111111',
            culturalCategoryName: '11111111',
            useStatus: '11111111'
          },
          {
            coding: '11111111',
            culturalCategoryName: '11111111',
            useStatus: '11111111'
          },
          {
            coding: '11111111',
            culturalCategoryName: '11111111',
            useStatus: '11111111'
          },
          {
            coding: '11111111',
            culturalCategoryName: '11111111',
            useStatus: '11111111'
          }
        ];
        this.$refs.configTable.pageable ={
          total: 4,
          currentPage: 1,
          pageSize: 10
        };
      }
    },

    methods: {
      edit(index,row) {
        this.$refs.configDialog.dialogVisible = true;
        this.$refs.configDialog.form = row;
      },
      deleteRow(index,row){
        this.$alert('需要删除的接口', '提示', {
          dangerouslyUseHTMLString: true
        });
      }
    },

    computed: {

    },

    watch: {

    }
  };
</script>

<style lang="less" scoped>

</style>
