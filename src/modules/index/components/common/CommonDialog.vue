<template>
  <div class="common-dialog">
    <el-button @click="add" v-show="showBtn">新增</el-button>
    <el-dialog
      :title="title"
      width="60%"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-form  :model="form" ref="form"  :label-position="'left'">
        <el-form-item v-for="item in formColumns" :key="item.label" :label="item.label" label-width="100px">
            <el-col :span="12">
              <el-input v-model="form[item.key]" v-if="item.type === 'text' || item.type==='textarea'" :type="item.type" :disabled="item.disabled"></el-input>
            </el-col>
            <el-col :span="12">
              <el-select v-model="form[item.key]" v-if="item.type === 'select'" style="width: 100%" :disabled="item.disabled">
                <el-option v-for="opItem in item.options" :value="opItem.value" :label="opItem.label" :key="opItem.value"></el-option>
              </el-select>
            </el-col>
            <!--预留富文本编辑-->
              <editor width="90%" v-if="item.type === 'editor'" element-id="addEditor" v-model="form[item.key]" :value="form[item.key]"></editor>
            <div v-if="item.type === 'datePicker'">
              <el-col :span="12">
                <el-date-picker
                  :disabled="disabled"
                  type="date"
                  v-model = "form[item.key]"
                  placeholder="选择日期"
                  :value-format="'yyyy-MM-ddTHH:mm:ss'"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-col>
            </div>
          <div v-if="item.type === 'carousel'" class="carousel">
            <el-carousel height="150px">
              <el-carousel-item v-for="(list,$index) in item.options" :key="item">
                <h3>{{ list.value }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
            <el-upload
              v-if="item.type === 'img'"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
      </el-form>
      <div class="footer">
        <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit" :disabled="disabled">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import vue from 'vue';
  import Editor from '../../../../common/components/Editor';
    export default {
        name: 'CommonDialog',
        props: {
          formColumns: Array,
          showBtn: Boolean
        },
      data () {
        return {
          title: '新增',
          form: {},
          imageUrl: '',
          dialogVisible: false,
          disabled: false,
          showEditor: false,
          dateTime: ''
        }
      },
      components :{
        Editor
      },
      created(){
        this.showEditor=false;
      },
      mounted () {
          this.initFormParams();
      },
      methods: {
          /**
          *  初始化form表单的参数， 为了防止undefined赋不上值
          * */
          initFormParams(){
            for(let i in this.formColumns) {
              if(this.formColumns[i].showDefault) {
                this.form[this.formColumns[i].key] = this.formColumns[i].options[0].label;
              } else {
                this.form[this.formColumns[i].key] = '';
              }
            }
            console.log(this.form);
          },
          add() {
            this.title = '新增';
            this.dialogVisible = true;
            this.form = {};
            this.showEditor = true;
            vue.set(this, 'form', {});
          },
        handleClose (done) {
          // this.$emit('submit');
          this.$confirm('确认关闭？')
            .then(_ => {
              // this.from = {};
              this.dialogVisible = false;
              this.disabled = false;
              this.form ={};
              this.showEditor = false;
              this.$emit('submit');
              done();
            })
            .catch(_ => {

            });
        },
        handleAvatarSuccess (res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        submit () {
            /**
             * 新增/修改接口
             * */
          this.dialogVisible = false;
          this.disabled = false;
          this.$emit('submit', this.form);
          this.form ={};
        },
        // 清空数据
        cancel () {
          this.dialogVisible = false;
          this.disabled = false;
          this.form ={};
        }
      }
    }
</script>

<style scoped lang="less">
.common-dialog{
  .footer{
    text-align: left;
    margin-left:100px;
  }
}
</style>
