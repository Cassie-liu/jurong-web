<template>
  <div class="special-events">
    <CommonSearch :columns="statisticsFormColumns" @search="search" :inline="true" ref="brotherStatisticsSearch"
                  :title="'搜索'"></CommonSearch>
    <CommonTable :api-root="'center'" :columns="statisticsColumns" ref="brotherStatistics"
                 @search="searchBrother"></CommonTable>
  </div>
</template>

<script>
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import CommonSearch from '../common/CommonSearch';

  export default {
    name: 'SpecialEvents',
    components: {
      CommonTable,
      CommonDialog,
      CommonSearch
    },
    props: [],
    data () {
      return {
        // 活动统计表数据格
        statisticsColumns: [
          {
            prop: 'coding',
            label: '活动标题'
          },
          {
            prop: 'publishIssued',
            label: '活动类别'
          },
          {
            prop: 'culturalCategory',
            label: '执行村站'
          },
          {
            prop: 'activityName',
            label: '村站所属镇所'
          },
          {
            prop: 'executionStation',
            label: '活动积分'
          },
          {
            prop: 'executionVillageStation',
            label: '实际积分'
          },
          {
            prop: 'practicePoint',
            label: '完成时间'
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
        // 活动统计搜索数据
        statisticsFormColumns: [
          {
            type: 'select',
            key: 'culturalCategory',
            label: '选择分中心',
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
            label: '选择镇所',
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
            type: 'text',
            key: 'coding',
            label: '选择村站'
          },
          {
            type: 'select',
            key: 'practicePoint',
            label: '完成时间',
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
          }
        ]
      };
    },
    mounted () {
    },
    comments: {
      CommonTable
    },
    methods: {
      /**
       * 搜索获取值之后再赋值
       * */
      search (formData) {
        console.log(formData);
        if (this.$refs.brother) {
          this.$refs.brother.tableData = formData;
        }
      },
      searchBrother () {
        if (this.activeName === 'stable') {
          if (this.$refs.brother && this.$refs.brotherStableSearch) {
            this.$refs.brother.form = this.$refs.brotherStableSearch.form;
          }
        } else if (this.activeName === 'statistics') {
          if (this.$refs.brotherStatistics && this.$refs.brotherStatisticsSearch) {
            this.$refs.brotherStatistics.form = this.$refs.brotherStatisticsSearch.form;
          }
        } else if (this.activeName === 'unSubmit') {
          if (this.$refs.unSubmitStatistics && this.$refs.brotherStatisticsSearch) {
            this.$refs.unSubmitStatistics.form = this.$refs.brotherStatisticsSearch.form;
          }
        }
      }
    },
    watch: {}
  };
</script>

<style scoped lang="less">
  .special-events{
    padding: 15px;
  }
</style>
