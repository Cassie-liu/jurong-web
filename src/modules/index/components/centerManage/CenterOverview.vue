<template>
  <div class="center-overview">
    <div class="base-data">
      <div v-show="!showManagement" class="content" v-for="(item, index) in img" :key="index">
        <img :src="item.path" class="img-fluid" @click="getDetailManagement(item.id)">
        <div class="text-center mt-15">{{item.name}}</div>
      </div>
      <div v-show="showManagement">
        <common-graphic :data="graphic"></common-graphic>
      </div>
    </div>
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
        padding: 0 1% 25px 0;
        img {
          width:500px;
          height:300px;
          cursor: pointer;
        }
      }
    }
  }
</style>
