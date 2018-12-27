<template>
  <div class="base-data">
    <el-tabs v-model="tab" @tab-click="handleClick">
      <el-tab-pane label="办公室" name="first">
        <div v-show="showDetailInfo">
          <el-row>
            <el-button type="primary" size="small" @click="addOfficeModal('office')">新增</el-button>
          </el-row>
          <el-table :data="officeList" tripe style="width: 100%">
            <el-table-column type="index" width="300" label="序号"></el-table-column>
            <el-table-column prop="code" label="编码"></el-table-column>
            <el-table-column prop="officeName" label="办公室名称"></el-table-column>
            <el-table-column label="概况">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="handleDetail(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteOffice(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="row-right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="4">
            </el-pagination>
          </div>
        </div>
        <div v-show="!showDetailInfo">
          <el-tabs type="border-card" v-model="subTab">
            <el-tab-pane label="办公室信息" name="office">
              <div class="office-info">
                <el-form :model="detailInfo" width="300" size="mini" label-width="200">
                  <el-form-item label="办公室编码" prop="code" label-width="100px">
                    <el-input v-model="detailInfo.code"></el-input>
                  </el-form-item>
                  <el-form-item label="办公室名称" prop="officeName" label-width="100px">
                    <el-input v-model="detailInfo.officeName"></el-input>
                  </el-form-item>
                  <div class="row-left">
                    <el-button type="primary" size="small">保存</el-button>
                  </div>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="人员管理" name="person">
              <el-row>
                <el-button size="mini" type="primary" @click="addOfficeModal('person')">新增</el-button>
                <el-button size="mini" @click="switchSubTabs('organize')"  class="fr" plain>切换</el-button>
              </el-row>
              <el-table :data="personList" tripe style="width: 100%">
                <el-table-column prop="lob"  label="工号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="position" label="职位"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="mini"
                      @click="">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="row-right">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="4">
                </el-pagination>
              </div>
            </el-tab-pane>
            <!--<el-tab-pane label="组织架构" name="organize">-->

            <!--</el-tab-pane>-->
            <el-tab-pane label="概况" name="overView">
              <CommonCRUD v-if="subTab === 'overView'"  :columns="columns" api-root="center" :form-columns="overViewColumns"></CommonCRUD>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      <el-tab-pane label="领导机构" name="second">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane label="人员管理" name="person">
            <CommonCRUD v-if="activeName === 'person'" :columns="personColumns" api-root="townUser" :form-columns="personFormColumns"></CommonCRUD>
          </el-tab-pane>
          <!--<el-tab-pane label="组织架构" name="org">-->
          <!--</el-tab-pane>-->
        </el-tabs>
      </el-tab-pane>
    </el-tabs>

    <!--办公室新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible"  width="30%">
      <el-form :model="addOffice" >
        <el-form-item label="办公室编码" prop="code" label-width="100px">
          <el-input v-model="addOffice.code"></el-input>
        </el-form-item>
        <el-form-item label="办公室名称" prop="officeName" label-width="100px">
          <el-input v-model="addOffice.officeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleOffice" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <!--办公室查看界面-->
    <el-dialog title="查看" :visible.sync="editFormVisible"  width="30%">
      <el-form :model="addOffice" >
        <el-form-item label="办公室编码" prop="code" label-width="100px">
          <el-input v-model="addOffice.code"></el-input>
        </el-form-item>
        <el-form-item label="办公室名称" prop="officeName" label-width="100px">
          <el-input v-model="addOffice.officeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleOffice" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <!--人员管理新增界面-->
    <el-dialog title="新增" :visible.sync="addPersonFormVisible"  width="30%">
      <el-form :model="addPerson" >
        <el-form-item label="工号" prop="lob" label-width="50px">
          <el-input v-model="addPerson.lob"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" label-width="50px">
          <el-input v-model="addPerson.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" label-width="50px">
          <el-input v-model="addPerson.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position" label-width="50px">
          <el-select v-model="addPerson.position" placeholder="请选择" class="item-select">
            <el-option
              v-for="item in position"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="50px">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="addPerson.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPersonFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleOffice('person')" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <!--人员管理查看界面-->
    <el-dialog title="查看" :visible.sync="addPersonFormVisible"  width="30%">
      <el-form :model="addPerson" >
        <el-form-item label="工号" prop="lob" label-width="50px">
          <el-input v-model="addPerson.lob"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" label-width="50px">
          <el-input v-model="addPerson.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" label-width="50px">
          <el-input v-model="addPerson.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position" label-width="50px">
          <el-select v-model="addPerson.position" placeholder="请选择" class="item-select">
            <el-option
              v-for="item in position"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="50px">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="addPerson.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPersonFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleOffice('person')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import CommonCRUD from '../common/CommonCRUD';
  import Pagination from '../../../../common/components/Pagination';
  import AddOffice from './AddOffice';
  export default {
    name: 'CenterBaseData',
    components: {
      CommonCRUD,
      Pagination,
      AddOffice
    },
    props: [],
    data () {
      return {
        tab: 'first',      // tab默认为office
        subTab: 'office', // 办公室下的tab
        activeName: 'person',   //组织机构下的tab
        officeList: [],   // 办公室list
        personList: [],   // 人员管理list
        data: {},   // 一条数据
        params: {
          pageNum: 1,
          pageSize: 10
        },  // 所需的参数
        totalCount: 0,    // 总条数
        totalPage: 0,     // 总页数
        currentPage: 1,     // 当前页
        addOffice: {},      // 办公室数据
        addPerson: {},      // 人员管理数据
        position: [
          {value: 'leader', label: '主任'},
          {value: 'leader1', label: '副主任'},
          {value: 'leader2', label: '工作人员'}
        ],    // 职位
        addFormVisible: false,   // 是否显示办公室弹框
        editFormVisible: false,   // 查看办公室弹框
        showDetailInfo: true,   // 编辑显示具体信息
        addPersonFormVisible: false,   // 新增人员管理信息
        editPersonFormVisible: false,   // 编辑人员管理信息
        detailInfo: {},
        columns: [
          {
            type: 'index',
            label: '编号'
          },
          {
            prop: 'remark',
            label: '备注'
          },
          {
            prop: 'createTime',
            label: '创建时间'
          },
          {
            prop: 'modifyTime',
            label: '修改时间'
          },
          {
            props: 'status',
            label: '状态'
          }
        ],
        overViewColumns: [
          {
            type: 'text',
            key: 'coding',
            label: '编号'
          },
          {
            type: 'text',
            key: 'remark',
            label: '备注'
          },
          {
            type: 'text',
            key: 'createTime',
            label: '创建时间'
          },
          {
            type: 'text',
            key: 'modifyTime',
            label: '修改时间'
          },
          {
            type: 'text',
            key: 'status',
            label: '状态'
          }
        ],
        personColumns: [
          {
            prop: 'jobNumber',
            label: '工号'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'gender',
            label: '性别'
          },
          {
            prop: 'position',
            label: '职位'
          },
          {
            prop: 'remark',
            label: '备注'
          }
        ],
        personFormColumns: [
          {
            type: 'text',
            key: 'jobNumber',
            label: '工号'
          }, {
            type: 'text',
            key: 'name',
            label: '姓名'
          }, {
            type: 'text',
            key: 'gender',
            label: '性别'
          }, {
            type: 'text',
            key: 'position',
            label: '职位'
          }, {
            type: 'text',
            key: 'remark',
            label: '备注'
          }
        ]
      };
    },
    mounted () {
      this.queryOfficeList();
      this.queryPersonList();
    },
    computed: {
    },
    comments: {
      Pagination
    },
    methods: {
      handleClick (tab, event) {
        if (tab.name === 'first') {
          this.showDetailInfo = true;
        }
      },
      // 查询
      queryOfficeList (pageNum) {
        if (pageNum) {
          this.params.pageNum = pageNum;
        }
        this.officeList = [
          {id: 1, code: 111111, officeName: '1111111', detail: '12451212123212'},
          {id: 2, code: 222222, officeName: '2222222', detail: '25511223262323'},
          {id: 3, code: 333333, officeName: '3333333', detail: '45845214521452'},
          {id: 4, code: 444444, officeName: '4444444', detail: 'kjnnmnnmmk5245'}
        ];
        this.totalCount = this.officeList.length;
        this.totalPage = Math.ceil(this.totalCount / this.params.pageSize);
      },
      // 删除
      deleteOffice (id) {
        //  需要弹出框
        this.$confirm('此操作将永久删除该文件，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 显示办公室新增弹框框
      addOfficeModal (type) {
        if (type === 'office') {
          this.addFormVisible = true;
          this.addOffice = {
            code: '',
            officeName: ''
          };
        } else if (type === 'person') {
          this.addPerson = {
            lob: '',
            name: '',
            sex: '',
            position: '',
            remark: ''
          };
          this.addPersonFormVisible = true;
        }
      },
      // 处理概况查看
      handleDetail (index, row) {
        this.editFormVisible = true;
        this.addOffice = row;
      },
      // 处理办公室编辑功能
      handleEdit (index, row) {
        this.showDetailInfo = false;
        this.detailInfo = row;
        this.subTab = 'office';
      },
      /**
       * 关闭新增办公室弹框
       * */
      handleOffice (type) {
        if (type === 'office') {
          this.addFormVisible = false;
        } else if (type === 'person') {
          this.addPersonFormVisible = false;
        }
      },
      /**
       * 分页 每页显示多少条
       * */
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
      },
      /**
       * 切换
       */
      switchSubTabs (type) {
        this.subTab = type;
        console.log(type);
      },
      /**
       * 人员管理查询
       * */
      queryPersonList () {
        this.personList = [
          {lob: '1201256325', name: '张三', sex: '男', position: '副主任', remark: '111122222'},
          {lob: '1201256325', name: '张三', sex: '男', position: '副主任', remark: '444444444'},
          {lob: '1201256325', name: '张三', sex: '男', position: '副主任', remark: '585858585'},
          {lob: '1201256325', name: '张三', sex: '男', position: '副主任', remark: '555555555'}
        ];
      }
    }
  };
</script>

<style scoped lang="less">
  .base-data{
    .row-right{
      text-align: right;
      margin-top: 20px;
    }
    .row-left{
      margin-top:20px;
      margin-left:100px;
    }
    .office-info{
      width: 40%;
    }
    .item-select{
      width:100%;
    }
  }
</style>
