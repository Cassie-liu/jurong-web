<template>
    <div class="base-data">
      <el-tabs v-model="activeName">
          <el-tab-pane name="planReview" label="计划审核">
            <CommonTable v-show="activeName === 'planReview'" :columns="planColumns"  ref="planReviewTable" api-root="record/page"></CommonTable>
          </el-tab-pane>
        <el-tab-pane name="activeQuery" label="活动状态">
          <CommonDialog :form-columns="queFormColumns"  :show-btn="false" :disabled="true" ref="activeQueryDialog"></CommonDialog>
          <CommonTable v-show="activeName === 'activeQuery'" :columns="queryColumns"  ref="activeQueryTable"></CommonTable>
        </el-tab-pane>
        <el-tab-pane name="activityReview" label="活动审核">
          <CommonDialog :form-columns="actFormColumns" ref="activityReviewDialog" :show-btn="false" @submit="submitOption"></CommonDialog>
          <CommonTable v-if="activeName === 'activityReview'" :columns="activityColumns"  ref="planReviewTable" api-root="record/domain/page"></CommonTable>
        </el-tab-pane>
        <el-tab-pane name="statistics" label="活动统计">

        </el-tab-pane>
      </el-tabs>
      <el-dialog title="审核" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="reviewForm">
          <el-form-item label="审核结果" label-width="100px">
            <el-select v-model="reviewForm.reviewStatus" placeholder="请选择审核结果">
              <el-option label="通过" value="pass"></el-option>
              <el-option label="不通过" value="reject"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import reqType from '@/api/reqType';
  import {getUserInfo} from '../factories/commonFunc';
    export default {
        name: 'StopActManage',
        props: [],
        data () {
          return {
            activeName: 'planReview',
            queryColumns: [
              {
                type: 'index',
                label: '序号',
              },
              {
                prop: 'name',
                label: '活动标题'
              },
              {
                prop:'activityType',
                label: '活动类型'
              },
              {
                prop: 'des',
                label: '活动内容'
              },
              {
                prop: 'beginAt',
                label: '开始时间'
              },
              {
                prop: 'endAt',
                label: '截止时间'
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
                    label: '附件下载',
                    func: this.downLoad
                  }
                ]
              }
            ],
            queFormColumns: [],
            culturalCategory:[],
            dialogFormVisible: false,
            reviewForm: {},
            planColumns: [
              {
                prop: 'villageStation',
                label: '村站',
                fixed: 'fixed'
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
                prop: 'score',
                label: '积分'
              },
              {
                prop: 'startTime',
                label: '开始时间'
              },
              {
                prop: 'endTime',
                label: '截止时间'
              },
              {
                prop: 'remark',
                label: '备注'
              },
              {
                type: 'function',
                label: '操作',
                fixed: 'fixed',
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
            activityColumns: [
              {
                prop: 'creator.name',
                label: '村站',
                fixed: 'fixed',
              },
              {
                prop: 'activity.name',
                label: '活动名称'
              },
              {
                prop: 'activity.type',
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
                prop: 'status',
                label: '审核状态'
              },
              {
                prop: 'score',
                label: '积分'
              },
              {
                prop: 'startAt',
                label: '开始时间'
              },
              {
                prop: 'endAt',
                label: '完成时间'
              },
              {
                prop: 'remark',
                label: '备注'
              },
              {
                type: 'function',
                label: '操作',
                fixed: 'right',
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
            actFormColumns: []
          };
        },
        mounted () {
          this.culturalCategory = getUserInfo();
          if (this.activeName === 'activeQuery') {
            this.queFormColumns = [
              {
                type: 'text',
                key: 'name',
                label: '活动标题'
              },
              {
                type: 'select',
                key: 'activityType',
                label: '文化类别',
                showDefault: true,
                options: this.culturalCategory
              },
              {
                type: 'datePicker',
                key: 'beginAt',
                label: '开始时间'
              },
              {
                type: 'datePicker',
                key: 'endAt',
                label: '截止时间'
              },
              {
                type: 'editor',
                key: 'des',
                label: '活动内容'
              }
            ];
          }
        },
        components: {
          CommonTable,
          CommonDialog
        },
        methods: {
          /**
           * 切换tab
           * */
          switchTab(){
            if (this.activeName === 'activeQuery') {
              this.queFormColumns = [
                {
                  type: 'text',
                  key: 'name',
                  label: '活动标题'
                },
                {
                  type: 'select',
                  key: 'activityType',
                  label: '文化类别',
                  showDefault: true,
                  options: this.culturalCategory
                },
                {
                  type: 'datePicker',
                  key: 'beginAt',
                  label: '开始时间'
                },
                {
                  type: 'datePicker',
                  key: 'endAt',
                  label: '截止时间'
                },
                {
                  type: 'editor',
                  key: 'des',
                  label: '活动内容'
                }
              ];
            } else if (this.activeName === 'activityReview'){
              this.actFormColumns = [
                {
                  type: 'text',
                  key: 'name',
                  label: '活动标题',
                  disabled: true
                },
                {
                  type: 'select',
                  key: 'culturalCategory',
                  label: '文化类别',
                  options: this.culturalCategory,
                  disabled: true
                },
                {
                  type: 'datePicker',
                  key: 'startAt',
                  disabled: true,
                  label: '开始时间'
                },
                {
                  type: 'datePicker',
                  key: 'endAt',
                  disabled: true,
                  label: '截止时间'
                },
                {
                  type: 'textarea',
                  key: 'des',
                  disabled: true,
                  label: '活动内容'
                },
                {
                  type: 'carousel',
                  key: 'picture',
                  label: '图片',
                  options: [
                    {
                      value: '',
                      key: ''
                    }
                  ]
                },
                {
                  type:'text',
                  key: 'score',
                  label: '积分'
                },
                {
                  type: 'textarea',
                  key: 'description',
                  label: '活动描述',
                  disabled: true,
                },
                {
                  type: 'select',
                  key: 'isSpecial',
                  label: '推荐为特色活动',
                  options:[
                    {
                      value: true,
                      label: '是'
                    },
                    {
                      value: false,
                      label: '否'
                    }
                  ]
                },
                {
                  type: 'select',
                  key: 'result',
                  label: '审核结果',
                  options: [
                    {
                      value: 'pass',
                      label: '通过'
                    },
                    {
                      value: 'reject',
                      label: '不通过'
                    }
                  ]
                },
                {
                  type: 'editor',
                  key: 'remark',
                  label: '备注',
                  disabled: true,
                }
              ];
            }
          },
          /**
           * 查看
           * */
          showDetails(index, row){
            if(this.$refs.activeQueryDialog){
              this.$refs.activeQueryDialog.dialogVisible = true;
              this.$refs.activeQueryDialog.title = '查看';
              this.$refs.activeQueryDialog.form = row;
            }
          },
          /**
           * 附件下载
           * */
          downLoad (index, row) {
            this.$alert('需要附件下载的接口', '提示', {
              dangerouslyUseHTMLString: true
            });
          },
          /**
           * 审核
           * */
          review(index,row){
            if (this.activeName === 'planReview') {
              this.dialogFormVisible = true;
            } else if(this.activeName === 'activityReview') {
              if(this.$refs.activityReviewDialog) {
                this.$refs.activityReviewDialog.title = '审核';
                this.$refs.activityReviewDialog.form = row;
                this.$refs.activityReviewDialog.dialogVisible = true;
              }
            }
          },
          deleteRow(index,row){
            this.$confirm('确认删除？')
              .then(_ => {
                // this.$http(reqType.DELETE,`activity/${row.id}`)
                //   .then(data => {
                //     this.$refs.formulateTable.loadTableData();
                //   });
                this.$alert('需要删除的接口', '提示', {
                  dangerouslyUseHTMLString: true
                });
              })
              .catch(_ => {});
          },
          submitOption(form) {
            form.status = 'RECORD_TOWN_PASSED';
            if (form.result === 'reject') {
              form.status = 'RECORD_REJECTED';
            }
            this.$http(reqType.PUT, `record/${form.id}`, form).then(() => {
              this.$message({
                type: "success",
                message: "上传成功！"
              });
              this.$refs.planReviewTable.loadTableData();
            })
          }
        },
      watch: {
          activeName: {
            handler(){
              this.switchTab();
            }
          }
      }
    };
</script>

<style scoped lang="less">
.base-data{
  padding: 0 15px 15px;
}
</style>
