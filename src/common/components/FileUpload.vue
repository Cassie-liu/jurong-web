<template>
  <div class="upload-img upload-imgs">
    <el-upload
      ref="upload"
      multiple
      action=""
      list-type="picture-card"
      :auto-upload="false"
      :limit="imgLimit"
      :on-exceed="handleExceed"
      :file-list="imgList"
      :on-change="getFileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <ul class="upload-img-text">
      <li>上传{{imgLimit}}张图片，只能上传jpg/png/pdf文件，且不超过5M</li>

      <li>图片的宽或高至少有一个为450px以上（建议上传图片为正方形）</li>
    </ul>
  </div>
</template>


<script>
  export default {
    name: 'FileUpload',
    components: {},
    props: {
      // 图片最大上传数
      imgLimit: {
        default: 5
      },
      // 回填的图片信息
      imgList: {
        type: Array,
        require: true
      }
    },
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      // 图片删除 - todo
      handleRemove (file, filelist) {
         //console.log(file);
         this.getFileList();
      },
      // 图片预览
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 上传图片个数超出限制后的回调
      handleExceed () {
        let _this = this;
        this.$message({
          message: `最多可以上传${_this.imgLimit}张图片`,
          type: 'warning'
        });
      },
      getFileList () {
        let _fileList = this.$refs.upload.uploadFiles;
        this.$emit('getFile', _fileList);
      }
    }
  };

</script>

<style lang="less" scoped>
  .upload-img {
    padding: 20px;
    background-color: #fafafa;
    border-radius: 4px;
    display: flex;
    align-items: center;

    &-item {
      margin-right: 10px;
      text-align: center;
      color: #b8b8b8;
      overflow: hidden;

      .el-upload__card.is-null {
        border-color: #f56c6c;
      }
    }

    &:hover .upload-img-text {
      height: 100px;
      padding: 20px;
    }

    &-text {
      height: 0;
      overflow: hidden;
      transition: all linear 200ms;

      li {
        line-height: 20px;
        font-size: 12px;
        list-style: disc;
      }
    }

    &-dialog {
      .el-dialog__header {
        padding-bottom: 0;
      }

      .el-dialog__body {
        padding: 20px;

        img {
          display: block;
          width: 100%;
        }

        ul {
          padding-top: 10px;
          padding-left: 20px;

          li {
            line-height: 20px;
            font-size: 12px;
            list-style: disc;
          }
        }
      }
    }

    .img-label {
      font-size: 14px;
    }
  }
</style>
