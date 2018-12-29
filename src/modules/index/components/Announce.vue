<template>
  <div class="announce">
    <CommonTable :api-root="'center'" :columns="columns" ref="announceTable"></CommonTable>
    <CommonDialog  :form-columns="formColumns" :show-btn="false" ref="announceDialog"></CommonDialog>
  </div>
</template>

<script>
  import CommonTable from './common/CommonTable';
  import CommonDialog from './common/CommonDialog';
  export default {
    name: 'Announce',

    data () {
      return {
        columns: [
          {
            type:'index',
            label: '序号'
          },
          {
            prop:'coding',
            label: '编码'
          },
          {
            prop:'publishTime',
            label: '发布单位'
          },
          {
            prop:'culturalCategory',
            label: '文化类别'
          },
          {
            prop:'content',
            label: '内容简介'
          },
          {
            type: 'function',
            label: '操作',
            functionOpt: [
              {
                type: 'text',
                label: '查看',
                func: this.showDetail
              },
              {
                type: 'text',
                label: '附件下载',
                func: this.downLoad
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
            key: 'publishTime',
            label: '发布单位'
          },
          {
            type: 'select',
            key: 'culturalCategory',
            label: '文化类别',
            options: [
              {
                value: 'value1',
                label: '文化类别1'
              },
              {
                value: 'value2',
                label: '文化类别2'
              }
            ]
          },
          {
            type: 'text',
            key: 'content',
            label: '内容简介'
          }
        ]
      };
    },

    components: {
      CommonTable,
      CommonDialog
    },

    mounted () {
      if (this.$refs.announceTable) {
        this.$refs.announceTable.tableData = [
          {
            coding: '1111111111',
            publishTime: '1111111111',
            culturalCategory: '1111111111',
            content: '1111111111'
          },
          {
            coding: '1111111111',
            publishTime: '1111111111',
            culturalCategory: '1111111111',
            content: '1111111111'
          },
          {
            coding: '1111111111',
            publishTime: '1111111111',
            culturalCategory: '1111111111',
            content: '1111111111'
          },
          {
            coding: '1111111111',
            publishTime: '1111111111',
            culturalCategory: '1111111111',
            content: '1111111111'
          }
        ];
        this.$refs.announceTable.pageable = {
          total: 4,
          currentPage: 1,
          pageSize: 10
        }
      }
    },

    methods: {
      /**
       * 查看
       */
      showDetail(index, row) {
        this.$refs.announceDialog.dialogVisible = true;
        this.$refs.announceDialog.form = row;
      },
      /***
       *  下载
       */
      downLoad (index, row) {
        this.$alert('需要附件下载的接口', '提示', {
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
