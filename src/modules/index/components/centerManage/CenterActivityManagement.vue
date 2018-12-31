<template>
  <div class="center-act">
      <el-tabs v-model="activeName">
        <el-tab-pane name="formulate" label="活动制定">
          <!--todo:需要配置权限(管理员没有新增的权限)-->
          <el-row v-show="showBtn">
            <el-button plain disabled>新增</el-button>
          </el-row>
          <el-row>
            <el-button class="fr" @click="publishDialogVisible = true">发布</el-button>
          </el-row>
          <CommonDialog :form-columns="formColumns" ref="formulateDialog" :show-btn="!showBtn" @submit="addCenterAct"></CommonDialog>
          <CommonTable v-show="activeName === 'formulate'" :columns="columns" :api-root="'activity'" ref="formulateTable"></CommonTable>
        </el-tab-pane>
        <el-tab-pane name="planReview" label="计划审核">
          <CommonStableTable api-root="'center'" :columns="planColumns" :merge-field="'id'" ref="planTable"></CommonStableTable>
        </el-tab-pane>
        <el-tab-pane name="activityReview" label="活动审核">
          <CommonStableTable api-root="'center'" :columns="activityColumns" :merge-field="'id'" ref="planTable"></CommonStableTable>
        </el-tab-pane>
        <el-tab-pane name="statistics" label="活动统计">

        </el-tab-pane>
      </el-tabs>
    <!--发布弹框-->
     <el-dialog title="活动发布" :visible.sync="publishDialogVisible">
       <div class="center">
         <!--<el-transfer-->
           <!--v-model="publishList"-->
           <!--:titles="['选择活动', '发布活动']"-->
           <!--:data="ActivityList">-->
         <!--</el-transfer>-->
         <el-form>
           <el-form-item label="选择活动">
             <el-select v-model="publishParams.activityList" multiple placeholder="请选择">
               <el-option
                 v-for="item in publishList.activityList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="选择镇所">
             <el-select v-model="publishParams.activityList" multiple placeholder="请选择">
               <el-option
                 v-for="item in publishList.activityList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>
         </el-form>
       </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="publishDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="publishActivity">发布</el-button>
      </div>
    </el-dialog>
    <!--活动审核-->
    <el-dialog title="审核" :visible.sync="activityDialogVisible">
      <el-form :model="form">
        <el-form-item v-for="(item, $index) in actColumns" :key="item.label" :label="item.label" label-width="140px">
          <el-col :span="12">
            <el-input v-model="form[item.key]" v-show="item.type === 'text' || item.type === 'textarea'" :type="item.type" ></el-input>
          </el-col>
          <el-col :span="12">
            <el-select v-model="form[item.key]" v-show="item.type === 'select'" style="width: 100%" >
              <el-option v-for="opItem in item.options" :value="opItem.value" :label="opItem.label" :key="opItem.value"></el-option>
            </el-select>
          </el-col>
          <editor width="90%" v-if="item.type === 'editor'" element-id="addEditor" v-model="form[item.key]" :value="form[item.key]"></editor>
          <div v-if="item.type === 'datePicker'">
            <el-col :span="12">
              <el-date-picker
                type="date"
                v-model = "form[item.key]"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              >
              </el-date-picker>
            </el-col>
          </div>
          <div v-if="item.type === 'carousel'" class="carousel">
            <el-carousel height="150px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="activityDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reviewActivity">审核</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import reqType from '@/api/reqType';
  import Editor from '../../../../common/components/Editor';
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import CommonStableTable from '../common/CommonStableTable';
  import showCenterDetail from '../common/showCenterDetail';
  import Map from '../Map';
    export default {
        name: 'CenterActivityManagement',
        data () {
          return {
            user: {},
            activeName: 'formulate',
            text: '',
            Map,
            columns: [
              {
                type: 'index',
                label: '序号',
              },
              {
                prop: 'name',
                label: '活动标题'
              },
              {
                prop:'activityType',
                label: '活动类型'
              },
              {
                prop: 'des',
                label: '活动内容'
              },
              {
                prop: 'beginAt',
                label: '开始时间'
              },
              {
                prop: 'endAt',
                label: '结束时间'
              },
              {
                prop: 'score',
                label: '积分'
              },
              {
                type: 'function',
                label: '操作',
                functionOpt: [
                  {
                    type: 'text',
                    label: '查看',
                    func: this.showDetails
                  },
                  {
                    type: 'text',
                    label: '编辑',
                    func: this.edit
                  },
                  {
                    type: 'text',
                    label: '删除',
                    func: this.deleteRow
                  }
                ]
              }
            ],
            formColumns: [], // 活动制定新增弹框
            publishDialogVisible: false,
            activityDialogVisible: false,
            ActivityList: [],
            culturalCategory: [],
            showBtn: false,
            planColumns: [
              {
                prop: 'town',
                label: '镇所',
                fixed: 'fixed'
              },
              {
                prop: 'villageStation',
                label: '村站',
                fixed: 'fixed'
              },
              {
                prop: 'activityName',
                label: '活动名称'
              },
              {
                prop: 'culturalCategory',
                label: '文化类别'
              },
              {
                prop: 'content',
                label: '活动内容'
              },
              {
                prop: 'practicePoint',
                label: '执行实践点'
              },
              {
                prop: 'score',
                label: '积分'
              },
              {
                prop: 'startTime',
                label: '开始时间'
              },
              {
                prop: 'endTime',
                label: '截止时间'
              },
              {
                prop: 'remark',
                label: '备注'
              },
              {
                type: 'function',
                label: '操作',
                fixed: 'fixed',
                functionOpt: [
                  {
                    type: 'text',
                    label: '审核',
                    func: this.review
                  },
                  {
                    type: 'text',
                    label: '删除',
                    func: this.deleteRow
                  }
                ]
              }
            ],
            activityColumns: [
              {
                prop: 'town',
                label: '镇所',
                fixed: 'fixed',
              },
              {
                prop: 'villageStation',
                label: '村站',
                fixed: 'fixed',
              },
              {
                prop: 'activityName',
                label: '活动名称'
              },
              {
                prop: 'culturalCategory',
                label: '文化类别'
              },
              {
                prop: 'content',
                label: '活动内容'
              },
              {
                prop: 'practicePoint',
                label: '执行实践点'
              },
              {
                prop: 'score',
                label: '积分'
              },
              {
                prop: 'startTime',
                label: '开始时间'
              },
              {
                prop: 'endTime',
                label: '完成时间'
              },
              {
                prop: 'remark',
                label: '备注'
              },
              {
                type: 'function',
                label: '操作',
                fixed: 'right',
                functionOpt: [
                  {
                    type: 'text',
                    label: '审核',
                    func: this.actReview
                  },
                  {
                    type: 'text',
                    label: '删除',
                    func: this.deleteRow
                  }
                ]
              }
            ],
            actColumns: [
              {
                type: 'text',
                key: 'title',
                label: '活动标题'
              },
              {
                type: 'select',
                key: 'culturalCategory',
                label: '文化类别',
                options: this.culturalCategory
              },
              {
                type: 'datePicker',
                key: 'startTime',
                label: '开始时间'
              },
              {
                type: 'datePicker',
                key: 'endTime',
                label: '结束时间'
              },
              {
                type: 'textarea',
                ey: 'content',
                label: '活动内容'
              },
              {
                type: 'carousel',
                key: 'picture',
                label: '图片',
                options: [
                  {
                    value: '',
                    key: ''
                  }
                ]
              },
              {
                type: 'text',
                key: 'practicePoint',
                label: '执行实践点'
              },
              {
                type:'text',
                key: 'score',
                label: '积分'
              },
              {
                type: 'textarea',
                key: 'description',
                label: '活动描述'
              },
              {
                type: 'select',
                key: 'isSpecial',
                label: '推荐为特色活动',
                options:[
                  {
                    value: true,
                    label: '是'
                  },
                  {
                    value: false,
                    label: '否'
                  }
                ]
              },
              {
                type: 'select',
                key: 'result',
                label: '审核结果',
                options: [
                  {
                    value: 'pass',
                    label: '通过'
                  },
                  {
                    value: 'reject',
                    label: '不通过'
                  }
                ]
              },
              {
                type: 'text',
                key: 'reviewPerson',
                label: '审核人'
              },
              {
                type: 'text',
                key: 'uploadPerson',
                label: '上传人'
              },
              {
                type: 'editor',
                key: 'remark',
                label: '备注'
              }
            ],
            graphic: {
              img: [
                {path: '/static/img/test.jpeg', pathB: '/static/img/test.jpeg'},
                {path: '/static/img/test.jpeg', pathB: '/static/img/bj.jpg'},
                {path: '/static/img/test.jpeg', pathB: '/static/img/test.jpeg'},
                {path: '/static/img/test.jpeg', pathB: '/static/img/bj.jpg'}
              ]
            },
            form: {
              startTime: '',
              endTime: ''
            },
            showDetail: false,
            publishParams:{
              activityList: [],
              town: []
            },
            publishList:{
              activityList: [],
              townList: []
            }
          };
        },
      components: {
        Editor,
        CommonTable,
        CommonDialog,
        CommonStableTable,
        showCenterDetail
      },
      mounted () {
        this.getUserInfo();
        if (this.activeName === 'formulate'){
          this.formColumns=[
            {
              type: 'text',
              key: 'name',
              label: '活动标题'
            },
            {
              type: 'select',
              key: 'activityType',
              label: '文化类别',
              showDefault: true,
              options: this.culturalCategory
            },
            {
              type: 'datePicker',
              key: 'beginAt',
              label: '开始时间'
            },
            {
              type: 'datePicker',
              key: 'endAt',
              label: '结束时间'
            },
            {
              type: 'editor',
              key: 'des',
              label: '活动内容'
            }
          ];
        }
      },
      methods: {
          getUserInfo () {
            var user = sessionStorage.getItem('user');
            if (user) {
              this.user = JSON.parse(user);
            }
            if (this.user.orgCenter && this.user.orgCenter.type) {
              var type = {};
              type.value = this.user.orgCenter.type;
              type.label = Map['culturalCategory'][this.user.orgCenter.type];
              this.culturalCategory.push(type);
            }
          },
          /**
           * 切换tab
           * */
        switchTab(){
          if (this.activeName === 'planReview') {
            if (this.$refs.planTable) {
              this.$refs.planTable.loadTableData();
            }
          }
        },
          /**
           * 查看
           * */
        showDetails (index,row) {
          if (this.$refs.formulateDialog) {
            this.$refs.formulateDialog.disabled = true;
            this.$refs.formulateDialog.title = '查看';
            this.$refs.formulateDialog.dialogVisible = true;
            // this.$refs.formulateDialog.showEditor = true;
            this.$refs.formulateDialog.form = row;
          }
        },
        /**
         * 编辑
         * */
        edit (index, row) {
          if (this.$refs.formulateDialog) {
            this.$refs.formulateDialog.title = '编辑';
            this.$refs.formulateDialog.dialogVisible = true;
            // this.$refs.formulateDialog.showEditor = true;
            this.$refs.formulateDialog.form = row;
          }
        },
        /**
        * 删除
        * */
        deleteRow(index, row) {
          this.$confirm('确认删除？')
            .then(_ => {
              this.$http(reqType.DELETE,`activity/${row.id}`)
                .then(data => {
                  this.$refs.formulateTable.loadTableData();
                });
            })
            .catch(_ => {});
        },
        /**
         * 增加
         * */
        add () {
          if (this.$refs.formulateDialog) {
            console.log(this.$refs.formulateDialog.form);
          }
        },
        /**
         *  发布活动
         * */
        publishActivity(){
          this.publishDialogVisible = false;
          this.$alert('需要发布活动的接口', '提示', {
            dangerouslyUseHTMLString: true
          });
        },
        /**
         * 活动审核
         * */
        actReview (index, row) {
          console.log(index);
          console.log(row);
          this.activityDialogVisible = true;
          this.form = row;
          // this.showDetail = true;
        },
        activityReview () {
          this.activityDialogVisible = false;
          this.$alert('需要活动审核的接口', '提示', {
            dangerouslyUseHTMLString: true
          });
        },
       /**
        *
        * */
       reviewActivity () {
        console.log(this.form);
       },
        /*
        * 审核*/
        review () {

        },
        /**
         * 新增活动制定
         * */
        addCenterAct(params){
          console.log(params);
          let method;
          params.type = 'ACT_TYPE_CENTER';
          params.status = 'ACTIVITY_CITY_PASSED';
          // 更新
          if (params.id) {
            // 新增
            this.$http(reqType.PUT,`activity/${params.id}`, params)
              .then(data => {
                if (data.code === 200) {
                  window.alert(data.msg);
                }
                this.$refs.formulateTable.loadTableData();
              });
          } else {
            // 新增
            this.$http(reqType.POST,`activity/`, params)
              .then(data => {
                if (data.code === 200) {
                  window.alert(data.msg);
                }
                this.$refs.formulateTable.loadTableData();
              });
          }
        }
      },
      watch: {
          activeName: {
            handler () {
              this.switchTab();
            }
          }
      }
    }
</script>

<style scoped lang="less">
  .center-act{
    padding:15px;
    .center{
      margin-left:15%;
    }
    .carousel{
      width:300px;
      height:150px;
    }
  }

</style>
