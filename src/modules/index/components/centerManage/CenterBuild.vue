<template>
  <div class="base-data">
    <CommonCRUD v-if="!showDetail" :columns="columns" api-root="center" :form-columns="formColumns">
      <el-button type="text" @click="showDetail = true">内容录入</el-button>
    </CommonCRUD>
    <el-tabs v-if="showDetail" v-model="activeName">
      <el-tab-pane label="分中心信息" name="center">
        <div class="office-info">
          <el-form :model="form" class="demo-form-inline" label-width="100px" :label-position="'left'">
            <el-form-item v-for="(item,index) in formColumn" :key="item.label" :label="item.label" label-width="100px">
              <el-input v-model="form[item.key]" v-if="item.type ==='text'" :key="index"></el-input>
              <el-select v-model="form[item.key]" v-else-if="item.type === 'select'" style="width: 100%">
                <el-option v-for="(opItem, index) in item.options" :value="opItem.value" :label="opItem.label" :key="opItem.value"></el-option>
              </el-select>
            </el-form-item>
            <div class="row-left">
              <el-button type="primary" size="small">保存</el-button>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人员管理" name="person">
        <CommonCRUD v-if="activeName === 'person'" :columns="personColumns" api-root="townUser" :form-columns="personFormColumns"></CommonCRUD>
      </el-tab-pane>
      <el-tab-pane label="文明实践点" name="point">
        <CommonCRUD v-if="activeName === 'point'" :columns="pointColumns" api-root="townUser" :form-columns="pointFormColumns"></CommonCRUD>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import CommonCRUD from '../common/CommonCRUD';
  export default {
    name: 'CenterBuild',
    props: [],
    data () {
      return {
        activeName: 'center',
        showDetail: false,
        // 表格字段显示配置
        columns: [
          {
            type: 'index',
            label: '序号'
          },
          {
            prop: 'coding',
            label: '编码'
          },
          {
            prop: 'name',
            label: '分中心名称'
          },
          {
            prop: 'culturalCategory',
            label: '文化类别'
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
            prop: 'remark',
            label: '备注'
          }
        ],
        formColumns: [
          {
            type: 'text',
            key: 'coding',
            label: '编码'
          },
          {
            type: 'text',
            key: 'name',
            label: '分中心名称'
          },
          {
            type: 'text',
            key: 'culturalCategory',
            label: '文化类别'
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
            type: 'text',
            key: 'remark',
            label: '备注'
          }],
        personColumns: [
          {
            props: 'lob',
            label: '工号'
          },
          {
            props: 'name',
            label: '姓名'
          },
          {
            props: 'sex',
            label: '性别'
          },
          {
            props: 'position',
            label: '职位'
          },
          {
            props: 'remark',
            label: '备注'
          }
        ],
        personFormColumns: [
          {
            type: 'text',
            key: 'lob',
            label: '工号'
          },
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
            key: 'position',
            label: '职位'
          },
          {
            type: 'text',
            key: 'remark',
            label: '备注'
          }
        ],
        pointColumns: [
          {
            type: 'index',
            label: '编号'
          },
          {
            props: 'name',
            label: '实践点名称'
          },
          {
            prop: 'longitude',
            label: '经度'
          },
          {
            prop: 'latitude',
            label: '纬度'
          }
        ],
        pointFormColumns: [
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
          }
        ],
        form: {
          code: '',
          name: '',
          longitude: '',
          latitude: '',
          culturalCategory: ''
        },
        formColumn: [
          {
            type: 'text',
            key: 'code',
            label: '分中心编码',
            width: '100'
          },
          {
            type: 'text',
            key: 'name',
            label: '分中心名称',
            width: '100'
          },
         {
            type: 'text',
            key: 'longitude',
            label: '经度',
            width: '100'
         },
          {
            type: 'text',
            key: 'latitude',
            label: '纬度',
            width: '100'
          },
          {
            type: 'select',
            key: 'culturalCategory',
            label: '文化类别',
            width: '100',
            options: [
              {
                value: 'health',
                label: '健康'
              },
              {
                value: 'theory',
                label: '理论'
              }
            ]
          }
        ]
      };
    },
    mounted () {

    },
    components: {
      CommonCRUD
    },
    methods: {}
  };
</script>

<style scoped lang="less">
.office-info{
  width:40%;
  margin-top:20px;
  .row-left{
    margin-left:100px;
  }
}
</style>
