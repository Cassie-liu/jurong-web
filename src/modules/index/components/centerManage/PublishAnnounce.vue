<template>
    <div class="base-data">
      <CommonDialog ref="publishDialog" :form-columns="formColumns" @submit="traggerBrotherEvent"></CommonDialog>
      <commonTable  :api-root="'center'" :columns="columns" ref="brother"></commonTable>
    </div>
</template>

<script>
  import CommonDialog from '../common/CommonDialog';
  import CommonTable from '../common/CommonTable';
    export default {
        name: 'CenterBuild',
        props: [],
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
                prop: 'publishTime',
                label: '发布时间'
              },
              {
                prop: 'publishUnit',
                label: '发布单位'
              },
              {
                prop: 'culturalCategory',
                label: '文化类别'
              },
              {
                prop: 'introduction',
                label: '内容简介'
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
                    label: '附件下载',
                    func: this.downLoad
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
                key: 'introduction',
                label: '内容简介'
              }
            ]
          };
        },
        mounted () {
          // dummy数据
          this.$refs.brother.tableData = [
            {
              coding: '11111',
              publishTime: '11111',
              publishUnit: '11111',
              culturalCategory: '文化类别1',
              introduction: '11111'
            },
            {
              coding: '11111',
              publishTime: '11111',
              publishUnit: '11111',
              culturalCategory: '文化类别1',
              introduction: '11111'
            },
            {
              coding: '11111',
              publishTime: '11111',
              publishUnit: '11111',
              culturalCategory: '文化类别1',
              introduction: '11111'
            }
          ];
          this.$refs.brother.pageable = {
            total: 3,
            currentPage: 1,
            pageSize: 10
          }
        },
        components: {
          CommonDialog,
          CommonTable
        },
        methods: {
          // 调用兄弟组件的方法
          traggerBrotherEvent (type) {
            this.$refs.brother && this.$refs.brother.loadTableData();
            // dummy
          },
          edit (index, row) {
            if (this.$refs.publishDialog) {
              this.$refs.publishDialog.title = '编辑';
              this.$refs.publishDialog.dialogVisible = true;
              this.$refs.publishDialog.form = row;
            }
          },
          downLoad (index,row) {
            console.log(index);
            console.log(row);
            this.$alert('需要附件下载的接口', '提示', {
              dangerouslyUseHTMLString: true
            });
          },
          deleteRow (index,row) {
            console.log(index);
            console.log(row);
            this.$confirm('确认删除？')
              .then(_ => {
                 // this.$http(reqType.DELETE, `${this.apiRoot}/${id}`).then(_ => {
                this.$alert('需要删除的接口', '提示', {
                  dangerouslyUseHTMLString: true
                });
                   this.$refs.brother && this.$refs.brother.loadTableData();
                // });
              })
              .catch(_ => {});
          }
        }
    };
</script>

<style scoped>

</style>
