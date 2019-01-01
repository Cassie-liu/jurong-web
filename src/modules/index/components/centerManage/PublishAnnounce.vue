<template>
    <div class="base-data">
      <CommonDialog ref="publishDialog" :form-columns="formColumns" @submit="traggerBrotherEvent" :show-btn="true"></CommonDialog>
      <commonTable api-root="notice/page" :columns="columns" ref="brother"></commonTable>
    </div>
</template>

<script>
  import CommonDialog from '../common/CommonDialog';
  import CommonTable from '../common/CommonTable';
  import map from '../Map';
    export default {
        name: 'CenterBuild',
        props: [],
        data () {
          return {
            columns: [
              {
                prop: 'title',
                label: '标题'
              },
              {
                prop: 'createdAt',
                label: '发布时间'
              },
              {
                prop: 'creator',
                label: '发布单位'
              },
              {
                prop: 'type',
                label: '文化类别'
              },
              {
                prop: 'content',
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
                key: 'title',
                label: '标题'
              },
              {
                type: 'select',
                key: 'type',
                label: '文化类别',
                options: []
              },
              {
                type: 'text',
                key: 'content',
                label: '内容简介'
              }
            ]
          };
        },
        mounted () {
          // dummy数据
          this.$refs.brother.tableData = [
          ];
          this.$refs.brother.pageable = {
            total: 3,
            currentPage: 1,
            pageSize: 10
          };
          this.formColumns[1].options = Object.keys(map.culturalCategory).map(item => { return { key: item, value: map.culturalCategory[item] }});
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

<style scoped lang="less">
.base-data{
  padding:15px;
}
</style>
