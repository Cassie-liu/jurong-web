<template>
  <div class="stop-base">
    <div class="base-data">
      <div class="content-wrap">
        <!--功能室建设表格-->
        <div v-show="!showTable">
          <div class="orgRoom">
            <el-select v-model="params.townId" placeholder="请选择">
              <el-option
                v-for="item in params"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-button type="primary" @click="getSpecificRoom">搜索</el-button>
          </div>
          <CommonDialog ref="buildDialog" :form-columns="buildFormColumns" @submit="handleOrgRoom" :show-btn="true"></CommonDialog>
          <CommonTable ref="buildTable" api-root="orgRoom/page" :columns="buildColumns"></CommonTable>
        </div>
        <!--功能室详细信息-->
        <div v-show="showTable">
          <el-tabs v-model="activeName" @tab-click="switchTab">
            <el-tab-pane label="功能室信息" name="function">
              <el-form ref="form" :model="functionDetail" label-width="100px">
                <el-form-item label="功能室名称:">
                  <el-input class="function" v-model="functionDetail.name"></el-input>
                </el-form-item>
                <el-form-item label="文化类别:">
                  <!--<el-select v-model="functionDetail.cultureType" placeholder="请选择">-->
                      <el-option></el-option>
                      <!--<el-option-->
                      <!--v-for="item in options"-->
                      <!--:key="item.value"-->
                      <!--:label="item.label"-->
                      <!--:value="item.value">-->
                      <!--</el-option>-->
                    <!--</el-select>-->
                </el-form-item>
                <el-form-item label="所属镇所:">
                  <el-select v-model="functionDetail.town" placeholder="请选择">
                    <el-option></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="人员管理" name="organization">
              <div class="wrap">
                <div>
                  <img :src="!showTopic ? '/static/img/button_totable.png' : 'static/img/button_topic.png'" @click="showOrganizationTable">
                </div>
              </div>
              <div v-show="!showTopic" id="chartWrap1" class="chart-wrap"></div>
              <div v-show="showTopic">
                <CommonDialog ref="organizationDialog" :form-columns="organizationFormColumns" @submit="traggerBrotherEvent" :show-btn="true"></CommonDialog>
                <CommonTable ref="organizationTable" :api-root="''" :columns="organizationColumns" @search="searchOrganization"></CommonTable>
              </div>
            </el-tab-pane>
            <el-tab-pane label="文明实践点" name="practice">
              <CommonDialog ref="practiceDialog" :form-columns="practiceFormColumns" @submit="traggerBrotherEvent" :show-btn="true"></CommonDialog>
              <CommonTable ref="practiceTable" :api-root="'center'" :columns="practiceTbaleColumns" @search="searchOrganization"></CommonTable>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!--<common-graphic :data="graphic"></common-graphic>-->
      </div>
    </div>
  </div>
</template>

<script>
  import reqType from '@/api/reqType';
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import CommonGraphic from '../common/CommonGraphic';
  const echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/pie');
  require('echarts/lib/chart/line');
  require('echarts/lib/chart/tree');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  export default {
    name: 'FeatureBuild',
    props: [],
    data () {
      return {
        params: {
          townId: '' // 功能室列表查询条件
        },
        activeName: 'function',
        buildColumns: [
          {
            prop: 'name',
            label: '功能室名称'
          },
          {
            prop: 'townName',
            label: '所属镇所'
          },
          {
            prop: 'type',
            label: '文化类别'
          },
          {
            type: 'function',
            label: '操作',
            functionOpt: [
              {
                type: 'text',
                label: '编辑',
                func: this.editBuild
              },
              {
                type: 'text',
                label: '删除',
                func: this.deleteBuild
              }
            ]
          }
        ],
        organization: [{
          'name': '戴裔',
          'id': '4',
          'children': [
            {
              'name': '糜静娟',
              'id': '5',
              'children': [
                {
                  'name': '董爱梅',
                  'id': '6',
                  'children': [],
                  'depName': '人社'
                },
                {
                  'name': '徐圆',
                  'id': '7',
                  'children': [],
                  'depName': '计生'
                },
                {
                  'name': '朱瑞',
                  'id': '8',
                  'children': [],
                  'depName': '民政'
                },
                {
                  'name': '吴世玲',
                  'id': '9',
                  'children': [],
                  'depName': '农服'
                },
                {
                  'name': '张远华',
                  'id': '10',
                  'children': [],
                  'depName': '村镇'
                },
                {
                  'name': '金鑫',
                  'id': '11',
                  'children': [],
                  'depName': '司法'
                },
                {
                  'name': '巫君',
                  'id': '12',
                  'children': [],
                  'depName': '信访'
                },
                {
                  'name': '陈叶',
                  'id': '13',
                  'children': [],
                  'depName': '全科综合'
                }
              ],
              'depName': '为人民服务中心1'
            }
          ],
          'depName': '政府'
        }], // 模拟人员管理图数据
        showTable: false, // 默认不显示表格，点击切换显示表格
        showTopic: false, // 默认显示人员管理表格
        organizationColumns: [],
        organizationFormColumns: [
          {
            type: 'text',
            key: 'name',
            label: '姓名'
          },
          {
            type: 'text',
            key: 'sex',
            label: '性别'
          },
          {
            type: 'text',
            key: 'positon',
            label: '职位'
          }
        ], // 人员管理弹框内容
        practiceTbaleColumns: [
          {
            prop: 'name',
            label: '实践点名称'
          },
          {
            prop: 'culture',
            label: '文化类别'
          },
          {
            type: 'function',
            label: '实践点描述',
            functionOpt: [
              {
                type: 'text',
                label: '查看',
                func: this.showDetail
              }
            ]
          },
          {
            prop: 'longitude',
            label: '经度'
          },
          {
            prop: 'latitude',
            label: '纬度'
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
                label: '删除',
                func: this.delete
              }
            ]
          }
        ], // 文明实践点表头数据
        practiceFormColumns: [
          {
            type: 'select',
            key: 'culturalCategory',
            label: '选择文化类别',
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
            ] // 新增弹框数据
          },
          {
            type: 'text',
            key: 'name',
            label: '实践点名称'
          },
          {
            type: 'text',
            key: 'longitude',
            label: '经度'
          },
          {
            type: 'text',
            key: 'latitude',
            label: '纬度'
          },
          {
            type: 'editor',
            key: 'remark',
            label: '概况'
          }],
        buildFormColumns: [], // 新增功能室
        functionDetail: {} // 某一条功能室信息对象
      };
    },
    methods: {
      /**
       * 查询镇所下拉框
       */
      getTownList () {
        this.$http(reqType.POST, `town/list`, false)
          .then(data => {
            this.params = data;
            let arr = this.params.map(item => { return {key: item.id, value: item.name}; });
            this.buildFormColumns = [
              {
                type: 'text',
                key: 'name',
                label: '功能室名称'
              },
              {
                type: 'select',
                key: 'townName',
                label: '所属镇所',
                options: arr
              },
              {
                type: 'select',
                key: 'type',
                label: '文化类别',
                options: [
                  {
                    value: '理论宣讲',
                    key: 'ORG_TYPE_LLXJ'
                  },
                  {
                    value: '教育服务',
                    key: 'ORG_TYPE_JYFW'
                  },
                  {
                    value: '文体服务',
                    key: 'ORG_TYPE_WTFW'
                  },
                  {
                    value: '科技科普',
                    key: 'ORG_TYPE_KJKP'
                  },
                  {
                    value: '健康普及',
                    key: 'ORG_TYPE_JKPJ'
                  }
                ]
              }];
          });
      },
      /**
       * 查询某一个镇的功能室
       */
      getSpecificRoom () {
        console.log(this.params.townId);
        this.$http(reqType.POST, `orgRoom/list`, {townId: this.params.townId}, false)
          .then(data => {
            this.$refs.buildTable.tableData = data;
          });
      },
      /**
       * 查询领导机构表格内容
       */
      searchOrganization () {},
      searchActivity () {},
      /**
       * 新增和编辑弹框
       */
      traggerBrotherEvent () {
        if (this.activeName === 'practice' && this.showTable === true) {
          this.$refs.organizationDialog.title = '新增';
          this.$refs.organizationDialog.form = {};
          this.$refs.organizationTable && this.$refs.organizationTable.loadTableData();
        }
      },
      showOrganizationTable () {
        this.showTopic = !this.showTopic;
        // if (this.showTable === true) {
        //   this.$refs.organizationTable.tableData = [{
        //     name: '张三',
        //     sex: '男',
        //     duty: '办公室主任',
        //     remark: '负责整个办公室的各项事务'
        //   }];
        //   this.$refs.organizationTable.pageable = {
        //     total: 1,
        //     currentPage: 1,
        //     pageSize: 10
        //   };
        // }
      },
      /**
       * 查看实践点详情
       */
      showDetail () {
      },
      /**
       * 编辑某一个实践点
       */
      edit (index, row) {
        if (this.$refs.practiceDialog) {
          this.$refs.practiceDialog.title = '编辑';
          this.$refs.practiceDialog.dialogVisible = true;
          this.$refs.practiceDialog.form = row;
        }
      },
      /**
       * 处理功能室新增
       */
      handleOrgRoom (form) {
        if (!form.id) {
          this.$http(reqType.POST, `orgRoom/`, form, false)
            .then(data => {
              // this.getOrganizationlist();
            });
        }
      },
      /**
       * 删除某一个实践点
       */
      delete () {},
      /**
       * 绘制人员管理图
       */
      drawChart1 () {
        let myChart = document.getElementById('chartWrap1');
        myChart.style.width = window.innerWidth - 500 + 'px';
        let option, chart;
        option = {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'tree',
              data: this.organization,
              left: '2%',
              right: '2%',
              top: '18%',
              bottom: '20%',
              symbolSize: [110, 50],
              symbol: '/static/img/jgbj.png',
              borderColor: 'black',
              orient: 'vertical',
              expandAndCollapse: true,
              label: {
                normal: {
                  position: 'inside',
                  rotate: 0,
                  verticalAlign: 'middle',
                  align: 'center',
                  fontSize: 16
                }
              },
              leaves: {
                label: {
                  normal: {
                    position: 'inside',
                    rotate: 0,
                    verticalAlign: 'middle',
                    align: 'center'
                  }
                }
              },

              animationDurationUpdate: 750
            }
          ]
        };
        chart = echarts.init(myChart);
        chart.setOption(option);
      },
      /**
       * 点击编辑显示功能室详细信息
       */
      editBuild (index, row) {
        this.showTable = !this.showTable;
        this.functionDetail = row;
        console.log(row);
      },
      deleteBuild () {},
      /**
       * 切换tab
       */
      switchTab (e) {
        let _index = parseInt(e.index);
        switch (_index) {
          case 0: //  function
            return false;
          case 1: //  organization
            this.surveyRefresh = !this.surveyRefresh;
            this.drawChart1();
            return false;
          case 2: // 文明实践点 practice
            // this.showTable = false;
            return false;
        }
      },
      handleSelectOptions () {
      }
    },
    mounted () {
      this.getTownList();
      this.drawChart1();
      this.handleSelectOptions();
    },
    components: {
      CommonGraphic,
      CommonTable,
      CommonDialog
    }
  };
</script>

<style scoped lang="less">
  .stop-base {
    padding: 15px 15px 15px;
    .base-data{
      display: flex;
      width: 100%;
      overflow: hidden;
      flex-wrap: wrap;
      .content {
        padding: 0 1% 20px 0;
        width:15%;
        img {
          cursor: pointer;
          width:100%;
        }
      }
      .content-wrap {
        .function {
          width: 188px;
        }
        .wrap {
          text-align: right;
          &>div{
            display: inline-flex;
            flex-direction: column;
          }
          img {
            width: 40px;
            height: 40px;
          }
        }
        width:100%;
        .orgRoom {
          margin-bottom:10px;
        }
      }
      .chart-wrap {
        width:100%;
        height:300px;
      }
    }
  }
</style>
