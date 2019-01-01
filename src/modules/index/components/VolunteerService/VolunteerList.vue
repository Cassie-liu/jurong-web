<template>
  <div class="list">
    <CommonSearch :columns="statisticsFormColumns" @search="search" :inline="true" ref="brotherStatisticsSearch"
                  :title="'搜索'"></CommonSearch>
    <CommonTable  :columns="statisticsColumns" ref="brotherStatistics"
                 @search="searchBrother"></CommonTable>
  </div>
</template>

<script>
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import CommonSearch from '../common/CommonSearch';

  export default {
    name: 'VolunteerList',
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
            label: '志愿者编号'
          },
          {
            prop: 'publishIssued',
            label: '志愿者姓名'
          },
          {
            prop: 'culturalCategory',
            label: '所属志愿队'
          },
          {
            prop: 'activityName',
            label: '联系方式'
          },
          {
            prop: 'executionStation',
            label: '评分'
          },
          {
            prop: 'executionVillageStation',
            label: '参与活动数量'
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
        // 搜索数据
        statisticsFormColumns: [
          {
            type: 'text',
            key: 'name',
            label: '志愿者姓名'
          },
          {
            type: 'text',
            key: 'code',
            label: '志愿者编号'
          },
          {
            type: 'select',
            key: 'practicePoint',
            label: '所属志愿者队',
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
