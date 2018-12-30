<template>
  <div>
    <div class="text-right mb-15">
      <el-button type="primary" @click="switchEdit">{{btnText}}</el-button>
    </div>

    <div class="gView" v-show="!showEdit">
      <el-row class="h-100">
        <el-col :span="scaleImg? 24 : 10" class="h-100 xy-center">
          <div :class="scaleImg? 'imgBig' : 'imgC' " @click="switchBigImg">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="(slide, index) in imgData" :key="index">
                <img :src="slide.path" class="img-fluid" style="height: 100%">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>

        <template v-if="!scaleImg">
          <el-col :span="14" class="h-100">
            <div class="h-100 xy-center">{{data.text}}</div>
          </el-col>
        </template>
      </el-row>
    </div>

    <div class="full" v-show="showEdit">
      <div class="title">选择图片</div>
      <div class="upload-img upload-imgs">
        <div class="upload-img-item" v-for="(item, index) in imgList.img" :key="index">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="item.path" :src="item.path" class="img-fluid">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <span style="font-size: 12px">第{{ index + 1 }}张图片</span>
        </div>

        <ul class="upload-img-text">
          <li>上传5张图片，只能上传jpg/png/pdf文件，且不超过5M</li>

          <li>图片的宽或高至少有一个为450px以上（建议上传图片为正方形）</li>
        </ul>
      </div>

      <div class="title">编辑内容</div>
      <div>
        <textarea name="" id="" cols="30" class="upload-textarea" v-model="textarea">
        </textarea>
      </div>
    </div>
  </div>
</template>


<script>
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
        textarea: '',
        scaleImg: false,
        showEdit: false,
        imgList: {
          img: [],
          imgB: []
        },
        imgData: [],
        swiperOption: {}
      };
    },
    created () {
      this.data.img.forEach(v => {
        let _img = {};
        let _imgB = {};
        _img.path = v.path;
        _imgB.path = v.pathB;
        this.imgList.img.push(_img);
        this.imgList.imgB.push(_imgB);
      });
      this.imgData = this.imgList.img;
      this.textarea = this.data.text;
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
        } else {
          console.log('点击了编辑');
          this.btnText = '保存';
          // todo 调取保存接口然后重新load页面
        }
        this.showEdit = !this.showEdit;
      },
      switchBigImg () {
        this.scaleImg = !this.scaleImg;
        this.imgData = this.scaleImg ? this.imgList.imgB : this.imgList.img;
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload (file) {
        console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    watch: {
      refresh: function (v) {
        this.init();
      }
    }
  };

</script>

<style scoped lang="less">
  .gView{
    height: 500px;
  }

  .imgC{
    width: 400px;
    height: 300px;
  }

  .imgBig{
    width: 100%;
    height: 100%;
  }

  .swiper-container{
    height: 100%;
  }

  .swiper-slide{
    background-color: #f1f1f1;
  }

  .upload-img {
    padding: 20px;
    background-color: #fafafa;
    border-radius: 4px;
    height: 140px;
    display: flex;
    align-items: center;

    &-item {
      width: 140px;
      margin-right: 10px;
      float: left;
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

    &-dialog{
      .el-dialog__header{
        padding-bottom: 0;
      }
      .el-dialog__body{
        padding: 20px;
        img{
          display: block;
          width: 100%;
        }
        ul{
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
  }

  .upload-imgs {
    height: 160px;
  }

  .title{
    padding: 10px 0;
  }

  .upload-textarea{
    width: 500px;
    height: 140px;
    border-radius: 5px;
  }
</style>
