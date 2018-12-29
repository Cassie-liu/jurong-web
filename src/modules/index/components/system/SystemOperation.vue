<template>
  <div class="system-operation">
    <el-tabs v-model="activeName">
        <el-tab-pane label="账号管理" name="account">
          <CommonDialog ref="brotherDialog" :form-columns="accountFormColumns" @submit="traggerBrotherEvent" :show-btn="true"></CommonDialog>
          <commonTable  :api-root="'center'" :columns="accountColumns" ref="brother"></commonTable>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="role">
          <div v-show="!showAuth">
            <CommonDialog ref="brotherRoleDialog" :form-columns="roleFormColumns" @submit="traggerBrotherEvent" :show-btn="true"></CommonDialog>
            <commonTable  :api-root="'center'" :columns="roleColumns" ref="brotherRole"></commonTable>
          </div>
          <el-button icon="el-icon-back" type="text" @click="back" v-show="showAuth">返回</el-button>
          <Authorise v-show="showAuth"></Authorise>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import CommonSearch from '../common/CommonSearch';
  import Authorise from './Authorise';
  export default {
    name: 'SystemOperation',

    data () {
      return {
        activeName: 'account',
        showAuth: false,
        accountColumns: [
          {
            type: 'index',
            label: '序号'
          },
          {
            prop: 'accountName',
            label: '账号名称',
          },
          {
            prop: 'associatedRole',
            label: '关联角色',
          },
          {
            prop: 'createdBy',
            label: '创建人',
          },
          {
            prop: 'createdAt',
            label: '创建时间',
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
        accountFormColumns: [
          {
            type: 'text',
            key: 'accountName',
            label: '账号名称'
          },
          {
            type: 'select',
            key: 'associatedRole',
            label: '关联角色',
            option: [
              {
                value: '角色1',
                label: '角色1'
              },
              {
                value: '角色2',
                label: '角色2'
              },
              {
                value: '角色3',
                label: '角色3'
              }
            ]
          }
        ],
        roleColumns: [
          {
            type: 'index',
            label: '序号'
          },
          {
            prop: 'coding',
            label: '编码',
          },
          {
            prop: 'roleName',
            label: '角色名称',
          },
          {
            prop: 'createdBy',
            label: '创建人',
          },
          {
            prop: 'createdAt',
            label: '创建时间',
          },
          {
            prop: 'modifiedAt',
            label: '修改时间',
          },
          {
            type: 'function',
            label: '操作',
            functionOpt: [
              {
                type: 'text',
                label: '权限设置',
                func: this.setAuthorise
              },
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
        roleFormColumns: [
          {
            type: 'text',
            key: 'coding',
            label: '编码'
          },
          {
            type: 'text',
            key: 'roleName',
            label: '角色名称'
          }
        ]
      };
    },
    components: {
      CommonTable,
      CommonDialog,
      CommonSearch,
      Authorise
    },

    mounted () {
      if (this.activeName === 'account') {
        if(this.$refs.brother){
          this.$refs.brother.tableData = [
            {
              accountName: '111111',
              associatedRole: '111111',
              createdBy: '111111',
              createdAt: '111111'
            },
            {
              accountName: '111111',
              associatedRole: '111111',
              createdBy: '111111',
              createdAt: '111111'
            },
            {
              accountName: '111111',
              associatedRole: '111111',
              createdBy: '111111',
              createdAt: '111111'
            }
          ];
          this.$refs.brother.pageable = {
            total:3,
            currentPage:1,
            pageSize: 10
          }
        }
      }
    },

    methods: {
      /**
      *  编辑
      * */
      edit (index, row) {
        if (this.activeName === 'account') {
          if (this.$refs.brotherDialog) {
            this.$refs.brotherDialog.title = '编辑';
            this.$refs.brotherDialog.dialogVisible = true;
            this.$refs.brotherDialog.form = row;
          }
        } else if(this.activeName === 'role') {
          if (this.$refs.brotherRoleDialog) {
            this.$refs.brotherRoleDialog.title = '编辑';
            this.$refs.brotherRoleDialog.dialogVisible = true;
            this.$refs.brotherRoleDialog.form = row;
          }
        }
      },
      /**
       * 删除
       * */
      deleteRow () {
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
       * 触发事件
       * */
      traggerBrotherEvent () {
        if (this.activeName === 'account') {
          this.$refs.brotherDialog.title = '新增';
          this.$refs.brotherDialog.form = {};
          this.$refs.brother && this.$refs.brother.loadTableData();
        }
      },
      /**
      * 权限设置
      * **/
      setAuthorise () {
        this.showAuth = true;
      },
      /**
       * 返回
       * */
      back() {
        this.showAuth = false;
      },
      switchTab () {
        if (this.activeName === 'account') {
            if (this.$refs.brother) {
              this.$refs.brother.loadTableData();
              this.$refs.brother.tableData = [
                {
                  accountName: '111111',
                  associatedRole: '111111',
                  createdBy: '111111',
                  createdAt: '111111'
                },
                {
                  accountName: '111111',
                  associatedRole: '111111',
                  createdBy: '111111',
                  createdAt: '111111'
                },
                {
                  accountName: '111111',
                  associatedRole: '111111',
                  createdBy: '111111',
                  createdAt: '111111'
                }
              ];
              this.$refs.brother.pageable = {
                total:3,
                currentPage:1,
                pageSize: 10
              }
            }
        } else if (this.activeName === 'role') {
          this.showAuth = false;
          this.$refs.brotherRole.loadTableData();
          this.$refs.brotherRole.tableData = [
            {
              coding: '111111',
              roleName: '111111',
              createdBy: '111111',
              createdAt: '111111',
              modifiedAt: '111111'
            },
            {
              coding: '111111',
              roleName: '111111',
              createdBy: '111111',
              createdAt: '111111',
              modifiedAt: '111111'
            },
            {
              coding: '111111',
              roleName: '111111',
              createdBy: '111111',
              createdAt: '111111',
              modifiedAt: '111111'
            }
          ];
          this.$refs.brotherRole.pageable = {
            total:3,
            currentPage:1,
            pageSize: 10
          }
        }
      }
    },

    computed: {

    },

    watch: {
      activeName :{
        handler () {
          this.switchTab();
        }
      }
    }
  };
</script>

<style lang="less" scoped>

</style>
