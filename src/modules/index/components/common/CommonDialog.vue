<template>
  <div class="common-dialog">
    <el-button @click="dialogVisible = true" v-show="showBtn">新增</el-button>
    <el-dialog
      :title="title"
      width="30%"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-form :inline="true" :model="form" ref="form"  :label-position="'left'">
        <el-form-item v-for="item in formColumns" :key="item.label" :label="item.label" label-width="100px">
            <el-input v-model="form[item.key]" v-if="item.type === 'text'"></el-input>
            <el-select v-model="form[item.key]" v-else-if="item.type === 'select'">
              <el-option v-for="opItem in item.options" :value="opItem.value" :label="opItem.label" :key="opItem.value"></el-option>
            </el-select>
            <!--预留富文本编辑-->
            <el-upload
              v-else-if="item.type === 'img'"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
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
          imgUrl: '',
          dialogVisible: false
        }
      },
      mounted () {
        if (this.title === 'edit') {
          this.dialogVisible = true;
        }
        console.log(this.dialogVisible);
      },
      methods: {
        handleClose (done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              this.from = {};
              done();
            })
            .catch(_ => {});
        },
        handleAvatarSuccess (res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        submit () {
            /**
             * 新增/修改接口
             * */
          this.dialogVisible = false;
          this.$emit('submit');
        }
      }
    }
</script>

<style scoped>

</style>
