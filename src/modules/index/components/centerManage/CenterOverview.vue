<template>
  <div class="center-overview">
    <el-row class="base-data">
      <el-col :span="8" v-show="!showManagement" class="content" v-for="(item, index) in img" :key="index">
        <div class="img-card">
          <img :src="item.path" @click="getDetailManagement(item.id)">
        </div>
        <div class="text-center mt-15">{{item.name}}</div>
      </el-col>
      <el-col :span="24" v-show="showManagement">
        <common-graphic :data="graphic"></common-graphic>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import CommonGraphic from '../common/CommonGraphic';
  export default {
    name: 'CenterOverview',
    props: [],
    data () {
      return {
        img: [
          {id: 1, path: '/static/img/bj.jpg', name: '分中心1'},
          {id: 2, path: '/static/img/bj.jpg', name: '分中心2'},
          {id: 3, path: '/static/img/bj.jpg', name: '分中心3'},
          {id: 4, path: '/static/img/bj.jpg', name: '分中心4'},
          {id: 5, path: '/static/img/bj.jpg', name: '分中心5'}
        ],
        showManagement: false,
        graphic: {
          img: [
            {path: '/static/img/test.jpeg', pathB: '/static/img/test.jpeg'},
            {path: '/static/img/test.jpeg', pathB: '2b'},
            {path: '/static/img/test.jpeg', pathB: '3b'},
            {path: '/static/img/test.jpeg', pathB: '4b'}
          ],
          text: 'asdasd'
        } // 镇所详情
      };
    },
    mounted () {
    },
    components: {
      CommonGraphic
    },
    methods: {
      /**
       * 获取所站概况
       */
      getDetailManagement (id) {
        this.showManagement = true;
      }
    },
    watch: {
    }
  };
</script>

<style scoped lang="less">
  .center-overview {
    .base-data{
      padding: 15px;
      display: flex;
      width: 100%;
      overflow: hidden;
      flex-wrap: wrap;
      .content {
        padding: 0 20px 20px 0;
        .img-card{
          height: 300px;
          width: 100%;
          position: relative;
          cursor: pointer;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
