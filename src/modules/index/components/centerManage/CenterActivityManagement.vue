<template>
  <div>
      <el-tabs v-model="activeName">
        <el-tab-pane name="formulate" label="活动制定">
          <!--todo:需要配置权限(管理员没有新增的权限)-->
          <el-row v-show="showBtn">
            <el-button plain disabled>新增</el-button>
          </el-row>
          <el-row>
            <el-button class="fr" @click="publishDialogVisible = true">发布</el-button>
          </el-row>
          <CommonDialog :form-columns="formColumns" ref="formulateDialog" :show-btn="!showBtn"></CommonDialog>
          <CommonTable  :columns="columns" :api-root="'center'" ref="formulateTable"></CommonTable>
        </el-tab-pane>
        <el-tab-pane name="planReview" label="计划审核">
          <CommonStableTable :columns="planColumns" :merge-field="'id'" ref="planTable"></CommonStableTable>
        </el-tab-pane>
        <el-tab-pane name="activityReview" label="活动审核">

        </el-tab-pane>
        <el-tab-pane name="statistics" label="活动统计">

        </el-tab-pane>
      </el-tabs>
    <!--发布弹框-->
     <el-dialog title="发布" :visible.sync="publishDialogVisible">
     <div class="center">
       <el-transfer
         v-model="publishList"
         :titles="['选择活动', '发布活动']"
         :data="ActivityList">
       </el-transfer>
     </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="publishDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="publishActivity">发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Editor from '../../../../common/components/Editor';
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import CommonStableTable from '../common/CommonStableTable';
    export default {
        name: 'CenterActivityManagement',
        data () {
          return {
            activeName: 'formulate',
            text: '',
            columns: [
              {
                type: 'index',
                label: '序号',
              },
              {
                prop: 'title',
                label: '活动标题'
              },
              {
                prop: 'culturalCategory',
                label: '文化类别'
              },
              {
                prop: 'content',
                label: '活动内容'
              },
              {
                prop: 'startTime',
                label: '开始时间'
              },
              {
                prop: 'endTime',
                label: '结束时间'
              },
              {
                prop: 'score',
                label: '积分'
              },
              {
                type: 'function',
                label: '操作',
                functionOpt: [
                  {
                    type: 'text',
                    label: '查看',
                    func: this.showDetails
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
            formColumns: [
              {
                type: 'text',
                key: 'title',
                label: '活动标题'
              },
              {
                type: 'select',
                key: 'culturalCategory',
                label: '文化类别'
              },
              {
                type: 'datePicker',
                key: 'startTime',
                label: '开始时间'
              },
              {
                type: 'datePicker',
                key: 'endTime',
                label: '结束时间'
              },
              {
                type: 'editor',
                key: 'content',
                label: '活动内容'
              }
            ],
            publishDialogVisible: false,
            ActivityList: [],
            publishList: [],
            showBtn: false,
            planColumns: [
              {
                prop: 'town',
                label: '镇所'
              },
              {
                prop: 'villageStation',
                label: '村站'
              },
              {
                prop: 'activityName',
                label: '活动名称'
              },
              {
                prop: 'culturalCategory',
                label: '文化类别'
              },
              {
                prop: 'content',
                label: '活动内容'
              },
              {
                prop: 'practicePoint',
                label: '执行实践点'
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
                    label: '审核',
                    func: this.review
                  },
                  {
                    type: 'text',
                    label: '删除',
                    func: this.deleteRow
                  }
                ]
              }
            ],
          };
        },
      components: {
        Editor,
        CommonTable,
        CommonDialog,
        CommonStableTable
      },
      mounted () {
        if (this.activeName === 'formulate') {
          if(this.$refs.formulateTable) {
            this.$refs.formulateTable.tableData = [
              {
                title: '活动1',
                culturalCategory: '文化类别1',
                content: '内容1',
                startTime: '2018-11-11 12:00:00',
                endTime: '2018-12-11 12:00:00',
                score: '9',
              },
              {
                title: '活动1',
                culturalCategory: '文化类别1',
                content: '内容1',
                startTime: '2018-11-11 12:00:00',
                endTime: '2018-12-11 12:00:00',
                score: '9',
              },
              {
                title: '活动1',
                culturalCategory: '文化类别1',
                content: '内容1',
                startTime: '2018-11-11 12:00:00',
                endTime: '2018-12-11 12:00:00',
                score: '9',
              }
            ];
            this.$refs.formulateTable.pageable = {
              total: 3,
              currentPage: 1,
              pageSize: 10
            }
          }
          this.ActivityList = this.generateData();
        }
      },
      methods: {
          /**
           * 切换tab
           * */
        switchTab(){
          if (this.activeName === 'planReview') {
            if (this.$refs.planTable) {
              this.$refs.planTable.loadTableData();
            }
          }
        },
          /**
           * 查看
           * */
        showDetails (index,row) {
          if (this.$refs.formulateDialog) {
            this.$refs.formulateDialog.disabled = true;
            this.$refs.formulateDialog.dialogVisible = true;
            this.$refs.formulateDialog.form = row;
          }
        },
        /**
         * 编辑
         * */
        edit (index, row) {
          if (this.$refs.formulateDialog) {
            this.$refs.formulateDialog.dialogVisible = true;
            this.$refs.formulateDialog.form = row;
          }
        },
        /**
        * 删除
        * */
        deleteRow(index, row) {
          this.$alert('需要删除的接口', '提示', {
            dangerouslyUseHTMLString: true
          });
        },
        /**
         * 增加
         * */
        add () {
          if (this.$refs.formulateDialog) {
            console.log(this.$refs.formulateDialog.form);
          }
        },
        /**
         * 生成数据
         * */
        generateData  () {
          const data = [];
          for (let i = 1; i <= 15; i++) {
            data.push({
              key: i,
              label: `活动 ${ i }`,
              disabled: i % 4 === 0
            });
          }
          return data;
        },
        /**
         *  发布活动
         * */
        publishActivity(){
          this.publishDialogVisible = false;
          this.$alert('需要发布活动的接口', '提示', {
            dangerouslyUseHTMLString: true
          });
        },
        /**
         * 保存活动
         * */
        saveActivity () {

        },
        /*
        * 审核*/
        review () {

        }
      },
      watch: {
          activeName: {
            handler () {
              this.switchTab();
            }
          }
      }
    }
</script>

<style scoped lang="less">
.center{
  margin-left:15%;
}
</style>
