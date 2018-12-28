<template>
    <div class="common-table">
      <el-table :data="tableData" v-loading="loading" size="small">
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label" :type="item.type? item.type: ''"
                         :width="item.width || ''" v-if="item.type !=='function'"></el-table-column>
        <el-table-column v-for="(item, index) in columns" :key="index" :label="item.label"
                          :width="item.width || ''" v-if="item.type === 'function'">
          <template slot-scope="scope">
            <el-button v-for="(func, $index) in item.functionOpt" :key="$index" :type="func.type" @click="func.func(scope.$index, scope.row)">
              {{func.label}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: right;margin-top: 20px;"
                     :total="pageable.total" :current-page.sync="pageable.currentPage" :page-size.sync="pageable.pageSize"
                     @current-change="loadTableData" @size-change="loadTableData" layout="total, sizes, prev, pager, next">
      </el-pagination>
    </div>
</template>

<script>
    import reqType from "../../../../api/reqType";
    export default {
        name: 'CommonTable',
      props: {
          columns: Array,
          apiRoot: String
      },
      data () {
          return {
            loading: false,
            tableData: [],
            pageable: {
              total: 0,
              currentPage: 1,
              pageSize: 10
            },
            form: {}   // 分页的时候的查询参数
          };
      },
      mounted () {
          this.loadTableData();
      },
      methods: {
        loadTableData () {
          // this.tableData= [
          //   {
          //     coding: '1111111111',
          //     publishIssued: '1111111111',
          //     culturalCategory: '1111111111',
          //     activityName: '1111111111',
          //     activityContent: '1111111111',
          //     activityName: '1111111111',
          //     activityContent: '1111111111',
          //     targetScore: '111111111111111111',
          //     deadline: '111111111111111111'
          //   }
          // ];
          this.$emit('search');
          this.loading = true;
          this.$http(reqType.POST, `${this.apiRoot}/page?page=${this.pageable.currentPage - 1}&size=${this.pageable.pageSize}`, false)
            .then(data => {
              this.tableData = data.content;
              this.pageable.total = data.totalElements;
              this.loading = false;
            }
          ).catch(error => {
            this.loading = false;
          });
        }
      }
    };
</script>

<style scoped>

</style>
