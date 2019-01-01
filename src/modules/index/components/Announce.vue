<template>
  <div class="announce p-15">
    <CommonSearch :columns="searchColumns" @search="search" :inline="true" ref="searchForm"
                  :title="'搜索'"></CommonSearch>
    <CommonTable api-root="notice" :columns="columns" ref="announceTable"></CommonTable>
    <el-dialog
      title="查看"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">

      <div class="view-box">
        <div class="view-item">
          <div class="view-item__title">标题</div>
          <div class="view-item__content">{{viewForm.title}}</div>
        </div>

        <div class="view-item">
          <div class="view-item__title">内容</div>
          <div class="view-item__content" v-html="viewForm.content"></div>
        </div>

        <div class="view-item">
          <div class="view-item__title">发布时间</div>
          <div class="view-item__content">{{viewForm.createdAt}}</div>
        </div>

        <div class="view-item">
          <div class="view-item__title">发布单位</div>
          <div class="view-item__content">{{viewForm.creator}}</div>
        </div>

        <div class="view-item">
          <div class="view-item__title">发布人</div>
          <div class="view-item__content">{{viewForm.creator}}</div>
        </div>

        <div class="view-item">
          <div class="view-item__title">下载附件</div>
          <div class="view-item__content">
            <el-button type="primary" @click="downLoad">下载</el-button>
          </div>
        </div>

      </div>

      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import CommonSearch from './common/CommonSearch';
  import CommonTable from './common/CommonTable';
  import CommonDialog from './common/CommonDialog';
  import map from './Map';
  export default {
    name: 'Announce',

    data () {
      return {
        searchColumns: [
          {
            type: 'select',
            key: 'culturalCategory',
            label: '选择分中心',
            options: []
          }
        ],
        columns: [
          {
            prop: 'title',
            label: '标题'
          },
          {
            prop: 'createdAt',
            label: '发布时间'
          },
          {
            prop: 'creator',
            label: '发布单位'
          },
          {
            type: 'function',
            label: '操作',
            functionOpt: [
              {
                type: 'text',
                label: '查看',
                func: this.showDetail
              },
              {
                type: 'text',
                label: '附件下载',
                func: this.downLoad
              }
            ]
          }
        ],
        dialogVisible: false,
        viewForm: {
          title: 'asdda',
          content: 'html',
          releaseTime: '2019-10-12',
          issued: '广电总局',
          publisher: '老张',
          downLoadUrl: 'www.baidu.com'
        }
      };
    },

    components: {
      CommonTable,
      CommonDialog,
      CommonSearch
    },

    mounted () {
      if (this.$refs.announceTable) {
        this.$refs.announceTable.tableData = [
        ];
        this.$refs.announceTable.pageable = {
          total: 4,
          currentPage: 1,
          pageSize: 10
        };
      }
      this.searchColumns[0].options = Object.keys(map.culturalCategory).map(item => { return { key: item, value: map.culturalCategory[item] }})
    },

    methods: {
      search (formData) {
        console.log(formData);
        if (this.$refs.brother) {
          this.$refs.brother.tableData = formData;
        }
      },
      /**
       * 查看
       */
      showDetail (index, row) {
        this.dialogVisible = true;
        this.viewForm = row;
      },
      /***
       *  下载
       */
      downLoad (index, row) {
        if (row && row.url) {
          window.open(row.url, '_blank');
        } else {
          this.$message({
            type: 'error',
            message: '暂无附件可下载'
          })
        }
      },
      handleClose () {}
    },

    computed: {},

    watch: {}
  };
</script>

<style lang="less" scoped>
  .view-box {
    .view-item{
      display: flex;
      padding: 10px 0;
      &__title{
        width: 100px;
        text-align: right;
        margin-right: 10px;
        &::after{
          content: ':';
          margin-left: 3px;
        }
      }
    }
  }
</style>
