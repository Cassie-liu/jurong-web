<template>
  <div class="list">
    <CommonSearch :columns="statisticsFormColumns" @search="search" :inline="true" ref="brotherStatisticsSearch"
                  :title="'搜索'"></CommonSearch>
    <CommonTable :columns="statisticsColumns" ref="brotherStatistics"
                 @search="searchBrother"></CommonTable>
  </div>
</template>

<script>
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import CommonSearch from '../common/CommonSearch';

  export default {
    name: 'VolunteerrRecruit',
    components: {
      CommonTable,
      CommonDialog,
      CommonSearch
    },
    props: [],
    data () {
      return {
        // 统计表数据格
        statisticsColumns: [
          {
            prop: 'coding',
            label: '标题'
          },
          {
            prop: 'publishIssued',
            label: '招募内容'
          },
          {
            prop: 'culturalCategory',
            label: '招募人数'
          },
          {
            prop: 'activityName',
            label: '实招人数'
          },
          {
            prop: 'executionStation',
            label: '待审核人数'
          },
          {
            prop: 'executionVillageStation',
            label: '发布时间'
          },
          {
            prop: 'practicePoint',
            label: '截止时间'
          },
          {
            prop: 'status',
            label: '状态'
          },
          {
            prop: 'owner',
            label: '发布人'
          },
          {
            prop: 'team',
            label: '所属志愿队'
          },
          {
            type: 'function',
            label: '操作',
            functionOpt: [
              {
                type: 'text',
                label: '审核',
                func: this.detailForStatistics
              },
              {
                type: 'text',
                label: '编辑',
                func: this.detailForStatistics
              },
              {
                type: 'text',
                label: '可删除',
                func: this.detailForStatistics
              }
            ]
          }
        ],
        // 搜索数据
        statisticsFormColumns: [
          {
            type: 'select',
            key: 'practicePoint',
            label: '志愿队',
            options: []
          },
          {
            type: 'select',
            key: 'practicePoint',
            label: '招募状态',
            options: []
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
  .list{
    padding: 15px;
  }
</style>
