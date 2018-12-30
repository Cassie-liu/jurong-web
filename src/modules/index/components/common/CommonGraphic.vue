<template>
  <div>
    <div class="text-right mb-15">
      <el-button type="primary" @click="switchEdit">{{btnText}}</el-button>
    </div>

    <div class="gView" v-show="!showEdit">
      <el-row class="h-100">
        <el-col :span="scaleImg? 24 : 10" class="h-100 xy-center">
          <div :class="scaleImg? 'imgBig' : 'imgC' ">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide v-for="(slide, index) in imgData" :key="index">
                <img :src="slide.path" class="img-fluid" style="height: 100%">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <!--<div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>-->
            </swiper>
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
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: "graphicView",
    components: {
      swiper,
      swiperSlide
    },
    props: {
      data: {
        type: Object,
        require: true
      }
    },
    data() {
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
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable :true
          },
          centeredSlides: true,
          autoplay:true,
          preventClicks : false,//默认true
          /*navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: true
          },*/
          loop : true,
          on: {
            doubleTap: ()=>{
              // 通过$refs获取对应的swiper对象
              console.log('你点击了swiper')
              this.scaleImg = !this.scaleImg
              this.imgData = this.scaleImg ? this.imgList.imgB : this.imgList.img
              let swiper = this.$refs.mySwiper.swiper;

            }
          }
        }
      }
    },
    created() {
      this.data.img.forEach(v => {
        let _img = {}
        let _imgB = {}
        _img.path = v.path
        _imgB.path = v.pathB
        this.imgList.img.push(_img)
        this.imgList.imgB.push(_imgB)
      })
      this.imgData = this.imgList.img
      this.textarea = this.data.text
    },
    methods: {
      switchEdit () {
        if (this.showEdit) {
          console.log('点击了保存')
          this.btnText = '编辑'
        } else {
          console.log('点击了编辑')
          this.btnText = '保存'
          // todo 调取保存接口然后重新load页面
        }
        this.showEdit = !this.showEdit
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        console.log(file)
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
    }
  }
</script>

<style scoped lang="less">
  @import '../../../../assets/less/swiper.css';

  .gView{
    height: 600px;
  }

  .imgC{
    width: 300px;
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
