<template>
  <div class="base-data">
    <el-tabs v-model="activeName">
      <el-tab-pane label="活动认领" name="claim">
        <el-form :inline="true">
          <el-form-item label="选择活动类型">
            <el-select v-model="claimParams.activityType" >
              <el-option v-for="(item, $index) in activityTypeList" :label="item.value" :key="$index" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="认领状态">
            <el-select v-model="claimParams.status" >
              <el-option v-for="(item, $index) in status" :label="item.value" :key="$index" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动属性" class="item-wrap">
            <el-select v-model="claimParams.actProps" >
              <el-option v-for="(item, $index) in actPropsOpt" :label="item.value" :key="$index" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <CommonTable :columns="claimColumns" api-root="activity/page" @selectChange="handleSelectValue" ref="claimTable"></CommonTable>
        <CommonDialog :form-columns="claimFormColumns" ref="claimDialog" :disabled="true"></CommonDialog>
        <el-row class="center">
          <el-button @click="showSelfPlanModal" type="primary">添加自选计划</el-button>
          <el-button @click="showReceiveModal" type="primary">认领</el-button>
        </el-row>
        <el-row class="top">
          <CommonDialog :form-columns="selfPlanFormColumns" ref="selfPlanDialog" :disabled="true"></CommonDialog>
          <CommonTable :columns="selfPlanColumns" api-root="activity/page" ref="selfPlanTable"></CommonTable>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="活动上传" name="upload">
        <el-form :inline="true">
          <el-form-item label="选择活动类型" class="item-wrap">
            <el-select v-model="uploadParams.activityType" >
              <el-option v-for="(item, $index) in activityTypeList" :label="item.value" :key="$index" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动属性" class="item-wrap">
            <el-select v-model="uploadParams.actProps" >
              <el-option v-for="(item, $index) in actPropsOpt" :label="item.value" :key="$index" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动状态" class="item-wrap">
            <el-select v-model="uploadParams.actStatus" >
              <el-option v-for="(item, $index) in actStatusOpt" :label="item.value" :key="$index" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="item-wrap">
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <!--查看/编辑-->
        <CommonDialog :form-columns="uploadFormColumns" ref="uploadDialog" :disabled="disabled"></CommonDialog>
        <el-table :data="tableData" v-loading="loading">
          <el-table-column v-for="item in uploadColumns" :key="item.prop" :prop="item.prop" :label="item.label" :type="item.type? item.type: ''"
                           :width="item.width || ''"  :formatter="formatter"></el-table-column>
          <el-table-column label="操作"  width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="showUploadDetail(scope.$index, scope.row)">查看</el-button>
                <el-button type="text" @click="editUpload(scope.$index, scope.row)">编辑</el-button>
                <el-button type="text" @click="upload(scope.$index, scope.row)">上传</el-button>
                <el-button type="text" @click="download(scope.$index, scope.row)">附件下载</el-button>
              </template>
          </el-table-column>
        </el-table>
        <el-pagination style="text-align: right;margin-top: 20px;"
                       :total="pageable.total" :current-page.sync="pageable.currentPage" :page-size.sync="pageable.pageSize"
                       @current-change="loadTableData" @size-change="loadTableData" layout="total, sizes, prev, pager, next">
        </el-pagination>
        <!--活动上传-->
        <CommonDialog :form-columns="uploadDetailFormColumns" ref="uploadDetailDialog" @submit="submitOpinion"></CommonDialog>
      </el-tab-pane>
      <el-tab-pane label="活动状态" name="status">
        <CommonTable :columns="ActivityStatusColumns" api-root="activity/page"></CommonTable>
        <CommonDialog :form-columns="ActivityStatusFormColumns" ref="ActivityStatusDialog" :disabled="true" :show-btn="false"></CommonDialog>
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
          <Editor element-id="contentEditor" v-model="form.des" width="85%"></Editor>
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
              <el-option v-for="(item, $index) in activityTypeList" :key="$index"
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
          <el-row v-for="(item, $index) in activityTypeList" :key="$index">
            {{item.value}} <span class="red">{{receiveList.activityTypeMap[item.label] || 0 }}</span>条
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
  import {getUser} from '../factories/commonFunc';
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
            prop: 'des',
            label: '活动内容'
          },
          {
            prop: 'activityType',
            label: '活动类型'
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
                label: '查看',
                func: this.showDetail
              },
              {
                type: 'text',
                label: '附件下载',
                func: this.download
              }
            ]
          }
        ],    // 活动认领表格数据
        claimParams: {
          activityType: '',
          status: '',
          list: []
        },      // 活动认领参数
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
        ],        // 活动认领弹框数据
        activityTypeList: [],           // 活动类型下拉框数据
        status: [
          {
            label: 'audited',
            value: '已认领'
          },
          {
            label: 'unAudited',
            value: '未认领'
          }
        ],                  // 认领状态数据
        form: {},     // 活动认领 ---- 添加自选活动
        receiveList: {
          total: 0,
          totalScore: 0,
          activityTypeMap: {
            ORG_TYPE_LLXJ: 0,
            ORG_TYPE_JYFW: 0,
            ORG_TYPE_WTFW: 0,
            ORG_TYPE_KJKP: 0,
            ORG_TYPE_JKPJ: 0
          }       // 活动类型type
        },          // 确认认领弹框数据
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
            prop:'activityType',
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
        ],      // 自选活动table 数据
        selfPlanFormColumns: [
          {
            type: 'text',
            key: 'name',
            label: '活动标题'
          },
          {
            type: 'editor',
            key: 'des',
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
        ],  // 自选活动弹框数据
        actPropsOpt: [
          {
            value: '固选活动',
            label: ''
          },
          {
            value: '自选活动',
            label: ''
          }
        ],          // 活动属性
        uploadParams: {},          // 活动上传 查询参数
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
        ],        // 活动上传 活动状态
        uploadColumns: [
          {
            type: 'selection'
          },
          {
            type: 'index',
            label: '序号'
          },
          {
            prop: 'activity.name',
            label: '活动标题'
          },
          {
            prop: 'activity.activityType',
            label: '活动类型'
          },
          {
            prop: 'activity.type',
            label: '活动属性'
          },
          {
            prop: 'status',
            label: '活动状态'
          },
          {
            prop: 'activity.des',
            label: '活动内容'
          },
          {
            prop: 'activity.startAt',
            label: '开始时间'
          },
          {
            prop: 'activity.endAt',
            label: '截止时间'
          },
          {
            prop: 'activity.targetScore',
            label: '目标积分'
          },
          {
            prop: 'activity.actualScore',
            label: '实际积分'
          },
          {
            prop: 'opinion',
            label: '审核意见'
          }
        ],      // 上传表格数据
        uploadFormColumns: [
          {
            type: 'text',
            key: 'name',
            label: '活动标题'
          },
          {
            type: 'editor',
            // key: 'activity && activity.des',
            key: 'des',
            label: '活动内容'
          },
          {
            type: 'text',
            // key: 'activity && activity.activityType',
            key: 'activityType',
            label: '活动类型'
          },
          {
            type: 'text',
            // key: 'activity && activity.type',
            key: 'type',
            label: '活动属性'
          },
          {
            type: 'text',
            key: 'status',
            // key: 'activity && activity.status',
            label: '活动状态'
          },
          {
            type: 'datePicker',
            key:  'startAt',
            // key:  'activity && activity.startAt',
            label: '开始时间'
          },
          {
            type: 'datePicker',
            key: 'endAt',
            // key: 'activity && activity.endAt',
            label: '截止时间'
          },
          {
            type: 'text',
            // key: 'activity && activity.targetScore',
            key: 'targetScore',
            label: '目标积分'
          },
          {
            type: 'text',
            // key: 'activity && activity.actualScore',
            key: 'actualScore',
            label: '实际积分'
          },
          {
            type: 'textarea',
            key: 'opinion',
            label: '审核意见'
          }
        ],    // 上传弹框数据
        tableData: [],              // 活动上传查询回的数据， 操作栏还有行的颜色需要做判断
        disabled: true,           // 弹框里的数据是否禁用，不允许修改
        loading: false,           // 加载
        uploadActivityVisible: false,     // 上传活动弹框
        ActivityStatusColumns:[
          {
            type: 'index',
            label: '序号'
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
            prop: 'startAt',
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
            type: 'function',
            label: '操作',
            functionOpt:[
              {
                type: 'text',
                label: '查看',
                func: this.showStatusDetail
              },
              {
                type: 'text',
                label: '附件下载',
                func: this.downLoad
              }
            ]
          }
        ],      // 活动状态表格数据
        ActivityStatusFormColumns: [
          {
            type: 'text',
            key: 'name',
            label: '活动标题'
          },
          {
            type: 'editor',
            key: 'des',
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
          }
        ],  // 活动状态弹框数据
        uploadDetailFormColumns: [
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
            type: 'select',
            key: 'activityType',
            label: '活动类型',
            options: this.activityTypeList,
          },
          {
            type: 'text',
            key:'score',
            label: '活动积分'
          },
          {
            type: 'textarea',
            key: 'comment',
            label: '活动备注'
          },
          {
            type: 'textarea',
            key: 'uploadDes',
            label: '活动描述'
          },
          {
            type: 'img',
            key: 'result',
            label:'上传执行结果'
          }
        ],    // 上传详情表格数据
        pageable: {
          total: 0,
          currentPage: 1,
          pageSize: 10
        }       // 分页
      };
    },
    mounted () {
      this.initAct();
    },
    methods: {
      initAct(){
        for (let i in Map['culturalCategory']) {
          this.activityTypeList.push({value: i,label: Map['culturalCategory'][i]});
        }
      },
      switchTab(){
        if(this.activeName === 'upload') {
          this.uploadDetailFormColumns = [
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
              type: 'select',
              key: 'activityType',
              label: '活动类型',
              options: this.activityTypeList,
            },
            {
              type: 'text',
              key:'score',
              label: '活动积分'
            },
            {
              type: 'textarea',
              key: 'comment',
              label: '活动备注'
            },
            {
              type: 'textarea',
              key: 'uploadDes',
              label: '活动描述'
            },
            {
              type: 'img',
              key: 'result',
              label:'上传执行结果'
            }
          ];
          //  活动上传的接口
          this.loadTableData();
        }
      },
      loadTableData(){
        this.loading = true;
        this.$http(reqType.POST, `record/domain/page?page=${this.pageable.currentPage - 1}&size=${this.pageable.pageSize}`, false)
          .then(data => {
              this.tableData = data.content;
              this.pageable.total = data.totalElements;
              this.loading = false;
            }
          ).catch(error => {
          this.loading = false;
        });
      },
      /**
       *  处理活动认领任务+积分
       * */
      handleSelectValue(value){
        this.receiveList.total = value.length; // 当前认领活动,
        this.claimParams.list = [];
        this.receiveList. activityTypeMap = {
          ORG_TYPE_LLXJ: 0,
            ORG_TYPE_JYFW: 0,
            ORG_TYPE_WTFW: 0,
            ORG_TYPE_KJKP: 0,
            ORG_TYPE_JKPJ: 0
        }; // 重置
        for (let i in value) {
          if(value[i].score){
            this.receiveList.totalScore += value[i].score;
          }
          if(this.receiveList.activityTypeMap.hasOwnProperty(value[i].activityType)){
            this.receiveList.activityTypeMap[value[i].activityType]+=1;
          }
          this.claimParams.list.push(value[i].id);
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
        this.form.type = 'ACT_TYPE_SELF';
        this.form.status = 'ACTIVITY_COMMITED';
        this.$http(reqType.POST, `activity/`, this.form)
          .then(data => {
            this.$refs.selfPlanTable.loadTableData();
          }).catch(data => {
          this.loading = false;
        });
        this.dialogTableVisible = false;
      },
      /**
       * 显示认领弹框
       * */
      showReceiveModal(){
        if (this.receiveList.total === 0) {
          this.$alert('请选择活动！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
          return;
        }
        this.dialogReceiveVisible = true;
      },
      /**
       * 确认认领
       * */
      confirmReceive(){
        this.dialogReceiveVisible = false;
        var params = {
          activityId : this.claimParams.list,
          countryId: getUser().country.id
        };
        console.log(params);
        this.$http(reqType.POST, `record/addAllReord/${params.countryId}`,params.activityId )
          .then(data => {

            if(this.$refs.claimTable){
              this.$refs.claimTable.loadTableData();
            }
          })
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
        this.disabled = true;
        if(this.$refs.uploadDialog) {
          this.$refs.uploadDialog.form = {
            name: row.activity && row.activity.name,
            des: row.activity && row.activity.des,
            activityType: row.activity && row.activity.activityType,
            type: row.activity && row.activity.type,
            status: row.status,
            startAt: row.activity && row.activity.startAt,
            endAt: row.activity && row.activity.endAt,
            targetScore: row.activity && row.activity.targetScore,
            actualScore: row.activity && row.activity.actualScore,
            opinion: row.opinion
          };
          this.$refs.uploadDialog.form = row;
          this.$refs.uploadDialog.title = '查看';
          this.$refs.uploadDialog.dialogVisible = true;
        }
      },
      formatter(row, column, cellValue, index) {
        for(let i in Map) {
          if(Map[i].hasOwnProperty(cellValue)){
            return  Map[i][cellValue];
          } else {
            return cellValue;
          }
        }
      },
      showStatusDetail(index, row){
        this.$refs.ActivityStatusDialog.form = row;
        this.$refs.ActivityStatusDialog.title = '查看';
        this.$refs.ActivityStatusDialog.dialogVisible = true;
      },
      downLoad(index, row){
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
      editUpload(index, row){
        this.disabled  = true;
        if(this.$refs.uploadDialog) {
          this.$refs.uploadDialog.form = row;
          this.$refs.uploadDialog.title = '编辑';
          this.disabled = false;
          this.$refs.uploadDialog.dialogVisible = true;
        }
      },
      upload(index, row){
        if(this.$refs.uploadDetailDialog) {
          this.$refs.uploadDetailDialog.form = row;
          this.$refs.uploadDetailDialog.title = '活动上传';
          this.$refs.uploadDetailDialog.dialogVisible = true;
        }
      },
      submitOpinion(form) {
        form.status = 'RECORD_COMMITED';
        this.$http(reqType.PUT, `record/${form.id}`, form).then(() => {
          this.$message({
            type: "success",
            message: "上传成功！"
          });
          this.loadTableData();
        })
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
