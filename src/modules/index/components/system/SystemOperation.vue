<template>
  <div class="system-operation">
    <el-tabs v-model="activeName">
        <el-tab-pane label="账号管理" name="account">
          <CommonCRUD :columns="accountColumns" api-root="principal" :form-columns="accountFormColumns"></CommonCRUD>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="role">
          <div v-show="!showAuth">
            <CommonDialog ref="brotherRoleDialog" :form-columns="roleFormColumns" @submit="traggerBrotherEvent" :show-btn="true"></CommonDialog>
            <commonTable  api-root="role" :columns="roleColumns" ref="brotherRole"></commonTable>
          </div>
          <el-button icon="el-icon-back" type="text" @click="back" v-show="showAuth">返回</el-button>
          <Authorise v-show="showAuth" :roleId="roleId"></Authorise>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import CommonSearch from '../common/CommonSearch';
  import CommonCRUD from '../common/CommonCRUD';
  import Authorise from './Authorise';
  import resType from '@/api/reqType';

  export default {
    name: 'SystemOperation',

    data () {
      return {
        activeName: 'account',
        showAuth: false,
        accountColumns: [
          {
            prop: 'code',
            label: '登录名'
          },
          {
            prop: 'name',
            label: '账号名称'
          },
          {
            prop: 'roleName',
            label: '关联角色'
          },
          {
            prop: 'orgName',
            label: '所属组织'
          }
        ],
        accountFormColumns: [
          {
            type: 'text',
            key: 'code',
            label: '登录名称'
          },
          {
            type: 'text',
            key: 'name',
            label: '账号名称'
          },
          {
            type: 'text',
            key: 'password',
            label: '密码'
          },
          {
            type: 'select',
            key: 'roleId',
            label: '关联角色',
            options: []
          },
          {
            type: 'select',
            key: 'orgId',
            label: '所属组织',
            options: []
          },
          {
            type: 'select',
            key: 'type',
            label: '组织类型',
            options: [{
              value: 'ORG_CENTER',
              label: '分中心类型'
            },
            {
              value: 'ORG_ROOM',
              label: '功能室类型'
            },
            {
              value: 'ORG_COUNTRY',
              label: '村站类型'
            }]
          }
        ],
        roleColumns: [
          {
            prop: 'code',
            label: '编码'
          },
          {
            prop: 'name',
            label: '角色名称'
          },
          {
            prop: 'createdBy',
            label: '创建人'
          },
          {
            prop: 'createdAt',
            label: '创建时间'
          },
          {
            prop: 'modifiedAt',
            label: '修改时间'
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
            key: 'code',
            label: '编码'
          },
          {
            type: 'text',
            key: 'name',
            label: '角色名称'
          }
        ],
        roleId: ''
      };
    },
    components: {
      CommonTable,
      CommonDialog,
      CommonSearch,
      Authorise,
      CommonCRUD
    },

    mounted () {
      if (this.activeName === 'account') {
        this.$http(resType.POST, `role/list`, false).then(
          data => {
            this.accountFormColumns[3].options = data.map(item => {
              return { label: item.name, value: item.id };
            });
          }
        );
        this.$http(resType.POST, `orgCenter/list`, false).then(
          data => {
            this.accountFormColumns[4].options = data.map(item => {
              return { label: item.name, value: item.id };
            });
          }
        );
        this.$http(resType.POST, `orgRoom/list`, false).then(
          data => {
            this.accountFormColumns[4].options = this.accountFormColumns[4].options.concat(data.map(item => {
              return { label: item.name, value: item.id };
            }));
          }
        );
        this.$http(resType.POST, `country/list`, false).then(
          data => {
            this.accountFormColumns[4].options = this.accountFormColumns[4].options.concat(data.map(item => {
              return { label: item.name, value: item.id };
            }));
          }
        );
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
        } else if (this.activeName === 'role') {
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
      setAuthorise (index, row) {
        this.roleId = row.id;
        this.showAuth = true;
      },
      /**
       * 返回
       * */
      back () {
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
                total: 3,
                currentPage: 1,
                pageSize: 10
              };
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
            total: 3,
            currentPage: 1,
            pageSize: 10
          };
        }
      }
    },

    computed: {

    },

    watch: {
      activeName: {
        handler () {
          this.switchTab();
        }
      }
    }
  };
</script>

<style lang="less" scoped>
.system-operation {
  padding:15px;
}
</style>
