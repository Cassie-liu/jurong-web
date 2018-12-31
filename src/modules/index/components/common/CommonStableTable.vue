<template>
    <div>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        :span-method="objectSpanMethod"
        style="width: 100%; margin-top: 20px">
        <el-table-column v-for="(item, $index) in columns" :prop="item.prop" :label="item.label" :key="$index"
                         v-if="item.type!=='function'" :fixed="item.fixed"></el-table-column>
        <el-table-column v-for="(item, index) in columns" :key="item.label" :label="item.label"
                         :width="item.width || ''" v-if="item.type === 'function'"  fixed="right">
          <template slot-scope="scope">
            <!--<el-col v-for="(func, $index) in item.functionOpt" :key="$index">-->
              <!--<el-button :type="func.type" @click="func.func(scope.$index, scope.row)">{{func.label}}</el-button>-->
            <!--</el-col>-->
            <el-button v-for="(func, $index) in item.functionOpt" :key="$index"
                       :type="func.type" @click="func.func(scope.$index, scope.row)">
              {{func.label}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import reqType from '@/api/reqType';
    export default {
        name: 'CommonStableTable',
      props:{
        columns: Array,
        mergeField: String,
        apiRoot: String
      },
      data () {
          return {
            tableData: [],
            spanArr: [],
            visible: false,
            loading: true
          };
      },
      mounted() {
          this.loadTableData();
      },
      methods: {
        getSpanArr(data) {
          for (var i = 0; i < data.length; i++) {
            if (i === 0) {
              this.spanArr.push(1);
              this.pos = 0
            } else {
              // 判断当前元素与上一个元素是否相同
              if (data[i][this.mergeField] === data[i - 1][this.mergeField]) {
                this.spanArr[this.pos] += 1;
                this.spanArr.push(0);
              } else {
                this.spanArr.push(1);
                this.pos = i;
              }
            }
          }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 0) {
            const _row = this.spanArr[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            return {
              rowspan: _row,
              colspan: _col
            }
          }
        },
        loadTableData(){
          this.loading = true;
          this.$http(reqType.POST, `${this.apiRoot}`, false).then(
            data => {
              // this.tableData = data.content;
              this.loading = false;
              this.getSpanArr(this.tableData);
            }
          ).catch(res => {
            this.loading = false;
          });
          // dummy
          this.tableData = [
            {
              town: '镇所1',
              villageStation: '111111',
              activityName: '22222',
              culturalCategory: '33333',
              content: '444444',
              practicePoint: '5555',
              score: '55',
              startTime: '2018-11-11',
              endTime: '2018-12-11',
              remark: '66666'
            },
            {
              town: '镇所1',
              villageStation: '111111',
              activityName: '22222',
              culturalCategory: '33333',
              content: '444444',
              practicePoint: '5555',
              score: '55',
              startTime: '2018-11-11',
              endTime: '2018-12-11',
              remark: '66666'
            },
            {
              town: '镇所1',
              villageStation: '111111',
              activityName: '22222',
              culturalCategory: '33333',
              content: '444444',
              practicePoint: '5555',
              score: '55',
              startTime: '2018-11-11',
              endTime: '2018-12-11',
              remark: '66666'
            },
            {
              town: '镇所1',
              villageStation: '111111',
              activityName: '22222',
              culturalCategory: '33333',
              content: '444444',
              practicePoint: '5555',
              score: '55',
              startTime: '2018-11-11',
              endTime: '2018-12-11',
              remark: '66666'
            }
          ];
          this.getSpanArr(this.tableData);
          // this.getSpanArr(this.tableData);
        }
      }
    }
</script>

<style scoped>

</style>
