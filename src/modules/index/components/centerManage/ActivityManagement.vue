<template>
    <div class="base-data">
      <el-tabs v-model="activeName">
        <el-tab-pane label="活动发布" name="publish">
            <CommonDialog ref="brotherDialog" :form-columns="publishFormColumns" @submit="traggerBrotherEvent" :show-btn="true"></CommonDialog>
            <commonTable  :api-root="'center'" :columns="publishColumns" ref="brother"></commonTable>
        </el-tab-pane>
        <el-tab-pane label="固选活动审核" name="stable">
            <CommonSearch :columns="stableFormColumns"  @search="search" :inline="true" ref="brotherStableSearch" :title="'搜索'"></CommonSearch>
            <commonTable  :api-root="'center'" :columns="stableColumns" ref="brotherStable" @search="searchBrother"></commonTable>
        </el-tab-pane>
        <el-tab-pane label="自选活动审核" name="optional">
            <CommonSearch :columns="stableFormColumns"  @search="search" :inline="true" ref="brotherOptionalSearch" :title="'搜索'"></CommonSearch>
            <CommonTable  :api-root="'center'" :columns="optionalActColumns" ref="brotherOptional" @search="searchBrother"></CommonTable>
        </el-tab-pane>
        <el-tab-pane label="活动统计" name="statistics">
            <CommonSearch :columns="statisticsFormColumns"  @search="search" :inline="true" ref="brotherStatisticsSearch" :title="'搜索'"></CommonSearch>
            <CommonTable  :api-root="'center'" :columns="statisticsColumns" ref="brotherStatistics" @search="searchBrother"></CommonTable>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import CommonSearch from '../common/CommonSearch';
    export default {
        name: 'ActivityManagement',
      components: {
          CommonTable,
          CommonDialog,
          CommonSearch
      },
      props: [],
        data () {
          return {
            activeName: 'publish',
            publishColumns: [
              {
                type: 'index',
                label: '序号'
              },
              {
                prop: 'coding',
                label: '活动编码',
              },
              {
                prop: 'publishIssued',
                label: '发布单位',
              },
              {
                prop: 'culturalCategory',
                label: '文化类别',
              },
              {
                prop: 'activityName',
                label: '活动名称',
              },
              {
                prop: 'activityContent',
                label: '活动内容',
              },
              {
                prop: 'targetScore',
                label: '目标分值'
              },
              {
                prop: 'deadline',
                label: '截止时间'
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
                  }
                ]
              }
            ],
            publishFormColumns: [
              {
                type: 'text',
                key: 'coding',
                label: '活动编码',
              },
              {
                type: 'text',
                key: 'publishIssued',
                label: '发布单位',
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
                type: 'textarea',
                key: 'activityName',
                label: '活动名称',
              },
              {
                type: 'text',
                key: 'activityContent',
                label: '活动内容',
              },
              {
                type: 'text',
                key: 'targetScore',
                label: '目标分值'
              },
              {
                type: 'text',
                key: 'deadline',
                label: '截止时间'
              }
            ],
            stableColumns: [
              {
                type: 'index',
                label: '序号'
              },
              {
                prop: 'publishIssued',
                label: '发布单位',
              },
              {
                prop: 'culturalCategory',
                label: '文化类别',
              },
              {
                prop: 'activityName',
                label: '活动名称',
              },
              {
                prop: 'executionStation',
                label: '执行所站',
              },
              {
                prop: 'executionVillageStation',
                label: '执行村站',
              },
              {
                prop: 'practicePoint',
                label: '执行实践点',
              },
              {
                prop: 'targetScore',
                label: '目标分值'
              },
              {
                prop: 'actualScore',
                label: '实际分值'
              },
              {
                prop: 'deadline',
                label: '截止时间'
              },
              {
                prop: 'completeTime',
                label: '完成时间'
              },
              {
                prop: 'approvalStatus',
                label: '审核状态'
              },
              {
                prop: 'approvalResult',
                label: '审核结果'
              },
              {
                type: 'function',
                label: '操作',
                functionOpt: [
                  {
                    type: 'text',
                    label: '审核',
                    func: this.approve
                  }
                ]
              }
            ],
            stableFormColumns: [
              {
                type: 'select',
                key: 'executionVillageStation',
                label: '选择所站',
                options: [
                  {
                    value: '所站1',
                    key: '所站1'
                  },
                  {
                    value: '所站2',
                    key: '所站3'
                  },
                  {
                    value: '所站4',
                    key: '所站5'
                  }
                ]
              },
              {
                type: 'select',
                key: 'executionStation',
                label: '选择村站',
                options: [
                  {
                    value: '村站1',
                    key: '村站1'
                  },
                  {
                    value: '村站2',
                    key: '村站2'
                  },
                  {
                    value: '村站3',
                    key: '村站3'
                  }
                ]
              },
              {
                type: 'select',
                key: 'culturalCategory',
                label: '文化类别',
                options: [
                  {
                    value: '文化类别1',
                    key: '文化类别1'
                  },
                  {
                    value: '文化类别2',
                    key: '文化类别2'
                  },
                  {
                    value: '文化类别3',
                    key: '文化类别3'
                  }
                ]
              },
              {
                type: 'select',
                key: 'approvalStatus',
                label: '审核状态',
                options: [
                  {
                    value: '已审核',
                    key: '已审核'
                  },
                  {
                    value: '未审核',
                    key: '未审核'
                  }
                ]
              },
              {
                type: 'text',
                key: 'coding',
                label: '活动编码',
              },
              {
                type: 'select',
                key: 'approvalResult',
                label: '审核结果',
                options: [
                  {
                    value: '拒绝',
                    key: 'reject'
                  },
                  {
                    value: '通过',
                    key: 'pass'
                  }
                ]
              }
            ],
            optionalActColumns: [
              {
                type: 'index',
                label: '序号'
              },
              {
                prop: 'launchVillageStation',
                label: '发起村站',
              },
              {
                prop: 'coding',
                label: '活动编码',
              },
              {
                prop: 'culturalCategory',
                label: '文化类别',
              },
              {
                prop: 'activityName',
                label: '活动名称',
              },
              {
                prop: 'ownStation',
                label: '所属所站',
              },
              {
                prop: 'executionVillageStation',
                label: '预计完成时间',
              },
              {
                prop: 'approvalStatus',
                label: '审核状态'
              },
              {
                prop: 'approvalResult',
                label: '审核结果'
              },
              {
                type: 'function',
                label: '操作',
                functionOpt: [
                  {
                    type: 'text',
                    label: '审核',
                    func: this.approveOpt
                  }
                ]
              }
            ],
            statisticsColumns: [
              {
                type: 'index',
                label: '序号'
              },
              {
                prop: 'coding',
                label: '活动编码',
              },
              {
                prop: 'publishIssued',
                label: '发布单位',
              },
              {
                prop: 'culturalCategory',
                label: '文化类别',
              },
              {
                prop: 'activityName',
                label: '活动名称',
              },
              {
                prop: 'executionStation',
                label: '执行所站',
              },
              {
                prop: 'executionVillageStation',
                label: '执行村站',
              },
              {
                prop: 'practicePoint',
                label: '执行实践点',
              },
              {
                prop: 'completeStatus',
                label: '完成状态'
              },
              {
                prop: 'isSpecialAActivity',
                label: '是否为特色活动',
              },
              {
                type: 'function',
                label: '操作',
                functionOpt: [
                  {
                    type: 'text',
                    label: '查看',
                    func: this.detailForStatistics
                  }
                ]
              }
            ],
            statisticsFormColumns: [
              {
                type: 'select',
                key: 'executionVillageStation',
                label: '选择所站',
                options: [
                  {
                    value: '所站1',
                    key: '所站1'
                  },
                  {
                    value: '所站2',
                    key: '所站3'
                  },
                  {
                    value: '所站4',
                    key: '所站5'
                  }
                ]
              },
              {
                type: 'select',
                key: 'executionStation',
                label: '选择村站',
                options: [
                  {
                    value: '村站1',
                    key: '村站1'
                  },
                  {
                    value: '村站2',
                    key: '村站2'
                  },
                  {
                    value: '村站3',
                    key: '村站3'
                  }
                ]
              },
              {
                type: 'select',
                key: 'culturalCategory',
                label: '文化类别',
                options: [
                  {
                    value: '文化类别1',
                    key: '文化类别1'
                  },
                  {
                    value: '文化类别2',
                    key: '文化类别2'
                  },
                  {
                    value: '文化类别3',
                    key: '文化类别3'
                  }
                ]
              },
              {
                type: 'select',
                key: 'completeStatus',
                label: '完成状态',
                options: [
                  {
                    value: '已完成',
                    key: '已完成'
                  },
                  {
                    value: '未完成',
                    key: '未完成'
                  }
                ]
              },
              {
                type: 'select',
                key: 'practicePoint',
                label: '选择实践点',
                options: [
                  {
                    value: '实践点1',
                    key: '实践点1'
                  },
                  {
                    value: '实践点2',
                    key: '实践点2'
                  },
                  {
                    value: '实践点3',
                    key: '实践点3'
                  }
                ]
              },
              {
                type: 'select',
                key: 'approvalResult',
                label: '是否为特色活动',
                options: [
                  {
                    value: '是',
                    key: 'yes'
                  },
                  {
                    value: '否',
                    key: 'no'
                  }
                ]
              }
            ],
          };
        },
        mounted () {
          if (this.activeName === 'publish') {
            this.$refs.brother.tableData = [
             {
               coding: '111111',
               publishIssued: '111111',
               culturalCategory: '文化类别1',
               activityName: '111111',
               activityContent: '111111',
               targetScore: '111111',
               deadline: '111111'
             },
             {
               coding: '111111',
               publishIssued: '111111',
               culturalCategory: '文化类别1',
               activityName: '111111',
               activityContent: '111111',
               targetScore: '111111',
               deadline: '111111'
             },
             {
               coding: '111111',
               publishIssued: '111111',
               culturalCategory: '文化类别1',
               activityName: '111111',
               activityContent: '111111',
               targetScore: '111111',
               deadline: '111111'
             }
            ];
            this.$refs.brother.pageable = {
              total: 3,
              currentPage: 1,
              pageSize: 10
            }
          }
        },
        comments: {
          CommonTable
        },
        methods: {
          /**
           *  切换tab
           * */
          switchTab() {
            if (this.activeName === 'publish') {
              this.$refs.brother && this.$refs.brother.loadTableData();
              // dummy数据
              if (this.$refs.brother) {
                this.$refs.brother.tableData = [
                  {
                    coding: '111111',
                    publishIssued: '111111',
                    culturalCategory: '文化类别1',
                    activityName: '111111',
                    activityContent: '111111',
                    targetScore: '111111',
                    deadline: '111111'
                  },
                  {
                    coding: '111111',
                    publishIssued: '111111',
                    culturalCategory: '文化类别1',
                    activityName: '111111',
                    activityContent: '111111',
                    targetScore: '111111',
                    deadline: '111111'
                  },
                  {
                    coding: '111111',
                    publishIssued: '111111',
                    culturalCategory: '文化类别1',
                    activityName: '111111',
                    activityContent: '111111',
                    targetScore: '111111',
                    deadline: '111111'
                  }
                ];
                this.$refs.brother.pageable = {
                  total: 3,
                  currentPage: 1,
                  pageSize: 10
                }
              }
            } else if (this.activeName === 'stable') {
              this.$refs.brotherStable && this.$refs.brotherStable.loadTableData();
              this.$refs.brotherStableSearch.form = {};
              // dummy数据
              if(this.$refs.brotherStable) {
                this.$refs.brotherStable.tableData = [
                  {
                    publishIssued: '111111',
                    culturalCategory: '文化类别1',
                    activityName: '111111',
                    executionStation: '11111111',
                    executionVillageStation: '11111111',
                    practicePoint: '111111',
                    targetScore: '111111',
                    actualScore: '111111',
                    completeTime: '111111',
                    deadline: '111111',
                    approvalStatus: '111111',
                    approvalResult: '111111'
                  },
                  {
                    publishIssued: '111111',
                    culturalCategory: '文化类别1',
                    activityName: '111111',
                    executionStation: '11111111',
                    executionVillageStation: '11111111',
                    practicePoint: '111111',
                    targetScore: '111111',
                    actualScore: '111111',
                    completeTime: '111111',
                    deadline: '111111',
                    approvalStatus: '111111',
                    approvalResult: '111111'
                  },
                  {
                    publishIssued: '111111',
                    culturalCategory: '文化类别1',
                    activityName: '111111',
                    executionStation: '11111111',
                    executionVillageStation: '11111111',
                    practicePoint: '111111',
                    targetScore: '111111',
                    actualScore: '111111',
                    completeTime: '111111',
                    deadline: '111111',
                    approvalStatus: '111111',
                    approvalResult: '111111'
                  }
                ];
                this.$refs.brotherStable.pageable = {
                  total: 3,
                  currentPage: 1,
                  pageSize: 10
                };
              }
            } else if (this.activeName === 'optional') {
              this.$refs.brotherOptional && this.$refs.brotherOptional.loadTableData();
              this.$refs.brotherOptionalSearch.form = {};
              // dummy数据
              if(this.$refs.brotherOptional) {
                this.$refs.brotherOptional.tableData = [
                  {
                    launchVillageStation: '111111',
                    coding: '文化类别1',
                    culturalCategory: '111111',
                    activityName: '11111111',
                    ownStation: '11111111',
                    executionVillageStation: '111111',
                    approvalStatus: '111111',
                    approvalResult: '111111'
                  },
                  {
                    launchVillageStation: '111111',
                    coding: '文化类别1',
                    culturalCategory: '111111',
                    activityName: '11111111',
                    ownStation: '11111111',
                    executionVillageStation: '111111',
                    approvalStatus: '111111',
                    approvalResult: '111111'
                  },
                  {
                    launchVillageStation: '111111',
                    coding: '文化类别1',
                    culturalCategory: '111111',
                    activityName: '11111111',
                    ownStation: '11111111',
                    executionVillageStation: '111111',
                    approvalStatus: '111111',
                    approvalResult: '111111'
                  },
                  {
                    launchVillageStation: '111111',
                    coding: '文化类别1',
                    culturalCategory: '111111',
                    activityName: '11111111',
                    ownStation: '11111111',
                    executionVillageStation: '111111',
                    approvalStatus: '111111',
                    approvalResult: '111111'
                  }
                ];
                this.$refs.brotherOptional.pageable = {
                  total: 4,
                  currentPage: 1,
                  pageSize: 10
                };
              }
            } else if (this.activeName === 'statistics') {
              this.$refs.brotherStatisticsSearch.form = {};
              this.$refs.brotherStatistics && this.$refs.brotherStatistics.loadTableData();
              if (this.$refs.brotherStatistics) {
                this.$refs.brotherStatistics.tableData = [
                  {
                    coding: '111111',
                    publishIssued: '文化类别1',
                    culturalCategory: '111111',
                    activityName: '11111111',
                    executionStation: '11111111',
                    executionVillageStation: '111111',
                    practicePoint: '111111',
                    completeStatus: '111111',
                    isSpecialAActivity: '111111'
                  },
                  {
                    coding: '111111',
                    publishIssued: '文化类别1',
                    culturalCategory: '111111',
                    activityName: '11111111',
                    executionStation: '11111111',
                    executionVillageStation: '111111',
                    practicePoint: '111111',
                    completeStatus: '111111',
                    isSpecialAActivity: '111111'
                  },
                  {
                    coding: '111111',
                    publishIssued: '文化类别1',
                    culturalCategory: '111111',
                    activityName: '11111111',
                    executionStation: '11111111',
                    executionVillageStation: '111111',
                    practicePoint: '111111',
                    completeStatus: '111111',
                    isSpecialAActivity: '111111'
                  },
                  {
                    coding: '111111',
                    publishIssued: '文化类别1',
                    culturalCategory: '111111',
                    activityName: '11111111',
                    executionStation: '11111111',
                    executionVillageStation: '111111',
                    practicePoint: '111111',
                    completeStatus: '111111',
                    isSpecialAActivity: '111111'
                  },
                  {
                    coding: '111111',
                    publishIssued: '文化类别1',
                    culturalCategory: '111111',
                    activityName: '11111111',
                    executionStation: '11111111',
                    executionVillageStation: '111111',
                    practicePoint: '111111',
                    completeStatus: '111111',
                    isSpecialAActivity: '111111'
                  }
                ];
                this.$refs.brotherStatistics.pageable = {
                  total: 5,
                  currentPage: 1,
                  pageSize: 10
                };
              }
            }
          },
          /**
           * 编辑
           * */
          edit (index, row) {
            if (this.$refs.brotherDialog) {
              this.$refs.brotherDialog.title = '编辑';
              this.$refs.brotherDialog.dialogVisible = true;
              this.$refs.brotherDialog.form = row;
            }
          },
          /**
           * 附件下载
           * */
          downLoad (index,row) {
            console.log(index);
            console.log(row);
            this.$alert('需要附件下载的接口', '提示', {
              dangerouslyUseHTMLString: true
            });
          },
          /**
           * 固选活动审核
           * */
          approve (index, row) {
            console.log(index);
            console.log(row);
          },
          /**
           * 自选活动审核
           * */
          approveOpt (index, row) {
            console.log(index);
            console.log(row);
          },
          /**
          * 查看活动统计
          * */
          detailForStatistics (index, row) {
            console.log(index);
            console.log(row);
          },
          // 调用兄弟组件的方法
           traggerBrotherEvent () {
            if (this.activeName === 'publish') {
              this.$refs.brotherDialog.title = '新增';
              this.$refs.brotherDialog.form = {};
              this.$refs.brother && this.$refs.brother.loadTableData();
            }
          },
            /**
             * 搜索获取值之后再赋值
             * */
            search(formData){
              console.log(formData);
              if (this.$refs.brotherStable) {
                this.$refs.brotherStable.tableData = formData;
              }
            },
          searchBrother () {
            if (this.activeName === 'stable') {
              if (this.$refs.brotherStable && this.$refs.brotherStableSearch){
                this.$refs.brotherStable.form = this.$refs.brotherStableSearch.form;
              }
            } else if (this.activeName === 'optional') {
              if (this.$refs.brotherOptional && this.$refs.brotherOptionalSearch){
                this.$refs.brotherOptional.form = this.$refs.brotherOptionalSearch.form;
              }
            } else if (this.activeName === 'statistics') {
              if (this.$refs.brotherStatistics && this.$refs.brotherStatisticsSearch){
                this.$refs.brotherStatistics.form = this.$refs.brotherStatisticsSearch.form;
              }
            }
          }
        },
        watch: {
          activeName: {
            handler (oldVal, curVal) {
              console.log(oldVal);
              this.switchTab();
            }
          }
        }
    };
</script>

<style scoped>

</style>
