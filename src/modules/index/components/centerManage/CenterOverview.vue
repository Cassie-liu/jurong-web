<template>
  <div class="center-overview">
    <div class="base-data">
      <div v-show="!showManagement" class="content" v-for="(item, index) in img" :key="index">
        <div class="xy-center">
          <img :src="item.path" class="img-fluid" @click="getDetailManagement(item)">
        </div>
        <div class="text-center mt-15">{{item.name}}</div>
      </div>
      <div v-show="showManagement" class="content-wrap">
        <el-tabs v-model="activeName" @tab-click="switchTab">
          <el-tab-pane label="概况" name="survey">
            <common-graphic :data="graphic" type="orgCenter" :refresh="surveyRefresh"></common-graphic>
          </el-tab-pane>
          <el-tab-pane label="人员管理" name="organization">
            <div class="wrap">
              <div>
                <img :src="!showTable ? '/static/img/button_totable.png' : 'static/img/button_topic.png'" @click="showOrganizationTable">
              </div>
            </div>
            <div v-show="!showTable" id="chartWrap1" class="chart-wrap"></div>
            <div v-show="showTable">
              <CommonDialog ref="organizationDialog" :form-columns="organizationFormColumns" @submit="traggerBrotherEvent" :show-btn="true"></CommonDialog>
              <CommonTable ref="organizationTable" api-root="orgPerson" :columns="organizationColumns" @search="searchOrganization"></CommonTable>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文明实践点" name="practice">
            <CommonDialog ref="practiceDialog" :form-columns="practiceFormColumns" @submit="traggerBrotherEvent" :show-btn="true"></CommonDialog>
            <CommonTable ref="practiceTable" api-root="point" :columns="practiceTbaleColumns" @search="searchOrganization"></CommonTable>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import CommonGraphic from '../common/CommonGraphic';
  import reqType from '@/api/reqType';
  const echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/pie');
  require('echarts/lib/chart/line');
  require('echarts/lib/chart/tree');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  export default {
    name: 'CenterOverview',
    props: [],
    data () {
      return {
        activeName: 'survey',
        img: [],
        showTable: false, // 默认不显示表格，点击切换显示表格
        showManagement: false,
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
        organizationColumns: [
          {
            type: 'index',
            label: '序号'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'sex',
            label: '性别'
          },
          {
            prop: 'duty',
            label: '职务'
          },
          {
            prop: 'remark',
            label: '备注'
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
        ], // 模拟人员管理表格表头数据
        practiceTbaleColumns: [
          {
            prop: 'name',
            label: '实践点名称'
          },
          {
            prop: 'longitude',
            label: '经度'
          },
          {
            type: 'function',
            label: '概况',
            functionOpt: [
              {
                type: 'text',
                label: '查看',
                func: this.showDetail
              }
            ]
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
            key: 'duty',
            label: '职务'
          },
          {
            type: 'text',
            key: 'remark',
            label: '备注'
          }
        ], // 人员管理弹框内容
        graphic: {
          img: [],
          text: 'asdasd'
        }, // 镇所详情
        practiceFormColumns: [
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
          }
        ], // 新增弹框数据
        publishTableColumns: [
          {
            prop: 'title',
            label: '标题'
          },
          {
            prop: 'publishTime',
            label: '发布时间'
          },
          {
            prop: 'owner',
            label: '发布人'
          },
          {
            prop: 'updateTime',
            label: '修改时间'
          },
          {
            prop: 'updateOwner',
            label: '修改人'
          },
          {
            type: 'function',
            label: '操作',
            functionOpt: [
              {
                type: 'text',
                label: '编辑',
                func: this.editPublicActivity
              },
              {
                type: 'text',
                label: '删除',
                func: this.deletePublicActivity
              }
            ]
          }
        ], // 活动发布表头数据
        surveyRefresh: false,
        showPublicDialog: false, // 默认不显示
        publishFormColumns: [
          {
            type: 'text',
            key: 'title',
            label: '公告标题'
          },
          {
            type: 'editor',
            key: 'content',
            label: '公告内容'
          }
        ] // 活动发布弹框内容
      };
    },
    created() {
      this.$http(reqType.POST, `orgCenter/list`, false).then(
        data => {
          this.img = data;
        }
      )
    },
    mounted () {
      this.drawChart1();
    },
    components: {
      CommonTable,
      CommonDialog,
      CommonGraphic
    },
    methods: {
      /**
       * 获取所站概况
       */
      getDetailManagement (item) {
        this.graphic = item;
        this.graphic.img = item.jrResourceList.map( (item) => { return { url: `http://172.16.0.126${item.thumbnail}`}});
        this.graphic.imgB = item.jrResourceList.map( (item) => { return { url: `http://172.16.0.126${item.url}`}});
        this.showManagement = true;
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
        this.showTable = !this.showTable;
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
      showDetail () {},
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
       * 编辑活动发布
       */
      editPublicActivity (index, row) {
        if (this.$refs.publishDialog) {
          this.$refs.publishDialog.title = '编辑';
          this.$refs.publishDialog.dialogVisible = true;
          this.$refs.publishDialog.form = row;
        }
      },
      /**
       * 删除发布的活动
       */
      deletePublicActivity () {},
      /**
       * 切换tab
       */
      switchTab (e) {
        let _index = parseInt(e.index);
        switch (_index) {
          case 0: // 概况 survey
            this.surveyRefresh = !this.surveyRefresh;
            return false;
          case 1: // 人员管理 organization
            this.showTable = false;
            return false;
          case 2: // 文明实践点 practice
              this.$refs.practiceTable.tableData = [{
                name: '句容',
                longitude: '12',
                latitude: '43',
                remark: 'wecvmvkmvjvnnvjnkkvmcnvvniznvfirfdcnv dvjrgc'
              }];
              this.$refs.practiceTable.pageable = {
                total: 1,
                currentPage: 1,
                pageSize: 10
              };
            return false;
          case 3: // 活动发布 public
            this.$refs.publishTable.tableData = [
              {
                title: '句容市广场舞大赛',
                publishTime: '2018-12-31',
                owner: 'seven',
                updateTime: '2018-12-31',
                updateOwner: 'seven'
              }
            ];
            return false;
        }
      }
    },
    watch: {
    }
  };
</script>

<style scoped lang="less">
  .center-overview {
    .base-data{
      padding: 15px;
      display: flex;
      width: 100%;
      overflow: hidden;
      flex-wrap: wrap;
      .chart-wrap {
        width:100%;
        height:300px;
      }
      .content {
        width: 19%;
        padding: 0 1% 25px 0;
        img {
          cursor: pointer;
        }
      }
      .content-wrap {
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
        width: 100%;
      }
    }
  }
</style>
