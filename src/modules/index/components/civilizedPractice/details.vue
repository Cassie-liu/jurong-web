<template>
  <div class="special-events">
    <div class="mb-15">
      <el-button @click="back" type="primary">返回</el-button>
    </div>
    <CommonSearch :columns="statisticsFormColumns" @search="search" :inline="true" ref="searchForm"
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
    name: 'CivilizedPractice',
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
            prop: 'name',
            label: '实践点名称'
          },
          {
            prop: 'activeN',
            label: '活动名称'
          },
          {
            prop: 'status',
            label: '活动状态'
          },
          {
            prop: 'deadline',
            label: '活动截止时间'
          },
          {
            prop: 'completeTime',
            label: '活动完成时间'
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
            label: '选择活动状态',
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
          }
        ]
      };
    },
    mounted () {
      this.$refs.brotherStatistics.tableData = [
        {
          name: '大马猴镇扭秧歌活动',
          activeN: '大马猴镇扭秧歌活动',
          status: '进行中',
          deadline: '2019/3/2',
          completeTime: '-'
        }
      ];
      this.$refs.brotherStatistics.pageable = {
        total: 1,
        currentPage: 1,
        pageSize: 10
      };
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
      },
      detailForStatistics (id) {
      },
      back () {
        this.$router.push({
          name: 'CivilizedPractice'
        });
      }
    },
    watch: {}
  };
</script>

<style scoped lang="less">
  .special-events {
    padding: 15px;
  }
</style>
