<template>
    <div class="common-table">
      <el-table :data="tableData" v-loading="loading" size="small">
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label" :type="item.type? item.type: ''"
                         :width="item.width || ''" v-if="item.type !=='function'" :formatter="formatter"></el-table-column>
        <el-table-column v-for="(item, index) in columns" :key="index" :label="item.label"
                          :width="item.width || ''" v-if="item.type === 'function'" :formatter="formatter">
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
  import Map from '../Map';
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
            Map,
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
        },
        formatter(row, column, cellValue, index) {
          for(let i in Map) {
            if(Map[i].hasOwnProperty(cellValue)){
              return  Map[i][cellValue];
            } else {
              return cellValue;
            }
          }
        }
      }
    };
</script>

<style scoped>

</style>
