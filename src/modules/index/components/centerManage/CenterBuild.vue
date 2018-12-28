<template>
  <div class="base-data">
    <div v-show="!showDetail">
      <CommonDialog ref="brotherDialog" :form-columns="formColumns" @submit="traggerBrotherEvent" :show-btn="true"></CommonDialog>
      <commonTable  :api-root="'center'" :columns="columns" ref="brother"></commonTable>
    </div>
    <el-button icon="el-icon-back" type="text" @click="back" v-if="showDetail">返回</el-button>
    <el-tabs v-show="showDetail" v-model="activeName">
      <el-tab-pane label="分中心信息" name="center">
        <CommonSearch :columns="formColumn"  @search="search" ref="brotherStableSearch" :title="'保存'"></CommonSearch>
      </el-tab-pane>
      <el-tab-pane label="人员管理" name="person">
        <CommonDialog ref="personDialog" :form-columns="personFormColumns" @submit="traggerBrotherEvent" :show-btn="true"></CommonDialog>
        <commonTable  :api-root="'center'" :columns="personColumns" ref="brotherPersonDialog"></commonTable>
      </el-tab-pane>
      <el-tab-pane label="文明实践点" name="point">

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import CommonDialog from '../common/CommonDialog';
  import CommonTable from '../common/CommonTable';
  import CommonSearch from '../common/CommonSearch';
  export default {
    name: 'CenterBuild',
    props: [],
    data () {
      return {
        activeName: 'center',
        showDetail: false,
        // 表格字段显示配置
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
            prop: 'name',
            label: '分中心名称'
          },
          {
            prop: 'culturalCategory',
            label: '文化类别'
          },
          {
            prop: 'longitude',
            label: '经度'
          },
          {
            prop: 'latitude',
            label: '纬度'
          },
          {
            prop: 'remark',
            label: '备注'
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
            key: 'name',
            label: '分中心名称'
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
            key: 'longitude',
            label: '经度'
          },
          {
            type: 'text',
            key: 'latitude',
            label: '纬度'
          },
          {
            type: 'text',
            key: 'remark',
            label: '备注'
          }],
        personColumns: [
          {
            prop: 'lob',
            label: '工号'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'sex',
            label: '性别'
          },
          {
            prop: 'position',
            label: '职位'
          },
          {
            prop: 'remark',
            label: '备注'
          },
          {
            type: 'function',
            label: '操作',
            functionOpt: [
              {
                type: 'text',
                label: '编辑',
                func: this.personEdit
              }
            ]
          }
        ],
        personFormColumns: [
          {
            type: 'text',
            key: 'lob',
            label: '工号'
          },
          {
            type: 'text',
            key: 'name',
            label: '姓名'
          },
          {
            type: 'text',
            key: 'sex',
            label: '性别'
          },
          {
            type: 'text',
            key: 'position',
            label: '职位'
          },
          {
            type: 'text',
            key: 'remark',
            label: '备注'
          }
        ],
        pointColumns: [
          {
            type: 'index',
            label: '编号'
          },
          {
            props: 'name',
            label: '实践点名称'
          },
          {
            prop: 'longitude',
            label: '经度'
          },
          {
            prop: 'latitude',
            label: '纬度'
          }
        ],
        pointFormColumns: [
          {
            type: 'text',
            key: 'name',
            label: '实践点名称'
          },
          {
            type: 'text',
            key: 'longitude',
            label: '经度'
          },
          {
            type: 'text',
            key: 'latitude',
            label: '纬度'
          }
        ],
        formColumn: [
          {
            type: 'text',
            key: 'coding',
            label: '分中心编码',
            width: '100'
          },
          {
            type: 'text',
            key: 'name',
            label: '分中心名称',
            width: '100'
          },
         {
            type: 'text',
            key: 'longitude',
            label: '经度',
            width: '100'
         },
          {
            type: 'text',
            key: 'latitude',
            label: '纬度',
            width: '100'
          },
          {
            type: 'select',
            key: 'culturalCategory',
            label: '文化类别',
            width: '100',
            options: [
              {
                value: 'health',
                label: '健康'
              },
              {
                value: 'theory',
                label: '理论'
              }
            ]
          }
        ]
      };
    },
    mounted () {
      if (this.$refs.brother) {
        this.$refs.brother.tableData = [
          {
            coding: '111111',
            name: '111111',
            culturalCategory: '111111',
            longitude: '111111',
            latitude: '111111',
            remark: '111111'
          },
          {
            coding: '111111',
            name: '111111',
            culturalCategory: '111111',
            longitude: '111111',
            latitude: '111111',
            remark: '111111'
          },
          {
            coding: '111111',
            name: '111111',
            culturalCategory: '111111',
            longitude: '111111',
            latitude: '111111',
            remark: '111111'
          },
          {
            coding: '111111',
            name: '111111',
            culturalCategory: '111111',
            longitude: '111111',
            latitude: '111111',
            remark: '111111'
          },
          {
            coding: '111111',
            name: '111111',
            culturalCategory: '111111',
            longitude: '111111',
            latitude: '111111',
            remark: '111111'
          }
        ];
        this.$refs.brother.pageable = {
          total: 5,
          currentPage: 1,
          pageSize: 10
        };
      }
    },
    components: {
      CommonDialog,
      CommonTable,
      CommonSearch
    },
    methods: {
      switchTab () {
        if (this.activeName === 'center') {
        } else if (this.activeName === 'person') {
          if(this.$refs.brotherPersonDialog) {
            this.$refs.brotherPersonDialog.tableData = [
              {
                lob:'11111111111',
                name:'11111111111',
                sex:'11111111111',
                position:'11111111111',
                remark:'11111111111'
              },
              {
                lob:'11111111111',
                name:'11111111111',
                sex:'11111111111',
                position:'11111111111',
                remark:'11111111111'
              },
              {
                lob:'11111111111',
                name:'11111111111',
                sex:'11111111111',
                position:'11111111111',
                remark:'11111111111'
              },
              {
                lob:'11111111111',
                name:'11111111111',
                sex:'11111111111',
                position:'11111111111',
                remark:'11111111111'
              }
            ];
            this.$refs.brotherPersonDialog.pageable = {
              total: 5,
              currentPage: 1,
              pageSize: 10
            };
          }
        } else if (this.activeName === 'point') {

        }
      },
      traggerBrotherEvent(){
        this.$refs.brother && this.$refs.brother.loadTableData();
      },
      /**
       * 删除
       * */
      deleteRow (index,row) {
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
      },
      /**
       * 编辑
       */
      edit (index, row) {
        this.showDetail = true;
        if (this.$refs.brotherStableSearch){
          this.$refs.brotherStableSearch.form = row;
        }
      },
      /**
       * 人员管理编辑
       * */
      personEdit (index, row) {
        if (this.$refs.brotherPersonDialog) {
          this.$refs.brotherDialog.title = '编辑';
          this.$refs.brotherDialog.dialogVisible = true;
          this.$refs.brotherDialog.form = row;
        }
      },
      /**
       * 返回
       */
      back () {
        this.showDetail = false;
        this.$refs.brother && this.$refs.brother.loadTableData();
        this.$refs.brother.tableData = [
          {
            coding: '111111',
            name: '111111',
            culturalCategory: '111111',
            longitude: '111111',
            latitude: '111111',
            remark: '111111'
          },
          {
            coding: '111111',
            name: '111111',
            culturalCategory: '111111',
            longitude: '111111',
            latitude: '111111',
            remark: '111111'
          },
          {
            coding: '111111',
            name: '111111',
            culturalCategory: '111111',
            longitude: '111111',
            latitude: '111111',
            remark: '111111'
          },
          {
            coding: '111111',
            name: '111111',
            culturalCategory: '111111',
            longitude: '111111',
            latitude: '111111',
            remark: '111111'
          },
          {
            coding: '111111',
            name: '111111',
            culturalCategory: '111111',
            longitude: '111111',
            latitude: '111111',
            remark: '111111'
          }
        ];
        this.$refs.brother.pageable = {
          total: 5,
          currentPage: 1,
          pageSize: 10
        };
      },
      // 保存
      search () {
        console.log(11111);
        this.$alert('需要保存的接口', '提示', {
          dangerouslyUseHTMLString: true
        });
      }
    },
    watch: {
      activeName:{
        handler () {
          this.switchTab();
        }
      }
    }
  };
</script>

<style scoped lang="less">
.office-info{
  width:40%;
  margin-top:20px;
  .row-left{
    margin-left:100px;
  }
}
</style>
