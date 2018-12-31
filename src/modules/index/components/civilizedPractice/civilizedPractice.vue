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
            prop: 'type',
            label: '文化类型'
          },
          {
            prop: 'fN',
            label: '所属分中心'
          },
          {
            prop: 'zN',
            label: '镇所'
          },
          {
            prop: 'cZ',
            label: '村站'
          },
          {
            type: 'function',
            label: '操作',
            functionOpt: [
              {
                type: 'text',
                label: '查看实践点活动',
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
            label: '选择文化类型',
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
            label: '选择分中心',
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
            label: '选择镇所'
          },
          {
            type: 'select',
            key: 'practicePoint',
            label: '选择村站',
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
      this.$refs.brotherStatistics.tableData = [
        {
          name: '大马猴镇扭秧歌活动',
          type: '文艺表演',
          fN: '大马猴',
          zN: '大马猴',
          cZ: '大马猴'
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
        console.log('去具体活动页面');
        this.$router.push({
          name: 'Details',
          params: {id: id}
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
