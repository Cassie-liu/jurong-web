<template>
  <div v-if="data">
    <div class="text-right mb-15">
      <el-button type="primary" @click="switchEdit">{{btnText}}</el-button>
    </div>

    <div class="gView" v-show="!showEdit">
      <el-row class="h-100">
        <!--缩略图-->
        <el-col :span="10" class="h-100 xy-center" v-show="!scaleImg">
          <div class="imgC" @click="switchBigImg">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="(slide, index) in data.img" :key="index">
                <img :src="slide.url" class="full">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :span="14" class="h-100" v-show="!scaleImg">
          <div class="h-100 xy-center">{{data.des}}</div>
        </el-col>

        <!--大图-->
        <el-col :span="24" class="h-100 xy-center" v-show="scaleImg">
          <div class="imgB" @click="switchBigImg">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="(slide, index) in data.imgB" :key="index">
                <img :src="slide.url" class="full">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="full" v-show="showEdit">
      <div class="title">选择图片</div>
      <div class="upload-img upload-imgs">
        <el-upload
          ref="upload"
          multiple
          action=""
          list-type="picture-card"
          :auto-upload="false"
          :limit="imgLimit"
          :on-exceed="handleExceed"
          :file-list="data.imgB"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <ul class="upload-img-text">
          <li>上传5张图片，只能上传jpg/png/pdf文件，且不超过5M</li>

          <li>图片的宽或高至少有一个为450px以上（建议上传图片为正方形）</li>
        </ul>
      </div>

      <div class="title">编辑内容</div>
      <div>
        <textarea name="" id="" cols="30" class="upload-textarea" v-model="data.des">
        </textarea>
      </div>
    </div>
  </div>
</template>


<script>
  import reqType from '@/api/reqType';

  export default {
    name: 'graphicView',
    components: {},
    props: {
      data: {
        type: Object,
        require: true
      },
      refresh: {
        type: Boolean
      }
    },
    data () {
      return {
        btnText: '编辑',
        scaleImg: false,
        showEdit: false,
         swiperOption: {},
        dialogImageUrl: '',
        dialogVisible: false,
        imgLimit: 5
      };
    },
    created () {
      this.init();
    },
    methods: {
      init () {
        // 初始化
        this.btnText = '编辑';
        this.scaleImg = false;
        this.showEdit = false;
      },
      switchEdit () {
        if (this.showEdit) {
          console.log('点击了保存');
          this.btnText = '编辑';
          // 先保存des数据
          this.$http(reqType.PUT, `city/${this.data.id}`, this.data, false)
            .then(data => {
              this.data.des = data.des
              // 再保存图片
              let formData = new FormData();
              this.$refs.upload.uploadFiles.map(item => item.raw).forEach((sub, index) => {
                formData.append('multipartFile', sub);
              });
              this.$http(reqType.POST, `jrResource/fileUpload?id=${this.data.id}&type=CITY`, formData, false)
                .then(() => {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  window.location.reload();
                });
            });
        } else {
          console.log('点击了编辑');
          this.btnText = '保存';
          this.showEdit = !this.showEdit;
        }
      },
      switchBigImg () {
        this.scaleImg = !this.scaleImg;
      },
      handleRemove (file) {
        console.log(file);
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed () {
        let _this = this;
        this.$message({
          message: `最多可以上传${_this.imgLimit}张图片`,
          type: 'warning'
        });
      }
    },
    watch: {
      refresh: function (v) {
        this.init();
      }
    }
  };

</script>

<style lang="less" scoped>
  .gView {
    height: 500px;
  }

  .imgC {
    width: 400px;
    height: 300px;
  }

  .imgB {
    width: 100%;
    height: 100%;
  }

  .swiper-container {
    height: 100%;
  }

  .swiper-slide {
    background-color: #f1f1f1;
  }

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

  .title {
    padding: 10px 0;
  }

  .upload-textarea {
    width: 500px;
    height: 140px;
    border-radius: 5px;
  }
</style>
