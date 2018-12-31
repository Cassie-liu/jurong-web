<template>
  <div class="base-data">
    <el-tabs v-model="activeName">
      <el-tab-pane label="活动认领" name="claim">
        <el-form :inline="true">
          <el-form-item label="选择活动类型">
            <el-select v-model="claimParams.activityType" >
              <el-option v-for="(item, $index) in activityTypeList2" :label="item.value" :key="$index" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="认领状态">
            <el-select v-model="claimParams.status" >
              <el-option v-for="(item, $index) in status" :label="item.value" :key="$index" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <CommonTable :columns="claimColumns" api-root="activity"></CommonTable>
        <CommonDialog :form-columns="claimFormColumns" ref="claimDialog" :disabled="true"></CommonDialog>
        <el-row class="center">
          <el-button @click="showSelfPlanModal" type="primary">添加自选计划</el-button>
          <el-button @click="showReceiveModal" type="primary">认领</el-button>
        </el-row>
        <el-row class="top">
          <CommonDialog :form-columns="selfPlanFormColumns" ref="selfPlanDialog" :disabled="true"></CommonDialog>
          <CommonTable :columns="selfPlanColumns" api-root="activity"></CommonTable>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="活动上传" name="upload">
        <el-form :inline="true">
          <el-form-item label="选择活动类型" class="item-wrap">
            <el-select v-model="uoploadParams.activityType" >
              <el-option v-for="(item, $index) in activityTypeList2" :label="item.value" :key="$index" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动属性" class="item-wrap">
            <el-select v-model="uoploadParams.actProps" >
              <el-option v-for="(item, $index) in actPropsOpt" :label="item.value" :key="$index" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动状态" class="item-wrap">
            <el-select v-model="uoploadParams.actStatus" >
              <el-option v-for="(item, $index) in actStatusOpt" :label="item.value" :key="$index" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="item-wrap">
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <CommonDialog :form-columns="uploadFormColumns" ref="uploadDialog" :disabled="true"></CommonDialog>
        <!--<CommonTable :columns="uploadColumns" api-root="activity"></CommonTable>-->
        <el-table :data="tableData" v-loading="loading">
          <el-table-column v-for="item in uploadColumns" :key="item.prop" :prop="item.prop" :label="item.label" :type="item.type? item.type: ''"
                           :width="item.width || ''"  ></el-table-column>
          <el-table-column label="操作" :formatter="formatter">
              <template slot-scope="scope">
                <el-button @click="">新增</el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="活动状态" name="status">

      </el-tab-pane>
      <el-tab-pane label="活动统计" name="statistics">

      </el-tab-pane>
    </el-tabs>
    <!--添加自选计划-->
    <el-dialog title="添加自选计划" :visible.sync="dialogTableVisible">
      <el-form :data="form" label-width="80px">
        <el-form-item  prop="date" label="活动标题" >
          <el-row>
            <el-col :span="18">
              <el-input v-model="form.name"></el-input>
            </el-col>
           <el-col :span="6">
             <span class="text">字数限制25个字</span>
           </el-col>
          </el-row>
        </el-form-item>
        <el-form-item  prop="name" label="活动内容">
          <Editor element-id="contentEditor" v-model="form.content" width="85%"></Editor>
        </el-form-item>
        <el-form-item prop="startAt" label="开始时间">
          <el-col :span="8">
            <el-date-picker
              type="date"
              v-model = "form.startAt"
              placeholder="选择日期"
              :value-format="'yyyy-MM-ddTHH:mm:ss'"
              style="width: 100%"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="4" class="right">
            <span>截止时间</span>
          </el-col>
          <el-col :span="8">
            <el-date-picker
              type="date"
              v-model = "form.endAt"
              placeholder="选择日期"
              :value-format="'yyyy-MM-ddTHH:mm:ss'"
              style="width: 100%"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item prop="score" label="积分">
          <el-col :span="8">
            <el-input v-model="form.score"></el-input>
          </el-col>
          <el-col :span="4" class="text-right content">
            <span>活动类型</span>
          </el-col>
          <el-col :span="10" >
            <el-select v-model="form.activityType" style="width:80%">
              <el-option v-for="(item, $index) in activityTypeList2" :key="$index"
                         :value="item.label" :label="item.value"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
         <el-col :span="20">
           <el-input type="textarea" placeholder="字数限制200个字" :autosize="{minRows: 3, maxRows: 5}"></el-input>
         </el-col>
        </el-form-item>
      </el-form>
      <div class="footer">
        <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSelfPlan" >确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <!--确认认领-->
    <el-dialog title="确认认领" :visible.sync="dialogReceiveVisible" width="30%">
      <div>
        <el-row>
          当前认领活动 <span class="red">{{receiveList.total}}</span>条,共计积分 <span class="red">{{receiveList.totalScore}}</span> 分：
        </el-row>
        <div class="top">
          <el-row v-for="(item, $index) in activityTypeList1" :key="$index">
            {{item.value}} <span class="red">{{receiveList[item.label] || 0 }}</span>条
          </el-row>
        </div>
        <div class="top">
          <el-row>请注意各活动的开始时间和截止时间，按时完成</el-row>
        </div>
      </div>
      <div class="footer">
        <span slot="footer" class="dialog-footer">
                <el-button @click="dialogReceiveVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmReceive" >确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="活动上传" :visible.sync = "uploadActivityVisible">
      <div class="footer">
        <span slot="footer" class="dialog-footer">
                <el-button @click="uploadActivityVisible = false">取 消</el-button>
                <el-button type="primary" @click="uploadActivityVisible = false" >确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import reqType from "../../../../api/reqType";
  import Editor from '../../../../common/components/Editor';
  import CommonTable from '../common/CommonTable';
  import CommonDialog from '../common/CommonDialog';
  import CommonSearch from '../common/CommonSearch';
  import Map from '../Map';
  export default {
    name: 'VillageActManage',
    components: {
      CommonTable,
      CommonDialog,
      CommonSearch,
      Editor
    },
    props: [],
    data () {
      return {
        activeName: 'claim',
        dialogTableVisible: false,
        dialogReceiveVisible: false,
        claimColumns: [
          {
            type: 'selection'
          },
          {
            type: 'index',
            label: '序号'
          },
          {
            prop: 'name',
            label: '活动标题'
          },
          {
            prop: 'content',
            label: '活动内容'
          },
          {
            prop:'startAt',
            label: '开始时间'
          },
          {
            prop: 'endAt',
            label: '截止时间'
          },
          {
            prop: 'score',
            label: '积分'
          },
          {
            prop: 'receiveStatus',
            label: '认领状态'
          },
          {
            type: 'function',
            label: '操作',
            functionOpt: [
              {
                type: 'text',
                label:'查看',
                func: this.showDetail
              },
              {
                type: 'text',
                label: '附件下载',
                func: this.download
              }
            ]
          }
        ],
        claimParams: {
          activityType: '',
          status: ''
        },
        claimFormColumns: [
          {
            type: 'text',
            key: 'name',
            label: '活动标题'
          },
          {
            type: 'editor',
            key: 'content',
            label: '活动内容'
          },
          {
            type: 'datePicker',
            key: 'startAt',
            label: '开始时间'
          },
          {
            type: 'datePicker',
            key: 'endAt',
            label: '截止时间'
          },
          {
            type: 'text',
            key: 'score',
            label: '积分'
          },
          {
            type: 'text',
            key: 'receiveStatus',
            label: '认领状态'
          }
        ],
        activityTypeList1: [],
        activityTypeList2: [],
        status: [
          {
            label: 'all',
            value: '所有'
          },
          {
            label: 'audited',
            value: '已认领'
          },
          {
            label: 'unAudited',
            value: '未认领'
          }
        ],
        form: {},     // 活动认领 ---- 添加自选活动
        receiveList: {
          total: 10,
          totalScore: 30
        },
        selfPlanColumns: [
          {
            type: 'index',
            label: '序号',
          },
          {
            prop: 'name',
            label: '活动标题'
          },
          {
            prop: 'des',
            label: '活动内容'
          },
          {
            prop:'type',
            label: '活动类型'
          },
          {
            prop: 'actProps',
            label: '活动属性'
          },
          {
            prop:'startAt',
            label: '开始时间'
          },
          {
            prop: 'endAt',
            label: '截止时间'
          },
          {
            prop: 'score',
            label: '积分'
          },
          {
            prop: 'remark',
            label: '备注'
          },
          {
            prop:'reviewStatus',
            label: '审核状态'
          },
          {
            type: 'function',
            label: '操作',
            width: '200',
            functionOpt: [
              {
                type: 'text',
                label: '查看',
                func: this.showSelfDetail
              },
              {
                type: 'text',
                label: '删除',
                func: this.deleteSelfPlan
              },
              {
                type: 'text',
                label: '附件下载',
                func: this.downloadSelf
              }
            ]
          }
        ],
        selfPlanFormColumns: [
          {
            type: 'text',
            key: 'name',
            label: '活动标题'
          },
          {
            type: 'editor',
            key: 'content',
            label: '活动内容'
          },
          {
            type: 'text',
            key: 'actProps',
            label: '活动属性'
          },
          {
            type: 'datePicker',
            key: 'startAt',
            label: '开始时间'
          },
          {
            type: 'datePicker',
            key: 'endAt',
            label: '截止时间'
          },
          {
            type: 'text',
            key: 'score',
            label: '积分'
          },
          {
            type: 'text',
            key: 'reviewStatus',
            label: '审核状态'
          }
        ],
        actPropsOpt: [
          {
            value: '所有',
            label: 'all'
          },
          {
            value: '固选活动',
            label: ''
          },
          {
            value: '自选活动',
            label: ''
          }
        ],
        uoploadParams: {},
        actStatusOpt: [
          {
            value: '已完成',
            label: 'completed'
          },
          {
            value: '审核中',
            label: 'reviewing'
          },
          {
            value: '未完成',
            label: 'unCompleted'
          },
          {
            value: '已驳回',
            label: 'reject'
          }
        ],
        uploadColumns: [
          {
            type: 'selection'
          },
          {
            type: 'index',
            label: '序号'
          },
          {
            prop: 'name',
            label: '活动标题'
          },
          {
            prop: 'type',
            label: '活动类型'
          },
          {
            prop: 'props',
            label: '活动属性'
          },
          {
            prop: 'status',
            label: '活动状态'
          },
          {
            prop: 'startAt',
            label: '开始时间'
          },
          {
            prop: 'endAt',
            label: '截止时间'
          },
          {
            prop: 'targetScore',
            label: '目标积分'
          },
          {
            prop: 'actualScore',
            label: '实际积分'
          },
          {
            prop: 'comment',
            label: '审核意见'
          }
        ],
        uploadFormColumns: [
          {
            type: 'text',
            key: 'name',
            label: '活动标题'
          },
          {
            type: 'text',
            key: 'content',
            label: '活动内容'
          },
          {
            type: 'text',
            key: 'type',
            label: '活动类型'
          },
          {
            type: 'text',
            key: 'props',
            label: '活动属性'
          },
          {
            type: 'text',
            key: 'status',
            label: '活动状态'
          },
          {
            type: 'datePicker',
            key: 'startAt',
            label: '开始时间'
          },
          {
            type: 'datePicker',
            key: 'endAt',
            label: '截止时间'
          },
          {
            type: 'text',
            key: 'targetScore',
            label: '目标积分'
          },
          {
            type: 'text',
            key: 'actualScore',
            label: '实际积分'
          },
          {
            type: 'textarea',
            key: 'comment',
            label: '审核意见'
          }
        ],
        tableData: [],
        loading: false,
        uploadActivityVisible: false
      };
    },
    mounted () {
      this.initAct();
    },
    comments: {
      CommonTable
    },
    methods: {
      initAct(){
        for (let i in Map['culturalCategory']) {
          this.activityTypeList1.push({label: i,value: Map['culturalCategory'][i]});
          this.activityTypeList2.push({label: i,value: Map['culturalCategory'][i]});
        }
        this.activityTypeList2.unshift({label:'all',  value:'所有'});
      },
      switchTab(){
        if(this.activeName === 'upload') {
          //  活动上传的接口
          this.loading = true;
          this.$http(reqType.GET, `activity/list`)
            .then(data => {
              console.log(data);
              this.loading = false;
            }).catch(data => {
              this.loading = false;
          });
        }
      },
      showDetail(index, row){
        if(this.$refs.claimDialog) {
          this.$refs.claimDialog.form = row;
          this.$refs.claimDialog.title = '查看';
          this.$refs.claimDialog.dialogVisible = true;
        }
      },
      download(){
        this.$confirm('确认下载附件？')
          .then(_ => {
            this.$alert('需要下载附件的接口', '提示', {
              dangerouslyUseHTMLString: true
            });
            done();
          })
          .catch(_ => {

          });
      },
      /**
       * 显示自选计划弹框
       * */
      showSelfPlanModal(){
        this.dialogTableVisible = true;
      },
      /**
       * 添加自选计划
       * */
      addSelfPlan(){
        this.dialogTableVisible = false;
        console.log(this.form);
      },
      /**
       * 显示认领弹框
       * */
      showReceiveModal(){
        this.dialogReceiveVisible = true;
      },
      /**
       * 确认认领
       * */
      confirmReceive(){
        this.dialogReceiveVisible = false;
        // console.log();
      },
      /**
       * 查看自选活动详情
       * */
      showSelfDetail(index, row){
        if(this.$refs.selfPlanDialog) {
          this.$refs.selfPlanDialog.dialogVisible = true;
          this.$refs.selfPlanDialog.form = row;
          this.$refs.selfPlanDialog.title = '查看';
        }
      },
      /**
       * 删除自选活动
       * */
      deleteSelfPlan(){

      },
      /**
       * 下载自选活动附件
       * */
      downloadSelf(){

      },
      /**
       * 查看活动上传详情
       * */
      showUploadDetail(index, row){
        if(this.$refs.uploadDialog) {
          this.$refs.uploadDialog.form =row;
          this.$refs.uploadDialog.title = '查看';
          this.$refs.uploadDialog.dialogVisible = true;
        }
      },
      formatter(row,column,cellValue){
          console.log(row);
      }
    },
    watch: {
      activeName: {
        handler (oldVal, curVal) {
          this.switchTab();
        }
      }
    }
  };
</script>

<style scoped lang="less">
.base-data{
  padding: 0 15px 15px;
  .center{
    text-align: center;
  }
  .content{
    margin-left:10px;
  }
  .red{
    color:red;
    margin:0 5px;
  }
  .top{
    margin-top:20px;
  }
  .text-right{
    text-align: right;
    margin-left:-15px;
    margin-right:15px;
  }
  .text{
    margin-left:15px;
    color:#b1b1b1;
  }
  .right{
    text-align: right;
    padding-right:15px;
  }
  .item-wrap{
    margin-right:20px;
  }
  .footer{
    text-align: center;
    margin-top:20px;
  }
}
</style>
